<script lang="ts">
  interface Props {
    text: string
    href?: string
    target?: string
    class?: string
    tag?: 'span' | 'a'
  }

  const { text, href, target, class: className = '', tag = href ? 'a' : 'span' }: Props = $props()

  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  interface CharState {
    display: string
    mono: boolean
  }

  let charStates = $state<CharState[]>([])

  $effect(() => {
    charStates = text.split('').map(c => ({ display: c, mono: false }))
  })

  let timerId: ReturnType<typeof setInterval> | null = null

  function runScramble(endMono: boolean) {
    if (timerId) clearInterval(timerId)
    let tick = 0
    const letters = text.split('')

    timerId = setInterval(() => {
      charStates = letters.map((char, i) => {
        if (char === ' ') return { display: ' ', mono: endMono }
        if (tick >= i) {
          return { display: char, mono: endMono }
        }
        return {
          display: CHARS[Math.floor(Math.random() * CHARS.length)],
          mono: true
        }
      })

      tick++
      if (tick > letters.length) {
        clearInterval(timerId!)
        timerId = null
      }
    }, 20)
  }
</script>

<svelte:element
  this={tag}
  href={tag === 'a' ? href : undefined}
  target={tag === 'a' ? target : undefined}
  role={tag === 'a' ? undefined : 'presentation'}
  class={className}
  onmouseenter={() => runScramble(true)}
  onmouseleave={() => runScramble(false)}
>{#each charStates as { display, mono }}<span
    class="inline-block"
    style={mono ? 'font-family: var(--font-mono)' : ''}
  >{display === ' ' ? '\u00A0' : display}</span>{/each}</svelte:element>
