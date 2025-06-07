<script lang="ts">
  import { onMount } from 'svelte'
  import { section } from '$lib/stores/scrollbar'
  import { get } from 'svelte/store'
  import Timeline from '$lib/components/about/timeline.svelte'
  import ProjectsDisplay from '$lib/components/projects/projectsDisplay.svelte'
  import CodeSnippet from '$lib/components/codeSnippet.svelte'
  import SkillTree from '$lib/components/experience/skillTree.svelte'
  import ContentSection from '$lib/components/global/contentSection.svelte'
  import ProgrammingLangages from '$lib/components/experience/programmingLanguages.svelte'
  import { programmingLangugagesLogos } from '$lib/data/programmingLanguages'
  import ItemShowcase from '$lib/components/experience/itemShowcase.svelte'
  import { t } from 'svelte-i18n'

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

  // Helper functions for complex translation objects
  function getTimelineItems() {
    // You'll need to structure your timeline data in JSON
    // For now, returning a placeholder - adjust based on your timeline structure
    return [
      {
        title: $t('about.timeline.item1.title'),
        description: $t('about.timeline.item1.description'),
        date: $t('about.timeline.item1.date'),
      },
      {
        title: $t('about.timeline.item2.title'),
        description: $t('about.timeline.item2.description'),
        date: $t('about.timeline.item2.date'),
      },
      // Add more timeline items as needed
    ]
  }

  function getSlideshowItems() {
    // Similar structure for slideshow items
    return [
      {
        title: $t('experience.slideshow.item1.title'),
        description: $t('experience.slideshow.item1.description'),
        image: $t('experience.slideshow.item1.image'),
      },
      // Add more slideshow items as needed
    ]
  }

  function getSkillTreeData() {
    // Structure for skill tree data
    return {
      title: $t('experience.skillTree.title'),
      categories: [
        {
          name: $t('experience.skillTree.frontend.title'),
          skills: [$t('experience.skillTree.frontend.skill1'), $t('experience.skillTree.frontend.skill2')],
        },
        {
          name: $t('experience.skillTree.backend.title'),
          skills: [$t('experience.skillTree.backend.skill1'), $t('experience.skillTree.backend.skill2')],
        },
      ],
    }
  }

  // Reactive statements to update data when language changes
  $: timelineItems = getTimelineItems()
  $: slideshowItems = getSlideshowItems()
  $: skillTreeData = getSkillTreeData()
</script>

<div class="flex h-full w-full flex-col" id="content">
  <ContentSection sectionName="home">
    <div
      class="flex flex-col-reverse items-center justify-end sm:mt-8 md:mt-16 lg:mr-20 lg:mt-24 lg:flex-row xl:justify-center xl:px-20"
    >
      <div class="mt-8 w-full px-4 text-center lg:mr-16">
        <h2
          class="border-b-2 border-light-primary pb-2 text-4xl dark:border-dark-primary md:text-8xl lg:pl-2 lg:text-left"
        >
          {$t('personal_info.name')}
        </h2>
        <p class="mt-2 px-4 text-left">
          {$t('home.description')}
        </p>
      </div>
      <div
        class="flex aspect-square max-w-xs items-center justify-center overflow-hidden rounded-full sm:max-w-sm xl:max-w-md"
      >
        <img
          src="/martin_kollar_square_dark.jpg"
          alt={$t('home.imageAlt')}
          class="transition duration-500 hover:scale-110"
        />
      </div>
    </div>
  </ContentSection>

  <ContentSection sectionName="about">
    <h1 class="text-3xl md:text-4xl">{$t('about.title')}</h1>
    <div class="ml-auto mt-10 px-4 max-md:space-y-8 md:flex md:items-start md:justify-between md:px-10">
      <div class="md:w-full md:pr-5">
        <!-- <Timeline timeLineItems={timelineItems} /> -->
      </div>
      <div class="md:w-1/2 md:pl-5">
        <h2 class="text-2xl">{$t('about.interestsAndHobbies.title')}</h2>
        <p>
          {$t('about.interestsAndHobbies.description')}
        </p>
      </div>
    </div>
    <div class="absolute bottom-20 left-20 mt-10 opacity-0 transition duration-500 hover:opacity-70">
      <CodeSnippet fontSize="small" />
    </div>
  </ContentSection>

  <ContentSection sectionName="experience">
    <h1 class="text-3xl">{$t('experience.title')}</h1>
    <div class="ml-auto mt-10 flex flex-col px-4 max-md:space-y-8 md:items-start md:justify-between md:px-10">
      <div class="flex flex-col items-start justify-start md:w-full md:flex-row md:space-x-4 md:pr-5">
        <div class="md:mt-8 md:w-1/2">
          <ItemShowcase content={slideshowItems}></ItemShowcase>
        </div>
        <div class="max-md:mt-6 md:w-1/2">
          <ProgrammingLangages logos={programmingLangugagesLogos}></ProgrammingLangages>
        </div>
      </div>
      <div class="md:w-1/2 md:pl-5">
        <!-- <SkillTree data={skillTreeData} /> -->
      </div>
    </div>
  </ContentSection>

  <ContentSection sectionName="projects">
    <h1 class="text-3xl">{$t('projects.title')}</h1>
    <div class="mt-6 h-fit">
      <ProjectsDisplay />
    </div>
  </ContentSection>

  <ContentSection sectionName="contact">
    <h1 class="text-3xl">{$t('contact.title')}</h1>
    <div class="mt-20 sm:mt-40">
      <div class="flex flex-col items-center justify-center text-center md:text-lg">
        <p class="md:text-xl">{$t('contact.text')}</p>
        <div class="mt-20 flex flex-col space-y-2 font-semibold">
          <p>{$t('personal_info.email')}</p>
        </div>
      </div>
      <div class="mt-40 flex w-full items-center justify-evenly self-end xl:px-56">
        <a
          href={$t('contact.social.instagram.url')}
          target="_blank"
          class="flex items-center justify-center brightness-0 dark:invert"
        >
          <img
            src="logos/instagram/instagram_logo_white.png"
            alt={$t('contact.social.instagram.alt')}
            class="inline-block h-8"
          />
        </a>
        <a
          href={$t('contact.social.facebook.url')}
          target="_blank"
          class="flex items-center justify-center brightness-0 dark:invert"
        >
          <img
            src="logos/facebook/facebook_logo_secondary.png"
            alt={$t('contact.social.facebook.alt')}
            class="inline-block h-8"
          />
        </a>
        <a
          href={$t('contact.social.github.url')}
          target="_blank"
          class="flex items-center justify-center brightness-0 dark:invert"
        >
          <img
            src="logos/github/github_mark_white.png"
            alt={$t('contact.social.github.alt')}
            class="inline-block h-8"
          />
        </a>
        <a
          href={$t('contact.social.linkedin.url')}
          target="_blank"
          class="flex items-center justify-center brightness-0 dark:invert"
        >
          <img
            src="logos/linkedin/linkedIn_icon.png"
            alt={$t('contact.social.linkedin.alt')}
            class="inline-block w-10"
          />
        </a>
      </div>
    </div>
  </ContentSection>
</div>
