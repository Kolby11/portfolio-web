<script lang="ts">
  import { type Snippet } from 'svelte'

  type ContentSectionProps = {
    children: Snippet
    sectionName: string
  }

  const { sectionName, children }: ContentSectionProps = $props()
</script>

<section id={sectionName}>
  <div class="safe-area h-fit min-h-[calc(100vh-5rem)] pt-20 sm:pt-28 md:pt-32">
    {@render children()}
  </div>
</section>
