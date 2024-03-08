<script lang="ts">
  import { onMount } from 'svelte'
  import { section } from '$lib/stores/scrollbar'
  import { get } from 'svelte/store'
  import Timeline from '$lib/components/timeline.svelte'
  import { translation } from '$lib/stores/translation'

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
    <div class="h-fit min-h-[calc(100vh-5rem)] px-10 pt-20">
      <!-- <h1 class="text-2xl">{$translation.home.title}</h1> -->
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
            class="scale-125 transition duration-500 hover:scale-110"
          />
        </div>
      </div>
    </div>
  </section>
  <section id="about">
    <div class="h-fit min-h-[calc(100vh-5rem)] px-10 pt-20">
      <h1 class="text-3xl md:text-4xl">{$translation.about.title}</h1>
      <div class="ml-auto mt-10 px-4 max-md:space-y-8 md:flex md:items-start md:justify-between md:px-10">
        <div class="md:w-1/2 md:pr-5">
          <h2 class="text-2xl">Timeline</h2>
          <Timeline timeLineItems={$translation.about.timeline.sections} />
        </div>
        <div class="md:w-1/2 md:pl-5">
          <h2 class="text-2xl">{$translation.about.interestsAndHobbies.title}</h2>
          <p>
            {$translation.about.interestsAndHobbies.description}
          </p>
        </div>
      </div>
    </div>
  </section>
  <section id="skills" class="h-full">
    <div class="h-fit min-h-[calc(100vh-5rem)] px-10 pt-20">
      <h1 class="text-3xl">{$translation.skills.title}</h1>
    </div>
  </section>
  <section id="contact" class="h-full">
    <div class="h-fit min-h-[calc(100vh-5rem)] px-10 pt-20">
      <h1 class="text-3xl">{$translation.contact.title}</h1>
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
