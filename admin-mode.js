const adminModeSessionKey = 'aikeys-docs-inline-editor-session';

const adminModeState = {
  session: null,
  app: null,
  shell: null,
  trigger: null,
  toolbar: null,
  dialog: null,
  status: null,
  loginStatus: null,
  active: false,
  dirty: false,
  baseline: null
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

function adminModeClone(value) {
  return value ? JSON.parse(JSON.stringify(value)) : value;
}

function adminModeSetStatus(message, tone = '') {
  [adminModeState.status, adminModeState.loginStatus].filter(Boolean).forEach((status) => {
    status.textContent = message || '';
    status.className = `admin-mode__status${tone ? ` is-${tone}` : ''}`;
  });
}

function adminModeSetDirty(value = true) {
  adminModeState.dirty = value;
  adminModeState.toolbar?.classList.toggle('has-unsaved', value);
  if (value) adminModeSetStatus('Есть несохранённые изменения.', 'warning');
}

function adminModeError(response, payload) {
  const reason = payload?.msg || payload?.message || payload?.error_description || payload?.error || '';
  if (response.status === 401) return 'Неверный email или пароль.';
  if (response.status === 403) return 'У этого пользователя нет прав администратора.';
  return reason || `Ошибка Supabase: ${response.status}.`;
}

async function adminModeRequest(path, options = {}, token = null) {
  const config = adminModeConfig();
  if (!config) throw new Error('Параметры Supabase не найдены. Обновите страницу с Ctrl + Shift + R.');
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
  sessionStorage.setItem(adminModeSessionKey, JSON.stringify({
    access_token: session.access_token,
    expires_at: session.expires_at,
    user: { email: session.user?.email || '', id: session.user?.id || '' }
  }));
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

async function adminModeReadPublished() {
  const config = adminModeConfig();
  const endpoint = new URL('/rest/v1/site_content', config.url);
  endpoint.searchParams.set('select', 'content,updated_at');
  endpoint.searchParams.set('id', 'eq.main');
  const rows = await adminModeRequest(`${endpoint.pathname}${endpoint.search}`, {}, adminModeState.session?.access_token);
  const row = Array.isArray(rows) ? rows[0] : null;
  return row?.content && typeof row.content === 'object' && Array.isArray(row.content.apps) ? row.content : null;
}

function adminModeCloseDialog() {
  if (adminModeState.dialog) adminModeState.dialog.hidden = true;
}

function adminModeOpenDialog() {
  if (!adminModeState.dialog) return;
  adminModeState.dialog.hidden = false;
  adminModeState.dialog.querySelector('input[type="email"]')?.focus();
}

function adminModeEnterEditing() {
  if (!adminModeState.app) return;
  adminModeState.active = true;
  adminModeState.baseline = adminModeClone(adminModeState.app.getCatalog());
  adminModeState.app.setInlineEditing(true);
  document.body.classList.add('is-inline-editing');
  adminModeState.shell.classList.add('is-editing');
  adminModeState.trigger.hidden = true;
  adminModeState.toolbar.hidden = false;
  adminModeCloseDialog();
  const needsGatewayMigration = adminModeState.app.needsGatewayUrlMigration?.() === true;
  adminModeSetDirty(needsGatewayMigration);
  adminModeSetStatus(
    needsGatewayMigration
      ? 'Устаревшие Base URL уже заменены на api.rootgateway.com. Нажмите «Сохранить», чтобы закрепить это в Supabase.'
      : 'Кликайте по тексту, коду или полям и редактируйте прямо на странице.',
    'success'
  );
}

function adminModeExitEditing() {
  if (adminModeState.dirty && !window.confirm('Несохранённые изменения будут потеряны. Выйти из режима редактирования?')) return;
  adminModeState.app?.setInlineEditing(false);
  document.body.classList.remove('is-inline-editing');
  adminModeState.active = false;
  adminModeState.dirty = false;
  adminModeState.baseline = null;
  sessionStorage.removeItem(adminModeSessionKey);
  adminModeState.session = null;
  adminModeState.shell.classList.remove('is-editing');
  adminModeState.toolbar.hidden = true;
  adminModeState.trigger.hidden = false;
  adminModeSetStatus('');
}

function adminModeDefaultForAction(action) {
  if (action === 'add-step') return {
    t: { ru: 'Новый шаг' },
    p: { ru: 'Опишите действие' },
    fields: [['Новое поле', 'Значение']],
    code: { ru: '# Вставьте команду или код' }
  };
  if (action === 'add-field') return ['Новое поле', 'Значение'];
  if (action === 'add-note') return { ru: 'Новая сноска' };
  if (action === 'add-tip') return { title: 'Новый совет', body: 'Опишите полезную настройку.' };
  if (action === 'add-error') return {
    id: 'new-error',
    title: 'Новая ошибка',
    symptoms: 'Опишите, что видит пользователь.',
    reason: 'Опишите причину.',
    fix: ['Опишите решение.']
  };
  if (action === 'add-fix') return 'Новый пункт решения.';
  if (action === 'add-model') return { id: 'new-model-id', name: 'Новая модель', kind: 'Текст / код' };
  return '';
}

function adminModeHandleInlineAction(trigger) {
  const action = trigger.dataset.inlineAction;
  const path = trigger.dataset.inlinePath;
  if (!action || !path || !adminModeState.app) return;
  if (action === 'remove') adminModeState.app.removePath(path);
  else if (action === 'toggle-hidden') {
    adminModeState.app.updatePath(path, !Boolean(adminModeState.app.readPath?.(path)));
    adminModeState.app.refresh();
  } else adminModeState.app.appendPath(path, adminModeDefaultForAction(action));
  adminModeSetDirty(true);
}

async function adminModeSave() {
  const saveButton = adminModeState.toolbar?.querySelector('[data-admin-save]');
  if (!adminModeState.app || !adminModeState.session) return;
  saveButton.disabled = true;
  adminModeSetStatus('Сохраняем изменения…');
  try {
    const catalog = adminModeState.app.getCatalog();
    catalog.meta = {
      ...(catalog.meta || {}),
      source: 'supabase',
      gatewayUrl: catalog.meta?.gatewayUrl || 'https://api.rootgateway.com',
      updatedAt: new Date().toISOString()
    };
    const result = await adminModeRequest('/rest/v1/site_content?on_conflict=id', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
      body: JSON.stringify([{ id: 'main', content: catalog }])
    }, adminModeState.session.access_token);
    const saved = Array.isArray(result) ? result[0]?.content : null;
    adminModeState.app.setCatalog(saved || catalog);
    adminModeState.baseline = adminModeClone(saved || catalog);
    adminModeSetDirty(false);
    adminModeSetStatus('Опубликовано. Обычные посетители увидят изменения после обновления страницы.', 'success');
  } catch (error) {
    adminModeSetStatus(error.message || 'Не удалось сохранить.', 'error');
  } finally {
    saveButton.disabled = false;
  }
}

async function adminModeRestore() {
  const restoreButton = adminModeState.toolbar?.querySelector('[data-admin-restore]');
  if (!adminModeState.app) return;
  restoreButton.disabled = true;
  adminModeSetStatus('Возвращаем опубликованную версию…');
  try {
    const published = await adminModeReadPublished();
    const catalog = published || adminModeState.baseline || adminModeState.app.getCatalog();
    adminModeState.app.setCatalog(catalog);
    adminModeState.baseline = adminModeClone(catalog);
    const needsGatewayMigration = adminModeState.app.needsGatewayUrlMigration?.() === true;
    adminModeSetDirty(needsGatewayMigration);
    adminModeSetStatus(
      needsGatewayMigration
        ? 'Возвращена опубликованная версия. Устаревшие Base URL заменены в рабочей копии — нажмите «Сохранить», чтобы закрепить это.'
        : (published ? 'Возвращена опубликованная версия.' : 'Публикаций ещё нет — возвращена исходная версия.'),
      'success'
    );
  } catch (error) {
    adminModeSetStatus(error.message || 'Не удалось вернуть изменения.', 'error');
  } finally {
    restoreButton.disabled = false;
  }
}

function adminModeBuildLogin() {
  const overlay = adminModeNode('div', 'admin-mode__login-overlay');
  overlay.hidden = true;
  const panel = adminModeNode('section', 'admin-mode__login-card');
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-labelledby', 'admin-login-title');
  const close = adminModeNode('button', 'admin-mode__close', '×');
  close.type = 'button';
  close.setAttribute('aria-label', 'Закрыть вход');
  close.addEventListener('click', adminModeCloseDialog);
  panel.append(close, adminModeNode('p', 'admin-mode__eyebrow', 'Режим редактирования'));
  const title = adminModeNode('h2', 'admin-mode__title', 'Войти для правки сайта');
  title.id = 'admin-login-title';
  panel.append(title, adminModeNode('p', 'admin-mode__lead', 'После входа этот же сайт станет редактируемым: кликните на любой текст или код прямо на странице.'));
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
  const loginStatus = adminModeNode('p', 'admin-mode__status');
  loginStatus.setAttribute('aria-live', 'polite');
  adminModeState.loginStatus = loginStatus;
  panel.append(form, adminModeNode('p', 'admin-mode__note', 'У обычных посетителей нет ни входа, ни доступа к редактированию.'), loginStatus);
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
      const isAdmin = await adminModeRequest('/rest/v1/rpc/is_site_admin', { method: 'POST', body: '{}' }, session.access_token);
      if (isAdmin !== true) throw new Error('Вход выполнен, но этот пользователь не добавлен в список администраторов.');
      adminModeState.session = session;
      adminModeSaveSession(session);
      adminModeEnterEditing();
    } catch (error) {
      adminModeSetStatus(error.message || 'Не удалось войти.', 'error');
    } finally {
      submit.disabled = false;
    }
  });
  overlay.append(panel);
  return overlay;
}

function adminModeBuildToolbar() {
  const toolbar = adminModeNode('aside', 'admin-mode__toolbar');
  toolbar.hidden = true;
  toolbar.setAttribute('aria-label', 'Управление редактированием');
  const identity = adminModeNode('span', 'admin-mode__identity', 'Режим редактирования');
  const status = adminModeNode('span', 'admin-mode__status');
  status.setAttribute('aria-live', 'polite');
  const restore = adminModeNode('button', 'admin-mode__quiet', 'Отменить');
  restore.type = 'button';
  restore.dataset.adminRestore = 'true';
  restore.addEventListener('click', adminModeRestore);
  const save = adminModeNode('button', 'admin-mode__primary', 'Сохранить');
  save.type = 'button';
  save.dataset.adminSave = 'true';
  save.addEventListener('click', adminModeSave);
  const signout = adminModeNode('button', 'admin-mode__quiet', 'Выйти');
  signout.type = 'button';
  signout.addEventListener('click', adminModeExitEditing);
  toolbar.append(identity, status, restore, save, signout);
  adminModeState.status = status;
  return toolbar;
}

function adminModeBuildShell() {
  const shell = adminModeNode('div', 'admin-mode');
  const trigger = adminModeNode('button', 'admin-mode__toggle', 'Редактировать сайт');
  trigger.type = 'button';
  trigger.addEventListener('click', adminModeOpenDialog);
  const dialog = adminModeBuildLogin();
  const toolbar = adminModeBuildToolbar();
  shell.append(trigger, dialog, toolbar);
  document.body.append(shell);
  adminModeState.shell = shell;
  adminModeState.trigger = trigger;
  adminModeState.dialog = dialog;
  adminModeState.toolbar = toolbar;
}

function adminModeBindInlineEvents() {
  document.addEventListener('input', (event) => {
    if (!adminModeState.active) return;
    const editable = event.target.closest?.('[data-edit-path]');
    if (!editable) return;
    const value = editable instanceof HTMLInputElement || editable instanceof HTMLTextAreaElement
      ? editable.value
      : editable.textContent;
    if (adminModeState.app.updatePath(editable.dataset.editPath, value)) adminModeSetDirty(true);
  });

  document.addEventListener('click', (event) => {
    if (!adminModeState.active) return;
    const action = event.target.closest?.('[data-inline-action]');
    if (action) {
      event.preventDefault();
      event.stopPropagation();
      adminModeHandleInlineAction(action);
      return;
    }
    if (event.target.closest?.('[data-edit-path]') && event.target.closest?.('a, button')) event.preventDefault();
  });

  document.addEventListener('paste', (event) => {
    if (!adminModeState.active || !event.target.closest?.('[contenteditable="plaintext-only"]')) return;
    event.preventDefault();
    document.execCommand('insertText', false, event.clipboardData?.getData('text/plain') || '');
  });

  window.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's' && adminModeState.active) {
      event.preventDefault();
      adminModeSave();
    }
  });

  window.addEventListener('beforeunload', (event) => {
    if (!adminModeState.dirty) return;
    event.preventDefault();
    event.returnValue = '';
  });
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
  adminModeBindInlineEvents();
  if (!adminModeConfig()) {
    adminModeSetStatus('Параметры Supabase не найдены. Обновите страницу с Ctrl + Shift + R.', 'error');
    return;
  }
  try {
    adminModeState.app = await adminModeWaitForPublicApp();
    adminModeState.session = adminModeReadSession();
    if (adminModeState.session) {
      const isAdmin = await adminModeRequest('/rest/v1/rpc/is_site_admin', { method: 'POST', body: '{}' }, adminModeState.session.access_token);
      if (isAdmin === true) adminModeEnterEditing();
    }
  } catch (error) {
    adminModeSetStatus(error.message || 'Не удалось подготовить редактор.', 'error');
  }
}

adminModeInitialise();
