<script lang="ts">
  import { type Project } from '$lib/types/project'
  import ProjectPreview from '../projects/ProjectPreview.svelte'

  import { t } from 'svelte-i18n'
  import { projects } from '$lib/data/projects'
  import ProjectsDisplayHorizontal from '$lib/components/projects/ProjectsDisplayHorizontal.svelte'
  import ProjectsDisplayVertical from '$lib/components/projects/ProjectsDisplayVertical.svelte'
  import MaterialSymbolsFolder from '~icons/material-symbols/folder'

  let selectedProject: Project = $state(projects[0])
  const speed = 50
</script>

<section id="projects">
  <h2>{$t('projects.title')}</h2>
  <div class="mt-6 h-fit w-full md:mt-10">
    <div class="flex w-full flex-col items-start justify-between gap-y-8 md:flex-row">
      <div class="flex w-fit flex-col items-end">
        <ProjectsDisplayHorizontal {projects} {speed} bind:selectedProject class="md:hidden" />
        <ProjectsDisplayVertical {projects} {speed} bind:selectedProject class="hidden w-fit md:block" />
        <a
          href="/projects"
          class="text-primary flex items-center justify-center gap-2 px-4 py-4 font-mono text-sm underline transition duration-300 hover:drop-shadow-lg focus-visible:-translate-y-0.5 focus-visible:drop-shadow-lg"
          title={$t('projects.view_all')}
        >
          <MaterialSymbolsFolder />
          <span>{$t('projects.view_all')}</span>
        </a>
      </div>
      <ProjectPreview {selectedProject} />
    </div>
  </div>
</section>
