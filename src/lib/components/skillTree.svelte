<script lang="ts">
  import { seniority, type lang } from '$lib/data/translations'
  import { currentLanguage } from '$lib/stores/translation'

  type Coordinates = {
    x: number
    y: number
  }

  export let data: {
    title: Record<lang, string>
    categories: {
      name: Record<lang, string>
      items: {
        name: string
        description: Record<lang, string>
        seniority: seniority
      }[]
    }[]
  }

  let listItems: Record<string, HTMLLIElement> = {}
  let oldPositions: Record<string, Coordinates> = {}

  // Store for current category index
  let currentCategory = 2
  let categoryStyles: string[] = []

  // Function to change category with wrap-around logic
  function changeCategory(index: number) {
    currentCategory = index
  }

  // Reactive statement to update styles based on currentCategory
  $: if (currentCategory) {
    categoryStyles = data.categories.map((_, index) => getCategoryStyle(index))
    moveItems()
  }

  function getCategoryStyle(index: number) {
    const baseClass = 'transition duration-500 hover:scale-110 cursor-pointer'
    let distance = Math.abs(currentCategory - index)

    if (distance > data.categories.length / 2) {
      distance = data.categories.length - distance
    }

    // Apply style based on distance
    switch (distance) {
      case 0:
        return `ml-6 text-xl ${baseClass}`
      case 1:
        return `ml-4 opacity-70 ${baseClass} hover:translate-x-4`
      case 2:
        return `opacity-50 ${baseClass} hover:translate-x-8`
      default:
        return `opacity-0 ${baseClass}`
    }
  }

  function moveItems() {
    Object.values(listItems).forEach((listItem, index) => {
      oldPositions[index] = {
        x: listItem.getBoundingClientRect().left,
        y: listItem.getBoundingClientRect().top,
      }
    })
    Object.values(listItems).forEach((listItem, index) => {
      const newPosition = {
        x: listItem.getBoundingClientRect().left,
        y: listItem.getBoundingClientRect().top,
      }

      const deltaX = oldPositions[index].x - newPosition.x
      const deltaY = oldPositions[index].y - newPosition.y
      listItem.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    })
  }
</script>

<div>
  <h2 class="text-2xl">{data.title[$currentLanguage]}</h2>
  <ul class="mt-8 flex flex-col space-y-4">
    <!-- Previous items -->
    {#if currentCategory - 2 === 0}
      <li class={getCategoryStyle(currentCategory - 2)}>
        <button on:click={() => changeCategory(currentCategory - 2)}>{data.categories[1].name[$currentLanguage]}</button
        >
      </li>
    {/if}
    {#if currentCategory - 1 === 1}
      <li class={getCategoryStyle(currentCategory - 1)}>
        <button on:click={() => changeCategory(currentCategory - 1)}>{data.categories[0].name[$currentLanguage]}</button
        >
      </li>
    {/if}
    {#each data.categories as category, index}
      <!-- Use reactive categoryStyles for dynamic updates -->
      <li class={categoryStyles[index]} bind:this={listItems[index]}>
        <button on:click={() => changeCategory(index)}>{category.name[$currentLanguage]}</button>
      </li>
    {/each}
    {#if currentCategory === data.categories.length - 1}
      {console.log('currentCategory', currentCategory)}
      <li class={getCategoryStyle(currentCategory + 1)}>
        <button on:click={() => changeCategory(currentCategory + 1)}>{data.categories[0].name[$currentLanguage]}</button
        >
      </li>
    {/if}
    <!-- Upcoming items -->
    {#if currentCategory === data.categories.length - 2}
      <li class={getCategoryStyle(currentCategory + 2)}>
        <button on:click={() => changeCategory(currentCategory + 2)}>{data.categories[1].name[$currentLanguage]}</button
        >
      </li>
    {/if}
  </ul>
</div>
