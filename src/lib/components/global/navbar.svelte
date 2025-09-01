<script lang="ts">
  import LanguageSelection from './languageSelection.svelte'
  import { smoothScroll } from '$lib/actions/smoothScroll'
  import { t } from 'svelte-i18n'
  import MaterialSymbolsLightCloseRounded from '~icons/material-symbols-light/close-rounded'
  import MaterialSymbolsLightMenuRounded from '~icons/material-symbols-light/menu-rounded'

  import { onMount } from 'svelte'
  import ThemeSelection from './themeSelection.svelte'

  type NavbarProps = {
    sections: string[]
  }

  const { sections = [] }: NavbarProps = $props()

  let showMenu = $state(false)

  let sideBar: HTMLDivElement
  let sideBarWidth: number = $state(0)

  function toggleMenu() {
    showMenu = !showMenu
  }

  function redraw() {
    if (sideBar) {
      sideBarWidth = sideBar.getBoundingClientRect().width
    }
  }

  onMount(() => {
    window.addEventListener('resize', redraw)
    if (!sideBar) return
    sideBarWidth = sideBar.getBoundingClientRect().width

    return () => {
      window.removeEventListener('resize', redraw)
    }
  })
</script>

<!-- Mobile navbar -->
<button
  class={`fixed top-0 right-0 items-center justify-center p-8 transition duration-300 ${showMenu ? 'opacity-0' : 'opacity-100'}`}
  onclick={toggleMenu}
>
  <MaterialSymbolsLightMenuRounded style="font-size:x-large;" />
</button>

<div
  bind:this={sideBar}
  style="transform: translateX({showMenu ? 0 : sideBarWidth}px); transition: transform 0.3s ease-in-out;"
  class={`text-light-primary bg-backkground fixed right-0 z-50 flex h-screen w-fit flex-col items-end px-8 pt-8 text-lg backdrop-blur-2xl md:hidden `}
>
  <button class="flex h-fit w-fit items-center justify-center" onclick={toggleMenu}>
    <MaterialSymbolsLightCloseRounded style="font-size:x-large;" />
  </button>
  <div class="flex h-full flex-col items-center">
    {#if showMenu}
      <nav class="mt-4 flex h-fit flex-col items-end gap-y-2">
        {#each sections as section, i}
          <a
            use:smoothScroll
            href="#{section}"
            class="border-b border-transparent transition-all duration-200 hover:border-gray-400"
            onclick={e => {
              showMenu = false
            }}
          >
            {$t(`navbar.${section}`)}
          </a>
        {/each}
      </nav>
      <div class="mt-auto mb-4 flex flex-col items-end gap-y-2">
        <ThemeSelection />
        <LanguageSelection />
      </div>
    {/if}
  </div>
</div>

<!-- Desktop navbar -->
<div
  class="fixed top-0 z-50 hidden h-20 w-full items-center justify-between px-8 py-6 backdrop-blur-2xl md:flex"
  use:smoothScroll
>
  <div class="flex gap-x-4 lg:gap-x-8">
    <ThemeSelection />
    <LanguageSelection />
  </div>
  <nav class="ml-auto">
    <ul class="justify- flex items-center gap-x-6">
      {#each sections as section, i}
        <li>
          <a
            href="#{section}"
            class="underline-expand-center flex items-center justify-center text-xl transition duration-200 outline-none focus-visible:outline-none"
          >
            {$t(`navbar.${section}`)}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</div>
