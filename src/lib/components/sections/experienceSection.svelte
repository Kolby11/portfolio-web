<script>
  import ProgrammingLangages from '$lib/components/experience/programmingLanguages.svelte'
  import { programmingLangugagesLogos } from '$lib/data/programmingLanguages'
  import ItemShowcase from '../experience/itemShowcase.svelte'
  import ContentSection from '../global/contentSection.svelte'
  import { t } from 'svelte-i18n'

  const slideshowItems = [
    {
      title: $t('experience.slideshowItems.web_development.title'),
      description: $t('experience.slideshowItems.web_development.description'),
    },
    {
      title: $t('experience.slideshowItems.mobile_development.title'),
      description: $t('experience.slideshowItems.mobile_development.description'),
    },
    {
      title: $t('experience.slideshowItems.game_development.title'),
      description: $t('experience.slideshowItems.game_development.description'),
      image: $t('experience.slideshowItems.game_development.image'),
    },
  ]
</script>

<ContentSection sectionName="experience">
  <h1 class="text-3xl">{$t('experience.title')}</h1>
  <div class="mt-10 ml-auto flex flex-col px-4 max-md:space-y-8 md:items-start md:justify-between md:px-10">
    <div class="flex flex-col items-start justify-start md:w-full md:flex-row md:space-x-4 md:pr-5">
      <div class="md:mt-8 md:w-1/2">
        <ItemShowcase content={slideshowItems}></ItemShowcase>
      </div>
      <div class="max-md:mt-6 md:w-1/2">
        <ProgrammingLangages logos={programmingLangugagesLogos}></ProgrammingLangages>
      </div>
    </div>
    <div class="md:w-1/2 md:pl-5">
      <!-- <SkillTree data={skillTreeData} /> -->
    </div>
  </div>
</ContentSection>
