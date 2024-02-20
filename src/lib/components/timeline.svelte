<script lang="ts">
  import { onMount } from 'svelte'

  const items = [
    { title: 'Entered High School', text: 'Entered High School with almost no prior coding experience', date: 2020 },
    {
      title: 'Started coding consistently',
      text: 'Experimented with multiple languages, game engines, and frameworks. Started exploring ways to make my code cleaner and efficient.',
      date: 2021,
    },
    {
      title: 'Got Job at Binary Confidence s.r.o.',
      text: 'Got my first job as a backend developer in Binary Confidence s.r.o. Worked with technologies such as Ansible, Hyper-V, Linux, etc..  Met with new concepts, technologies, interesting projects, and great people, furthering my knowledge. ',
      date: 2023,
    },
    {
      title: 'Graduated highschool',
      text: 'For my graduation project I worked on my own first large-scale fullstack web application. I learned a lot about web development, and I was able to apply my knowledge in a real-world project. I also learned a lot about project architecture, cloud and deployment. ',
      date: 2024,
    },
  ]

  type Coordinate = {
    x: number
    y: number
  }

  let opened: number | null = null
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

  const handleTitleMouseEnter = (e: Event, index: number) => {
    const underline = document.getElementById(`underline-${index}`)
    if (underline) {
      underline.style.width = '100%'
    }
  }

  const handleTitleMouseLeave = (e: Event, index: number) => {
    const underline = document.getElementById(`underline-${index}`)
    if (underline && opened !== index) {
      underline.style.width = '0%'
    }
  }

  const handleTitleClick = (e: Event, index: number) => {
    if (opened === index) {
      opened = null
    } else {
      const underline = document.getElementById(`underline-${opened}`)
      if (underline) {
        underline.style.width = '0%'
      }
      opened = index
    }
  }
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
      <div class="relative py-4">
        <div class="flex items-center">
          <img src="icons/dark/circle-filled-white.svg" alt="circle" class="w-3" id="timeline-point-{index}" />
          <button
            class="ml-4 transition duration-300 hover:translate-x-1"
            on:mouseenter={e => handleTitleMouseEnter(e, index)}
            on:mouseleave={e => handleTitleMouseLeave(e, index)}
            on:click={e => handleTitleClick(e, index)}
          >
            <p>
              {item.title}
            </p>
            <div class="transition-width w-0 border-b duration-300" id="underline-{index}"></div>
          </button>
        </div>
        {#if opened === index}
          <div class="ml-8 mt-2 text-sm">
            <p>
              {item.text}
            </p>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>
