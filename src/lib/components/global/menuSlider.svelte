<script lang="ts">
  import { t } from 'svelte-i18n'

  type MenuSliderProps = {
    options: string[]
    onSelectionChange?: (selectedOption: string) => void
  }

  const { options, onSelectionChange }: MenuSliderProps = $props()
  const optionsArray = options || []
  let selectedOption = $state(optionsArray.length > 0 ? optionsArray[0] : '')

  let containerElement: HTMLDivElement
  let optionElements: HTMLButtonElement[] = []
  let sliderStyle = $state('')

  function selectOption(option: string) {
    selectedOption = option
    updateSliderPosition()
    onSelectionChange?.(option)
  }

  function updateSliderPosition() {
    if (!containerElement || optionsArray.length === 0) return

    const selectedIndex = optionsArray.indexOf(selectedOption)
    const selectedElement = optionElements[selectedIndex]

    if (selectedElement) {
      const containerRect = containerElement.getBoundingClientRect()
      const elementRect = selectedElement.getBoundingClientRect()

      // Calculate position and size relative to container
      const top = elementRect.top - containerRect.top
      const left = elementRect.left - containerRect.left
      const width = elementRect.width
      const height = elementRect.height

      sliderStyle = `
        top: ${top}px; 
        left: ${left}px; 
        width: ${width}px; 
        height: ${height}px;
        transform: translateZ(0);
      `
    }
  }

  // Initialize slider position on mount and when first element is rendered
  $effect(() => {
    if (containerElement && optionElements.length > 0 && optionElements[0] && optionsArray.length > 0) {
      // Initialize with first element by default
      selectedOption = optionsArray[0]
      // Small delay to ensure elements are rendered
      setTimeout(updateSliderPosition, 10)
    }
  })
</script>

<div
  bind:this={containerElement}
  class="bg-background-secondary relative flex h-fit w-10 flex-col items-center justify-center overflow-hidden rounded-l-lg border-r-2"
>
  {#if optionsArray.length > 0}
    <!-- Sliding background indicator -->
    <div
      class="absolute left-0 z-0 w-full bg-purple-400 transition-all duration-300 ease-out"
      style={sliderStyle}
    ></div>

    {#each optionsArray as option, index}
      <button
        bind:this={optionElements[index]}
        style="writing-mode: sideways-lr;"
        class="relative z-10 h-fit w-fit px-4 py-2 whitespace-nowrap transition duration-300"
        onclick={() => selectOption(option)}
      >
        {option}
      </button>
    {/each}
  {/if}
</div>
