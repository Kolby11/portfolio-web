<script lang="ts">
  import { onMount } from 'svelte'

  export let content: { title: string; description: string }[]

  const selectedBottomBarScale: number = 10 // In %

  let bottomBars: Record<number, HTMLSpanElement> = {}
  let bottomBarContainer: HTMLDivElement

  let baseBottomBarWidth: number
  let prevSelectedItemIndex: number
  let selectedItemIndex: number = 0

  onMount(() => {
    if (bottomBarContainer && Object.values(bottomBars).length) {
      const containerWidth = bottomBarContainer.clientWidth
      const barCount = Object.values(bottomBars).length
      baseBottomBarWidth = (containerWidth - (barCount - 1) * 8) / barCount // 8px for gap
      Object.values(bottomBars).forEach(bar => {
        bar.style.width = `${baseBottomBarWidth}px`
      })
      updateSelectedBottomBar()
    }
  })

  function updateSelectedBottomBar() {
    // Reset width attribute for previously selected item
    if (prevSelectedItemIndex !== undefined) {
      const prevSelectedItemBottomBar: HTMLSpanElement = bottomBars[prevSelectedItemIndex]
      if (prevSelectedItemBottomBar) {
        prevSelectedItemBottomBar.style.width = `${baseBottomBarWidth}px`
      }
    }

    // Set width attribute for currently selected item
    const selectedItemBottomBar: HTMLSpanElement = bottomBars[selectedItemIndex]
    if (selectedItemBottomBar) {
      const scaledWidth = baseBottomBarWidth * (1 + selectedBottomBarScale / 100)
      selectedItemBottomBar.style.width = `${scaledWidth}px`
    }

    // Set new previously selected item
    prevSelectedItemIndex = selectedItemIndex
  }

  $: if (selectedItemIndex !== undefined) {
    updateSelectedBottomBar()
  }

  function clickPrev() {
    if (selectedItemIndex == 0) {
      selectedItemIndex = content.length - 1
      return
    }

    selectedItemIndex -= 1
  }

  function clickNext() {
    if (selectedItemIndex >= content.length - 1) {
      selectedItemIndex = 0
      return
    }

    selectedItemIndex += 1
  }
</script>

<div class="flex h-full w-full gap-x-4 p-2">
  <div class="flex w-fit flex-col items-center justify-center">
    <button on:click={clickPrev}>prev</button>
  </div>
  <div class="flex h-full grow flex-col">
    <h2 class="text-2xl">{content[selectedItemIndex].title}</h2>
    <p class="mt-4 min-h-72 text-light-text dark:text-dark-text">
      {content[selectedItemIndex].description}
    </p>

    <div bind:this={bottomBarContainer} class="flex w-full items-center justify-between gap-2">
      {#each content as item, index}
        <span
          bind:this={bottomBars[index]}
          class={`h-[2px] bg-black transition-all duration-300 ease-in-out dark:bg-white ${
            selectedItemIndex === index
              ? 'bg-opacity-100 drop-shadow-2xl dark:bg-opacity-100'
              : 'bg-opacity-50 dark:bg-opacity-50'
          }`}
        ></span>
      {/each}
    </div>
  </div>
  <div class="flex w-fit flex-col items-center justify-center">
    <button on:click={clickNext}>next</button>
  </div>
</div>
