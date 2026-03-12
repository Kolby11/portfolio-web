<script lang="ts">
  import ContactSection from './../lib/components/sections/contactSection.svelte'
  import HomeSection from '$lib/components/sections/homeSection.svelte'
  import ExperienceSection from '$lib/components/sections/experienceSection.svelte'
  import AboutSection from '$lib/components/sections/aboutSection.svelte'
  import ProjectSection from '$lib/components/sections/projectSection.svelte'

  import { onMount } from 'svelte'
  import { sectionStore } from '$lib/stores/section.svelte'
  import { socialLinks } from '$lib/data/socials'
  import Footer from '$lib/components/global/footer.svelte'
  import { initializeTheme } from '$lib/stores/themeStore'
  import LoadAnimation from '$lib/components/global/loadAnimation.svelte'

  onMount(() => {
    initializeTheme()
    sectionStore.initialize()
    return () => sectionStore.cleanup()
  })
</script>

<LoadAnimation />
<div id="content">
  <main class="fillHeight">
    <HomeSection />
    <AboutSection />
    <ExperienceSection />
    <ProjectSection />
    <ContactSection />
  </main>
  <Footer {socialLinks} />
</div>
