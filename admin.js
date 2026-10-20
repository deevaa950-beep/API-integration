const siteConfig = window.__AIKEYS_SITE_CONFIG__ || {};
const defaultGateway = 'https://api.rootgateway.com';
const sessionKey = 'aikeys-docs-admin-session';

const elements = {
  loginPanel: document.querySelector('#login-panel'),
  loginForm: document.querySelector('#login-form'),
  loginEmail: document.querySelector('#login-email'),
  loginPassword: document.querySelector('#login-password'),
  loginSubmit: document.querySelector('#login-submit'),
  loginMessage: document.querySelector('#login-message'),
  workspace: document.querySelector('#workspace'),
  accountEmail: document.querySelector('#account-email'),
  recipeSelect: document.querySelector('#recipe-select'),
  createRecipe: document.querySelector('#create-recipe'),
  deleteRecipe: document.querySelector('#delete-recipe'),
  signout: document.querySelector('#signout'),
  editorTitle: document.querySelector('#editor-title'),
  recipeEditor: document.querySelector('#recipe-editor'),
  saveCatalog: document.querySelector('#save-catalog'),
  saveStatus: document.querySelector('#save-status')
};

const state = {
  session: null,
  catalog: null,
  activeAppId: '',
  dirty: false
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function isObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function asText(value, fallback = '') {
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (isObject(value)) return String(value.ru ?? value.name ?? value.en ?? Object.values(value)[0] ?? fallback);
  return fallback;
}

function makeNode(tag, className, content) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content !== undefined) element.textContent = content;
  return element;
}

function clear(element) {
  element.replaceChildren();
  return element;
}

function gatewayUrl() {
  return state.catalog?.meta?.gatewayUrl || defaultGateway;
}

function supabaseConfig() {
  const config = siteConfig.supabase;
  if (!config || typeof config.url !== 'string' || typeof config.publishableKey !== 'string') return null;
  const url = config.url.replace(/\/$/, '');
  const publishableKey = config.publishableKey.trim();
  return url && publishableKey ? { url, publishableKey } : null;
}

function setLoginMessage(message, error = false) {
  elements.loginMessage.textContent = message || '';
  elements.loginMessage.classList.toggle('is-error', Boolean(error));
}

function setSaveStatus(message, tone = '') {
  elements.saveStatus.textContent = message || '';
  elements.saveStatus.classList.toggle('is-error', tone === 'error');
  elements.saveStatus.classList.toggle('is-success', tone === 'success');
}

function markDirty() {
  state.dirty = true;
  setSaveStatus('Есть несохранённые изменения');
}

function ensureCatalog(value) {
  const catalog = isObject(value) ? clone(value) : {};
  catalog.apps = Array.isArray(catalog.apps) ? catalog.apps : [];
  catalog.recipes = isObject(catalog.recipes) ? catalog.recipes : {};
  catalog.meta = isObject(catalog.meta) ? catalog.meta : {};
  catalog.meta.gatewayUrl = catalog.meta.gatewayUrl || defaultGateway;
  return catalog;
}

function bundledCatalog() {
  const catalog = window.__AIKEYS_CATALOG__;
  if (!isObject(catalog)) throw new Error('Не найден резервный каталог сайта.');
  return ensureCatalog(catalog);
}

function appName(app) {
  return asText(app?.ru ?? app?.name ?? app?.title ?? app?.en, 'Программа');
}

function activeApp() {
  return (state.catalog?.apps || []).find((app) => app.id === state.activeAppId) || null;
}

function activeRecipe() {
  return state.catalog?.recipes?.[state.activeAppId] || null;
}

function readError(response, payload) {
  const reason = payload?.msg || payload?.message || payload?.error_description || payload?.error || '';
  if (response.status === 401) return 'Неверный email или пароль.';
  if (response.status === 403) return 'Вход выполнен, но для этого аккаунта нет прав администратора.';
  if (reason) return reason;
  return `Ошибка Supabase: ${response.status}.`;
}

async function requestJson(path, options = {}, token = null) {
  const config = supabaseConfig();
  if (!config) throw new Error('В site-config.js не заданы параметры Supabase.');
  const endpoint = new URL(path, config.url);
  const response = await fetch(endpoint, {
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
  if (!response.ok) throw new Error(readError(response, payload));
  return payload;
}

async function signIn(email, password) {
  const payload = await requestJson('/auth/v1/token?grant_type=password', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  if (!payload?.access_token || !payload?.user) throw new Error('Supabase не вернул сессию входа.');
  return payload;
}

function saveSession(session) {
  const compact = {
    access_token: session.access_token,
    expires_at: session.expires_at,
    user: { email: session.user?.email || '', id: session.user?.id || '' }
  };
  sessionStorage.setItem(sessionKey, JSON.stringify(compact));
}

function getSavedSession() {
  try {
    const session = JSON.parse(sessionStorage.getItem(sessionKey) || 'null');
    if (!session?.access_token) return null;
    if (session.expires_at && Number(session.expires_at) * 1000 < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

function clearSession() {
  sessionStorage.removeItem(sessionKey);
  state.session = null;
}

async function loadPublishedCatalog(token) {
  const endpoint = new URL('/rest/v1/site_content', supabaseConfig().url);
  endpoint.searchParams.set('select', 'content,updated_at');
  endpoint.searchParams.set('id', 'eq.main');
  const rows = await requestJson(`${endpoint.pathname}${endpoint.search}`, {}, token);
  const row = Array.isArray(rows) ? rows[0] : null;
  if (!row?.content || !isObject(row.content) || !Array.isArray(row.content.apps)) return bundledCatalog();
  const catalog = ensureCatalog(row.content);
  catalog.meta.updatedAt = row.updated_at || catalog.meta.updatedAt;
  return catalog;
}

function configurePage() {
  if (typeof siteConfig.title === 'string' && siteConfig.title.trim()) {
    document.title = `${siteConfig.title.trim()} — админка`;
  }
  if (typeof siteConfig.favicon === 'string' && siteConfig.favicon.trim()) {
    const favicon = document.querySelector('#site-favicon');
    if (favicon) favicon.setAttribute('href', `../${siteConfig.favicon.replace(/^\.\//, '')}`);
  }
}

function renderRecipeSelect() {
  const select = clear(elements.recipeSelect);
  const apps = state.catalog?.apps || [];
  if (!apps.some((app) => app.id === state.activeAppId)) state.activeAppId = apps[0]?.id || '';

  apps.forEach((app) => {
    const option = document.createElement('option');
    option.value = app.id;
    option.selected = app.id === state.activeAppId;
    option.textContent = state.catalog.recipes?.[app.id] ? appName(app) : `${appName(app)} — нет инструкции`;
    select.append(option);
  });
}

function removeChildButton(label, action, danger = false) {
  const button = makeNode('button', `editor-button${danger ? ' danger' : ''}`, label);
  button.type = 'button';
  button.addEventListener('click', action);
  return button;
}

function valueEditor(label, getValue, setValue, options = {}) {
  const section = makeNode('div', 'editor-field');
  section.append(makeNode('label', '', label));
  const current = getValue();
  const localized = isObject(current);
  const slots = localized ? Object.keys(current) : ['text'];
  if (!slots.length) slots.push(localized ? 'ru' : 'text');
  const rows = makeNode('div', 'localized-fields');

  slots.forEach((slot) => {
    const row = document.createElement('div');
    if (localized) row.append(makeNode('small', '', slot));
    const control = document.createElement(options.multiline === false ? 'input' : 'textarea');
    control.className = options.code ? 'editor-textarea code-input' : options.multiline === false ? 'editor-input' : 'editor-textarea';
    if (control.tagName === 'INPUT') control.type = 'text';
    control.placeholder = options.placeholder || '';
    const slotValue = localized ? current?.[slot] : current;
    control.value = typeof slotValue === 'string' || typeof slotValue === 'number' ? String(slotValue) : '';
    control.addEventListener('input', () => {
      const liveValue = getValue();
      if (isObject(liveValue)) {
        setValue({ ...liveValue, [slot]: control.value });
      } else {
        setValue(control.value);
      }
      markDirty();
    });
    row.append(control);
    rows.append(row);
  });

  section.append(rows);
  return section;
}

function recipeValueKey(recipe, preferred, fallback) {
  if (Object.hasOwn(recipe, preferred)) return preferred;
  if (Object.hasOwn(recipe, fallback)) return fallback;
  return preferred;
}

function renderFields(step, parent) {
  const fields = Array.isArray(step.fields) ? step.fields : [];
  if (!Array.isArray(step.fields)) step.fields = fields;
  const block = makeNode('div', 'fields-editor');
  block.append(makeNode('span', 'editor-subtitle', 'Поля под шагом'));

  fields.forEach((field, index) => {
    if (!Array.isArray(field)) fields[index] = ['', ''];
    const row = makeNode('div', 'field-row');
    const head = makeNode('div', 'field-row__head');
    head.append(makeNode('strong', '', `Поле ${index + 1}`));
    head.append(removeChildButton('Удалить поле', () => {
      fields.splice(index, 1);
      markDirty();
      renderEditor();
    }, true));
    row.append(head);

    const inputs = makeNode('div', 'field-row__inputs');
    const labelInput = document.createElement('input');
    labelInput.className = 'editor-input';
    labelInput.type = 'text';
    labelInput.placeholder = 'Название поля';
    labelInput.value = asText(fields[index][0]);
    labelInput.addEventListener('input', () => {
      fields[index][0] = labelInput.value;
      markDirty();
    });
    const valueBox = valueEditor('Значение', () => fields[index][1], (value) => { fields[index][1] = value; }, { multiline: true, placeholder: 'Значение поля' });
    valueBox.querySelector('label')?.remove();
    inputs.append(labelInput, valueBox);
    row.append(inputs);
    block.append(row);
  });

  const add = makeNode('button', 'add-button', '+ Добавить поле');
  add.type = 'button';
  add.addEventListener('click', () => {
    fields.push(['Новое поле', 'Значение']);
    markDirty();
    renderEditor();
  });
  block.append(add);
  parent.append(block);
}

function renderStep(step, index, recipe, parent) {
  const card = makeNode('section', 'step-editor');
  const head = makeNode('div', 'step-editor__head');
  head.append(makeNode('h3', '', `Шаг ${index + 1}`));
  head.append(removeChildButton('Удалить шаг', () => {
    recipe.steps.splice(index, 1);
    markDirty();
    renderEditor();
  }, true));
  card.append(head);

  const titleKey = recipeValueKey(step, 't', 'title');
  card.append(valueEditor('Заголовок шага', () => step[titleKey], (value) => { step[titleKey] = value; }, { multiline: false, placeholder: 'Название шага' }));

  const descriptionKey = Object.hasOwn(step, 'p') ? 'p' : Object.hasOwn(step, 'description') ? 'description' : null;
  if (descriptionKey) {
    const descriptionWrap = document.createElement('div');
    descriptionWrap.append(valueEditor('Описание', () => step[descriptionKey], (value) => { step[descriptionKey] = value; }, { placeholder: 'Текст под шагом' }));
    descriptionWrap.append(removeChildButton('Удалить описание', () => {
      delete step[descriptionKey];
      markDirty();
      renderEditor();
    }, true));
    card.append(descriptionWrap);
  }

  if (Object.hasOwn(step, 'code')) {
    const codeWrap = document.createElement('div');
    codeWrap.append(valueEditor('Код', () => step.code, (value) => { step.code = value; }, { code: true, placeholder: 'Команда или пример кода' }));
    codeWrap.append(removeChildButton('Удалить код', () => {
      delete step.code;
      markDirty();
      renderEditor();
    }, true));
    card.append(codeWrap);
  }

  renderFields(step, card);

  const tools = makeNode('div', 'step-tools');
  if (!descriptionKey) {
    tools.append(removeChildButton('+ Добавить описание', () => {
      step.p = { ru: '' };
      markDirty();
      renderEditor();
    }));
  }
  if (!Object.hasOwn(step, 'code')) {
    tools.append(removeChildButton('+ Добавить код', () => {
      step.code = '';
      markDirty();
      renderEditor();
    }));
  }
  if (tools.childElementCount) card.append(tools);
  parent.append(card);
}

function renderNotes(recipe, parent) {
  const block = makeNode('section', 'editor-section');
  const head = makeNode('div', 'editor-section__head');
  head.append(makeNode('h2', '', 'Сноски после инструкции'));
  block.append(head);

  if (!Array.isArray(recipe.after)) recipe.after = [];
  const notes = makeNode('div', 'notes-editor');
  recipe.after.forEach((note, index) => {
    const row = makeNode('div', 'note-row');
    const rowHead = makeNode('div', 'note-row__head');
    rowHead.append(makeNode('strong', '', `Сноска ${index + 1}`));
    rowHead.append(removeChildButton('Удалить сноску', () => {
      recipe.after.splice(index, 1);
      markDirty();
      renderEditor();
    }, true));
    row.append(rowHead);
    row.append(valueEditor('Текст', () => recipe.after[index], (value) => { recipe.after[index] = value; }, { placeholder: 'Текст сноски' }));
    notes.append(row);
  });
  block.append(notes);

  const add = makeNode('button', 'add-button', '+ Добавить сноску');
  add.type = 'button';
  add.addEventListener('click', () => {
    recipe.after.push({ ru: 'Новая сноска' });
    markDirty();
    renderEditor();
  });
  block.append(add);
  parent.append(block);
}

function renderEditor() {
  renderRecipeSelect();
  const parent = clear(elements.recipeEditor);
  const app = activeApp();
  const recipe = activeRecipe();
  elements.editorTitle.textContent = appName(app);
  elements.deleteRecipe.disabled = !recipe;

  if (!app) {
    parent.append(makeNode('p', 'empty-editor', 'В каталоге нет программ для редактирования.'));
    return;
  }

  if (!recipe) {
    const empty = makeNode('div', 'empty-editor');
    empty.append(makeNode('p', '', 'Для этой программы инструкции пока нет. Создайте пустую и заполните шаги.'));
    const create = makeNode('button', 'button button-primary', 'Создать инструкцию');
    create.type = 'button';
    create.addEventListener('click', createRecipe);
    empty.append(create);
    parent.append(empty);
    return;
  }

  if (!Array.isArray(recipe.steps)) recipe.steps = [];
  const intro = makeNode('section', 'editor-section');
  const introHead = makeNode('div', 'editor-section__head');
  introHead.append(makeNode('h2', '', 'Вступление'));
  intro.append(introHead);
  intro.append(valueEditor('Описание программы', () => recipe.intro, (value) => { recipe.intro = value; }, { placeholder: 'Короткое описание инструкции' }));
  parent.append(intro);

  const stepsSection = makeNode('section', 'editor-section');
  const stepsHead = makeNode('div', 'editor-section__head');
  stepsHead.append(makeNode('h2', '', 'Шаги инструкции'));
  stepsSection.append(stepsHead);
  const steps = makeNode('div', 'steps-editor');
  recipe.steps.forEach((step, index) => renderStep(step, index, recipe, steps));
  stepsSection.append(steps);
  const addStep = makeNode('button', 'add-button', '+ Добавить шаг');
  addStep.type = 'button';
  addStep.addEventListener('click', () => {
    recipe.steps.push({ t: { ru: 'Новый шаг' }, p: { ru: '' }, fields: [] });
    markDirty();
    renderEditor();
  });
  stepsSection.append(addStep);
  parent.append(stepsSection);

  renderNotes(recipe, parent);
}

function createRecipe() {
  if (!state.activeAppId) return;
  if (activeRecipe()) return;
  state.catalog.recipes[state.activeAppId] = {
    intro: { ru: '' },
    steps: [],
    after: []
  };
  markDirty();
  renderEditor();
}

function deleteRecipe() {
  const recipe = activeRecipe();
  const app = activeApp();
  if (!recipe || !app) return;
  if (!window.confirm(`Удалить инструкцию «${appName(app)}»? Это действие можно отменить только до нажатия «Сохранить и опубликовать».`)) return;
  delete state.catalog.recipes[state.activeAppId];
  markDirty();
  renderEditor();
}

async function saveCatalog() {
  if (!state.session?.access_token) return;
  elements.saveCatalog.disabled = true;
  setSaveStatus('Сохраняем в Supabase…');

  const content = clone(state.catalog);
  content.meta = {
    ...content.meta,
    gatewayUrl: gatewayUrl(),
    source: 'supabase',
    updatedAt: new Date().toISOString()
  };

  try {
    const result = await requestJson('/rest/v1/site_content?on_conflict=id', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
      body: JSON.stringify([{ id: 'main', content }])
    }, state.session.access_token);
    const saved = Array.isArray(result) ? result[0] : null;
    state.catalog = ensureCatalog(saved?.content || content);
    state.catalog.meta.updatedAt = saved?.updated_at || state.catalog.meta.updatedAt;
    state.dirty = false;
    setSaveStatus('Опубликовано. Посетители увидят изменения после обновления страницы.', 'success');
    renderEditor();
  } catch (error) {
    setSaveStatus(error.message || 'Не удалось сохранить изменения.', 'error');
  } finally {
    elements.saveCatalog.disabled = false;
  }
}

async function enterWorkspace() {
  if (!state.session) return;
  elements.loginPanel.hidden = true;
  elements.workspace.hidden = false;
  elements.accountEmail.textContent = state.session.user?.email || 'администратор';
  setSaveStatus('Загружаем опубликованные данные…');

  try {
    state.catalog = await loadPublishedCatalog(state.session.access_token);
    state.activeAppId = state.catalog.apps[0]?.id || '';
    state.dirty = false;
    renderEditor();
    setSaveStatus('Можно редактировать и публиковать.');
  } catch (error) {
    state.catalog = bundledCatalog();
    state.activeAppId = state.catalog.apps[0]?.id || '';
    renderEditor();
    setSaveStatus(`${error.message} Выполните SQL-настройку базы и обновите страницу.`, 'error');
  }
}

async function handleLogin(event) {
  event.preventDefault();
  const email = elements.loginEmail.value.trim();
  const password = elements.loginPassword.value;
  if (!email || !password) return;
  elements.loginSubmit.disabled = true;
  setLoginMessage('Проверяем доступ…');

  try {
    state.session = await signIn(email, password);
    saveSession(state.session);
    elements.loginPassword.value = '';
    setLoginMessage('');
    await enterWorkspace();
  } catch (error) {
    setLoginMessage(error.message || 'Не удалось войти.', true);
  } finally {
    elements.loginSubmit.disabled = false;
  }
}

function signOut() {
  clearSession();
  state.catalog = null;
  state.activeAppId = '';
  state.dirty = false;
  elements.workspace.hidden = true;
  elements.loginPanel.hidden = false;
  elements.loginForm.reset();
  setLoginMessage('Вы вышли из админки.');
}

function bindEvents() {
  elements.loginForm.addEventListener('submit', handleLogin);
  elements.recipeSelect.addEventListener('change', () => {
    if (state.dirty && !window.confirm('Есть несохранённые изменения. Перейти к другой инструкции?')) {
      elements.recipeSelect.value = state.activeAppId;
      return;
    }
    state.activeAppId = elements.recipeSelect.value;
    renderEditor();
  });
  elements.createRecipe.addEventListener('click', createRecipe);
  elements.deleteRecipe.addEventListener('click', deleteRecipe);
  elements.saveCatalog.addEventListener('click', saveCatalog);
  elements.signout.addEventListener('click', signOut);
}

async function initialise() {
  configurePage();
  bindEvents();
  if (!supabaseConfig()) {
    setLoginMessage('Не найдены параметры Supabase в site-config.js.', true);
    elements.loginSubmit.disabled = true;
    return;
  }

  const saved = getSavedSession();
  if (saved) {
    state.session = saved;
    await enterWorkspace();
  }
}

initialise();
