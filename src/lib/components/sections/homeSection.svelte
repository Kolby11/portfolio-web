<script>
  import { t } from 'svelte-i18n'
  import NewsTicker from '../global/newsTicker.svelte'

  import MaterialSymbolsKeyboardArrowDownRounded from '~icons/material-symbols/keyboard-arrow-down-rounded'
  import { smoothScroll } from '$lib/actions/smoothScroll'

  const FIELDS = ['application_development', 'software_engineering', 'dev_ops', 'robotics']
</script>

<section
  id="home"
  class="flex flex-col items-center justify-center gap-x-6 gap-y-20 md:mt-20 md:flex-row md:items-start"
>
  <div class="flex w-full grow flex-col justify-start px-4 md:mt-[6%] md:w-1/3 xl:w-2/3">
    <h1 class="border-light-primary dark:border-dark-primary border-b-2 text-nowrap">
      {$t('personal_info.name')}
    </h1>
    <NewsTicker items={FIELDS.map(item => `home.fields.${item}`)} />
    <p class="mt-8 text-left text-sm md:text-lg">{@html $t('home.description')}</p>
    <div class="mt-10 flex items-stretch gap-x-4 self-start">
      <button
        class="border-primary border-primary bg-background hover:drop-shadow-primary focus-visible:drop-shadow-primary ml-1 -skew-x-12 rounded-md border-2 px-5 py-3 font-mono transition duration-300 hover:-translate-y-0.5 hover:drop-shadow-lg focus-visible:-translate-y-0.5 focus-visible:drop-shadow-lg"
        title={$t('home.resume')}>{$t('home.resume')}</button
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
    class="aspect-square shrink-0 transition max-sm:w-1/2 max-sm:max-w-64 max-sm:min-w-44 sm:w-64 lg:w-72 xl:w-80 2xl:w-96"
  >
    <enhanced:img
      src="/static/martin_kollar_square_dark.jpg"
      alt={$t('personal_info.name')}
      class="image-primary-overlay overflow-hidden rounded-full drop-shadow-2xl saturate-100 transition duration-500 hover:scale-110"
    />
  </div>
</section>

<style lang="scss">
  #home {
    width: clamp(200px, 90vw, 800px);
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    padding: 100px 0px;
    min-height: 100vh;
    height: 100vh;
  }
  .image-primary-overlay {
    position: relative;
    background-color: var(--color-primary);
    transition: all 0.5s ease;
  }

  .image-primary-overlay img {
    mix-blend-mode: multiply; /* creates the overlay effect */
    transition: all 0.5s ease;
  }

  .image-primary-overlay:hover {
    background-color: transparent;
  }

  .image-primary-overlay:hover img {
    mix-blend-mode: normal;
    transform: scale(1.1);
  }
</style>
