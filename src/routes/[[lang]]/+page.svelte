<script lang="ts">
  import { onMount } from 'svelte'
  import { section } from '$lib/stores/scrollbar'
  import { get } from 'svelte/store'
  import Timeline from '$lib/components/timeline.svelte'
  import { currentLanguage } from '$lib/stores/translation'
  import { translations } from '$lib/data/translations'
  import Graph from '$lib/components/graph.svelte'
  import { languageStats } from '$lib/data/languageStats'
  import ProjectsDisplay from '$lib/components/projectsDisplay.svelte'
  import CodeSnippet from '$lib/components/codeSnippet.svelte'
  import SkillTree from '$lib/components/experience/skillTree.svelte'
  import ContentSection from '$lib/components/base/contentSection.svelte'
  import ProgrammingLangages from '$lib/components/experience/programmingLanguages.svelte'
  import { programmingLangugagesLogos } from '$lib/data/programmingLanguages'

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
        const oldSection = get(section)
        if (oldSection !== sec.id) {
          section.set(sec.id)
        }
      }
    })
  }
</script>

<div class="flex h-full w-full flex-col" id="content">
  <ContentSection sectionName="home">
    <!-- <h1 class="text-2xl">{translations.home.title[$currentLanguage]}</h1> -->
    <div
      class="flex flex-col-reverse items-center justify-end sm:mt-8 md:mt-16 lg:mr-20 lg:mt-24 lg:flex-row xl:justify-center xl:px-20"
    >
      <div class="mt-8 w-full px-4 text-center lg:mr-16">
        <h2
          class="border-b-2 border-light-primary pb-2 text-4xl dark:border-dark-primary md:text-5xl lg:pl-2 lg:text-left"
        >
          Martin Kollár
        </h2>
        <p class="mt-2 px-4 text-left">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio hic explicabo consectetur est eius accusamus
          quas eveniet placeat non illum dolores modi sint accusantium porro nesciunt in, maiores eligendi similique.
        </p>
      </div>
      <div
        class="flex aspect-square max-w-xs items-center justify-center overflow-hidden rounded-full sm:max-w-sm xl:max-w-md"
      >
        <img src="/martin_kollar_square_dark.jpg" alt="Martin Kollár" class="transition duration-500 hover:scale-110" />
      </div>
    </div>
  </ContentSection>
  <ContentSection sectionName="about">
    <h1 class="text-3xl md:text-4xl">{translations.about.title[$currentLanguage]}</h1>
    <div class="ml-auto mt-10 px-4 max-md:space-y-8 md:flex md:items-start md:justify-between md:px-10">
      <div class="md:w-1/2 md:pr-5">
        <h2 class="text-2xl">Timeline</h2>
        <Timeline timeLineItems={translations.about.timeline.sections} />
      </div>
      <div class="md:w-1/2 md:pl-5">
        <h2 class="text-2xl">{translations.about.interestsAndHobbies.title[$currentLanguage]}</h2>
        <p>
          {translations.about.interestsAndHobbies.description[$currentLanguage]}
        </p>
      </div>
    </div>
    <div class="absolute bottom-20 left-20 mt-10 opacity-0 transition duration-500 hover:opacity-70">
      <CodeSnippet fontSize="small" />
    </div>
  </ContentSection>
  <ContentSection sectionName="skills">
    <h1 class="text-3xl">{translations.skills.title[$currentLanguage]}</h1>
    <div class="ml-auto mt-10 flex flex-col px-4 max-md:space-y-8 md:items-start md:justify-between md:px-10">
      <div class="flex flex-col items-start justify-start md:w-full md:flex-row md:space-x-4 md:pr-5">
        <p class="md:mt-8 md:w-1/2">
          {translations.skills.description[$currentLanguage]}
        </p>
        <div class="max-md:mt-6 md:w-1/2">
          <!-- <Graph
            data={{
              itemsTitle: translations.skills.graph.title[$currentLanguage],
              valueTitle: translations.skills.graph.valueTitle[$currentLanguage],
              valueUnit: 'h',
              items: languageStats.map(item => {
                return { name: item.name, value: item.time }
              }),
            }}
          /> -->
          <ProgrammingLangages logos={programmingLangugagesLogos}></ProgrammingLangages>
        </div>
      </div>
      <div class="md:w-1/2 md:pl-5">
        <SkillTree data={translations.skills.skillTree} />
      </div>
    </div>
  </ContentSection>
  <ContentSection sectionName="projects">
    <h1 class="text-3xl">{translations.projects.title[$currentLanguage]}</h1>
    <div class="mt-6 h-fit">
      <ProjectsDisplay />
    </div>
  </ContentSection>
  <ContentSection sectionName="contact">
    <h1 class="text-3xl">{translations.contact.title[$currentLanguage]}</h1>
    <div class="mt-20 sm:mt-40">
      <div class="flex flex-col items-center justify-center text-center md:text-lg">
        <p class="md:text-xl">{translations.contact.text[$currentLanguage]}</p>
        <div class="mt-20 flex flex-col space-y-2 font-semibold">
          <p>mato.kollar2004@gmail.com</p>
          <p>+421 948 723 300</p>
        </div>
      </div>
      <div class="mt-40 flex w-full items-center justify-evenly self-end xl:px-56">
        <a
          href="https://www.instagram.com/_kolby_1/"
          target="_blank"
          class="flex items-center justify-center brightness-0 dark:invert"
        >
          <img src="logos/instagram/instagram_logo_white.png" alt="instagram" class="inline-block h-8" />
        </a>
        <a
          href="https://www.facebook.com/martin.kollar.kolby/"
          target="_blank"
          class="flex items-center justify-center brightness-0 dark:invert"
        >
          <img src="logos/facebook/facebook_logo_secondary.png" alt="facebook" class="inline-block h-8" />
        </a>
        <a
          href="https://github.com/Kolby11"
          target="_blank"
          class="flex items-center justify-center brightness-0 dark:invert"
        >
          <img src="logos/github/github_mark_white.png" alt="github" class="inline-block h-8" />
        </a>
        <a
          href="https://www.linkedin.com/in/martin-koll%C3%A1r/"
          target="_blank"
          class="flex items-center justify-center brightness-0 dark:invert"
        >
          <img src="logos/linkedin/linkedIn_icon.png" alt="linkedin" class="inline-block w-10" />
        </a>
      </div>
    </div>
  </ContentSection>
</div>
