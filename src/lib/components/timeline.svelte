<script lang="ts">
  import { theme } from '$lib/stores/themeStore'
  import type { lang } from '$lib/data/translations'
  import { onMount } from 'svelte'
  import { currentLanguage } from '$lib/stores/translation'

  export let timeLineItems: { title: Record<lang, string>; description: Record<lang, string>; year: number }[] = []

  type Coordinate = {
    x: number
    y: number
  }

  let opened: number | null = null
  let svgCoordinates: Coordinate[] = []

  onMount(() => {
    calculateSvgCoordinates()
  })

  const calculateSvgCoordinates = () => {
    svgCoordinates = []
    const parent = document.querySelector('#timeline')
    if (parent) {
      const parentRect = parent.getBoundingClientRect()

      timeLineItems.forEach((element, i) => {
        const point = document.getElementById(`timeline-point-${i}`)

        // Handle first and last item
        let addY: number = 0
        if (i === 0 || i === timeLineItems.length - 1) {
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

  const handleTitleMouseEnter = (e: Event, index: number) => {
    const underline = document.getElementById(`timeline-underline-${index}`)
    if (underline) {
      underline.style.width = '100%'
    }
  }

  const handleTitleMouseLeave = (e: Event, index: number) => {
    const underline = document.getElementById(`timeline-underline-${index}`)
    if (underline && opened !== index) {
      underline.style.width = '0%'
    }
  }

  const handleTitleClick = (e: Event, index: number) => {
    if (opened === index) {
      opened = null
    } else {
      const underline = document.getElementById(`timeline-underline-${opened}`)
      if (underline) {
        underline.style.width = '0%'
      }
      opened = index
    }
    setTimeout(() => {
      calculateSvgCoordinates()
    }, 0)
  }
</script>

<div class="relative flex" id="timeline">
  <svg class="absolute h-full w-full">
    {#each svgCoordinates as coord, index}
      {#if index < svgCoordinates.length - 1}
        <line
          x1={coord.x}
          y1={coord.y}
          x2={svgCoordinates[index + 1].x}
          y2={svgCoordinates[index + 1].y}
          stroke={$theme === 'dark' ? '#ffffff' : '#000000'}
        />
      {/if}
    {/each}
  </svg>
  <div>
    {#each timeLineItems as item, index}
      <div class="relative py-4">
        <div class="flex items-start">
          {#if $theme === 'dark'}
            <img src="icons/dark/circle-filled-white.svg" alt="circle" class="mt-1.5 w-3" id="timeline-point-{index}" />
          {:else}
            <img
              src="icons/light/circle-filled-black.svg"
              alt="circle"
              class="mt-1.5 w-3"
              id="timeline-point-{index}"
            />
          {/if}
          <div>
            <button
              class="ml-4 text-left transition duration-300 hover:translate-x-1"
              on:mouseenter={e => handleTitleMouseEnter(e, index)}
              on:mouseleave={e => handleTitleMouseLeave(e, index)}
              on:click={e => handleTitleClick(e, index)}
            >
              <p>
                {item.title[$currentLanguage]}
              </p>
              <div
                class="transition-width w-0 border-b border-light-primary duration-300 dark:border-dark-primary"
                id="timeline-underline-{index}"
              ></div>
            </button>
            {#if opened === index}
              <div class="ml-8 mt-2 text-sm">
                <p>
                  {item.description[$currentLanguage]}
                </p>
              </div>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
