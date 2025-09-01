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

<div class="@container grow">
  <div class="w-full overflow-hidden">
    <ul
      bind:this={tickerElement}
      class="newsTicker text-text-light flex items-center gap-x-2 whitespace-nowrap @md:gap-x-4 @md:text-lg @lg:text-xl @xl:text-2xl"
      style="--start-pos: {startPos}px; --end-pos: {endPos}px; --animation-duration: {animationDuration}s;"
    >
      {#each duplicatedItems as item, idx}
        <li class="flex-shrink-0">{$t(item)}</li>
        <div class="bg-text-light size-1.5 flex-shrink-0 rounded-full @md:size-2"></div>
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
