import { browser } from '$app/environment'
import { get, writable, type Writable } from 'svelte/store'

const getInitialTheme = (): string => {
  if (browser) {
    return localStorage.getItem('theme') || 'light'
  }
  return 'light'
}

export const theme: Writable<string> = writable(getInitialTheme())

// Apply the actual theme class to the document element
function applyThemeClass(value: string) {
  if (browser) {
    if (value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}

// Initialize theme on store creation
if (browser) {
  applyThemeClass(get(theme))
}

// Reactively update and store the theme selection
theme.subscribe(value => {
  if (browser) {
    localStorage.setItem('theme', value)
    applyThemeClass(value)
  }
})
