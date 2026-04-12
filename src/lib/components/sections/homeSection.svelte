<script>
  import { locale, t } from '$lib/i18n'
  import NewsTicker from '../global/newsTicker.svelte'

  import MaterialSymbolsKeyboardArrowDownRounded from '~icons/material-symbols/keyboard-arrow-down-rounded'
  import { smoothScroll } from '$lib/actions/smoothScroll'
  import MonoScramble from '$lib/components/global/monoScramble.svelte'

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
        <p class="mt-8 text-left text-sm md:text-lg">
          {$t('home.description_before')}<MonoScramble
            text={$t('home.description_link')}
            tag="a"
            href="#"
            target="_blank"
            class="text-primary underline-expand-start"
          />{$t('home.description_after')}
        </p>
        <div class="mt-10 flex items-stretch gap-x-4 self-start">
          <a
            href={resume_path}
            target="_blank"
            class="home-cta home-cta-primary ml-1 bg-background px-5 py-3 font-mono"
            title={$t('home.resume')}>{$t('home.resume')}</a
          >
          <a
            use:smoothScroll
            href="#about"
            class="home-cta home-cta-text group bg-background flex h-12 w-12 items-center justify-center overflow-hidden"
          >
            <MaterialSymbolsKeyboardArrowDownRounded
              font-size={35}
              class="home-cta-icon text-text mt-1"
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

  .home-cta {
    transform: translateY(-2px) skewX(-12deg);
    border-radius: 0.375rem;
    border: 2px solid var(--color-text);
    filter: drop-shadow(0 12px 18px color-mix(in srgb, var(--color-text) 12%, transparent));
    transition:
      transform 0.16s var(--expo-out),
      filter 0.16s var(--expo-out),
      box-shadow 0.16s var(--expo-out);
    will-change: transform, filter;

    &:hover,
    &:focus-visible {
      animation: home-cta-hover 1.2s ease-in-out infinite alternate;
    }

    &:active {
      animation: none;
      transform: translateY(0) skewX(-12deg);
      filter: none;
    }
  }

  .home-cta-primary {
    border-color: var(--color-primary);
    filter: drop-shadow(0 12px 18px color-mix(in srgb, var(--color-primary) 45%, transparent));
  }

  .home-cta-text {
    border-color: var(--color-text);
    filter: drop-shadow(0 12px 18px color-mix(in srgb, var(--color-text) 30%, transparent));
  }

  :global(.home-cta-icon) {
    transition: transform 0.16s var(--expo-out);
  }

  .home-cta:hover :global(.home-cta-icon),
  .home-cta:focus-visible :global(.home-cta-icon) {
    transform: translateY(2px);
  }

  .home-cta:active :global(.home-cta-icon) {
    transform: translateY(0);
  }

  @keyframes home-cta-hover {
    from {
      transform: translateY(-2px) skewX(-12deg);
    }
    to {
      transform: translateY(-5px) skewX(-12deg);
    }
  }
</style>
