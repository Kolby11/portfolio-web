<script lang="ts">
  import { gsap } from 'gsap'
  import { t } from '$lib/i18n'

  let loader: HTMLDivElement | undefined = $state()
  let nameEl: HTMLSpanElement | undefined = $state()
  let done = $state(false)

  $effect(() => {
    if (!loader || !nameEl) return
    const tl = gsap.timeline({
      onComplete: () => {
        done = true
      },
    })

    tl.to(nameEl, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    })

    tl.to(
      loader,
      {
        yPercent: -100,
        duration: 0.5,
        ease: 'power3.inOut',
      },
      '+=0.25',
    )

    return () => tl.kill()
  })
</script>

{#if !done}
  <div bind:this={loader} class="loader" aria-hidden="true">
    <div class="name-container">
      <span bind:this={nameEl} class="name">{$t('personal_info.name')}</span>
    </div>
  </div>
{/if}

<style lang="scss">
  .loader {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background-color: var(--color-background);
  }

  .name-container {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .name {
    display: block;
    font-family: monospace;
    font-size: clamp(1.5rem, 5vw, 3.5rem);
    color: var(--color-text);
    letter-spacing: 0.1em;
    opacity: 0;
  }
</style>
