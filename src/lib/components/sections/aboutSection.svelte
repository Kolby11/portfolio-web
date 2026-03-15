<script>
  import { t } from 'svelte-i18n'
  import AboutScene from '../about/aboutScene.svelte'
  import { programmingLangugagesLogos } from '$lib/data/programmingLanguages'
  import CodeSnippet from '../codeSnippet.svelte'
</script>

<section id="about">
  <div class="flex">
    <!-- <div class="md:w-full md:pr-5"> -->
    <!-- <Timeline timeLineItems={timelineItems} /> -->
    <!-- </div> -->
    <div class="w-full max-w-2xl">
      <h2>{$t('about.title')}</h2>
      <p class="mt-6">
        {$t('about.about_me')}
      </p>
    </div>
    <AboutScene logos={programmingLangugagesLogos} />
  </div>
</section>
