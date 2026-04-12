<script lang="ts">
  import { t } from '$lib/i18n'
  import { onMount } from 'svelte'
  import { sectionStore } from '$lib/stores/section.svelte'

  let windowHeight: number = $state(0)
  let currentPos: number = $state(0)

  let scrollbar: HTMLElement | null
  let scrollbarThumb: HTMLElement | null

  function getScrollHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    ) - window.innerHeight
  }

  onMount(() => {
    scrollbar = document.getElementById('scrollbar')
    scrollbarThumb = document.getElementById('scrollbarThumb')

    currentPos = window.scrollY
    windowHeight = getScrollHeight()

    // Re-measure after first paint so late-loading content is included
    requestAnimationFrame(() => {
      windowHeight = getScrollHeight()
      updateScrollBarPos()
    })

    window.addEventListener('scroll', () => {
      windowHeight = getScrollHeight()
      currentPos = window.scrollY
      updateScrollBarPos()
    })

    window.addEventListener('resize', () => {
      windowHeight = getScrollHeight()
      updateScrollBarPos()
    })

    // Catch dynamic height changes (images loading, sections expanding)
    const ro = new ResizeObserver(() => {
      windowHeight = getScrollHeight()
      updateScrollBarPos()
    })
    ro.observe(document.body)

    updateScrollBarPos()

    return () => ro.disconnect()
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
      windowHeight = getScrollHeight()
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

<div
  class="dark:text-dark-text fixed top-[10vh] right-0 hidden h-[80vh] w-10 flex-col items-start md:flex"
  id="scrollbar"
>
  <div class="border-light-secondary dark:border-dark-secondary h-full border-r"></div>
  <div
    class="absolute flex h-1/6 w-full cursor-grab bg-transparent active:cursor-grabbing"
    role="scrollbar"
    aria-controls="content"
    aria-valuenow={currentPos}
    tabindex="0"
    id="scrollbarThumb"
    ondrag={handleDrag}
    ondragend={handleDrag}
    onmousedown={handleMouseDown}
  >
    <div class="border-light-primary dark:border-dark-primary relative h-full border-x">
      <div class="block-select absolute top-0 flex h-full w-5 items-center justify-center">
        <p style="writing-mode: sideways-rl;" class="pl-4 whitespace-nowrap">
          {sectionStore.currentSection && $t(`navbar.${sectionStore.currentSection}`)}
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
