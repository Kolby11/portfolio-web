<script lang="ts">
  import Navbar from '$lib/components/navbar.svelte'
  import Scrollbar from '$lib/components/scrollbar.svelte'
</script>

<div class="flex h-full w-full flex-col">
  <Scrollbar></Scrollbar>
  <Navbar></Navbar>
  <section id="home">
    <div class="h-screen min-h-fit px-10">
      <h1 class="text-2xl">Home</h1>
    </div>
  </section>
  <section id="about">
    <div class="h-screen min-h-fit px-10">
      <h1 class="text-2xl">About</h1>
    </div>
  </section>
  <section id="skills" class="h-full">
    <div class="h-screen min-h-fit px-10">
      <h1 class="text-2xl">Skills</h1>
    </div>
  </section>
  <section id="contact" class="h-full">
    <div class="h-screen min-h-fit px-10">
      <h1 class="text-2xl">Contact</h1>
    </div>
  </section>
</div>
