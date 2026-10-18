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

  apps.forEach((app) => {
    const button = node('button', 'app-tab', appTitle(app));
    button.type = 'button';
    button.role = 'tab';
    button.setAttribute('aria-selected', String(app.id === state.appId));
    button.addEventListener('click', () => {
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

  oses.forEach((os) => {
    const button = node('button', 'segment-tab', text(os.ru ?? os.name ?? os.en, os.id));
    button.type = 'button';
    button.role = 'tab';
    button.setAttribute('aria-selected', String(os.id === state.osId));
    button.addEventListener('click', () => {
      state.osId = os.id;
      renderOsTabs();
      renderGuide();
    });
    parent.append(button);
  });
}

function makeCodeBlock(rawCode) {
  const codeValue = secureCode(rawCode);
  const wrap = node('div', 'code-wrap');
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
    }).filter(([label, value]) => label && value);
  }
  if (fields && typeof fields === 'object') {
    return Object.entries(fields)
      .map(([label, value]) => [text(label), itemForOs(value)])
      .filter(([label, value]) => label && value);
  }
  return [];
}

function makeFieldsBlock(fields) {
  const rows = normalizeFields(fields);
  if (!rows.length) return null;

  const list = node('dl', 'guide-fields');
  rows.forEach(([label, value]) => {
    const row = node('div', 'guide-field');
    const term = node('dt', '', label);
    const definition = document.createElement('dd');
    const code = document.createElement('code');
    code.textContent = secureCode(value);
    definition.append(code);
    row.append(term, definition);
    list.append(row);
  });
  return list;
}

function renderGuide() {
  const parent = clear(elements.guide);
  const recipe = state.catalog?.recipes?.[state.appId];
  const selectedApp = (state.catalog?.apps || []).find((app) => app.id === state.appId);

  if (!recipe) {
    const header = node('div', 'guide-header');
    const copyBlock = document.createElement('div');
    copyBlock.append(node('h3', '', appTitle(selectedApp)));
    copyBlock.append(node('p', '', `${uiText('noRecipe')} ${uiText('noRecipeTail')} ${gatewayUrl()} ${uiText('noRecipeEnd')}`));
    header.append(copyBlock, node('span', 'guide-meta', uiText('noRecipeMeta', 'проверьте настройки клиента')));
    parent.append(header);
    return;
  }

  const header = node('div', 'guide-header');
  const headerCopy = document.createElement('div');
  headerCopy.append(node('h3', '', appTitle(selectedApp)));
  headerCopy.append(node('p', '', text(recipe.intro)));
  header.append(headerCopy, node('span', 'guide-meta', `${uiText('forSystem', 'для')} ${text((state.catalog.oses || []).find((os) => os.id === state.osId)?.ru, state.osId)}`));
  parent.append(header);

  const steps = node('div', 'steps');
  const sourceSteps = Array.isArray(recipe.steps) ? recipe.steps : [];
  sourceSteps.forEach((step, index) => {
    const stepElement = node('section', 'step');
    stepElement.append(node('span', 'step-index', String(index + 1).padStart(2, '0')));
    const body = document.createElement('div');
    body.append(node('h4', '', text(step.t ?? step.title, `${uiText('stepPrefix', 'Шаг')} ${index + 1}`)));
    const description = itemForOs(step.p ?? step.description);
    if (description) body.append(node('p', '', description));
    const fields = makeFieldsBlock(step.fields);
    if (fields) body.append(fields);
    const code = itemForOs(step.code);
    if (code) body.append(makeCodeBlock(code));
    stepElement.append(body);
    steps.append(stepElement);
  });
  parent.append(steps);

  const after = Array.isArray(recipe.after) ? recipe.after : [];
  if (after.length) {
    const afterBox = node('aside', 'guide-after');
    after.forEach((note) => afterBox.append(node('p', '', itemForOs(note))));
    parent.append(afterBox);
  }
}

function allModelGroups() {
  const models = state.catalog?.models || {};
  const providerGroups = (Array.isArray(models.providers) ? models.providers : []).map((provider) => ({
    name: text(provider.name ?? provider.ru, 'Провайдер'),
    type: 'text',
    models: Array.isArray(provider.models) ? provider.models : []
  }));
  const singleGroups = [
    ['Изображения', 'image', models.images],
    ['Видео', 'video', models.video]
  ].filter(([, , modelList]) => Array.isArray(modelList) && modelList.length)
    .map(([name, type, modelList]) => ({ name, type, models: modelList }));
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
    const models = group.models.filter((model) => matchesModel(model, group));
    if (!models.length) return;
    total += models.length;
    const card = node('article', 'provider-card');
    const header = node('header', 'provider-card__header');
    header.append(node('h3', '', group.name), node('span', '', `${models.length} ${models.length === 1 ? uiText('modelOne', 'модель') : uiText('modelMany', 'моделей')}`));
    const list = node('ul', 'model-rows');
    models.forEach((model) => {
      const row = node('li', 'model-row');
      const info = document.createElement('div');
      info.append(node('span', 'model-name', text(model.name ?? model.ru, model.id)));
      const idButton = node('button', 'model-id', text(model.id));
      idButton.type = 'button';
      idButton.title = uiText('copyModelId', 'Скопировать Model ID');
      idButton.addEventListener('click', () => copy(text(model.id), idButton));
      info.append(idButton);
      row.append(info, node('span', 'model-kind', text(model.kind, modelFilterLabel(group.type))));
      list.append(row);
    });
    card.append(header, list);
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
  }
  if (!elements.savingsList) return;

  const parent = clear(elements.savingsList);
  tips.forEach((tip, index) => {
    const card = node('article', 'savings-card');
    card.append(node('span', 'savings-index', String(index + 1).padStart(2, '0')));
    card.append(node('h3', '', text(tip.title ?? tip.t, `${uiText('tipPrefix', 'Совет')} ${index + 1}`)));
    card.append(node('p', '', text(tip.body ?? tip.p ?? tip.description)));
    parent.append(card);
  });
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
  normalizedErrors().forEach((error) => {
    const item = node('article', 'error-item');
    item.classList.add('is-open');
    const summary = node('button', 'error-summary');
    summary.type = 'button';
    summary.setAttribute('aria-expanded', 'true');
    const caption = document.createElement('div');
    caption.append(node('strong', '', text(error.title ?? error.t ?? error.id, uiText('fallbackErrorTitle', 'Ошибка подключения'))));
    caption.append(node('span', '', text(error.symptoms ?? error.description ?? error.p, uiText('fallbackErrorDescription', 'Откройте карточку для решения.'))));
    summary.append(caption, node('span', 'error-chevron', '+'));
    const details = node('div', 'error-details');
    const detailsInner = document.createElement('div');
    const inside = node('div', 'error-details__inside');
    const reason = text(error.reason ?? error.cause);
    if (reason) {
      inside.append(node('p', 'error-reason', reason));
    }
    const fixes = listFromError(error);
    fixes.forEach((fix) => inside.append(node('p', 'error-fix', text(fix))));
    detailsInner.append(inside);
    details.append(detailsInner);
    summary.addEventListener('click', () => {
      const open = item.classList.toggle('is-open');
      summary.setAttribute('aria-expanded', String(open));
    });
    item.append(summary, details);
    parent.append(item);
  });
}

function setMetadata() {
  const meta = state.catalog?.meta || {};
  const gateway = meta.gatewayUrl || 'https://api.aikeysforyou.com';
  elements.gateway.textContent = gateway;
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

// The admin route uses the same public renderer. It only receives a small,
// deliberate API for previewing and saving JSON content; it never exposes a
// way to edit the site's JavaScript or CSS from the browser.
window.__AIKEYS_DOCS_APP__ = {
  getCatalog() {
    return state.catalog ? JSON.parse(JSON.stringify(state.catalog)) : null;
  },
  setCatalog(catalog) {
    if (!catalog || typeof catalog !== 'object') return false;
    state.catalog = withUi(catalog);
    renderAll();
    return true;
  }
};

applySiteConfig();
initialise();
