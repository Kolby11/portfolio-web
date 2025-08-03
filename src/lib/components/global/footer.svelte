<script lang="ts">
  import { t } from 'svelte-i18n'
  import type { SocialLinkProps } from '$lib/data/socials'

  type FooterProps = {
    class?: string
    socialLinks: SocialLinkProps[]
  }

  const { class: className = '', socialLinks }: FooterProps = $props()
</script>

<footer class="flex flex-col items-center justify-baseline py-6 {className}">
  <div class="flex max-w-64 flex-col items-center justify-center gap-y-4">
    <div class="flex w-full items-center justify-evenly gap-x-4 lg:hidden">
      {#each socialLinks as social}
        <a
          href={social.href}
          target="_blank"
          class="radial-shadow hover:text-primary relative flex items-center justify-center transition-all duration-300"
          title={social.label}
          aria-label={social.label}
          rel="noreferrer"
        >
          <social.icon />
        </a>
      {/each}
    </div>
    <div class="flex items-center justify-center text-sm font-light">{$t('footer.text')}</div>
  </div>
</footer>
