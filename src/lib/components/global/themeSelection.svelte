<script lang="ts">
  import { theme } from '$lib/stores/themeStore'
  import MaterialSymbolsDarkModeOutlineRounded from '~icons/material-symbols/dark-mode-outline-rounded'
  import MaterialSymbolsLightModeOutlineRounded from '~icons/material-symbols/light-mode-outline-rounded'
  import { t } from 'svelte-i18n'

  type ThemeSelectionProps = {
    class?: string
  }

  const { class: className = '' }: ThemeSelectionProps = $props()

  function toggleDarkMode() {
    theme.update(current => (current === 'light' ? 'dark' : 'light'))
  }
</script>

<button
  class="relative flex size-6 items-center justify-center"
  onclick={toggleDarkMode}
  aria-label={$t('controls.theme.toggle')}
>
  <MaterialSymbolsDarkModeOutlineRounded
    style="font-size:larger;"
    class={`${$theme === 'dark' ? 'opacity-100' : 'opacity-0'} absolute inset-0 transition duration-300`}
  />
  <MaterialSymbolsLightModeOutlineRounded
    style="font-size:larger;"
    class={`${$theme === 'dark' ? 'opacity-0' : 'opacity-100'} absolute inset-0 transition duration-300`}
  />
</button>
