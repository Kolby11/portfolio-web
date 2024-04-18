<script lang="ts">
  import { onMount } from 'svelte'

  export let fontSize: 'small' | 'medium' | 'large' = 'medium'

  let fontClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  }

  let secret = 'secret'
  let keyboardSequence = ''

  onMount(() => {
    window.addEventListener('keypress', e => {
      handleKeyPress(e)
    })
  })

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === secret[keyboardSequence.length]) {
      keyboardSequence += e.key
      if (keyboardSequence === secret) {
        keyboardSequence = ''
        alert('You found the secret!')
      }
    } else {
      keyboardSequence = ''
    }
  }
</script>

<div class={`font-mono opacity-80 ${fontClasses[fontSize]}`}>
  <p>
    <span class="text-blue-600 dark:text-blue-500">const</span>
    <span class="dark:text-sky-400">message</span>
    <span>=</span>
    <span class="text-yellow-900 dark:text-orange-400">"Hi, how are you?"</span>
  </p>
  <br />
  <p>
    <span class="text-fuchsia-700 dark:text-pink-400"> for </span>
    <span class="text-blue-600 dark:text-yellow-300">&#40</span><span class="text-blue-600">let </span>
    <span class="text-blue-900 dark:text-sky-200">i</span>
    <span>=</span>
    <span class="text-teal-600 dark:text-lime-200">0</span>;
    <span class="text-blue-900 dark:text-sky-200">i</span>
    <span>&lt</span>
    <span class="text-teal-600 dark:text-lime-200">5</span>;
    <span class=" text-blue-900 dark:text-sky-200">i</span><span>++</span><span
      class="text-blue-600 dark:text-yellow-300">&#41</span
    >
    <span class="text-blue-600 dark:text-yellow-300">&#123</span>
  </p>
  <p>
    &nbsp
    <span class="text-blue-900 dark:text-sky-200">console</span><span>.</span><span
      class="text-stone-600 dark:text-yellow-200">log</span
    ><span class="text-teal-600 dark:text-yellow-300">&#40</span><span class="dark:text-sky-400">message</span><span
      class="text-teal-600 dark:text-yellow-300">&#41</span
    >
  </p>
  <p>
    <span class="text-blue-600 dark:text-yellow-300">&#125</span>
  </p>
  <br />
  <p>
    <span class="text-blue-600 dark:text-blue-500">const</span>
    <span class="dark:text-sky-400">scrambledWords</span>
    <span>=</span>
    <span class="text-blue-600 dark:text-yellow-300">[</span><span class="text-yellow-900 dark:text-orange-400"
      >'ytr'</span
    >,
    <span class="text-yellow-900 dark:text-orange-400">'ingtyp'</span>,
    <span class="text-yellow-900 dark:text-orange-400">
      'retsec'<span class="text-blue-600 dark:text-yellow-300">]</span>
    </span>
  </p>
  <br />
  <p>
    <span class="text-blue-600 dark:text-blue-500">const</span>
    <span class="dark:text-sky-400">secretMessage</span>
    <span>=</span>
    <span class="dark:text-sky-400">scrambledWords</span><span>.</span><span class="text-stone-600 dark:text-yellow-200"
      >map</span
    ><span class="text-stone-600 dark:text-yellow-300">&#40</span>
    <br />
    &nbsp
    <span class="text-blue-900 dark:text-sky-200">word</span> <span class="text-blue-600 dark:text-blue-500">=&gt</span>
    <span class="text-blue-900 dark:text-sky-200">word</span><span>.</span><span
      class="text-stone-600 dark:text-yellow-200">slice</span
    ><span class="text-teal-600 dark:text-pink-400">&#40</span><span class="text-blue-900 dark:text-sky-200">Math</span
    ><span>.</span><span class="text-stone-600 dark:text-yellow-200">floor</span><span class="dark:text-blue-500"
      >&#40</span
    ><span class="text-blue-900 dark:text-sky-200">word</span><span>.</span><span
      class="text-blue-900 dark:text-sky-200">length</span
    > <span>/</span>
    <span class="text-teal-600 dark:text-lime-200">2</span><span class="dark:text-blue-500">&#41</span><span
      class="text-teal-600 dark:text-pink-400">&#41</span
    >
    <span>+</span> <span class="text-blue-900 dark:text-sky-200">word</span><span>.</span><span
      class="text-stone-600 dark:text-yellow-200">slice</span
    ><span class="text-teal-600 dark:text-pink-400">&#40</span><span class="text-teal-600 dark:text-lime-200">0</span
    ><span>,</span>
    <span class="text-blue-900 dark:text-sky-200">Math</span><span>.</span><span
      class="text-stone-600 dark:text-yellow-200">floor</span
    ><span class="dark:text-blue-500">&#40</span><span class="text-blue-900 dark:text-sky-200">word</span><span>.</span
    ><span class="text-blue-900 dark:text-sky-200">length</span> <span>/</span>
    <span class="text-teal-600 dark:text-lime-200">2</span><span class="dark:text-blue-500">&#41</span><span
      class="text-teal-600 dark:text-pink-400">&#41</span
    >
    <br />
    <span class="text-yellow-300">&#41</span>
  </p>
  <br />
  <p>
    <span class="text-blue-900 dark:text-sky-200">console</span><span>.</span><span
      class=" text-stone-600 dark:text-yellow-200">log</span
    ><span class="text-blue-600 dark:text-yellow-300">&#40</span><span class="dark:text-sky-500">secretMessage</span
    >.<span class="text-stone-600 dark:text-yellow-200">join</span><span class="text-teal-600 dark:text-pink-400"
      >&#40</span
    ><span class="text-yellow-900 dark:text-orange-400">' '</span><span class="text-teal-600 dark:text-pink-400"
      >&#41</span
    ><span class="text-blue-600 dark:text-yellow-300">&#41</span>
  </p>
</div>
