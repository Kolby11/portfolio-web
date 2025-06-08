<script lang="ts">
  export let sectionName: string
</script>

<section id={sectionName}>
  <div class="safe-area h-fit min-h-[calc(100vh-5rem)] pt-20 sm:pt-28 md:pt-40">
    <slot />
  </div>
</section>
