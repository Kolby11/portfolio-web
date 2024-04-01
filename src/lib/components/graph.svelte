<script lang="ts">
  import { theme } from '$lib/stores/themeStore'
  import { onMount } from 'svelte'

  export let data: {
    itemsTitle: string
    valueTitle: string
    items: { name: string; value: number }[]
  }
  let totalValue = 0

  data.items.forEach(item => (totalValue += item.value))

  type Coordinate = {
    x: number
    y: number
  }

  let svgCoordinates: Coordinate[] = []

  const calculateSvgCoordinates = () => {
    svgCoordinates = []
    const parent = document.querySelector('#timeline')
    if (parent) {
      const parentRect = parent.getBoundingClientRect()

      data.items.forEach((item, i) => {
        const point = document.getElementById(`timeline-point-${i}`)

        // Handle first and last item
        let addY: number = 0
        if (i === 0 || i === data.items.length - 1) {
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
  }

  onMount(() => {
    calculateSvgCoordinates()
    console.log(svgCoordinates)
  })
</script>

<div class="flex">
  <div class="flex flex-col">
    <h4 class="text-center font-semibold">{data.itemsTitle}</h4>
    {#each data.items as item}
      <p>{item.name}</p>
    {:else}
      <p>No data available</p>
    {/each}
  </div>
  <div class="flex grow flex-col">
    <h4 class="text-center font-semibold">{data.valueTitle}</h4>
  </div>
</div>
