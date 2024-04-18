<script lang="ts">
  import { theme } from '$lib/stores/themeStore'
  import { afterUpdate, onMount, onDestroy } from 'svelte'
  import { tick } from 'svelte'

  export let data: {
    itemsTitle: string
    valueTitle: string
    valueUnit: string
    items: { name: string; value: number }[]
  }

  const UNIT_DISPLAY_AMOUNT = 5
  const LINE_EXTENSION = 10 // Pixels the line extends beyond the graph

  let graphContainer: HTMLDivElement
  let svgContainer: SVGSVGElement
  let labelRefs: Record<string, HTMLElement> = {}
  let rectHeights: number[] = new Array(data.items.length).fill(20) // default height
  let unitDisplays = [{ x: 0, y: 0, value: 0 }]

  let highestValue = Math.max(...data.items.map(item => item.value))

  interface Bar {
    name: string
    width: number
    y: number
    value: number
  }

  let bars: Bar[] = []
  let svgWidth = 300 // Default, will be updated on mount and resize
  let baseLineY = 140 // Adjusted base line height

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

  $: if (svgContainer) {
    updateLayout()
  }

  function updateDimensions() {
    if (!svgContainer) return
    svgWidth = svgContainer.clientWidth // Update SVG width
    updateLayout()
  }

  function updateLayout() {
    let availableWidth = svgWidth - 2 * LINE_EXTENSION
    let fraction = availableWidth / highestValue

    // Update the bar widths and y-positions based on label heights
    bars = data.items
      .sort((a, b) => b.value - a.value)
      .map((item, index) => {
        let height = labelRefs[item.name]?.clientHeight || 20
        rectHeights[index] = height
        let bar = {
          name: item.name,
          width: item.value * fraction,
          y: 0,
          value: item.value,
        }
        if (labelRefs[item.name]) {
          bar.y = labelRefs[item.name].getBoundingClientRect().y - graphContainer.getBoundingClientRect().y
        }
        return bar
      })

    updateUnitDisplays()
  }

  afterUpdate(() => {
    updateLayout() // Re-calculate layout after every update
  })

  function updateUnitDisplays() {
    unitDisplays = []
    for (let i = 0; i < UNIT_DISPLAY_AMOUNT; i++) {
      let xPos = LINE_EXTENSION + (i * (svgWidth - 2 * LINE_EXTENSION)) / (UNIT_DISPLAY_AMOUNT - 1)
      unitDisplays.push({
        x: xPos,
        y: baseLineY,
        value: Math.round((i * highestValue) / (UNIT_DISPLAY_AMOUNT - 1)),
      })
    }
  }
</script>

<div class="flex flex-col">
  <h4 class="mb-4 text-center font-semibold">{data.itemsTitle}</h4>
  <div class="flex" bind:this={graphContainer}>
    <div class="flex flex-col space-y-1">
      {#each bars as bar}
        <p bind:this={labelRefs[bar.name]} class="text-right text-sm font-medium">{bar.name}</p>
      {/each}
    </div>
    <svg class="ml-2 w-full" bind:this={svgContainer} style="height: 200px;">
      <title>{data.valueTitle}</title>
      {#each bars as bar, index}
        <rect x={LINE_EXTENSION} y={bar.y} width={bar.width} height={rectHeights[index]} fill="mediumslateblue">
          <title>{bar.value + ' ' + data.valueUnit}</title>
        </rect>
      {/each}
      <line x1={0} x2={svgWidth} y1={baseLineY} y2={baseLineY} stroke={$theme === 'dark' ? '#ffffff' : '#000000'} />
      {#each unitDisplays as unit}
        <text
          x={unit.x}
          y={baseLineY + 20}
          class="text-xs text-green-300"
          fill={$theme === 'dark' ? '#ffffff' : '#000000'}
          text-anchor="middle">{unit.value} {data.valueUnit}</text
        >
        <line
          x1={unit.x}
          x2={unit.x}
          y1={baseLineY - 5}
          y2={baseLineY + 5}
          stroke={$theme === 'dark' ? '#ffffff' : '#000000'}
        />
      {/each}
    </svg>
  </div>
</div>
