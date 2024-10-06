<script lang="ts">
  import { seniority, type lang } from '$lib/data/translations'
  import { currentLanguage } from '$lib/stores/textContent'

  type Coordinates = {
    x: number
    y: number
  }

  export let data: {
    title: string
    categories: {
      name: string
      items: {
        name: string
        description: string
        seniority: seniority
      }[]
    }[]
  }

  let categoriesLoop = [...data.categories]

  // Store for current category index
  let currentCategory = 2

  // Function to change category with wrap-around logic
  function changeCategory(index: number) {
    // const distance = Math.abs(index - currentCategory)
    // let newCategoriesLoop = [...categoriesLoop]

    // if (index < currentCategory) {
    //   const movedElements = newCategoriesLoop.splice(-distance, distance)
    //   newCategoriesLoop = [...movedElements, ...newCategoriesLoop]
    // } else if (index > currentCategory) {
    //   // Move elements from the beginning to the end
    //   const movedElements = newCategoriesLoop.splice(0, distance)
    //   newCategoriesLoop = [...newCategoriesLoop, ...movedElements]
    // }

    // categoriesLoop = newCategoriesLoop
    currentCategory = index
  }

  $: getCategoryStyles = (index: number) => {
    const distance = Math.abs(index - currentCategory)
    if (distance === 0) {
      return 'text-blue-500'
    } else if (distance === 1) {
      return 'text-gray-500'
    } else if (distance === 2) {
      return 'text-gray-300'
    } else {
      return 'hidden'
    }
  }

  $: getCategoryDistance = (index: number) => {
    return Math.abs(index - currentCategory)
  }
</script>

<div>
  <h2 class="text-2xl">{data.title}</h2>
  <ul class="mt-8 flex flex-col gap-y-4">
    {#each categoriesLoop as category, index}
      <!-- Use reactive categoryStyles for dynamic updates -->
      <li class={getCategoryStyles(index)}>
        <button
          on:click={() => changeCategory(index)}
          class={`transition hover:scale-105 ${getCategoryDistance(index) == 2 ? 'translate-x-0' : getCategoryDistance(index) == 1 ? 'translate-x-2' : getCategoryDistance(index) == 0 ? 'translate-x-4' : 'hidden'}`}
        >
          {category.name}</button
        >
      </li>
    {/each}
  </ul>
</div>
