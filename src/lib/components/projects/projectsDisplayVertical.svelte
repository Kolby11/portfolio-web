<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Project } from '$lib/types/project'

  type ProjectsDisplayVerticalProps = {
    columnCount?: number
    speed?: number
    projects: Project[]
    selectedProject: Project
  } & HTMLAttributes<HTMLDivElement>

  let { columnCount = 2, speed = 50, projects, selectedProject = $bindable(), ...rest }: ProjectsDisplayVerticalProps = $props()

  let sampleItem: HTMLButtonElement | undefined = $state()
  let container: HTMLDivElement | undefined = $state()
  let containerHeight: number = $state(0)

  const BASE_ITEM_HEIGHT = 128
  const ITEM_GAP = 16 // mb-4 = 1rem = 16px

  // Number of unique items needed to fill the visible area (the "half")
  let itemsPerColumn: number = $derived.by(() => {
    const itemHeight = (sampleItem ? sampleItem.getBoundingClientRect().height : BASE_ITEM_HEIGHT) + ITEM_GAP
    if (!containerHeight) return 5
    return Math.ceil(containerHeight / itemHeight) + 1
  })

  // duration = distance / speed, distance = height of one half
  let duration: number = $derived.by(() => {
    const itemHeight = (sampleItem ? sampleItem.getBoundingClientRect().height : BASE_ITEM_HEIGHT) + ITEM_GAP
    return (itemsPerColumn * itemHeight) / speed
  })

  // Each column = [...half, ...half] so translateY(-50%) lands exactly at the seam
  let columns: Project[][] = $derived.by(() => {
    if (projects.length === 0) return []

    const newColumns: Project[][] = []
    for (let i = 0; i < columnCount; i++) {
      const half: Project[] = []
      for (let j = 0; j < itemsPerColumn; j++) {
        half.push(projects[(i * itemsPerColumn + j) % projects.length])
      }
      newColumns[i] = [...half, ...half]
    }
    return newColumns
  })

  $effect(() => {
    if (!container) return
    containerHeight = container.getBoundingClientRect().height
    const ro = new ResizeObserver(() => {
      containerHeight = container!.getBoundingClientRect().height
    })
    ro.observe(container)
    return () => ro.disconnect()
  })

  const handleProjectClick = (e: Event, project: Project) => {
    selectedProject = project
  }
</script>

<div
  bind:this={container}
  {...rest}
  class={`scroll-container w-fit overflow-x-visible overflow-y-hidden px-4 ${rest.class}`}
  style="--duration: {duration}s"
>
  <div class="flex gap-8 overflow-x-visible">
    {#each columns as column, i}
      <div class={i % 2 ? 'scroll-content-vertical' : 'scroll-content-vertical-reverse'}>
        <div class="flex flex-col">
          {#each column as project, projectIdx}
            {#if projectIdx === 0 && i === 0}
              <button
                bind:this={sampleItem}
                onclick={e => handleProjectClick(e, project)}
                class={`mb-4 size-28 shadow-gray-50 transition duration-300 ${selectedProject.name === project.name ? 'scale-110' : 'hover:scale-105'}`}
                aria-pressed={selectedProject.name === project.name}
              >
                <img src={project.images[0]} alt={project.name} class="aspect-square rounded-lg object-cover" />
              </button>
            {:else}
              <button
                onclick={e => handleProjectClick(e, project)}
                class={`mb-4 size-28 shadow-gray-50 transition duration-300 ${selectedProject.name === project.name ? 'scale-110' : 'hover:scale-105'}`}
                aria-pressed={selectedProject.name === project.name}
              >
                <img src={project.images[0]} alt={project.name} class="aspect-square rounded-lg object-cover" />
              </button>
            {/if}
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  @keyframes scrollDown {
    0% {
      transform: translateY(-50%);
    }
    100% {
      transform: translateY(0%);
    }
  }

  @keyframes scrollUp {
    0% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY(-50%);
    }
  }

  .scroll-container {
    height: 400px;
  }

  .scroll-content-vertical {
    animation: scrollDown var(--duration, 10s) linear infinite;
  }

  .scroll-content-vertical-reverse {
    animation: scrollUp var(--duration, 10s) linear infinite;
  }
</style>
