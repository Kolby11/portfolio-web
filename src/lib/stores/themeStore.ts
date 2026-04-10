import { browser } from '$app/environment'
import { get, writable, type Writable } from 'svelte/store'

export enum THEME {
  light = 'light',
  dark = 'dark',
  purple = 'purple',
}

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> }
}

function generateThemeClass(value: THEME) {
  return 'theme-' + value
}

function isValidTheme(value: string): value is THEME {
  return Object.values(THEME).includes(value as THEME)
}

const getInitialTheme = (): THEME => {
  if (browser) {
    const saved = localStorage.getItem('theme')
    if (saved && isValidTheme(saved)) return saved
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return THEME.dark
  }
  return THEME.light
}

export const theme: Writable<THEME> = writable(getInitialTheme())

// Apply the actual theme class to the document element
function applyThemeClass(value: THEME) {
  if (browser) {
    document.documentElement.classList.add(generateThemeClass(value))

    const themesToRemove = Object.values(THEME).filter(theme => theme !== value)
    themesToRemove.forEach(theme => {
      document.documentElement.classList.remove(generateThemeClass(theme))
    })
  }
}

function updateThemeClass(value: THEME, withTransition = false) {
  if (!browser) {
    return
  }

  const documentWithViewTransition = document as DocumentWithViewTransition

  if (!withTransition || typeof documentWithViewTransition.startViewTransition !== 'function') {
    applyThemeClass(value)
    return
  }

  documentWithViewTransition.startViewTransition(() => {
    applyThemeClass(value)
  })
}

export function initializeTheme() {
  if ('theme' in localStorage && isValidTheme(localStorage.theme)) {
    applyThemeClass(localStorage.getItem('theme') as THEME)
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyThemeClass(THEME.dark)
  } else {
    // Fallback to dark theme if no preference is found
    applyThemeClass(THEME.dark)
  }
}

// Initialize theme on store creation
if (browser) {
  updateThemeClass(get(theme))
}

// Reactively update and store the theme selection
let hasMountedTheme = false
theme.subscribe(value => {
  if (browser) {
    localStorage.setItem('theme', value)
    updateThemeClass(value, hasMountedTheme)
    hasMountedTheme = true
  }
})
