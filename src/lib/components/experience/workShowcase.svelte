<script lang="ts">
  import { t } from 'svelte-i18n'

  type WorkShowcaseProps = {
    work: {
      role: string
      company: {
        title: string
        link: string
      }
      range: string
      bulletPoints: string[]
      technologies: string[]
    }
  }

  const { work }: WorkShowcaseProps = $props()
</script>

<div>
  <h3 class="text-xl font-semibold">
    {$t(work.role)}
    <a href={work.company.link} target="_blank" class="text-primary">
      @ {work.company.title}
    </a>
  </h3>
  <p class="text-text-light font-mono text-lg">
    {work.range}
  </p>
  <ul class="mt-4" role="list">
    {#each work.bulletPoints as point}
      <li class="text-text-light" role="listitem">
        {point}
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  li {
    list-style: square;
    list-style-position: inside;
  }
  // li::before {
  //   content: '▹';
  //   color: var(--color-primary);
  // }
</style>
