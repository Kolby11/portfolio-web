<script lang="ts">
  import { t } from 'svelte-i18n'
</script>

<section id="contact">
  <h2 class="w-full text-center font-sans font-bold">{$t('contact.title')}</h2>
  <div class="">
    <div class="flex flex-col items-center justify-center text-center">
      <p class="text-text-light mt-6 max-w-[700px]">{$t('contact.text')}</p>
      <a
        class="border-primary border-primary bg-background hover:drop-shadow-primary focus-visible:drop-shadow-primary mt-14 -skew-x-12 rounded-md border-2 px-5 py-3 font-mono transition duration-300 hover:-translate-y-0.5 hover:drop-shadow-lg focus-visible:-translate-y-0.5 focus-visible:drop-shadow-lg"
        href="mailto:mato.kollar2004@gmail.com"
        rel="noopener noreferrer"
        target="_blank">Contact me</a
      >
    </div>
  </div>
</section>

<style lang="scss">
  #contact {
    margin-bottom: 100px;
  }
</style>
