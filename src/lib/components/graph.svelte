<script lang="ts">
  import { afterUpdate, onMount, onDestroy } from 'svelte'
  import { tick } from 'svelte'

  export let data: {
    itemsTitle: string
    valueTitle: string
    items: { name: string; value: number }[]
  }

  let graphContainer: HTMLDivElement
  let svgContainer: SVGSVGElement
  let labelRefs: Record<string, HTMLElement> = {}
  let rectHeights: number[] = []

  interface Bar {
    name: string
    width: number
    y: number
    value: number
  }

  let bars: Bar[] = []
  let svgWidth = 300 // Default, will be updated on mount and resize

  // Reactive block for recalculating bars
  $: if (svgContainer) {
    let highestValue = Math.max(...data.items.map(item => item.value))
    let fraction = svgWidth / highestValue
    bars = data.items
      .sort((a, b) => b.value - a.value)
      .map((item, index) => ({
        name: item.name,
        width: item.value * fraction,
        y: index * 20, // Temporary spacing
        value: item.value,
      }))
    updateYPositions()
  }

  onMount(async () => {
    if (typeof window === 'undefined') return
    await tick()
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
  })

  onDestroy(() => {
    if (typeof window === 'undefined') return
    window.removeEventListener('resize', updateDimensions)
  })

  function updateDimensions() {
    if (!svgContainer) return
    svgWidth = svgContainer.clientWidth // Update SVG width
    let highestValue = Math.max(...data.items.map(item => item.value))
    bars = bars.map(bar => ({
      ...bar,
      width: (bar.value / highestValue) * svgWidth,
    }))
  }

  function updateYPositions() {
    rectHeights = bars.map((_, index) => labelRefs[index]?.clientHeight || 0)
    bars.forEach((bar, index) => {
      if (labelRefs[index]) {
        bar.y = labelRefs[index].getBoundingClientRect().y - graphContainer.getBoundingClientRect().y
      }
    })
  }

  afterUpdate(() => {
    updateYPositions()
  })
</script>

<div class="flex flex-col">
  <h4 class="mb-4 text-center font-semibold">{data.itemsTitle}</h4>
  <div class="flex" bind:this={graphContainer}>
    <div class="flex flex-col space-y-1">
      {#each bars as bar, index}
        <p bind:this={labelRefs[index]} class="ml-2 text-sm font-medium">{bar.name}</p>
      {/each}
    </div>
    <svg class="ml-4 w-full" bind:this={svgContainer}>
      {#each bars as bar, index}
        <rect x="0" y={bar.y} width={bar.width} height={rectHeights[index]} fill="lightgreen" />
      {/each}
    </svg>
  </div>
</div>
