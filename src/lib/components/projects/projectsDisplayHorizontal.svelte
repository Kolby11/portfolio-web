<script lang="ts">
  import type { Project } from '$lib/types/project'
  import type { HTMLAttributes } from 'svelte/elements'

  type ProjectsDisplayHorizontalProps = {
    projects: Project[]
    speed?: number
    selectedProject: Project
  } & HTMLAttributes<HTMLDivElement>

  let { projects, speed = 50, selectedProject = $bindable(), ...rest }: ProjectsDisplayHorizontalProps = $props()

  let secondCopy: HTMLDivElement | undefined = $state()
  let scrollTrack: HTMLDivElement | undefined = $state()
  let copyWidth: number = $state(0)
  let animationKey = $state(0)

  // distance = exact pixel offset where copy 2 starts → perfectly seamless loop
  let duration: number = $derived(copyWidth ? copyWidth / speed : 10)

  $effect(() => {
    if (!scrollTrack) return

    let debounceTimer: ReturnType<typeof setTimeout>

    const measure = () => {
      if (!secondCopy) return
      const newWidth = secondCopy.offsetLeft
      if (newWidth !== copyWidth) {
        copyWidth = newWidth
        animationKey++
      }
    }

    const scheduleMeasure = () => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => requestAnimationFrame(measure), 150)
    }

    const observer = new ResizeObserver(scheduleMeasure)
    observer.observe(scrollTrack)
    requestAnimationFrame(measure)

    return () => {
      clearTimeout(debounceTimer)
      observer.disconnect()
    }
  })

  const handleProjectClick = (_e: Event, project: Project) => {
    selectedProject = project
  }

  function fillProjectsForAnimation(projects: Project[], minCount: number = 6): Project[] {
    let filledProjects: Project[] = []
    while (filledProjects.length < minCount) {
      filledProjects = [...filledProjects, ...projects]
    }
    return filledProjects
  }

  let filledProjects = $derived(fillProjectsForAnimation(projects))
</script>

<div {...rest} class={`h-fit overflow-hidden py-2 ${rest.class}`}>
  {#key animationKey}
    <div bind:this={scrollTrack} class="scroll-track" style="--duration: {duration}s; --copy-width: {copyWidth}px">
      <div class="scroll-copy">
        {#each filledProjects as project}
          <button
            onclick={e => handleProjectClick(e, project)}
            class={`size-20 shadow-gray-50 transition duration-300 md:size-24 lg:size-28 ${selectedProject.name === project.name ? 'scale-110' : 'hover:scale-105'}`}
          >
            <img src={project.images[0]} alt={project.name} class="aspect-square rounded-lg object-cover" />
          </button>
        {/each}
      </div>
      <div bind:this={secondCopy} class="scroll-copy" aria-hidden="true">
        {#each filledProjects as project}
          <button
            tabindex="-1"
            onclick={e => handleProjectClick(e, project)}
            class={`size-20 shadow-gray-50 transition duration-300 md:size-24 lg:size-28 ${selectedProject.name === project.name ? 'scale-110' : 'hover:scale-105'}`}
          >
            <img src={project.images[0]} alt={project.name} class="aspect-square rounded-lg object-cover" />
          </button>
        {/each}
      </div>
    </div>
  {/key}
</div>

<style lang="scss">
  @keyframes scrollRight {
    from {
      transform: translateX(0px);
    }
    to {
      transform: translateX(calc(-1 * var(--copy-width)));
    }
  }

  .scroll-track {
    display: flex;
    gap: 0.5rem;
    width: max-content;
    animation: scrollRight var(--duration, 10s) linear infinite;
  }

  .scroll-copy {
    display: flex;
    gap: 0.5rem;
  }
</style>
