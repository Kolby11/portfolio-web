<script lang="ts">
  import { onMount } from 'svelte'
  import { t } from 'svelte-i18n'

  type NewsTickerProps = {
    items: string[]
    pixelPerSecond?: number
  }

  const { items, pixelPerSecond = 100 }: NewsTickerProps = $props()

  let duplicatedItems = $state([...items, ...items, ...items])
  let tickerElement: HTMLUListElement
  let containerWidth = $state(0)
  let contentWidth = $state(0)

  onMount(() => {
    const updateDimensions = () => {
      if (tickerElement) {
        containerWidth = tickerElement.parentElement?.offsetWidth || 0
        contentWidth = tickerElement.scrollWidth
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  })

  let startPos = $derived(containerWidth)
  let endPos = $derived(-contentWidth / 3)
  let totalDistance = $derived(startPos + Math.abs(endPos))
  let animationDuration = $derived(totalDistance / pixelPerSecond)
</script>

<div class="grow">
  <div class="w-full overflow-hidden">
    <ul
      bind:this={tickerElement}
      class="newsTicker flex items-center gap-x-4 text-lg whitespace-nowrap"
      style="--start-pos: {startPos}px; --end-pos: {endPos}px; --animation-duration: {animationDuration}s;"
    >
      {#each duplicatedItems as item, idx}
        <li class="flex-shrink-0">{$t(item)}</li>
        <div class="bg-text size-2 flex-shrink-0 rounded-full"></div>
      {/each}
    </ul>
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
