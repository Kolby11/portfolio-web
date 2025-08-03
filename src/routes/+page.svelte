<script lang="ts">
  import ContactSection from './../lib/components/sections/contactSection.svelte'
  import { onMount } from 'svelte'
  import { currentSection } from '$lib/stores/scrollbar'
  import { get } from 'svelte/store'
  import ProjectsDisplay from '$lib/components/projects/projectsDisplay.svelte'
  import ContentSection from '$lib/components/global/contentSection.svelte'
  import { t } from 'svelte-i18n'
  import HomeSection from '$lib/components/sections/homeSection.svelte'
  import ExperienceSection from '$lib/components/sections/experienceSection.svelte'
  import AboutSection from '$lib/components/sections/aboutSection.svelte'
  import ProjectSection from '$lib/components/sections/projectSection.svelte'
  import SocialsDisplay from '$lib/components/global/socialsDisplay.svelte'

  let sections: NodeListOf<HTMLElement>

  onMount(() => {
    sections = document.querySelectorAll('section')
    updateSection()

    window.addEventListener('scroll', updateSection)
    return () => {
      window.removeEventListener('scroll', updateSection)
    }
  })

  function updateSection() {
    sections.forEach((sec: HTMLElement) => {
      const rect = sec.getBoundingClientRect()
      if (rect.top <= window.scrollY / 4) {
        const oldSection = get(currentSection)
        if (oldSection !== sec.id) {
          currentSection.set(sec.id)
        }
      }
    })
  }
</script>

<div class="flex h-full w-full flex-col" id="content">
  <HomeSection />
  <AboutSection />
  <ExperienceSection />
  <ProjectSection />
  <ContactSection />
</div>
