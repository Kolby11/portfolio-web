<script lang="ts">
  export let sectionName: string
</script>

<section id={sectionName}>
  <div class="h-fit min-h-[calc(100vh-5rem)] px-4 pt-20 sm:px-10 sm:pt-28 md:pt-40">
    <slot />
  </div>
</section>
