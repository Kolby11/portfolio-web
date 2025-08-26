<script lang="ts">
  type TabListProps = {
    options: string[]
    selectedIndex?: number
    onSelectionChange?: (selectedOption: string) => void
  }

  const { options, selectedIndex = 0, onSelectionChange }: TabListProps = $props()
  const optionsArray = options || []

  // Use the selectedIndex prop to determine the current selection
  const selectedOption = $derived(optionsArray[selectedIndex] || (optionsArray.length > 0 ? optionsArray[0] : ''))

  function selectOption(option: string) {
    onSelectionChange?.(option)
  }
</script>

<div class="relative">
  <ul class="relative" role="list">
    {#if optionsArray.length > 0}
      {#each optionsArray as option, index}
        <li role="listitem">
          <button class="tab" aria-current={selectedOption === option} onclick={() => selectOption(option)}>
            {option}
          </button>
        </li>
      {/each}
    {/if}
  </ul>

  <div class="tabIndicator" style="transform: translateY({selectedIndex * 48}px)"></div>
</div>

<style lang="scss">
  button {
    &.tab {
      color: var(--color-text-secondary);
      padding: 12px 16px;
      width: 100%;
      text-align: left;
      border-left: 2px solid var(--color-text-light);
      transition: all 0.2s ease;
      min-height: 48px;
      display: flex;
      align-items: center;
      white-space: nowrap;

      &:hover,
      &:focus-visible {
        color: var(--color-primary);
        background-color: var(--color-background-secondary);
      }

      &[aria-current='true'] {
        color: var(--color-primary);
      }
    }
  }

  .tabIndicator {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 10;
    width: 2px;
    height: 48px;
    background-color: var(--color-primary);
    border-radius: var(--border-radius, 2px);
    transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0.25s;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin: 0;
  }
</style>
