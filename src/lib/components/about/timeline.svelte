<script lang="ts">
  import { theme } from '$lib/stores/themeStore'
  import { onMount } from 'svelte'

  type TimelineProps = {
    vertical?: boolean
    timelineItems: { title: string; description: string; year: number }[]
  }

  let { vertical = false, timelineItems = [] }: TimelineProps = $props()

  const timelinePointRadius = 5
  const textOffset = 20
  const margin = 60 // Add margin to prevent overflow

  type Coordinate = {
    x: number
    y: number
  }

  let opened: number | null = $state(null)
  let svgCoordinates: Coordinate[] = $state([])
  let timelineSVGElement: SVGSVGElement
  let underlines: Record<number, SVGLineElement> = {}
  let timelineSVGPoints: Record<number, SVGCircleElement> = {}
  let textElements: Record<number, SVGTextElement> = {}

  // Create a derived sorted array instead of mutating the original
  let sortedTimelineItems = $derived([...timelineItems].sort((i1, i2) => i1.year - i2.year))

  // Effect that watches for changes in the sorted items and SVG element
  $effect(() => {
    if (timelineSVGElement && sortedTimelineItems.length > 0) {
      calculateSvgCoordinates()
    }
  })

  onMount(() => {
    window.addEventListener('resize', calculateSvgCoordinates)
    return () => {
      window.removeEventListener('resize', calculateSvgCoordinates)
    }
  })

  const calculateSvgCoordinates = () => {
    svgCoordinates = []

    if (!timelineSVGElement) return

    const svgElementRect = timelineSVGElement.getBoundingClientRect()
    const totalItems = sortedTimelineItems.length

    if (totalItems === 0) return

    if (vertical) {
      // For vertical layout, use margin on top and bottom
      const availableHeight = svgElementRect.height - 2 * margin
      const pointDeltaY = totalItems > 1 ? availableHeight / (totalItems - 1) : 0
      svgCoordinates = sortedTimelineItems.map((_, index) => ({
        x: timelinePointRadius + margin,
        y: margin + (totalItems > 1 ? index * pointDeltaY : availableHeight / 2),
      }))
    } else {
      // For horizontal layout, use margin on left and right
      const availableWidth = svgElementRect.width - 2 * margin
      const pointDeltaX = totalItems > 1 ? availableWidth / (totalItems - 1) : 0
      svgCoordinates = sortedTimelineItems.map((_, index) => ({
        x: margin + (totalItems > 1 ? index * pointDeltaX : availableWidth / 2),
        y: timelinePointRadius + margin,
      }))
    }
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

  {#each sortedTimelineItems as item, index}
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
      class="cursor-pointer hover:opacity-80"
      on:click={() => handleTitleClick(index)}
    >
      {item.title} ({item.year})
    </text>
    <line
      bind:this={underlines[index]}
      x1={vertical ? svgCoordinates[index]?.x + textOffset : svgCoordinates[index]?.x - 50}
      y1={vertical ? svgCoordinates[index]?.y + 15 : svgCoordinates[index]?.y + textOffset + 20}
      x2={vertical ? svgCoordinates[index]?.x + textOffset + 100 : svgCoordinates[index]?.x + 50}
      y2={vertical ? svgCoordinates[index]?.y + 15 : svgCoordinates[index]?.y + textOffset + 20}
      stroke={$theme === 'dark' ? '#ffffff' : '#000000'}
      stroke-width="1"
      opacity={opened === index ? 1 : 0}
      class="transition-opacity duration-200"
    />
    {#if opened === index}
      <foreignObject
        x={vertical ? svgCoordinates[index]?.x + textOffset : svgCoordinates[index]?.x - 150}
        y={vertical ? svgCoordinates[index]?.y + 25 : svgCoordinates[index]?.y + textOffset * 2}
        width={vertical ? '200' : '300'}
        height="100"
      >
        <div
          class="bg-opacity-90 rounded p-2 text-xs {$theme === 'dark'
            ? 'bg-gray-800 text-white'
            : 'bg-white text-black'} shadow-lg"
        >
          {item.description}
        </div>
      </foreignObject>
    {/if}
  {/each}
</svg>
