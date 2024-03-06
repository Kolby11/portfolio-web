// src/stores/translations.js
import { type BaseTranslation } from '$lib/translations/loadTranslations'
import { translationSK } from '$lib/translations/sk'
import { writable } from 'svelte/store'

export const currentLanguage = writable('en')
export const translation = writable<BaseTranslation>(translationSK)
