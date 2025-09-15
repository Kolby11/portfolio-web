<script lang="ts">
  import { t } from 'svelte-i18n'
  import ProjectsDisplay from '../projects/projectsDisplayVertical.svelte'
  import { projects } from '$lib/data/projects'
  import ProjectsDisplayHorizontal from '../projects/projectsDisplayHorizontal.svelte'
  import ProjectsDisplayVertical from '../projects/projectsDisplayVertical.svelte'

  let selectedProject = $state(projects[0])
</script>

<section id="projects">
  <h2>{$t('projects.title')}</h2>
  <div class="mt-6 h-fit w-full md:mt-10">
    <div class="flex w-full flex-col items-start justify-between gap-y-8 md:flex-row">
      <ProjectsDisplayHorizontal {projects} bind:selectedProject class="md:hidden" />
      <ProjectsDisplayVertical {projects} bind:selectedProject class="hidden md:block" />
      <div class="projectDisplay">
        <h3 class="text-center font-mono text-2xl md:text-3xl">{selectedProject.name}</h3>
        <div class="imageContainer">
          {#each selectedProject.images as image}
            <img src={image} alt={image} class="mt-2 aspect-video w-full rounded-xl object-cover" />
          {/each}
        </div>
        <p class="bg-background-secondary w-2/3 text-end">
          {selectedProject.description}
        </p>
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  .projectDisplay {
    width: 100%;
    @media (width >= 40rem) {
      width: clamp(200px, 100%, 500px);
    }
  }
  .imageContainer {
    padding: 8px;
    position: relative;
    width: 100%;
    height: 225px;

    img {
      position: absolute;
      width: clamp(150px, 65%, 250px);
      max-height: 250px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      transition: all 0.3s var(--default-transition-timing-function);
      object-fit: cover;

      &:nth-child(1) {
        top: 0px;
        left: 0px;
        z-index: 2;
        transform: rotate(-5deg);
      }
      &:nth-child(2) {
        top: 60px;
        right: 0px;
        z-index: 1;
        transform: rotate(3deg);
      }

      &:hover {
        z-index: 100;
        transform: scale(1.1) rotate(0deg);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
      }
    }
  }
</style>
