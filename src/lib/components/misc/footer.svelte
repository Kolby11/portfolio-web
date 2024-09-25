<script>
  import { currentLanguage } from '$lib/stores/translation'
  import { translations } from '$lib/data/translations'
</script>

<div class="flex h-20 items-center justify-center text-sm font-light">{translations.footer.text[$currentLanguage]}</div>
