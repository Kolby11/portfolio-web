<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { section } from '$lib/stores/scrollbar'
  import { get } from 'svelte/store'
  import Timeline from '$lib/components/timeline.svelte'

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
    </div>
  </section>
</div>
