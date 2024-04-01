// src/stores/translations.js
import type { lang } from '$lib/data/translations'
import { writable } from 'svelte/store'

export const currentLanguage = writable<lang>('en')
export const setCurrentLang = (language: string) => {
  if (language == 'sk') {
    currentLanguage.set('sk')
  } else if (language == 'de') {
    currentLanguage.set('de')
  } else {
    currentLanguage.set('en')
  }
}
