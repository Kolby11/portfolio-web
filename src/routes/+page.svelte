<script lang="ts">
  import { onMount } from 'svelte'
  import { section } from '$lib/stores/scrollbar'
  import { get } from 'svelte/store'
  import Timeline from '$lib/components/timeline.svelte'
  import CodeSnippet from '$lib/components/codeSnippet.svelte'
  import Footer from '$lib/components/footer.svelte'

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
    <div class="h-screen min-h-fit px-10 pt-20">
      <h1 class="text-2xl">Home</h1>
      <CodeSnippet />
    </div>
  </section>
  <section id="about">
    <div class="h-screen min-h-fit px-10 pt-20">
      <h1 class="text-2xl">About</h1>
      <div class="ml-auto mt-6 flex items-center justify-start">
        <Timeline />
      </div>
    </div>
  </section>
  <section id="skills" class="h-full">
    <div class="h-screen min-h-fit px-10 pt-20">
      <h1 class="text-2xl">Skills</h1>
    </div>
  </section>
  <section id="contact" class="h-full">
    <div class="h-screen min-h-fit px-10 pt-20">
      <h1 class="text-2xl">Contact</h1>
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
          href="https://www.linkedin.com/in/martin-kollar-2b57a3290/"
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
