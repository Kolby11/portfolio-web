<script>
  import ContentSection from '../global/contentSection.svelte'
  import { t } from 'svelte-i18n'
  import NewsTicker from '../global/newsTicker.svelte'

  const FIELDS = ['application_development', 'software_engineering', 'dev_ops', 'robotics']
</script>

<ContentSection sectionName="home">
  <div class="flex flex-col items-center justify-center gap-6 md:flex-row-reverse md:items-start">
    <div class="aspect-square w-64 shrink-0 transition lg:w-80 xl:w-[450px]">
      <enhanced:img
        src="/static/martin_kollar_square_dark.jpg"
        alt={$t('personal_info.name')}
        class="overflow-hidden rounded-full transition duration-500 hover:scale-110"
      />
    </div>

    <div class="w-full grow md:mt-24 md:w-1/3 lg:mt-32 xl:mt-40 xl:w-2/3">
      <div class="w-full flex-grow px-4 text-center md:text-left">
        <h2
          class="border-light-primary dark:border-dark-primary border-b-2 pb-2 text-5xl font-medium lg:text-7xl xl:text-8xl"
        >
          {$t('personal_info.name')}
        </h2>
        <NewsTicker items={FIELDS.map(item => `home.fields.${item}`)} />
        <p class="mt-20 text-left">{$t('home.description')}</p>
      </div>
    </div>
  </div>
</ContentSection>
