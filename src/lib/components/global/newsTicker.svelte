<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { t } from '$lib/i18n'

  type NewsTickerProps = {
    items: string[]
    pixelPerSecond?: number
  }

  const { items, pixelPerSecond = 70 }: NewsTickerProps = $props()

  let duplicatedItems = $derived([...items, ...items, ...items])
  let tickerElement: HTMLUListElement | undefined = $state()
  let containerElement: HTMLDivElement
  let contentWidth = $state(0)
  let animationKey = $state(0)

  onMount(() => {
    const updateDimensions = () => {
      if (!tickerElement) return
      // Temporarily remove animation so scrollWidth reflects natural content size
      tickerElement.style.animation = 'none'
      requestAnimationFrame(() => {
        if (!tickerElement) return
        contentWidth = tickerElement.scrollWidth
        tickerElement.style.animation = ''
        animationKey++
      })
    }

    const observer = new ResizeObserver(updateDimensions)
    if (containerElement) observer.observe(containerElement)

    updateDimensions()

    return () => observer.disconnect()
  })

  let endPos = $derived(-contentWidth / 3)
  let animationDuration = $derived(contentWidth > 0 ? Math.abs(endPos) / pixelPerSecond : 0)
</script>

<div class="@container grow">
  <div bind:this={containerElement} class="w-full overflow-hidden">
    {#key animationKey}
      <ul
        bind:this={tickerElement}
        class="newsTicker text-text-light flex items-center gap-x-2 whitespace-nowrap @md:gap-x-4 @md:text-lg @lg:text-xl @xl:text-2xl"
        style="--end-pos: {endPos}px; --animation-duration: {animationDuration}s;"
      >
        {#each duplicatedItems as item}
          <li class="shrink-0">{$t(item)}</li>
          <div class="bg-text-light size-1.5 shrink-0 rounded-full @md:size-2"></div>
        {/each}
      </ul>
    {/key}
  </div>
</div>

<style lang="scss">
  .newsTicker {
    animation-name: newsTicker;
    animation-duration: var(--animation-duration);
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-delay: 0s;
  }

  @keyframes newsTicker {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(var(--end-pos));
    }
  }
</style>
