<script lang="ts">
  import ContactSection from './../lib/components/sections/contactSection.svelte'
  import HomeSection from '$lib/components/sections/homeSection.svelte'
  import ExperienceSection from '$lib/components/sections/experienceSection.svelte'
  import AboutSection from '$lib/components/sections/aboutSection.svelte'
  import ProjectSection from '$lib/components/sections/projectSection.svelte'

  import { onMount } from 'svelte'
  import { sectionStore } from '$lib/stores/section.svelte'

  onMount(() => {
    sectionStore.initialize()
    return () => sectionStore.cleanup()
  })
</script>

<div class="flex h-full w-full flex-col" id="content">
  <HomeSection />
  <AboutSection />
  <ExperienceSection />
  <ProjectSection />
  <ContactSection />
</div>
