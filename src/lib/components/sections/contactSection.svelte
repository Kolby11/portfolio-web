<script lang="ts">
  import { t } from 'svelte-i18n'
</script>

<section id="contact">
  <div class="mt-10">
    <p class="text-center">Hello</p>
    <h2 class="mt-2 text-center font-sans font-bold">{$t('contact.title')}</h2>
  </div>
  <div class="">
    <div class="flex flex-col items-center justify-center text-center md:text-lg">
      <p class="md:text-xl">{$t('contact.text')}</p>
      <div class="mt-20 flex flex-col space-y-2 font-semibold">
        <p>{$t('personal_info.email')}</p>
      </div>
      <a class="email-link" href="mailto:brittany.chiang@gmail.com" rel="noopener noreferrer" target="_blank"
        >Say Hello</a
      >
    </div>
  </div>
</section>

<style lang="scss">
  #contact {
    margin-bottom: 100px;
  }
</style>
