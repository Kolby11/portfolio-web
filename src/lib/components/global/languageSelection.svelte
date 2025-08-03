<script lang="ts">
  import { locale, locales } from 'svelte-i18n'
  type LanguageSelectionProps = {
    class?: string
  }

  const { class: className = '' }: LanguageSelectionProps = $props()

  async function setLanguage(language: string) {
    locale.set(language)
  }
</script>

<div class="flex w-fit items-center justify-between gap-x-4 {className}">
  {#each $locales as language}
    <button
      class="h-fit transition-all duration-200 {$locale === language
        ? 'border-b border-current'
        : 'border-b border-transparent hover:border-gray-400'}"
      onclick={() => setLanguage(language)}
    >
      {language.toUpperCase()}
    </button>
  {/each}
</div>
