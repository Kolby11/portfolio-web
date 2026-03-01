<script>
  import { t } from 'svelte-i18n'
  import AboutScene from '../about/aboutScene.svelte'
</script>

<section id="about">
  <div class="flex">
    <!-- <div class="md:w-full md:pr-5"> -->
    <!-- <Timeline timeLineItems={timelineItems} /> -->
    <!-- </div> -->
    <div class="w-[500px]">
      <h2>{$t('about.title')}</h2>
      <p class="mt-6">
        {$t('about.about_me')}
      </p>
    </div>
    <AboutScene />
  </div>
  <!-- <div class="absolute bottom-20 left-20 mt-10 opacity-0 transition duration-500 hover:opacity-70">
    <CodeSnippet fontSize="small" />
  </div> -->
</section>
