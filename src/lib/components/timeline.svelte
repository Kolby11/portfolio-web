<script lang="ts">
  import { onMount } from 'svelte'

  const items = [
    { text: 'Thing 1', date: 2020 },
    { text: 'Thing 2', date: 2021 },
    { text: 'Thing 3', date: 2022 },
  ]

  type Coordinate = {
    x: number
    y: number
  }

  let svgCoordinates: Coordinate[] = []

  onMount(() => {
    const parent = document.querySelector('.relative.flex') // Adjust the selector as needed
    if (parent) {
      const parentRect = parent.getBoundingClientRect()

      items.forEach((element, i) => {
        const point = document.getElementById(`timeline-point-${i}`)

        // Handle first and last item
        let addY: number = 0
        if (i === 0 || i === items.length - 1) {
          addY = 10
        }

        if (point) {
          const pointRect = point.getBoundingClientRect()
          svgCoordinates = [
            ...svgCoordinates,
            {
              x: pointRect.left - parentRect.left + pointRect.width / 2,
              y: pointRect.top - parentRect.top + addY,
            },
          ]
        }
      })
    }
  })
</script>

<div class="relative flex">
  <svg class="absolute h-full w-full">
    {#each svgCoordinates as coord, index}
      {#if index < svgCoordinates.length - 1}
        <line
          x1={coord.x}
          y1={coord.y}
          x2={svgCoordinates[index + 1].x}
          y2={svgCoordinates[index + 1].y}
          stroke="#ffffff"
        />
      {/if}
    {/each}
  </svg>
  <div>
    {#each items as item, index}
      <div class="relative flex items-center py-4">
        <img src="icons/dark/circle-filled-white.svg" alt="circle" class="w-3" id="timeline-point-{index}" />
        <p class="ml-4">
          {item.text}
        </p>
      </div>
    {/each}
  </div>
</div>
