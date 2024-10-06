import { LanguageCode, type TextContent } from '$lib/data/textContent/textContent'
import { writable } from 'svelte/store'

export const currentLanguage = writable<LanguageCode>(LanguageCode.EN)
export const textContent = writable<TextContent>()

export async function setCurrentLang(language: LanguageCode) {
  currentLanguage.set(language)
  await loadTextContent(language)
  updateURLQueryParam(language)
}

async function loadTextContent(language: LanguageCode) {
  let content: TextContent

  switch (language) {
    case LanguageCode.SK:
      content = (await import('$lib/data/textContent/textContentSK')).TextContentSK
      break
    case LanguageCode.DE:
      content = (await import('$lib/data/textContent/textContentDE')).TextContentDE
      break
    default:
      content = (await import('$lib/data/textContent/textContentEN')).TextContentEN
      break
  }

  if (!content) throw new Error('Failed loading text content')

  textContent.set(content)
}

function updateURLQueryParam(language: LanguageCode) {
  if (typeof window === 'undefined') return

  const url = new URL(window.location.href)
  url.searchParams.set('lang', language)
  window.history.replaceState({}, '', url.toString())
}

// Initialize with default language or from URL param
async function initializeLanguage() {
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href)
    const langParam = url.searchParams.get('lang') as LanguageCode | null
    if (langParam && Object.values(LanguageCode).includes(langParam)) {
      await setCurrentLang(langParam)
    } else {
      await setCurrentLang(LanguageCode.EN)
    }
  } else {
    await setCurrentLang(LanguageCode.EN)
  }
}

initializeLanguage()
