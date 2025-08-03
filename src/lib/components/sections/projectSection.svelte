<script lang="ts">
  import ContentSection from '../global/contentSection.svelte'
  import { t } from 'svelte-i18n'
  import ProjectsDisplay from '../projects/projectsDisplay.svelte'
</script>

<ContentSection sectionName="projects">
  <h1 class="text-3xl">{$t('projects.title')}</h1>
  <div class="mt-10 h-fit w-fit">
    <ProjectsDisplay />
  </div>
</ContentSection>
