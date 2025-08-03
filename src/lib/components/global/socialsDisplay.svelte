<script lang="ts">
  import type { SocialLinkProps } from '$lib/data/socials'

  type SocialsDisplayProps = {
    class?: string
    socialLinks: SocialLinkProps[]
  }

  const { class: className = '', socialLinks }: SocialsDisplayProps = $props()
</script>

<div class="flex flex-col items-center justify-evenly gap-y-2 {className}">
  {#each socialLinks as social}
    <a
      href={social.href}
      target="_blank"
      class="radial-shadow hover:text-primary relative flex items-center justify-center p-3 transition-all duration-300 hover:-translate-y-1"
      title={social.label}
      aria-label={social.label}
      rel="noreferrer"
    >
      <social.icon />
    </a>
  {/each}
</div>

<style lang="scss">
  .radial-shadow {
    --shadow-color: var(--color-purple-700);
  }

  :root(.dark) .radial-shadow {
    --shadow-color: var(--color-purple-500);
  }

  .radial-shadow::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(var(--shadow-color), 0.2) 0%,
      rgba(var(--shadow-color), 0.1) 40%,
      transparent 70%
    );
    filter: blur(4px);
    transition: all 0.3s ease;
    z-index: -1;
  }

  .radial-shadow:hover::before {
    background: radial-gradient(
      circle,
      rgba(var(--shadow-color), 0.3) 0%,
      rgba(var(--shadow-color), 0.15) 40%,
      transparent 70%
    );
    transform: scale(1.1);
  }
</style>
