<script>
  import { t } from 'svelte-i18n'
  import ContentSection from '../global/contentSection.svelte'
  import NewsTicker from '../global/newsTicker.svelte'

  import MaterialSymbolsKeyboardArrowDownRounded from '~icons/material-symbols/keyboard-arrow-down-rounded'

  const FIELDS = ['application_development', 'software_engineering', 'dev_ops', 'robotics']
</script>

<ContentSection sectionName="home">
  <div class="flex flex-col items-center justify-center gap-x-6 gap-y-20 md:flex-row md:items-start">
    <div class="mt-10 w-full grow md:mt-10 md:w-1/3 xl:mt-14 xl:w-2/3 2xl:mt-20">
      <div class="flex w-full flex-grow flex-col justify-start px-4">
        <h1 class="border-light-primary dark:border-dark-primary border-b-2 text-nowrap">
          <a href="/" class="no-underline">
            {$t('personal_info.name')}
          </a>
        </h1>
        <NewsTicker items={FIELDS.map(item => `home.fields.${item}`)} />
        <p class="mt-12 text-left text-sm md:text-lg">{@html $t('home.description')}</p>
        <div class="mt-12 flex items-stretch gap-x-4 self-start">
          <button class="rounded-2xl border-2 px-8 py-2" title={$t('home.resume')}>{$t('home.resume')}</button>
          <button class="bg-text flex h-12 w-12 items-center justify-center rounded-full">
            <MaterialSymbolsKeyboardArrowDownRounded
              font-size={35}
              class="text-background mt-1 transition hover:translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </div>
    <div
      class="aspect-square shrink-0 transition max-sm:w-1/2 max-sm:max-w-64 max-sm:min-w-44 sm:w-64 lg:w-72 xl:w-80 2xl:w-96"
    >
      <enhanced:img
        src="/static/martin_kollar_square_dark.jpg"
        alt={$t('personal_info.name')}
        class="overflow-hidden rounded-full transition duration-500 hover:scale-110"
      />
    </div>
  </div>
</ContentSection>
