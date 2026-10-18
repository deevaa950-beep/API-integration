/*
 * Настройки внешнего вида для статической версии сайта.
 * Чтобы поставить свою иконку, загрузите файл рядом с этим скриптом
 * и замените значение favicon, например на "./my-logo.png".
 */
window.__AIKEYS_SITE_CONFIG__ = {
  title: 'Aikeys Docs — подключение AI-инструментов',
  favicon: './site-icon.svg',
  // Публичные параметры Supabase. Их можно хранить в статическом сайте:
  // доступ к данным всё равно ограничивают RLS-политики в базе.
  // Никогда не добавляйте сюда Database password, secret key или service_role key.
  supabase: {
    url: 'https://aoozyngciwpybhaggqwj.supabase.co',
    publishableKey: 'sb_publishable_JVZ-cneHfl5jAMOa8k0FMQ_PWLoeZ1O'
  }
};
