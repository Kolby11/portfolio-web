<script lang="ts">
  import { onMount } from 'svelte'

  let sections: string[] = ['home', 'about', 'skills', 'contact']
  let languages: string[] = ['sk', 'en', 'de']

  let showMenu = false

  const toggleMenu = () => {
    showMenu = !showMenu
  }

  const setLanguage = async (language: string) => {
    console.log(language)
  }

  onMount(() => {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
          })
        }
      })
    })
  })
</script>

<div class="fixed top-0 z-50 hidden h-20 w-full items-center justify-between px-8 py-6 backdrop-blur-2xl sm:flex">
  <div class="items-center justify-between">
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
            class="items-center justify-center px-3 text-xl {i === sections.length - 1 ? '' : 'border-r'}"
            >{section.charAt(0).toUpperCase() + section.slice(1)}</a
          >
        </li>
      {/each}
    </ul>
  </nav>
</div>

<div class="fixed right-0 top-0 flex h-full flex-col items-end justify-start py-4 pr-8 sm:hidden">
  <button class="flex h-fit w-fit items-center justify-center" on:click={toggleMenu}>
    <span class="material-symbols-outlined" style="font-size: 32px !important;"> {showMenu ? 'close' : 'menu'} </span>
  </button>
  {#if showMenu}
    <nav class="mt-4 flex h-fit flex-col items-end">
      {#each sections as section, i}
        <a href="#{section}" class="my-2 text-lg">{section.charAt(0).toUpperCase() + section.slice(1)}</a>
      {/each}
    </nav>
    <div class="mb-4 mt-auto flex h-fit">
      {#each languages as language}
        <button class="mx-2 h-fit text-sm" on:click={e => setLanguage(language)}>{language.toUpperCase()}</button>
      {/each}
    </div>
  {/if}
</div>
