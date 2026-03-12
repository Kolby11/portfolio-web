<script lang="ts">
  import { THEME, theme } from '$lib/stores/themeStore'
  import { t } from 'svelte-i18n'
  import { gsap } from 'gsap'
  import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
  import MaterialSymbolsDarkModeOutlineRounded from '~icons/material-symbols-light/dark-mode-outline-rounded'
  import MaterialSymbolsLightModeOutlineRounded from '~icons/material-symbols-light/light-mode-outline-rounded'
  import { onMount } from 'svelte'

  gsap.registerPlugin(MorphSVGPlugin)

  type ThemeSelectionProps = {
    class?: string
  }

  const { class: className = '' }: ThemeSelectionProps = $props()

  let iconPath: SVGPathElement
  let darkContainer: HTMLSpanElement
  let lightContainer: HTMLSpanElement

  function getPath(container: HTMLSpanElement) {
    return container.querySelector('path') as SVGPathElement
  }

  onMount(() => {
    const initial = getPath($theme === THEME.dark ? darkContainer : lightContainer)
    if (initial) iconPath.setAttribute('d', initial.getAttribute('d') ?? '')
  })

  function toggleDarkMode() {
    theme.update(current => {
      const next = current === THEME.light ? THEME.dark : THEME.light
      const target = getPath(next === THEME.dark ? darkContainer : lightContainer)
      gsap.to(iconPath, {
        morphSVG: target,
        duration: 0.5,
        ease: 'power2.inOut',
      })
      return next
    })
  }
</script>

<!-- Hidden morph targets -->
<span bind:this={darkContainer} aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden;">
  <MaterialSymbolsDarkModeOutlineRounded />
</span>
<span bind:this={lightContainer} aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden;">
  <MaterialSymbolsLightModeOutlineRounded />
</span>

<button
  class="focus-outline relative flex size-6 cursor-pointer items-center justify-center {className}"
  onclick={toggleDarkMode}
  aria-label={$t('controls.theme.toggle')}
  title={$t('controls.theme.toggle')}
>
  <svg viewBox="0 0 24 24" fill="currentColor" class="size-full">
    <path bind:this={iconPath} />
  </svg>
</button>
