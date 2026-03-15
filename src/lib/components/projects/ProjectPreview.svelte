<script lang="ts">
  import { fly } from 'svelte/transition'
  import { type Project } from '$lib/types/project'

  const { selectedProject = $bindable() }: { selectedProject: Project } = $props()
</script>

{#key selectedProject.name}
  <div class="projectDisplay" in:fly={{ y: 12, duration: 200, opacity: 0 }}>
    <div class="imageContainer">
      {#each selectedProject.images.slice(0, 2) as image, i}
        <img src={image} alt={selectedProject.name} class="stack-img stack-img-{i}" />
      {/each}
    </div>

    <div class="info">
      <h3>{selectedProject.name}</h3>
      <p>{selectedProject.description}</p>
    </div>
  </div>
{/key}

<style lang="scss">
  .projectDisplay {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media (width >= 40rem) {
      width: 460px;
      flex-shrink: 0;
    }
  }

  .imageContainer {
    position: relative;
    width: 100%;
    height: 220px;

    .stack-img {
      position: absolute;
      width: 62%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      border-radius: 8px;
      filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.2));
      transition: all 0.3s var(--default-transition-timing-function, ease);
      cursor: pointer;

      &.stack-img-0 {
        top: 8px;
        left: 4px;
        z-index: 2;
        transform: rotate(-4deg);
      }

      &.stack-img-1 {
        bottom: 8px;
        right: 4px;
        z-index: 1;
        transform: rotate(3deg);
      }

      &:hover {
        z-index: 10;
        transform: scale(1.06) rotate(0deg);
        filter: drop-shadow(0 8px 28px rgba(0, 0, 0, 0.3));
      }
    }

    &:has(.stack-img:only-child) .stack-img {
      top: 50%;
      left: 50%;
      width: 80%;
      transform: translate(-50%, -50%);

      &:hover {
        transform: translate(-50%, -50%) scale(1.04);
      }
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 10px;

    h3 {
      font-family: var(--font-mono);
      font-size: 1.4rem;
      font-weight: 600;
      color: var(--color-text);
      border-bottom: 2px solid var(--color-primary);
      padding-bottom: 6px;
      width: fit-content;
    }

    p {
      color: var(--color-text-light);
      line-height: 1.75;
      font-size: 0.9rem;
    }
  }
</style>
