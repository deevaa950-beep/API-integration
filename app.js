const state = {
  catalog: null,
  appId: 'claude-code',
  osId: 'win',
  modelQuery: '',
  modelFilter: 'all',
  key: ''
};

const elements = {
  appTabs: document.querySelector('#app-tabs'),
  osTabs: document.querySelector('#os-tabs'),
  guide: document.querySelector('#guide-card'),
  key: document.querySelector('#api-key'),
  toggleKey: document.querySelector('#toggle-key'),
  gateway: document.querySelector('#gateway-url'),
  catalogStatus: document.querySelector('#catalog-status'),
  modelSearch: document.querySelector('#model-search'),
  modelFilter: document.querySelector('#models-filter'),
  modelsGrid: document.querySelector('#models-grid'),
  modelsEmpty: document.querySelector('#models-empty'),
  savingsIntro: document.querySelector('#savings-intro'),
  savingsList: document.querySelector('#savings-list'),
  errorList: document.querySelector('#error-list'),
  footerUpdated: document.querySelector('#footer-updated')
};

const modelFilterLabels = {
  all: 'Все',
  text: 'Текст и код',
  image: 'Изображения',
  video: 'Видео'
};

// Every fixed label visible on the public page lives here too. The admin
// source editor persists this object alongside guides, models and errors.
const defaultUi = Object.freeze({
  brandName: 'Aikeys',
  brandSuffix: 'Docs',
  navSetup: 'Подключение',
  navModels: 'Модели',
  navSavings: 'Советы',
  navErrors: 'Ошибки',
  headerGuide: 'Открыть инструкцию',
  heroEyebrow: 'Справочник по подключению',
  heroTitle: 'Подключайте AI-инструменты',
  heroAccent: 'уверенно.',
  heroLead: 'Пошаговые настройки для рабочих приложений, актуальные ID моделей и понятные решения ошибок — в одном месте.',
  heroPrimary: 'Выбрать программу',
  heroSecondary: 'Найти решение',
  gatewayHeading: 'Ваш API-шлюз',
  gatewayCopy: 'Скопировать адрес',
  gatewayHint: 'Ключ вводится только в вашем приложении — этот сайт его не сохраняет.',
  trustOne: 'Настройки для Windows, macOS и Linux',
  trustTwo: 'Каталог ID моделей и версий',
  trustThree: 'База частых ошибок без лишнего шума',
  setupEyebrow: '01 · Подключение',
  setupTitle: 'Выберите, что настраиваете',
  programLabel: 'Программа',
  systemLabel: 'Система',
  keyTitle: 'Хотите увидеть готовый пример?',
  keyHint: 'Вставьте ключ только для локального предпросмотра. Он не отправляется на сервер и исчезнет после обновления страницы.',
  keyPlaceholder: 'Вставить API-ключ',
  modelsEyebrow: '02 · Каталог',
  modelsTitle: 'Модели и версии',
  modelsSearch: 'Найти по имени или ID',
  modelsIntroBefore: 'Используйте точный',
  modelsIntroAfter: 'в настройках клиента. Каталог не показывает цены или баланс — только совместимые модели и их назначение.',
  savingsIntroFallback: 'Несколько простых настроек помогают не расходовать контекст впустую.',
  filterAll: 'Все',
  filterText: 'Текст и код',
  filterImage: 'Изображения',
  filterVideo: 'Видео',
  savingsEyebrow: '03 · Советы',
  savingsTitle: 'Как тратить меньше',
  errorsEyebrow: '04 · Диагностика',
  errorsTitle: 'Если что-то пошло не так',
  errorsHint: 'Откройте карточку с похожей ошибкой и идите по чек-листу.',
  helperTitle: 'С чего начать',
  helperText: 'В большинстве случаев проблема решается проверкой трёх вещей: ключа, адреса шлюза и точного ID модели.',
  helperLink: 'Вернуться к настройке',
  safetyTitle: 'Ключ — только для вашего клиента',
  safetyBeforeCode: 'Не отправляйте API-ключ в чат, на скриншоты и в репозиторий. Добавляйте файлы конфигурации с ключом в',
  safetyAfterCode: '.',
  footerLead: 'Справочник по подключению ·',
  footerAdmin: 'Админка',
  footerBack: 'Вернуться к сайту',
  footerTop: 'Наверх ↑',
  copy: 'Копировать',
  copied: 'Скопировано',
  noRecipeMeta: 'проверьте настройки клиента',
  forSystem: 'для',
  stepPrefix: 'Шаг',
  modelOne: 'модель',
  modelMany: 'моделей',
  copyModelId: 'Скопировать Model ID',
  tipPrefix: 'Совет',
  fallbackErrorTitle: 'Ошибка подключения',
  fallbackErrorDescription: 'Откройте карточку для решения.',
  localData: 'локальные данные',
  catalogUpdated: 'Справочник обновлён',
  upstreamUpdated: 'Каталог обновлён',
  offlineAvailable: 'Справочник доступен офлайн',
  catalogUpdatedFooter: 'каталог обновлён',
  catalogFallbackFooter: 'резервный каталог',
  catalogLoadFailed: 'Не удалось загрузить каталог',
  catalogLoadHint: 'Проверьте, что сервер запущен, и обновите страницу.',
  noRecipe: 'Инструкция для этого клиента появится в следующем обновлении каталога.',
  noRecipeTail: 'Для подключения используйте адрес',
  noRecipeEnd: 'и точный Model ID из каталога ниже.',
  emptyModels: 'По этому запросу моделей не нашлось. Попробуйте другое имя или ID.',
  fallbackErrorOne: 'Сверьте ключ, адрес шлюза и точный ID модели.',
  fallbackErrorTwo: 'Перезапустите приложение после изменения настроек.'
});

function withUi(catalog) {
  if (!catalog || typeof catalog !== 'object') return catalog;
  return {
    ...catalog,
    ui: {
      ...defaultUi,
      ...(catalog.ui && typeof catalog.ui === 'object' ? catalog.ui : {})
    }
  };
}

function uiText(key, fallback = '') {
  const value = state.catalog?.ui?.[key] ?? defaultUi[key] ?? fallback;
  return typeof value === 'string' || typeof value === 'number' ? String(value) : fallback;
}

function applyUiText() {
  document.querySelectorAll('[data-ui]').forEach((element) => {
    const value = uiText(element.dataset.ui, element.textContent || '');
    element.textContent = value;
    makeEditable(element, `ui.${element.dataset.ui}`);
  });
  document.querySelectorAll('[data-ui-placeholder]').forEach((element) => {
    element.setAttribute('placeholder', uiText(element.dataset.uiPlaceholder, element.getAttribute('placeholder') || ''));
  });
}

function modelFilterLabel(id) {
  const key = { all: 'filterAll', text: 'filterText', image: 'filterImage', video: 'filterVideo' }[id];
  return uiText(key, modelFilterLabels[id] || id);
}

function text(value, fallback = '') {
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (value && typeof value === 'object') return String(value.ru ?? value.name ?? value.en ?? Object.values(value)[0] ?? fallback);
  return fallback;
}

function itemForOs(value) {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return '';
  return text(value[state.osId] ?? value.ru ?? value.en ?? Object.values(value)[0]);
}

function node(tag, className, content) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content !== undefined) element.textContent = content;
  return element;
}

function inlineEditorActive() {
  return window.__AIKEYS_DOCS_INLINE_EDITOR__?.active === true;
}

function pathKey(value, preferred = []) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return '';
  const keys = Object.keys(value);
  return preferred.find((key) => Object.prototype.hasOwnProperty.call(value, key)) || keys[0] || '';
}

function localizedPath(basePath, value) {
  const key = pathKey(value, [state.osId, 'ru', 'en']);
  return key ? `${basePath}.${key}` : basePath;
}

function propertyPath(basePath, source, properties, localized = false) {
  const property = properties.find((key) => Object.prototype.hasOwnProperty.call(source || {}, key)) || properties[0];
  const path = `${basePath}.${property}`;
  return localized ? localizedPath(path, source?.[property]) : path;
}

function makeEditable(element, path) {
  if (!path) return element;
  if (!inlineEditorActive()) {
    element.removeAttribute('contenteditable');
    element.removeAttribute('data-edit-path');
    element.classList.remove('inline-editable');
    return element;
  }

  let target = element;
  if (element.matches('a, button')) {
    const textEditor = node('span', 'inline-editable', element.textContent);
    element.replaceChildren(textEditor);
    target = textEditor;
  }
  target.dataset.editPath = path;
  target.setAttribute('contenteditable', 'plaintext-only');
  target.setAttribute('spellcheck', 'true');
  target.classList.add('inline-editable');
  return target;
}

function editableNode(tag, className, content, path) {
  return makeEditable(node(tag, className, content), path);
}

function editorAction(label, action, path, title = label) {
  if (!inlineEditorActive()) return null;
  const button = node('button', 'inline-editor-action', label);
  button.type = 'button';
  button.dataset.inlineAction = action;
  if (path) button.dataset.inlinePath = path;
  button.title = title;
  return button;
}

function appendEditorAction(parent, label, action, path, title) {
  const actionButton = editorAction(label, action, path, title);
  if (actionButton) parent.append(actionButton);
}

function clear(element) {
  element.replaceChildren();
  return element;
}

function appTitle(app) {
  return text(app?.ru ?? app?.name ?? app?.title ?? app?.en, 'Программа');
}

function gatewayUrl() {
  return state.catalog?.meta?.gatewayUrl || 'https://api.aikeysforyou.com';
}

function secureCode(value) {
  const previewKey = state.key.trim() || 'ВАШ_API_КЛЮЧ';
  return String(value || '')
    .replaceAll('{{KEY}}', previewKey)
    .replaceAll('{{BASE_URL}}', gatewayUrl())
    .replaceAll('https://api.tokenwave.ru', gatewayUrl())
    .replaceAll('http://api.tokenwave.ru', gatewayUrl())
    .replaceAll('https://api.openrouter.ai', gatewayUrl());
}

async function copy(value, trigger) {
  const original = trigger?.textContent;
  try {
    await navigator.clipboard.writeText(value);
    if (trigger) trigger.textContent = uiText('copied', 'Скопировано');
  } catch {
    const input = document.createElement('textarea');
    input.value = value;
    input.setAttribute('readonly', '');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.append(input);
    input.select();
    document.execCommand('copy');
    input.remove();
    if (trigger) trigger.textContent = uiText('copied', 'Скопировано');
  }
  if (trigger) setTimeout(() => { trigger.textContent = original; }, 1300);
}

function renderAppTabs() {
  const apps = Array.isArray(state.catalog?.apps) ? state.catalog.apps : [];
  if (!apps.some((app) => app.id === state.appId)) state.appId = apps[0]?.id || '';
  const parent = clear(elements.appTabs);

  apps.forEach((app, index) => {
    const button = node('button', 'app-tab');
    button.type = 'button';
    button.role = 'tab';
    button.setAttribute('aria-selected', String(app.id === state.appId));
    button.append(editableNode('span', '', appTitle(app), propertyPath(`apps.${index}`, app, ['ru', 'name', 'title', 'en'])));
    button.addEventListener('click', (event) => {
      if (inlineEditorActive() && event.target.closest('[data-edit-path]')) return;
      state.appId = app.id;
      renderAppTabs();
      renderGuide();
    });
    parent.append(button);
  });
}

function renderOsTabs() {
  const oses = Array.isArray(state.catalog?.oses) ? state.catalog.oses : [];
  if (!oses.some((os) => os.id === state.osId)) state.osId = oses[0]?.id || 'win';
  const parent = clear(elements.osTabs);

  oses.forEach((os, index) => {
    const button = node('button', 'segment-tab');
    button.type = 'button';
    button.role = 'tab';
    button.setAttribute('aria-selected', String(os.id === state.osId));
    button.append(editableNode('span', '', text(os.ru ?? os.name ?? os.en, os.id), propertyPath(`oses.${index}`, os, ['ru', 'name', 'en'])));
    button.addEventListener('click', (event) => {
      if (inlineEditorActive() && event.target.closest('[data-edit-path]')) return;
      state.osId = os.id;
      renderOsTabs();
      renderGuide();
    });
    parent.append(button);
  });
}

function makeCodeBlock(rawCode, path = '') {
  const editing = inlineEditorActive() && path;
  const codeValue = editing ? String(rawCode || '') : secureCode(rawCode);
  const wrap = node('div', 'code-wrap');

  if (editing) {
    const editor = document.createElement('textarea');
    editor.className = 'inline-code-editor';
    editor.value = codeValue;
    editor.spellcheck = false;
    editor.wrap = 'off';
    editor.dataset.editPath = path;
    editor.setAttribute('aria-label', 'Редактировать код');
    wrap.append(editor);
    return wrap;
  }

  const pre = document.createElement('pre');
  const codeElement = document.createElement('code');
  codeElement.textContent = codeValue;
  pre.append(codeElement);

  const copyButton = node('button', 'copy-code', uiText('copy', 'Копировать'));
  copyButton.type = 'button';
  copyButton.addEventListener('click', () => copy(codeValue, copyButton));
  wrap.append(pre, copyButton);
  return wrap;
}

function normalizeFields(fields) {
  if (Array.isArray(fields)) {
    return fields.map((field) => {
      if (Array.isArray(field)) return [text(field[0]), itemForOs(field[1])];
      if (field && typeof field === 'object') {
        const [label, value] = Object.entries(field)[0] || [];
        return [text(label), itemForOs(value)];
      }
      return ['', ''];
    }).filter(([label, value]) => inlineEditorActive() ? label || value : label && value);
  }
  if (fields && typeof fields === 'object') {
    return Object.entries(fields)
      .map(([label, value]) => [text(label), itemForOs(value)])
      .filter(([label, value]) => inlineEditorActive() ? label || value : label && value);
  }
  return [];
}

function makeFieldsBlock(fields, path = '') {
  const rows = normalizeFields(fields);
  if (!rows.length) return null;

  const wrap = node('div', 'guide-fields-wrap');
  const list = node('dl', 'guide-fields');
  rows.forEach(([label, value], index) => {
    const row = node('div', 'guide-field');
    const rawField = Array.isArray(fields) ? fields[index] : null;
    const labelPath = Array.isArray(rawField) ? `${path}.${index}.0` : '';
    const valuePath = Array.isArray(rawField) ? localizedPath(`${path}.${index}.1`, rawField[1]) : '';
    const term = editableNode('dt', '', label, labelPath);
    const definition = document.createElement('dd');
    const code = editableNode('code', '', inlineEditorActive() ? value : secureCode(value), valuePath);
    definition.append(code);
    row.append(term, definition);
    if (Array.isArray(rawField)) appendEditorAction(row, '×', 'remove', `${path}.${index}`, 'Удалить поле');
    list.append(row);
  });
  wrap.append(list);
  if (Array.isArray(fields)) appendEditorAction(wrap, '+ Поле', 'add-field', path, 'Добавить поле');
  return wrap;
}

function renderGuide() {
  const parent = clear(elements.guide);
  const recipe = state.catalog?.recipes?.[state.appId];
  const apps = state.catalog?.apps || [];
  const appIndex = apps.findIndex((app) => app.id === state.appId);
  const selectedApp = apps[appIndex];
  const appPath = appIndex >= 0 ? propertyPath(`apps.${appIndex}`, selectedApp, ['ru', 'name', 'title', 'en']) : '';

  if (!recipe) {
    const header = node('div', 'guide-header');
    const copyBlock = document.createElement('div');
    copyBlock.append(editableNode('h3', '', appTitle(selectedApp), appPath));
    copyBlock.append(node('p', '', `${uiText('noRecipe')} ${uiText('noRecipeTail')} ${gatewayUrl()} ${uiText('noRecipeEnd')}`));
    header.append(copyBlock, node('span', 'guide-meta', uiText('noRecipeMeta', 'проверьте настройки клиента')));
    parent.append(header);
    return;
  }

  const recipePath = `recipes.${state.appId}`;
  const header = node('div', 'guide-header');
  const headerCopy = document.createElement('div');
  headerCopy.append(editableNode('h3', '', appTitle(selectedApp), appPath));
  headerCopy.append(editableNode('p', '', text(recipe.intro), localizedPath(`${recipePath}.intro`, recipe.intro)));
  header.append(headerCopy, node('span', 'guide-meta', `${uiText('forSystem', 'для')} ${text((state.catalog.oses || []).find((os) => os.id === state.osId)?.ru, state.osId)}`));
  parent.append(header);

  const steps = node('div', 'steps');
  const sourceSteps = Array.isArray(recipe.steps) ? recipe.steps : [];
  sourceSteps.forEach((step, index) => {
    const stepPath = `${recipePath}.steps.${index}`;
    const stepElement = node('section', 'step');
    stepElement.append(node('span', 'step-index', String(index + 1).padStart(2, '0')));
    const body = document.createElement('div');
    body.append(editableNode('h4', '', text(step.t ?? step.title, `${uiText('stepPrefix', 'Шаг')} ${index + 1}`), propertyPath(stepPath, step, ['t', 'title'], true)));
    const descriptionSource = step.p ?? step.description;
    const descriptionPath = propertyPath(stepPath, step, ['p', 'description'], true);
    const description = itemForOs(descriptionSource);
    if (description || inlineEditorActive()) body.append(editableNode('p', '', description || 'Опишите действие', descriptionPath));
    const fields = makeFieldsBlock(step.fields, `${stepPath}.fields`);
    if (fields) body.append(fields);
    else appendEditorAction(body, '+ Поле', 'add-field', `${stepPath}.fields`, 'Добавить поле');
    const codePath = localizedPath(`${stepPath}.code`, step.code);
    const code = itemForOs(step.code);
    if (code || inlineEditorActive()) body.append(makeCodeBlock(code, codePath));
    const tip = itemForOs(step.tip);
    if (tip || inlineEditorActive()) body.append(editableNode('p', 'inline-editable-note', tip || 'Подсказка или сноска', localizedPath(`${stepPath}.tip`, step.tip)));
    stepElement.append(body);
    appendEditorAction(stepElement, '×', 'remove', stepPath, 'Удалить шаг');
    steps.append(stepElement);
  });
  appendEditorAction(steps, '+ Шаг', 'add-step', `${recipePath}.steps`, 'Добавить шаг');
  parent.append(steps);

  const after = Array.isArray(recipe.after) ? recipe.after : [];
  if (after.length || inlineEditorActive()) {
    const afterBox = node('aside', 'guide-after');
    after.forEach((note, index) => {
      const noteRow = node('div', 'inline-editable-row');
      noteRow.append(editableNode('p', '', itemForOs(note), localizedPath(`${recipePath}.after.${index}`, note)));
      appendEditorAction(noteRow, '×', 'remove', `${recipePath}.after.${index}`, 'Удалить сноску');
      afterBox.append(noteRow);
    });
    appendEditorAction(afterBox, '+ Сноска', 'add-note', `${recipePath}.after`, 'Добавить сноску');
    parent.append(afterBox);
  }
}

function allModelGroups() {
  const models = state.catalog?.models || {};
  const providerGroups = (Array.isArray(models.providers) ? models.providers : []).map((provider, index) => ({
    name: text(provider.name ?? provider.ru, 'Провайдер'),
    namePath: propertyPath(`models.providers.${index}`, provider, ['name', 'ru']),
    modelsPath: `models.providers.${index}.models`,
    type: 'text',
    models: Array.isArray(provider.models) ? provider.models : []
  }));
  const singleGroups = [
    ['Изображения', 'image', models.images, 'models.images'],
    ['Видео', 'video', models.video, 'models.video']
  ].filter(([, , modelList]) => Array.isArray(modelList))
    .map(([name, type, modelList, modelsPath]) => ({ name, type, models: modelList, modelsPath }));
  return [...providerGroups, ...singleGroups];
}

function matchesModel(model, group) {
  if (state.modelFilter !== 'all' && group.type !== state.modelFilter) return false;
  const query = state.modelQuery.trim().toLocaleLowerCase('ru');
  if (!query) return true;
  return [model.id, model.name, model.ru, model.kind, group.name]
    .filter(Boolean)
    .some((value) => String(value).toLocaleLowerCase('ru').includes(query));
}

function renderModelFilter() {
  const parent = clear(elements.modelFilter);
  Object.keys(modelFilterLabels).forEach((id) => {
    const button = node('button', 'filter-tab', modelFilterLabel(id));
    button.type = 'button';
    button.setAttribute('aria-pressed', String(state.modelFilter === id));
    button.addEventListener('click', () => {
      state.modelFilter = id;
      renderModelFilter();
      renderModels();
    });
    parent.append(button);
  });
}

function renderModels() {
  const parent = clear(elements.modelsGrid);
  let total = 0;
  allModelGroups().forEach((group) => {
    const models = group.models
      .map((model, index) => ({ model, index }))
      .filter(({ model }) => matchesModel(model, group));
    if (!models.length && !inlineEditorActive()) return;
    total += models.length;
    const card = node('article', 'provider-card');
    const header = node('header', 'provider-card__header');
    header.append(editableNode('h3', '', group.name, group.namePath), node('span', '', `${models.length} ${models.length === 1 ? uiText('modelOne', 'модель') : uiText('modelMany', 'моделей')}`));
    const list = node('ul', 'model-rows');
    models.forEach(({ model, index }) => {
      const modelPath = `${group.modelsPath}.${index}`;
      const row = node('li', 'model-row');
      const info = document.createElement('div');
      info.append(editableNode('span', 'model-name', text(model.name ?? model.ru, model.id), propertyPath(modelPath, model, ['name', 'ru'])));
      if (inlineEditorActive()) {
        info.append(editableNode('code', 'model-id', text(model.id), `${modelPath}.id`));
      } else {
        const idButton = node('button', 'model-id', text(model.id));
        idButton.type = 'button';
        idButton.title = uiText('copyModelId', 'Скопировать Model ID');
        idButton.addEventListener('click', () => copy(text(model.id), idButton));
        info.append(idButton);
      }
      row.append(info, editableNode('span', 'model-kind', text(model.kind, modelFilterLabel(group.type)), `${modelPath}.kind`));
      appendEditorAction(row, '×', 'remove', modelPath, 'Удалить модель');
      list.append(row);
    });
    card.append(header, list);
    appendEditorAction(card, '+ Модель', 'add-model', group.modelsPath, 'Добавить модель');
    parent.append(card);
  });
  elements.modelsEmpty.hidden = total !== 0;
}

function renderSavings() {
  const savings = state.catalog?.savings || {};
  const tips = Array.isArray(savings.tips) ? savings.tips : [];
  if (elements.savingsIntro) {
    elements.savingsIntro.textContent = text(
      savings.intro,
      uiText('savingsIntroFallback', 'Несколько простых настроек помогают не расходовать контекст впустую.')
    );
    makeEditable(elements.savingsIntro, localizedPath('savings.intro', savings.intro));
  }
  if (!elements.savingsList) return;

  const parent = clear(elements.savingsList);
  tips.forEach((tip, index) => {
    const tipPath = `savings.tips.${index}`;
    const card = node('article', 'savings-card');
    card.append(node('span', 'savings-index', String(index + 1).padStart(2, '0')));
    card.append(editableNode('h3', '', text(tip.title ?? tip.t, `${uiText('tipPrefix', 'Совет')} ${index + 1}`), propertyPath(tipPath, tip, ['title', 't'], true)));
    card.append(editableNode('p', '', text(tip.body ?? tip.p ?? tip.description), propertyPath(tipPath, tip, ['body', 'p', 'description'], true)));
    appendEditorAction(card, '×', 'remove', tipPath, 'Удалить совет');
    parent.append(card);
  });
  appendEditorAction(parent, '+ Совет', 'add-tip', 'savings.tips', 'Добавить совет');
}

function listFromError(error) {
  if (Array.isArray(error.fix)) return error.fix;
  if (Array.isArray(error.steps)) return error.steps.map((step) => text(step));
  if (error.fix) return [text(error.fix)];
  return [uiText('fallbackErrorOne'), uiText('fallbackErrorTwo')];
}

function normalizedErrors() {
  const errors = state.catalog?.errors;
  if (Array.isArray(errors)) return errors;
  if (errors && typeof errors === 'object') return Object.entries(errors).map(([id, item]) => ({ id, ...item }));
  return [];
}

function renderErrors() {
  const parent = clear(elements.errorList);
  const sourceErrors = state.catalog?.errors;
  const errorsAreArray = Array.isArray(sourceErrors);
  normalizedErrors().forEach((error, index) => {
    const errorPath = errorsAreArray ? `errors.${index}` : '';
    const item = node('article', 'error-item');
    item.classList.add('is-open');
    const summary = node('button', 'error-summary');
    summary.type = 'button';
    summary.setAttribute('aria-expanded', 'true');
    const caption = document.createElement('div');
    caption.append(editableNode('strong', '', text(error.title ?? error.t ?? error.id, uiText('fallbackErrorTitle', 'Ошибка подключения')), errorPath ? propertyPath(errorPath, error, ['title', 't', 'id'], true) : ''));
    caption.append(editableNode('span', '', text(error.symptoms ?? error.description ?? error.p, uiText('fallbackErrorDescription', 'Откройте карточку для решения.')), errorPath ? propertyPath(errorPath, error, ['symptoms', 'description', 'p'], true) : ''));
    summary.append(caption, node('span', 'error-chevron', '+'));
    const details = node('div', 'error-details');
    const detailsInner = document.createElement('div');
    const inside = node('div', 'error-details__inside');
    const reason = text(error.reason ?? error.cause);
    if (reason || (inlineEditorActive() && errorPath)) {
      inside.append(editableNode('p', 'error-reason', reason, errorPath ? propertyPath(errorPath, error, ['reason', 'cause'], true) : ''));
    }
    const fixes = listFromError(error);
    fixes.forEach((fix, fixIndex) => {
      const fixPath = errorPath && Array.isArray(error.fix) ? localizedPath(`${errorPath}.fix.${fixIndex}`, error.fix[fixIndex]) : '';
      const fixRow = node('div', 'inline-editable-row');
      fixRow.append(editableNode('p', 'error-fix', text(fix), fixPath));
      if (fixPath) appendEditorAction(fixRow, '×', 'remove', `${errorPath}.fix.${fixIndex}`, 'Удалить пункт');
      inside.append(fixRow);
    });
    if (errorPath) appendEditorAction(inside, '+ Пункт', 'add-fix', `${errorPath}.fix`, 'Добавить пункт решения');
    detailsInner.append(inside);
    details.append(detailsInner);
    summary.addEventListener('click', (event) => {
      if (inlineEditorActive() && event.target.closest('[data-edit-path]')) return;
      const open = item.classList.toggle('is-open');
      summary.setAttribute('aria-expanded', String(open));
    });
    item.append(summary, details);
    if (errorPath) appendEditorAction(item, '×', 'remove', errorPath, 'Удалить ошибку');
    parent.append(item);
  });
  if (errorsAreArray || !sourceErrors) appendEditorAction(parent, '+ Ошибка', 'add-error', 'errors', 'Добавить ошибку');
}

function setMetadata() {
  const meta = state.catalog?.meta || {};
  const gateway = meta.gatewayUrl || 'https://api.aikeysforyou.com';
  elements.gateway.textContent = gateway;
  makeEditable(elements.gateway, 'meta.gatewayUrl');
  const updated = meta.updatedAt ? new Date(meta.updatedAt) : null;
  const timestamp = updated && !Number.isNaN(updated.valueOf())
    ? updated.toLocaleString('ru-RU', { dateStyle: 'medium', timeStyle: 'short' })
    : uiText('localData', 'локальные данные');
  const source = meta.source === 'supabase'
    ? uiText('catalogUpdated', 'Справочник обновлён')
    : meta.source === 'upstream'
      ? uiText('upstreamUpdated', 'Каталог обновлён')
      : uiText('offlineAvailable', 'Справочник доступен офлайн');
  elements.catalogStatus.textContent = `${source} · ${timestamp}`;
  elements.footerUpdated.textContent = (meta.source === 'upstream' || meta.source === 'supabase')
    ? `${uiText('catalogUpdatedFooter', 'каталог обновлён')} ${timestamp}`
    : uiText('catalogFallbackFooter', 'резервный каталог');
}

function renderAll() {
  applyUiText();
  setMetadata();
  renderAppTabs();
  renderOsTabs();
  renderGuide();
  renderModelFilter();
  renderModels();
  renderSavings();
  renderErrors();
  document.dispatchEvent(new Event('aikeys:rendered'));
}

function showFatalError() {
  elements.catalogStatus.textContent = uiText('catalogLoadFailed', 'Не удалось загрузить каталог');
  elements.guide.replaceChildren(node('p', '', uiText('catalogLoadHint', 'Проверьте, что сервер запущен, и обновите страницу.')));
}

document.querySelectorAll('[data-copy-target]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.querySelector(button.dataset.copyTarget);
    if (target) copy(target.textContent, button.querySelector('span'));
  });
});

elements.key.addEventListener('input', (event) => {
  state.key = event.target.value;
  renderGuide();
});

elements.toggleKey.addEventListener('click', () => {
  const showing = elements.key.type === 'text';
  elements.key.type = showing ? 'password' : 'text';
  elements.toggleKey.setAttribute('aria-label', showing ? 'Показать ключ' : 'Скрыть ключ');
  elements.toggleKey.textContent = showing ? '◉' : '◌';
});

elements.modelSearch.addEventListener('input', (event) => {
  state.modelQuery = event.target.value;
  renderModels();
});

function applySiteConfig() {
  const config = window.__AIKEYS_SITE_CONFIG__ || {};
  if (typeof config.title === 'string' && config.title.trim()) document.title = config.title.trim();
  if (typeof config.favicon === 'string' && config.favicon.trim()) {
    const favicon = document.querySelector('#site-favicon');
    const iconPath = config.favicon.trim();
    const isAdminRoute = location.pathname.replace(/\/+$/, '').endsWith('/admin');
    if (favicon) favicon.setAttribute('href', isAdminRoute && iconPath.startsWith('./') ? `../${iconPath.slice(2)}` : iconPath);
  }
}

function supabaseConfig() {
  const config = window.__AIKEYS_SITE_CONFIG__?.supabase;
  if (!config || typeof config.url !== 'string' || typeof config.publishableKey !== 'string') return null;
  const url = config.url.replace(/\/$/, '');
  const publishableKey = config.publishableKey.trim();
  return url && publishableKey ? { url, publishableKey } : null;
}

async function loadSupabaseCatalog() {
  const config = supabaseConfig();
  if (!config) return null;

  const endpoint = new URL('/rest/v1/site_content', config.url);
  endpoint.searchParams.set('select', 'content,updated_at');
  endpoint.searchParams.set('id', 'eq.main');

  const response = await fetch(endpoint, {
    headers: {
      apikey: config.publishableKey,
      Authorization: `Bearer ${config.publishableKey}`,
      Accept: 'application/json'
    }
  });

  if (!response.ok) throw new Error(`Supabase catalog request failed: ${response.status}`);
  const rows = await response.json();
  const row = Array.isArray(rows) ? rows[0] : null;
  if (!row?.content || typeof row.content !== 'object' || !Array.isArray(row.content.apps)) return null;

  return {
    ...row.content,
    meta: {
      ...(row.content.meta || {}),
      source: 'supabase',
      updatedAt: row.updated_at || row.content.meta?.updatedAt || new Date().toISOString(),
      gatewayUrl: row.content.meta?.gatewayUrl || 'https://api.aikeysforyou.com'
    }
  };
}

async function initialise() {
  const loading = document.querySelector('#loading-guide').content.cloneNode(true);
  elements.guide.append(loading);
  const useBundledCatalog = () => {
    if (!window.__AIKEYS_CATALOG__) return false;
    state.catalog = withUi({
      ...window.__AIKEYS_CATALOG__,
      meta: {
        source: 'local snapshot',
        updatedAt: window.__AIKEYS_CATALOG__.generatedAt || new Date().toISOString(),
        gatewayUrl: 'https://api.aikeysforyou.com'
      }
    });
    renderAll();
    return true;
  };

  // Supabase is the published source of truth. The bundled catalog remains a
  // safe offline fallback for GitHub Pages and a directly opened file.
  try {
    const publishedCatalog = await loadSupabaseCatalog();
    if (publishedCatalog) {
      state.catalog = withUi(publishedCatalog);
      renderAll();
      return;
    }
  } catch (error) {
    console.info('Published catalog is not available yet; using fallback.', error);
  }

  // GitHub Pages and a directly opened file have no Node.js API route.
  if (location.protocol === 'file:' || location.hostname.endsWith('github.io')) {
    useBundledCatalog();
    return;
  }

  try {
    const response = await fetch('./api/catalog', { headers: { accept: 'application/json' } });
    if (!response.ok) throw new Error('Catalog request failed');
    state.catalog = withUi(await response.json());
    renderAll();
  } catch (error) {
    // Opening index.html directly is an intentional no-install launch path.
    // The bundled catalog keeps every guide available without Node.js.
    if (useBundledCatalog()) return;
    console.error(error);
    showFatalError();
  }
}

function splitCatalogPath(path) {
  return String(path || '').split('.').filter(Boolean);
}

function readCatalogPath(path) {
  return splitCatalogPath(path).reduce((value, key) => value?.[key], state.catalog);
}

function writeCatalogPath(path, value) {
  const parts = splitCatalogPath(path);
  if (!parts.length || !state.catalog) return false;
  let target = state.catalog;
  parts.slice(0, -1).forEach((part, index) => {
    const nextPart = parts[index + 1];
    if (!target[part] || typeof target[part] !== 'object') target[part] = /^\d+$/.test(nextPart) ? [] : {};
    target = target[part];
  });
  target[parts.at(-1)] = value;
  return true;
}

function removeCatalogPath(path) {
  const parts = splitCatalogPath(path);
  if (!parts.length || !state.catalog) return false;
  const key = parts.at(-1);
  const parent = parts.slice(0, -1).reduce((value, part) => value?.[part], state.catalog);
  if (!parent || typeof parent !== 'object') return false;
  if (Array.isArray(parent) && /^\d+$/.test(key)) parent.splice(Number(key), 1);
  else delete parent[key];
  return true;
}

function appendCatalogPath(path, value) {
  let target = readCatalogPath(path);
  if (!Array.isArray(target)) {
    if (!writeCatalogPath(path, [])) return false;
    target = readCatalogPath(path);
  }
  target.push(value);
  return true;
}

// The admin route uses the same public renderer. It exposes content-only
// editing helpers; HTML, CSS and JavaScript never become editable in-browser.
window.__AIKEYS_DOCS_APP__ = {
  getCatalog() {
    return state.catalog ? JSON.parse(JSON.stringify(state.catalog)) : null;
  },
  setCatalog(catalog) {
    if (!catalog || typeof catalog !== 'object') return false;
    state.catalog = withUi(catalog);
    renderAll();
    return true;
  },
  setInlineEditing(active) {
    window.__AIKEYS_DOCS_INLINE_EDITOR__ = { active: Boolean(active) };
    renderAll();
  },
  updatePath(path, value) {
    return writeCatalogPath(path, value);
  },
  appendPath(path, value) {
    const changed = appendCatalogPath(path, value);
    if (changed) renderAll();
    return changed;
  },
  removePath(path) {
    const changed = removeCatalogPath(path);
    if (changed) renderAll();
    return changed;
  },
  refresh() {
    renderAll();
  }
};

applySiteConfig();
initialise();
