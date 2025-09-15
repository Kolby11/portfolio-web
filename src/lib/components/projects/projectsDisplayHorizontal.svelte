<script lang="ts">
  import type { Project } from '$lib/types/project'
  import type { HTMLAttributes } from 'svelte/elements'

  type ProjectsDisplayVerticalProps = {
    projects: Project[]
    selectedProject: Project
  } & HTMLAttributes<HTMLDivElement>

  let { projects, selectedProject = $bindable(), ...rest }: ProjectsDisplayVerticalProps = $props()

  const handleProjectClick = (e: Event, project: Project) => {
    selectedProject = project
  }

  function fillProjectsForAnimation(projects: Project[], minCount: number = 6): Project[] {
    let filledProjects: Project[] = []
    while (filledProjects.length < minCount) {
      filledProjects = [...filledProjects, ...projects]
    }
    return filledProjects
  }
</script>

<div {...rest} class={`h-fit overflow-x-visible overflow-y-hidden py-2 ${rest.class}`}>
  <div class="scroll-content-horizontal">
    <div class="flex gap-2 transition">
      {#each fillProjectsForAnimation(projects) as project, i}
        <button
          onclick={e => handleProjectClick(e, project)}
          class={`size-20 shadow-gray-50 transition duration-300 md:size-24 lg:size-28 ${selectedProject.name === project.name ? 'scale-110' : 'hover:scale-105'}`}
        >
          <img src={project.images[0]} alt={project.name} class="aspect-square rounded-lg object-cover" />
        </button>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  @keyframes scrollRight {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @keyframes scrollLeft {
    0% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(0%);
    }
  }

  .scroll-content-horizontal {
    animation: scrollRight 60s linear infinite;
  }

  .scroll-content-horizontal-reverse {
    animation: scrollLeft 60s linear infinite;
  }
</style>
