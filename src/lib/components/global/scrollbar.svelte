<script lang="ts">
  import { t } from 'svelte-i18n'
  import { section } from '$lib/stores/scrollbar'
  import { onMount } from 'svelte'

  let windowHeight: number
  let currentPos: number = 0

  let scrollbar: HTMLElement | null
  let scrollbarThumb: HTMLElement | null

  onMount(() => {
    scrollbar = document.getElementById('scrollbar')
    scrollbarThumb = document.getElementById('scrollbarThumb')

    windowHeight = document.body.scrollHeight - window.innerHeight
    currentPos = window.scrollY

    window.addEventListener('scroll', () => {
      currentPos = window.scrollY
      updateScrollBarPos()
    })

    window.addEventListener('resize', () => {
      windowHeight = document.body.scrollHeight - window.innerHeight
      updateScrollBarPos()
    })

    updateScrollBarPos()
  })

  function updateScrollBarPos() {
    if (scrollbarThumb && scrollbar) {
      const scrollbarHeight = scrollbar.clientHeight - scrollbarThumb.clientHeight
      scrollbarThumb.style.top = `${(currentPos / windowHeight) * scrollbarHeight}px`
    }
  }

  let startYOffset: number = 0

  function handleMouseDown(e: MouseEvent) {
    if (!isDragging && scrollbarThumb && scrollbar) {
      isDragging = true
      startYOffset = e.clientY - scrollbarThumb.getBoundingClientRect().top
      window.addEventListener('mousemove', handleDrag)
      window.addEventListener('mouseup', handleMouseUp)
    }
  }

  function handleDrag(e: MouseEvent) {
    if (isDragging && scrollbarThumb && scrollbar) {
      const rect = scrollbar.getBoundingClientRect()
      const thumbHeight = scrollbarThumb.clientHeight
      const thumbPosition = e.clientY - rect.top - startYOffset
      const scrollbarHeight = scrollbar.clientHeight - thumbHeight
      currentPos = (thumbPosition / scrollbarHeight) * windowHeight
      currentPos = Math.max(0, Math.min(currentPos, windowHeight))
      window.scrollTo(0, currentPos)
      updateScrollBarPos()
    }
  }
  function handleMouseUp(e: MouseEvent) {
    if (isDragging) {
      isDragging = false
      window.removeEventListener('mousemove', handleDrag)
      window.removeEventListener('mouseup', handleMouseUp)

      if (scrollbarThumb && scrollbar) {
        const rect = scrollbar.getBoundingClientRect()
        const thumbHeight = scrollbarThumb.clientHeight
        const thumbPosition = e.clientY - rect.top - startYOffset
        const scrollbarHeight = scrollbar.clientHeight - thumbHeight
        currentPos = (thumbPosition / scrollbarHeight) * windowHeight
        currentPos = Math.max(0, Math.min(currentPos, windowHeight))
        window.scrollTo(0, currentPos)
        updateScrollBarPos()
      }
    }
  }

  let isDragging: boolean = false
</script>

<div class="fixed right-0 top-20 hidden h-[80%] w-10 flex-col items-start dark:text-dark-text md:flex" id="scrollbar">
  <div class="h-full border-r border-light-secondary dark:border-dark-secondary"></div>
  <div
    class="absolute flex h-1/6 w-full bg-transparent"
    role="scrollbar"
    aria-controls="content"
    aria-valuenow={currentPos}
    tabindex="0"
    id="scrollbarThumb"
    on:drag={handleDrag}
    on:dragend={handleDrag}
    on:mousedown={handleMouseDown}
  >
    <div class="relative h-full border-x border-light-primary dark:border-dark-primary">
      <div class="block-select absolute top-0 flex h-full w-5 items-center justify-center">
        <p class="rotate-90 whitespace-nowrap pb-4">
          {$section && $t(`navbar.${$section}`)}
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  .block-select {
    -webkit-user-select: none; /* Safari */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera, and Firefox */
  }
</style>
