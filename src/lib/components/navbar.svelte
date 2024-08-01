<script lang="ts">
  import { goto } from '$app/navigation'
  import { smoothScroll } from '$lib/actions/smoothScroll'
  import { theme } from '$lib/stores/themeStore'
  import { currentLanguage, setCurrentLang } from '$lib/stores/translation'
  import { translations } from '$lib/data/translations'
  import MaterialSymbolsLightCloseRounded from '~icons/material-symbols-light/close-rounded'
  import MaterialSymbolsLightMenuRounded from '~icons/material-symbols-light/menu-rounded'
  import MaterialSymbolsDarkModeOutlineRounded from '~icons/material-symbols/dark-mode-outline-rounded'
  import MaterialSymbolsLightModeOutlineRounded from '~icons/material-symbols/light-mode-outline-rounded'
  import { onMount } from 'svelte'

  let sections: string[] = translations.navbar ? Object.keys(translations.navbar) : []
  let languages: string[] = ['sk', 'en', 'de']

  let showMenu = false

  let sideBar: HTMLDivElement
  let sideBarWidth: number = 0

  const toggleMenu = () => {
    showMenu = !showMenu
  }

  const toggleDarkMode = () => {
    theme.update(current => (current === 'light' ? 'dark' : 'light'))
  }

  const setLanguage = async (language: string) => {
    setCurrentLang(language)
    goto(`/${language}`, { noScroll: true })
  }

  onMount(() => {
    if (!sideBar) return
    sideBarWidth = sideBar.getBoundingClientRect().width
  })
</script>

<!-- Mobile navbar -->

<button
  class={`fixed right-0 top-0 items-center justify-center p-8 transition duration-300 ${showMenu ? 'opacity-0' : 'opacity-100'}`}
  on:click={toggleMenu}
>
  <MaterialSymbolsLightMenuRounded style="font-size:x-large;" />
</button>

<div
  bind:this={sideBar}
  style="transform: translateX({showMenu ? 0 : sideBarWidth}px); transition: transform 0.3s ease-in-out;"
  class={`fixed right-0 z-50 flex h-screen w-fit flex-col items-end px-8 pt-8 text-lg text-light-primary backdrop-blur-2xl dark:bg-dark-background dark:text-dark-primary md:hidden `}
>
  <button class="flex h-fit w-fit items-center justify-center" on:click={toggleMenu}>
    <MaterialSymbolsLightCloseRounded style="font-size:x-large;" />
  </button>
  <div class="flex h-full flex-col items-center">
    {#if showMenu}
      <nav class="mt-4 flex h-fit flex-col items-end gap-y-2">
        {#each sections as section, i}
          <a
            use:smoothScroll
            href="#{section}"
            on:click={e => {
              showMenu = false
            }}>{translations.navbar[section][$currentLanguage]}</a
          >
        {/each}
      </nav>
      <div class="mb-4 mt-auto flex h-fit gap-x-4">
        {#each languages as language}
          <button class="h-fit text-sm" on:click={e => setLanguage(language)}>{language.toUpperCase()}</button>
        {/each}
      </div>
    {/if}
  </div>
</div>

<!-- Desktop navbar -->
<div
  class="fixed top-0 z-50 hidden h-20 w-full items-center justify-between px-8 py-6 backdrop-blur-2xl md:flex"
  use:smoothScroll
>
  <div class="flex gap-x-8">
    <button class="relative mr-4 flex items-center justify-center" on:click={toggleDarkMode}>
      <MaterialSymbolsDarkModeOutlineRounded
        style="font-size:larger;"
        class={`${$theme === 'dark' ? 'opacity-100' : 'opacity-0'} absolute left-0 transition duration-300`}
      />
      <MaterialSymbolsLightModeOutlineRounded
        style="font-size:larger;"
        class={`${$theme === 'dark' ? 'opacity-0' : 'opacity-100'} absolute left-0 transition duration-300`}
      />
    </button>
    <div class="flex w-fit items-center justify-between gap-x-4">
      {#each languages as language}
        <button class="h-fit" on:click={e => setLanguage(language)}>{language.toUpperCase()}</button>
      {/each}
    </div>
  </div>
  <nav class="ml-auto">
    <ul class="flex items-center justify-center">
      {#each sections as section, i}
        <li>
          <a
            href="#{section}"
            class="items-center justify-center px-3 text-xl {i === sections.length - 1
              ? ''
              : 'border-r border-light-secondary dark:border-dark-secondary'}"
            >{translations.navbar[section][$currentLanguage]}</a
          >
        </li>
      {/each}
    </ul>
  </nav>
</div>
