import { browser } from '$app/environment'
import { derived, readable, writable } from 'svelte/store'
import { baseLocale, getLocale, isLocale, locales as availableLocales, setLocale } from '../../paraglide/runtime.js'
import { m as paraglideMessages } from '../../paraglide/messages.js'

type MessageFunction = (inputs?: Record<string, never>, options?: { locale?: string }) => string

const messages = paraglideMessages as Record<string, MessageFunction>
const localeStore = writable<string>(browser ? getLocale() : baseLocale)

function translate(key: string) {
  const message = messages[key]
  return message ? message() : key
}

function buildMessageValue(prefix: string): unknown {
  const directMessage = messages[prefix]
  if (directMessage) {
    return directMessage()
  }

  const nestedEntries = Object.keys(messages)
    .filter(key => key.startsWith(`${prefix}.`))
    .map(key => key.slice(prefix.length + 1))

  if (nestedEntries.length === 0) {
    return undefined
  }

  const segments = [...new Set(nestedEntries.map(entry => entry.split('.')[0]))]
  const isArray = segments.every(segment => /^\d+$/.test(segment))

  if (isArray) {
    return segments
      .sort((left, right) => Number(left) - Number(right))
      .map(segment => buildMessageValue(`${prefix}.${segment}`))
  }

  return Object.fromEntries(
    segments.map(segment => [segment, buildMessageValue(`${prefix}.${segment}`)])
  )
}

export const locale = {
  subscribe: localeStore.subscribe,
  set(language: string) {
    if (!isLocale(language)) {
      return
    }

    localeStore.set(language)
    void setLocale(language, { reload: false })
  },
}

export const locales = readable<string[]>([...availableLocales])

export const t = derived(localeStore, () => {
  return (key: string) => translate(key)
})

export const json = derived(localeStore, () => {
  return (key: string) => buildMessageValue(key)
})

export async function waitLocale() {
  return
}
