<script>
  import ProgrammingLangages from '$lib/components/experience/programmingLanguages.svelte'
  import { programmingLangugagesLogos } from '$lib/data/programmingLanguages'
  import { fade } from 'svelte/transition'
  import Timeline from '../about/timeline.svelte'
  import ItemShowcase from '../experience/itemShowcase.svelte'
  import ContentSection from '../global/contentSection.svelte'
  import { t } from 'svelte-i18n'

  const sections = [
    {
      title: 'Timeline',
    },
    {
      title: 'Technologies',
    },
  ]

  let activeSectionIndex = $state(0)

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
    <div class="flex">
      <div class="flex h-fit w-10 flex-col items-center justify-center gap-y-4 bg-neutral-300 py-4">
        {#each sections as section, sectionIndex}
          <button
            style="writing-mode: sideways-lr;"
            class="h-fit w-fit rounded-xl border-2 px-4 py-2 whitespace-nowrap transition duration-300 {activeSectionIndex ===
            sectionIndex
              ? 'border-purple-400 bg-purple-400'
              : 'border-gray-300 bg-white hover:bg-gray-100'}"
            onclick={() => {
              activeSectionIndex = sectionIndex
            }}
          >
            {section.title}
          </button>
        {/each}
      </div>
      <div class="flex flex-col items-start justify-start md:w-full md:flex-row md:items-stretch md:gap-x-4">
        {#if activeSectionIndex === 0}
          <div class="md:w-1/2">
            <ItemShowcase content={slideshowItems}></ItemShowcase>
          </div>
          <div class="max-md:mt-6 md:w-1/2">
            <ProgrammingLangages logos={programmingLangugagesLogos}></ProgrammingLangages>
          </div>
        {:else if activeSectionIndex === 1}
          <div class="md:w-1/2">
            <Timeline
              vertical={true}
              timelineItems={[
                {
                  title: 'Prvé riadky kódu',
                  year: 2019,
                  description:
                    'V roku 2019 som sa prvýkrát dostal k programovaniu a začal som sa učiť základy programovania v jazyku Python. Po nastúpení na strednú školu som sa začal intenzívne venovať programovaniu a web developmentu.',
                },
                {
                  title: 'Začal som programovať konzistentne',
                  description:
                    'Experimentoval som s viacerými programovacími jazykmi, hernými enginami a frameworkami. Začal som sa zaoberať spôsobmi ako robiť môj kód čistejší a efektívnejší. Vytvoril som viacero menších projektov, ktoré mi pomohli získať skúsenosti a zlepšiť sa.',
                  year: 2021,
                },
                {
                  title: 'Dostal som prácu v Binary Confidence s.r.o.',
                  description:
                    'Dostal som moju prvú prácu ako backend developer v Binary Confidence s.r.o. Pracoval som s technológiami ako Ansible a Hyper-V, kde som pracoval s virtualizáciou a sieťovými technológiami. Vytváral som multiplatformové automatizačné aplikácie v Pythone pre operačné systémy Windows a Linux. Stretol som sa s novými konceptami, technológiami, zaujímavými projektami a úžasnými ľuďmi, čo ďalej rožšílo moje poznatky.',
                  year: 2023,
                },
              ]}
            ></Timeline>
          </div>
        {/if}
        <!-- <div class="md:w-1/2 md:pl-5">
    <SkillTree data={skillTreeData} />
    </div> -->
      </div>
    </div>
  </div>
</ContentSection>
