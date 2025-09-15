<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import type { Project } from '$lib/types/project'
  import { onMount } from 'svelte'

  type ProjectsDisplayVerticalProps = {
    columnCount?: number
    projects: Project[]
    selectedProject: Project
  } & HTMLAttributes<HTMLDivElement>

  let { columnCount = 2, projects, selectedProject = $bindable(), ...rest }: ProjectsDisplayVerticalProps = $props()

  let sampleItem: HTMLButtonElement | undefined = $state()
  let container: HTMLDivElement | undefined = $state()
  let containerHeight: number = $state(0)
  let columns: Project[][] = $state([])

  // Calculate items needed for infinite scroll
  const BASE_ITEM_HEIGHT = 128

  let itemsPerColumn: number = $derived.by(() => {
    if (!containerHeight) return 4
    const visibleItems = Math.ceil(
      containerHeight / (sampleItem ? sampleItem?.getBoundingClientRect().height : BASE_ITEM_HEIGHT)
    )
    // Multiply by 3 to ensure smooth infinite scroll (one full cycle + buffer)
    return visibleItems * 3
  })

  // Create columns with enough duplicated items for infinite scroll
  $effect(() => {
    if (projects.length === 0) return

    const filledProjects = fillProjectsForAnimation(projects, itemsPerColumn * columnCount)
    const newColumns: Project[][] = []

    for (let i = 0; i < columnCount; i++) {
      newColumns[i] = []
      for (let j = 0; j < itemsPerColumn; j++) {
        const projectIndex = (i * itemsPerColumn + j) % filledProjects.length
        newColumns[i].push(filledProjects[projectIndex])
      }
    }

    columns = newColumns
  })

  onMount(() => {
    if (container) {
      containerHeight = container.getBoundingClientRect().height
    }
  })

  const handleProjectClick = (e: Event, project: Project) => {
    selectedProject = project
  }

  function fillProjectsForAnimation(projects: Project[], minCount: number = 6): Project[] {
    if (projects.length === 0) return []

    let filledProjects: Project[] = []
    while (filledProjects.length < minCount) {
      filledProjects = [...filledProjects, ...projects]
    }
    return filledProjects
  }
</script>

<div
  bind:this={container}
  {...rest}
  class={`scroll-container w-fit overflow-x-visible overflow-y-hidden px-4 ${rest.class}`}
>
  <div class="flex gap-8 overflow-x-visible">
    {#each columns as column, i}
      <div class={i % 2 ? 'scroll-content-vertical' : 'scroll-content-vertical-reverse'}>
        <div class="flex flex-col gap-4 transition">
          {#each column as project, projectIdx}
            {#if projectIdx === 0 && i === 0}
              <button
                bind:this={sampleItem}
                onclick={e => handleProjectClick(e, project)}
                class={`size-28 shadow-gray-50 transition duration-300 ${selectedProject.name === project.name ? 'scale-110' : 'hover:scale-105'}`}
                aria-pressed={selectedProject.name === project.name}
              >
                <img src={project.images[0]} alt={project.name} class="aspect-square rounded-lg object-cover" />
              </button>
            {:else}
              <button
                onclick={e => handleProjectClick(e, project)}
                class={`size-28 shadow-gray-50 transition duration-300 ${selectedProject.name === project.name ? 'scale-110' : 'hover:scale-105'}`}
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
    animation: scrollDown 30s linear infinite;
  }

  .scroll-content-vertical-reverse {
    animation: scrollUp 30s linear infinite;
  }
</style>
