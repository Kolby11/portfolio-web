<script lang="ts">
  import { goto } from '$app/navigation'
  import { smoothScroll } from '$lib/actions/smoothScroll'
  import { theme } from '$lib/stores/themeStore'
  import { currentLanguage, setCurrentLang } from '$lib/stores/translation'
  import { translations } from '$lib/data/translations'
  import { onMount } from 'svelte'

  let sections: string[] = translations.navbar ? Object.keys(translations.navbar) : []
  let languages: string[] = ['sk', 'en', 'de']

  let showMenu = false

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
</script>

<!-- Mobile navbar -->
<div
  class="fixed top-0 z-50 flex h-20 w-full items-center justify-between px-8 py-6 backdrop-blur-lg md:hidden"
  use:smoothScroll
>
  <button class="mr-4 flex items-center justify-center" on:click={toggleDarkMode}>
    <span class="material-symbols-outlined text-light-primary dark:text-dark-primary">
      {$theme === 'dark' ? 'light_mode' : 'dark_mode'}
    </span>
  </button>
  <button class="flex h-fit w-fit items-center justify-center" on:click={toggleMenu}>
    <span class="material-symbols-outlined" style="font-size: 32px !important;"> {showMenu ? 'close' : 'menu'} </span>
  </button>
  <div
    class="fixed right-0 top-20 flex h-[calc(100vh-5rem)] w-fit flex-col items-end justify-start bg-light-background pr-8 text-lg text-light-primary dark:bg-dark-background dark:text-dark-primary sm:hidden"
  >
    {#if showMenu}
      <nav class="mt-4 flex h-fit flex-col items-end">
        {#each sections as section, i}
          <a
            href="#{section}"
            class="my-2"
            on:click={e => {
              showMenu = false
            }}>{translations.navbar[section][$currentLanguage]}</a
          >
        {/each}
      </nav>
      <div class="mb-4 mt-auto flex h-fit">
        {#each languages as language}
          <button class="mx-2 h-fit text-sm" on:click={e => setLanguage(language)}>{language.toUpperCase()}</button>
        {/each}
      </div>
    {/if}
  </div>
</div>

<!-- Desktop navbar -->
<div
  class="fixed top-0 z-50 hidden h-20 w-full items-center justify-between px-8 py-6 backdrop-blur-lg md:flex"
  use:smoothScroll
>
  <div class="flex w-fit items-center justify-between">
    <button class="mr-4 flex items-center justify-center" on:click={toggleDarkMode}>
      <span class="material-symbols-outlined text-light-primary dark:text-dark-primary">
        {$theme === 'dark' ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
    {#each languages as language}
      <button class="mx-2 h-fit" on:click={e => setLanguage(language)}>{language.toUpperCase()}</button>
    {/each}
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
