<script lang="ts">
  import { t } from 'svelte-i18n'
  import ProjectsDisplay from '../projects/projectsDisplay.svelte'
</script>

<section id="projects">
  <h2 class="text-3xl">{$t('projects.title')}</h2>
  <div class="mt-10 h-fit w-fit">
    <ProjectsDisplay />
  </div>
</section>
