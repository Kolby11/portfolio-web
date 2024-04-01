<script lang="ts">
  import { onMount } from 'svelte'

  const projectCategories = ['Game dev', 'Web app dev', 'Mobile app dev']

  let selectedCategory = 'Web app dev'

  const handleCategoryMouseEnter = (e: Event, category: string) => {
    const underline = document.getElementById(`projects-underline-${category}`)
    if (underline) {
      underline.style.width = '100%'
    }
  }

  const handleCategoryMouseLeave = (e: Event, category: string) => {
    const underline = document.getElementById(`projects-underline-${category}`)
    if (underline && selectedCategory !== category) {
      underline.style.width = '0%'
    }
  }

  const handleCategoryClick = (e: Event, category: string) => {
    if (selectedCategory === category) {
      return
    } else {
      const underline = document.getElementById(`projects-underline-${selectedCategory}`)
      if (underline) {
        underline.style.width = '0%'
      }
      selectedCategory = category
    }
  }

  // $: () => {
  //   if (selectedCategory) {
  //     const underline = document.getElementById(`projects-underline-${selectedCategory}`)
  //     if (underline) {
  //       underline.style.width = '100%'
  //     }
  //   }
  // }

  onMount(() => {
    if (selectedCategory) {
      const underline = document.getElementById(`projects-underline-${selectedCategory}`)
      if (underline) {
        underline.style.width = '100%'
      }
    }
  })
</script>

<div class="flex flex-col">
  <ul class="flex items-center justify-evenly">
    {#each projectCategories as projectCategory}
      <li>
        <button
          on:click={e => handleCategoryClick(e, projectCategory)}
          on:mouseenter={e => handleCategoryMouseEnter(e, projectCategory)}
          on:mouseleave={e => handleCategoryMouseLeave(e, projectCategory)}
          class="flex flex-col items-center justify-center transition duration-300 {selectedCategory === projectCategory
            ? 'scale-125'
            : ''}"
        >
          <p>
            {projectCategory}
          </p>
          <div
            class="transition-width w-0 border-b border-light-primary duration-300 dark:border-dark-primary"
            id="projects-underline-{projectCategory}"
          ></div>
        </button>
      </li>
    {/each}
  </ul>
</div>
