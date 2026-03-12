<script lang="ts">
  import { gsap } from 'gsap'

  type TickerProps = {
    items: string[]
    speed?: number
  }

  const { items, speed = 50 }: TickerProps = $props()

  let ul: HTMLUListElement
  let tickerItems: HTMLSpanElement
  let wrapper: HTMLSpanElement

  $effect(() => {
    const tickerWidth = ul.offsetWidth
    const spanWidth = tickerItems.offsetWidth

    // duration = distance / speed (same formula as original)
    const initDuration = tickerWidth / speed
    const loopDuration = spanWidth / speed

    gsap.set(wrapper, { x: tickerWidth })

    const tl = gsap.timeline()
    tl.to(wrapper, { x: 0, duration: initDuration, ease: 'none' })
    tl.to(wrapper, { x: -spanWidth, duration: loopDuration, ease: 'none', repeat: -1 })

    return () => tl.kill()
  })
</script>

<ul bind:this={ul}>
  <span bind:this={wrapper} class="ticker-wrapper">
    <span bind:this={tickerItems} class="ticker-items">
      {#each items as item}
        <li>{item}</li>
      {/each}
    </span>
    <!-- Cloned for seamless loop -->
    <span class="ticker-items">
      {#each items as item}
        <li>{item}</li>
      {/each}
    </span>
  </span>
</ul>

<style lang="scss">
  ul {
    margin: 0;
    padding: 0;
    overflow: hidden;
    white-space: nowrap;
    display: block;
    width: 100%;
  }

  .ticker-wrapper {
    display: inline-block;
  }

  .ticker-items {
    display: inline-block;

    &:nth-child(2) {
      background: rgba(255, 255, 255, 0.25);
    }
  }

  li {
    list-style: none;
    margin: 0 3em 0 0;
    padding: 0;
    display: inline-block;
    font-family: sans-serif;
    vertical-align: middle;
  }
</style>
