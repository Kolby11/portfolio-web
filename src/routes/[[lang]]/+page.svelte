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
  <section id="home">
    <div class="h-fit min-h-[calc(100vh-5rem)] px-4 pt-20 sm:px-10">
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
          <img
            src="/martin_kollar_square_dark.jpg"
            alt="Martin Kollár"
            class="transition duration-500 hover:scale-110"
          />
        </div>
      </div>
    </div>
  </section>
  <section id="about">
    <div class="relative h-fit min-h-[calc(100vh-5rem)] px-4 pt-20 sm:px-10">
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
      <div class="absolute bottom-20 left-20 mt-10 w-full opacity-0 transition duration-500 hover:opacity-70">
        <CodeSnippet fontSize="small" />
      </div>
    </div>
  </section>
  <section id="skills" class="h-full">
    <div class="h-fit min-h-[calc(100vh-5rem)] px-4 pt-20 sm:px-10">
      <h1 class="text-3xl">{translations.skills.title[$currentLanguage]}</h1>
      <div class="ml-auto mt-10 px-4 max-md:space-y-8 md:flex md:items-start md:justify-between md:px-10">
        <div class="md:w-1/2 md:pr-5">
          <p>
            {translations.skills.description[$currentLanguage]}
          </p>
          <div class="mt-8">
            <Graph
              data={{
                itemsTitle: translations.skills.graph.title[$currentLanguage],
                valueTitle: translations.skills.graph.valueTitle[$currentLanguage],
                valueUnit: 'h',
                items: languageStats.map(item => {
                  return { name: item.name, value: item.time }
                }),
              }}
            />
          </div>
        </div>
        <div class="md:w-1/2 md:pl-5">
          <h2 class="text-2xl">{translations.skills.skillTree.title[$currentLanguage]}</h2>
          {#each translations.skills.skillTree.categories as category}
            <div class="flex flex-col">
              <p>{category.name[$currentLanguage]}</p>
            </div>
          {:else}
            <div></div>
          {/each}
        </div>
      </div>
    </div>
  </section>
  <section id="projects" class="h-full">
    <div class="h-fit min-h-[calc(100vh-5rem)] px-4 pt-20 sm:px-10">
      <h1 class="text-3xl">{translations.projects.title[$currentLanguage]}</h1>
      <div class="mt-6">
        <ProjectsDisplay />
      </div>
    </div>
  </section>
  <section id="contact" class="h-full">
    <div class="h-fit min-h-[calc(100vh-5rem)] px-4 pt-20 sm:px-10">
      <h1 class="text-3xl">{translations.contact.title[$currentLanguage]}</h1>
      <div class="flex w-full items-center justify-evenly self-end">
        <a
          href="https://www.facebook.com/martin.kollar.kolby/"
          target="_blank"
          class="flex items-center justify-center brightness-0 dark:invert"
        >
          <img src="logos/facebook/facebook_logo_secondary.png" alt="linkedin" class="inline-block h-8" />
        </a>

        <a
          href="https://github.com/Kolby11"
          target="_blank"
          class="flex items-center justify-center brightness-0 dark:invert"
        >
          <img src="logos/github/github_mark_white.png" alt="linkedin" class="inline-block h-8" />
          <img src="logos/github/github_logo_white.png" alt="linkedin" class="inline-block h-8" />
        </a>
        <a
          href="https://www.linkedin.com/in/martin-koll%C3%A1r-2b57a3290/"
          target="_blank"
          class="flex items-center justify-center brightness-0 dark:invert"
        >
          <!-- <img src="logos/linkedin/linkedIn_icon.png" alt="linkedin" class="inline-block w-10" /> -->
          <img src="logos/linkedin/linkedIn_logo.png" alt="linkedin" class="inline-block h-8" />
        </a>
      </div>
    </div>
  </section>
</div>
