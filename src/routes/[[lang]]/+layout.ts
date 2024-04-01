export async function load({ params }) {
  const { lang } = params
  const defaultLang = 'en'
  const supportedLangs = ['sk', 'en', 'de']

  if (lang === undefined || !supportedLangs.includes(lang)) {
    return { lang: defaultLang }
  }

  return { lang }
}
