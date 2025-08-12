<script>
  import CodeSnippet from '../codeSnippet.svelte'
  import ContentSection from '../global/contentSection.svelte'
  import { t } from 'svelte-i18n'
</script>

<ContentSection sectionName="about">
  <h1 class="border-b text-3xl md:text-4xl">{$t('about.title')}</h1>
  <div class="mt-10 ml-auto px-4 max-md:space-y-8 md:flex md:items-start md:justify-between md:px-10">
    <div class="md:w-full md:pr-5">
      <!-- <Timeline timeLineItems={timelineItems} /> -->
    </div>
    <div class="md:w-1/2 md:pl-5">
      <h2 class="text-2xl">{$t('about.interestsAndHobbies.title')}</h2>
      <p>
        {$t('about.interestsAndHobbies.description')}
      </p>
    </div>
  </div>
  <!-- <div class="absolute bottom-20 left-20 mt-10 opacity-0 transition duration-500 hover:opacity-70">
    <CodeSnippet fontSize="small" />
  </div> -->
</ContentSection>
