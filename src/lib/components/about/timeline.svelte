<script lang="ts">
  import { theme } from '$lib/stores/themeStore'
  import { onMount } from 'svelte'

  export let vertical: boolean = false
  export let timeLineItems: { title: string; description: string; year: number }[] = []

  const timelinePointRadius = 5
  const textOffset = 20

  type Coordinate = {
    x: number
    y: number
  }

  let opened: number | null = null
  let svgCoordinates: Coordinate[] = []
  let timelineSVGElement: SVGSVGElement
  let underlines: Record<number, SVGLineElement> = {}
  let timelineSVGPoints: Record<number, SVGCircleElement> = {}
  let textElements: Record<number, SVGTextElement> = {}

  $: {
    if (timelineSVGElement) {
      calculateSvgCoordinates()
    }
  }

  onMount(() => {
    window.addEventListener('resize', calculateSvgCoordinates)
    return () => {
      window.removeEventListener('resize', calculateSvgCoordinates)
    }
  })

  function sortTimeLineItems() {
    timeLineItems = timeLineItems.sort((i1, i2) => i1.year - i2.year)
  }

  const calculateSvgCoordinates = () => {
    sortTimeLineItems()
    svgCoordinates = []

    if (!timelineSVGElement) return

    const svgElementRect = timelineSVGElement.getBoundingClientRect()
    const totalItems = timeLineItems.length

    if (vertical) {
      const pointDeltaY = svgElementRect.height / (totalItems - 1)
      svgCoordinates = timeLineItems.map((_, index) => ({
        x: timelinePointRadius,
        y: index * pointDeltaY,
      }))
    } else {
      const pointDeltaX = svgElementRect.width / (totalItems - 1)
      svgCoordinates = timeLineItems.map((_, index) => ({
        x: index * pointDeltaX,
        y: timelinePointRadius,
      }))
    }

    // Force a re-render
    svgCoordinates = [...svgCoordinates]
  }

  const handleTitleClick = (index: number) => {
    if (opened === index) {
      opened = null
    } else {
      opened = index
    }
  }
</script>

<svg class={`relative ${vertical ? 'h-full' : 'w-full'}`} bind:this={timelineSVGElement}>
  {#each svgCoordinates as coord, index}
    {#if index < svgCoordinates.length - 1}
      <line
        x1={coord.x}
        y1={coord.y}
        x2={svgCoordinates[index + 1].x}
        y2={svgCoordinates[index + 1].y}
        stroke={$theme === 'dark' ? '#ffffff' : '#000000'}
        stroke-width="2"
      />
    {/if}
  {/each}

  {#each timeLineItems as item, index}
    <circle
      bind:this={timelineSVGPoints[index]}
      cx={svgCoordinates[index]?.x ?? 0}
      cy={svgCoordinates[index]?.y ?? 0}
      r={timelinePointRadius}
      fill={$theme === 'dark' ? '#ffffff' : '#000000'}
    />
    <text
      bind:this={textElements[index]}
      x={vertical ? svgCoordinates[index]?.x + textOffset : svgCoordinates[index]?.x}
      y={vertical ? svgCoordinates[index]?.y : svgCoordinates[index]?.y + textOffset}
      fill={$theme === 'dark' ? '#ffffff' : '#000000'}
      font-size="12"
      text-anchor={vertical ? 'start' : 'middle'}
      dominant-baseline={vertical ? 'middle' : 'hanging'}
      on:click={() => handleTitleClick(index)}
    >
      {item.title} ({item.year})
    </text>
    <line
      bind:this={underlines[index]}
      x1={vertical ? svgCoordinates[index]?.x + textOffset : svgCoordinates[index]?.x - 50}
      y1={vertical ? svgCoordinates[index]?.y + 15 : svgCoordinates[index]?.y + textOffset + 20}
      x2={vertical ? svgCoordinates[index]?.x + textOffset : svgCoordinates[index]?.x + 50}
      y2={vertical ? svgCoordinates[index]?.y + 15 : svgCoordinates[index]?.y + textOffset + 20}
      stroke={$theme === 'dark' ? '#ffffff' : '#000000'}
      stroke-width="1"
      opacity={opened === index ? 1 : 0}
    />
    {#if opened === index}
      <text
        x={vertical ? svgCoordinates[index]?.x + textOffset : svgCoordinates[index]?.x}
        y={vertical ? svgCoordinates[index]?.y + textOffset : svgCoordinates[index]?.y + textOffset * 2}
        fill={$theme === 'dark' ? '#ffffff' : '#000000'}
        font-size="10"
        text-anchor={vertical ? 'start' : 'middle'}
      >
        {item.description}
      </text>
    {/if}
  {/each}
</svg>
