const adminModeSessionKey = 'aikeys-docs-inline-editor-session';
const adminModeState = {
  session: null,
  app: null,
  shell: null,
  drawer: null,
  source: null,
  status: null,
  account: null,
  open: false
};

function adminModeConfig() {
  const config = window.__AIKEYS_SITE_CONFIG__?.supabase;
  if (!config || typeof config.url !== 'string' || typeof config.publishableKey !== 'string') return null;
  const url = config.url.replace(/\/$/, '');
  const publishableKey = config.publishableKey.trim();
  return url && publishableKey ? { url, publishableKey } : null;
}

function adminModeNode(tag, className, content) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content !== undefined) element.textContent = content;
  return element;
}

function adminModeClear(element) {
  element.replaceChildren();
  return element;
}

function adminModeSetStatus(message, tone = '') {
  if (!adminModeState.status) return;
  adminModeState.status.textContent = message || '';
  adminModeState.status.classList.toggle('is-error', tone === 'error');
  adminModeState.status.classList.toggle('is-success', tone === 'success');
}

function adminModeError(response, payload) {
  const reason = payload?.msg || payload?.message || payload?.error_description || payload?.error || '';
  if (response.status === 401) return 'Неверный email или пароль.';
  if (response.status === 403) return 'У этого пользователя нет прав администратора.';
  return reason || `Ошибка Supabase: ${response.status}.`;
}

async function adminModeRequest(path, options = {}, token = null) {
  const config = adminModeConfig();
  if (!config) throw new Error('Параметры Supabase не найдены. Обновите страницу с очисткой кэша.');
  const response = await fetch(new URL(path, config.url), {
    ...options,
    headers: {
      apikey: config.publishableKey,
      Authorization: `Bearer ${token || config.publishableKey}`,
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {})
    }
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) throw new Error(adminModeError(response, payload));
  return payload;
}

function adminModeSaveSession(session) {
  const compact = {
    access_token: session.access_token,
    expires_at: session.expires_at,
    user: { email: session.user?.email || '', id: session.user?.id || '' }
  };
  sessionStorage.setItem(adminModeSessionKey, JSON.stringify(compact));
}

function adminModeReadSession() {
  try {
    const session = JSON.parse(sessionStorage.getItem(adminModeSessionKey) || 'null');
    if (!session?.access_token) return null;
    if (session.expires_at && Number(session.expires_at) * 1000 < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

function adminModeToggleDrawer(open = !adminModeState.open) {
  adminModeState.open = open;
  adminModeState.shell?.classList.toggle('is-open', open);
  adminModeState.drawer?.setAttribute('aria-hidden', String(!open));
}

function adminModeParseSource() {
  try {
    const content = JSON.parse(adminModeState.source.value);
    if (!content || typeof content !== 'object' || !Array.isArray(content.apps) || !content.recipes || !content.models) {
      throw new Error('Нужен полный JSON справочника: apps, recipes и models не должны быть удалены.');
    }
    return content;
  } catch (error) {
    throw new Error(error instanceof SyntaxError ? 'JSON содержит ошибку. Проверьте запятые, кавычки и скобки.' : error.message);
  }
}

function adminModeWriteSource(catalog) {
  adminModeState.source.value = JSON.stringify(catalog, null, 2);
}

async function adminModeReadPublished() {
  const endpoint = new URL('/rest/v1/site_content', adminModeConfig().url);
  endpoint.searchParams.set('select', 'content,updated_at');
  endpoint.searchParams.set('id', 'eq.main');
  const rows = await adminModeRequest(`${endpoint.pathname}${endpoint.search}`, {}, adminModeState.session?.access_token);
  const row = Array.isArray(rows) ? rows[0] : null;
  return row?.content && typeof row.content === 'object' && Array.isArray(row.content.apps) ? row.content : null;
}

function adminModeRenderLogin() {
  const panel = adminModeClear(adminModeState.drawer);
  const head = adminModeNode('div', 'admin-mode__head');
  head.append(adminModeNode('p', 'admin-mode__eyebrow', 'Режим редактирования'), adminModeCloseButton());
  panel.append(head);
  panel.append(adminModeNode('h2', 'admin-mode__title', 'Войти как администратор'));
  panel.append(adminModeNode('p', 'admin-mode__lead', 'Страница остаётся обычным справочником. Вход нужен только для изменения и публикации данных.'));

  const form = adminModeNode('form', 'admin-mode__login');
  const emailLabel = adminModeNode('label', '');
  emailLabel.append(adminModeNode('span', '', 'Email'));
  const email = document.createElement('input');
  email.type = 'email';
  email.autocomplete = 'email';
  email.required = true;
  email.placeholder = 'you@example.com';
  emailLabel.append(email);
  const passwordLabel = adminModeNode('label', '');
  passwordLabel.append(adminModeNode('span', '', 'Пароль'));
  const password = document.createElement('input');
  password.type = 'password';
  password.autocomplete = 'current-password';
  password.required = true;
  password.placeholder = 'Ваш пароль';
  passwordLabel.append(password);
  const submit = adminModeNode('button', 'admin-mode__primary', 'Войти и редактировать');
  submit.type = 'submit';
  form.append(emailLabel, passwordLabel, submit);
  panel.append(form);
  panel.append(adminModeNode('p', 'admin-mode__note', 'Нет регистрации для посетителей. Админ-пользователь создаётся только в панели Supabase.'));
  panel.append(adminModeStatusNode());

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    submit.disabled = true;
    adminModeSetStatus('Проверяем доступ…');
    try {
      const session = await adminModeRequest('/auth/v1/token?grant_type=password', {
        method: 'POST',
        body: JSON.stringify({ email: email.value.trim(), password: password.value })
      });
      if (!session?.access_token || !session?.user) throw new Error('Supabase не вернул сессию входа.');
      const isAdmin = await adminModeRequest('/rest/v1/rpc/is_site_admin', {
        method: 'POST',
        body: '{}'
      }, session.access_token);
      if (isAdmin !== true) throw new Error('Вход выполнен, но этот пользователь не добавлен в список администраторов.');
      adminModeState.session = session;
      adminModeSaveSession(session);
      adminModeRenderEditor();
      adminModeSetStatus('Вы вошли. Можно менять исходник справочника.', 'success');
    } catch (error) {
      adminModeSetStatus(error.message || 'Не удалось войти.', 'error');
    } finally {
      submit.disabled = false;
    }
  });
}

function adminModeCloseButton() {
  const close = adminModeNode('button', 'admin-mode__close', '×');
  close.type = 'button';
  close.setAttribute('aria-label', 'Закрыть редактор');
  close.addEventListener('click', () => adminModeToggleDrawer(false));
  return close;
}

function adminModeStatusNode() {
  const status = adminModeNode('p', 'admin-mode__status');
  status.setAttribute('aria-live', 'polite');
  adminModeState.status = status;
  return status;
}

function adminModeRenderEditor() {
  const panel = adminModeClear(adminModeState.drawer);
  const head = adminModeNode('div', 'admin-mode__head');
  const headCopy = document.createElement('div');
  headCopy.append(adminModeNode('p', 'admin-mode__eyebrow', 'Исходник содержимого'), adminModeNode('strong', 'admin-mode__account', adminModeState.session?.user?.email || 'Администратор'));
  head.append(headCopy, adminModeCloseButton());
  panel.append(head);
  panel.append(adminModeNode('h2', 'admin-mode__title', 'Редактируй прямо поверх сайта'));
  panel.append(adminModeNode('p', 'admin-mode__lead', 'В этом JSON есть все инструкции, кодовые блоки, модели, ошибки, советы и подписи страницы. Нажми «Применить», чтобы сразу увидеть результат слева.'));

  const actions = adminModeNode('div', 'admin-mode__actions');
  const preview = adminModeNode('button', 'admin-mode__quiet', 'Применить предпросмотр');
  preview.type = 'button';
  const save = adminModeNode('button', 'admin-mode__primary', 'Сохранить и опубликовать');
  save.type = 'button';
  const restore = adminModeNode('button', 'admin-mode__quiet', 'Вернуть опубликованное');
  restore.type = 'button';
  actions.append(preview, save, restore);
  panel.append(actions);

  const sourceLabel = adminModeNode('label', 'admin-mode__source-label', 'JSON содержимого');
  const source = document.createElement('textarea');
  source.className = 'admin-mode__source';
  source.spellcheck = false;
  source.wrap = 'off';
  source.setAttribute('aria-label', 'Исходный JSON справочника');
  adminModeState.source = source;
  sourceLabel.append(source);
  panel.append(sourceLabel);
  panel.append(adminModeNode('p', 'admin-mode__note', 'Не вставляй реальный API-ключ. В кодовых примерах оставляй {{KEY}}. HTML/CSS/JS самого сайта по-прежнему меняются через GitHub; здесь редактируется всё содержание сайта.'));
  panel.append(adminModeStatusNode());

  const initial = adminModeState.app.getCatalog();
  if (initial) adminModeWriteSource(initial);

  preview.addEventListener('click', () => {
    try {
      const catalog = adminModeParseSource();
      adminModeState.app.setCatalog(catalog);
      adminModeSetStatus('Предпросмотр применён. Проверь страницу и затем сохрани.', 'success');
    } catch (error) {
      adminModeSetStatus(error.message, 'error');
    }
  });

  restore.addEventListener('click', async () => {
    restore.disabled = true;
    adminModeSetStatus('Загружаем опубликованную версию…');
    try {
      const published = await adminModeReadPublished();
      const catalog = published || adminModeState.app.getCatalog();
      adminModeState.app.setCatalog(catalog);
      adminModeWriteSource(catalog);
      adminModeSetStatus(published ? 'Загружена опубликованная версия.' : 'Публикаций ещё нет — показан текущий справочник.', 'success');
    } catch (error) {
      adminModeSetStatus(error.message, 'error');
    } finally {
      restore.disabled = false;
    }
  });

  save.addEventListener('click', async () => {
    save.disabled = true;
    adminModeSetStatus('Сохраняем в Supabase…');
    try {
      const catalog = adminModeParseSource();
      catalog.meta = {
        ...(catalog.meta || {}),
        source: 'supabase',
        gatewayUrl: catalog.meta?.gatewayUrl || 'https://api.aikeysforyou.com',
        updatedAt: new Date().toISOString()
      };
      const result = await adminModeRequest('/rest/v1/site_content?on_conflict=id', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
        body: JSON.stringify([{ id: 'main', content: catalog }])
      }, adminModeState.session.access_token);
      const saved = Array.isArray(result) ? result[0]?.content : null;
      adminModeState.app.setCatalog(saved || catalog);
      adminModeWriteSource(saved || catalog);
      adminModeSetStatus('Опубликовано. Посетители увидят изменения после обновления страницы.', 'success');
    } catch (error) {
      adminModeSetStatus(error.message || 'Не удалось сохранить.', 'error');
    } finally {
      save.disabled = false;
    }
  });
}

function adminModeBuildShell() {
  const shell = adminModeNode('div', 'admin-mode');
  const toggle = adminModeNode('button', 'admin-mode__toggle', 'Редактировать сайт');
  toggle.type = 'button';
  toggle.addEventListener('click', () => adminModeToggleDrawer());
  const drawer = adminModeNode('aside', 'admin-mode__drawer');
  drawer.setAttribute('aria-hidden', 'true');
  shell.append(toggle, drawer);
  document.body.append(shell);
  adminModeState.shell = shell;
  adminModeState.drawer = drawer;
}

async function adminModeWaitForPublicApp() {
  for (let attempt = 0; attempt < 200; attempt += 1) {
    const app = window.__AIKEYS_DOCS_APP__;
    if (app?.getCatalog?.()) return app;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error('Справочник не успел загрузиться. Обновите страницу.');
}

async function adminModeInitialise() {
  adminModeBuildShell();
  if (!adminModeConfig()) {
    adminModeRenderLogin();
    adminModeSetStatus('Параметры Supabase не найдены. Обновите страницу с Ctrl + Shift + R.', 'error');
    return;
  }
  try {
    adminModeState.app = await adminModeWaitForPublicApp();
    adminModeState.session = adminModeReadSession();
    if (adminModeState.session) {
      const isAdmin = await adminModeRequest('/rest/v1/rpc/is_site_admin', { method: 'POST', body: '{}' }, adminModeState.session.access_token);
      if (isAdmin === true) {
        adminModeRenderEditor();
        return;
      }
    }
    adminModeRenderLogin();
  } catch (error) {
    adminModeRenderLogin();
    adminModeSetStatus(error.message || 'Не удалось загрузить редактор.', 'error');
  }
}

window.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's' && adminModeState.session && adminModeState.open) {
    event.preventDefault();
    adminModeState.drawer.querySelector('.admin-mode__primary')?.click();
  }
});

adminModeInitialise();
