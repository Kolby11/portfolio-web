<script lang="ts">
  import { onMount } from 'svelte';

  export let data: {
    itemsTitle: string,
    valueTitle: string,
    items: { name: string; value: number }[]
  };

  let svgHeight = 40; // Increase the height of each bar
  let svgWidth = 300;
  let graphContainer: HTMLDivElement;
  let labelRefs: Record<string, HTMLElement> = {}

  interface Bar {
    name: string;
    width: number;
    y: number;
  }

  let bars: Bar[] = [];

  $: {
    let sortedItems = [...data.items].sort((a, b) => b.value - a.value);
    let highestValue = Math.max(...sortedItems.map(item => item.value));
    bars = sortedItems.map((item, index) => ({
      name: item.name,
      width: (item.value / highestValue) * svgWidth,
      y: index * svgHeight // Adjust y to not overlap bars
    }));
  }

  onMount(() => {
    if (graphContainer) {
      svgWidth = graphContainer.clientWidth; // Adjust the SVG width based on its container
      console.log(labelRefs)
    }
  });
</script>

<div class="flex flex-col">
  <h4 class="text-center font-semibold mb-4">{data.itemsTitle}</h4>
  <div class="flex" bind:this={graphContainer}>
    <div class="flex flex-col space-y-1">
      {#each data.items as item, index}
        <p bind:this={labelRefs[item.name]} class="ml-2 text-sm font-medium">{item.name}</p>
      {/each}
    </div>
    <svg class="ml-4" width="{svgWidth}px" height="{bars.length * svgHeight}" style="min-height: 300px;">
      {#each bars as bar, index}
        <rect x="0" y="{bar.y}" width="{bar.width}" height="{svgHeight}" fill="steelblue"/>
      {/each}
    </svg>
  </div>
</div>
