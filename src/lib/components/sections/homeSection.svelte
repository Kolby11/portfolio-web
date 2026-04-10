<script>
  import { locale, t } from '$lib/i18n'
  import NewsTicker from '../global/newsTicker.svelte'

  import MaterialSymbolsKeyboardArrowDownRounded from '~icons/material-symbols/keyboard-arrow-down-rounded'
  import { smoothScroll } from '$lib/actions/smoothScroll'

  const FIELDS = ['application_development', 'software_engineering', 'dev_ops', 'robotics']

  let resume_path = $derived.by(() => {
    const resume_dir = '/resume'
    if ($locale === 'sk') {
      return `${resume_dir}/martin_kollar_resume_sk.pdf`
    }
    return `${resume_dir}/martin_kollar_resume_en.pdf`
  })
</script>

<section id="home">
  <div class="flex flex-col">
    <div
      class="flex flex-col items-center gap-x-6 gap-y-20 pt-10 sm:pt-16 md:pt-20 lg:flex-row lg:justify-center lg:pt-32 lg:pb-32"
    >
      <div class="flex w-full grow flex-col justify-start px-4 md:mt-[6%] lg:w-1/3 xl:w-2/3">
        <h1 class="border-light-primary dark:border-dark-primary border-b-2 text-nowrap">
          {$t('personal_info.name')}
        </h1>
        <NewsTicker items={FIELDS.map(item => `home.fields.${item}`)} />
        <p class="mt-8 text-left text-sm md:text-lg">{@html $t('home.description')}</p>
        <div class="mt-10 flex items-stretch gap-x-4 self-start">
          <a
            href={resume_path}
            target="_blank"
            class="border-primary border-primary bg-background hover:drop-shadow-primary focus-visible:drop-shadow-primary ml-1 -skew-x-12 rounded-md border-2 px-5 py-3 font-mono transition duration-300 hover:-translate-y-0.5 hover:drop-shadow-lg focus-visible:-translate-y-0.5 focus-visible:drop-shadow-lg"
            title={$t('home.resume')}>{$t('home.resume')}</a
          >
          <a
            use:smoothScroll
            href="#about"
            class="bg-background border-text group hover:drop-shadow-text focus-visible:drop-shadow-text flex h-12 w-12 -skew-x-12 items-center justify-center overflow-hidden rounded-md border-2 transition duration-300 hover:-translate-y-0.5 hover:drop-shadow-lg focus-visible:-translate-y-0.5 focus-visible:drop-shadow-lg"
          >
            <MaterialSymbolsKeyboardArrowDownRounded
              font-size={35}
              class="text-text mt-1 transition group-focus-visible:translate-y-0.5"
            />
          </a>
        </div>
      </div>
      <div
        class="image-primary-overlay aspect-square shrink-0 overflow-hidden rounded-2xl drop-shadow-2xl transition max-sm:w-1/2 max-sm:max-w-64 max-sm:min-w-44 sm:w-64 lg:w-72 xl:w-80"
      >
        <enhanced:img
          src="/static/martin_kollar_square_dark.jpg"
          alt={$t('personal_info.name')}
          class="h-full w-full object-cover transition duration-500"
        />
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  #home {
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    height: fit-content;
    padding-top: 60px;

    @media (width >= 1200px) {
      padding-top: 80px;
    }
  }
  .image-primary-overlay {
    position: relative;
    background-color: rgba(155, 120, 175, 0.459);
    transition: background-color 2s ease;

    :global(img) {
      mix-blend-mode: multiply;
      filter: grayscale(20%);
      transition: all 0.5s ease;
    }

    &:hover {
      background-color: transparent;

      :global(img) {
        mix-blend-mode: normal;
        filter: grayscale(0%);
        transform: scale(1.05);
      }
    }
  }
</style>
