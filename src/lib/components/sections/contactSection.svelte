<script lang="ts">
  import ContentSection from '$lib/components/global/contentSection.svelte'
  import { t } from 'svelte-i18n'
</script>

<ContentSection sectionName="contact">
  <h1 class="text-3xl">{$t('contact.title')}</h1>
  <div class="mt-20 sm:mt-40">
    <div class="flex flex-col items-center justify-center text-center md:text-lg">
      <p class="md:text-xl">{$t('contact.text')}</p>
      <div class="mt-20 flex flex-col space-y-2 font-semibold">
        <p>{$t('personal_info.email')}</p>
      </div>
    </div>
  </div>
</ContentSection>
