import { loadTranslation } from '$lib/translations/loadTranslations'

export async function load({ params }) {
  const { lang } = params
  const defaultLang = 'en'
  const supportedLangs = ['sk', 'en', 'de']

  if (lang === undefined || !supportedLangs.includes(lang)) {
    const translation = await loadTranslation(defaultLang)
    return { translation }
  }

  const translation = await loadTranslation(lang)
  return { translation }
}
