<script lang="ts">
  import { onMount } from 'svelte'

  type Project = {
    name: string
    image: string
    description: string
  }

  type ProjectCategory = {
    name: string
    projects: Project[]
  }

  const projectCategories: ProjectCategory[] = [
    {
      name: 'Game dev',
      projects: [
        {
          name: 'Cook Smart',
          image:
            'https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_1793,h_860/https://www.partnersoft.sk/wp-content/uploads/2020/04/mockup-vyvoj-mobilnych-app1.jpg',
          description: 'My first larger scale web app',
        },
        {
          name: '2D shooter',
          image:
            'https://cdn.vox-cdn.com/thumbor/di767SB3CWfzdTtffECHRTO2UAg=/0x0:960x540/1400x788/filters:focal(480x270:481x271)/cdn.vox-cdn.com/uploads/chorus_asset/file/14363954/8963287663_e8780835e8_b.1419979648.jpg',
          description: 'Simple 2d game',
        },
      ],
    },
    {
      name: 'Web app dev',
      projects: [
        {
          name: 'Cook Smart',
          image:
            'https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_1793,h_860/https://www.partnersoft.sk/wp-content/uploads/2020/04/mockup-vyvoj-mobilnych-app1.jpg',
          description: 'My first larger scale web app',
        },
        {
          name: 'PHP server',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX4s8e6QUZaCZz452smjz7HWppjK1VoPuOUvh3OcxbDw&s',
          description: 'My first larger scale web app',
        },
        {
          name: 'PHP server',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX4s8e6QUZaCZz452smjz7HWppjK1VoPuOUvh3OcxbDw&s',
          description: 'My first larger scale web app',
        },
        {
          name: 'PHP server',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX4s8e6QUZaCZz452smjz7HWppjK1VoPuOUvh3OcxbDw&s',
          description: 'My first larger scale web app',
        },
      ],
    },
    {
      name: 'Mobile app dev',
      projects: [
        {
          name: '',
          image: '',
          description: '',
        },
      ],
    },
  ]

  let selectedProjectCategory: ProjectCategory = projectCategories[1]
  let showcasedProjects: Project[] = []

  $: {
    const projects = selectedProjectCategory.projects

    if (projects.length > 2) {
      showcasedProjects = [projects[projects.length - 1], projects[0], projects[1]]
    } else if (projects.length > 1) {
      showcasedProjects = [projects[0], projects[1]]
    } else if (projects.length > 0) {
      showcasedProjects = [projects[0]]
    }
  }

  const handleCategoryMouseEnter = (e: Event, category: ProjectCategory) => {
    const underline = document.getElementById(`projects-underline-${category.name}`)
    if (underline) {
      underline.style.width = '100%'
    }
  }

  const handleCategoryMouseLeave = (e: Event, category: ProjectCategory) => {
    const underline = document.getElementById(`projects-underline-${category.name}`)
    if (underline && selectedProjectCategory !== category) {
      underline.style.width = '0%'
    }
  }

  const handleCategoryClick = (e: Event, category: ProjectCategory) => {
    if (selectedProjectCategory === category) {
      return
    } else {
      const underline = document.getElementById(`projects-underline-${selectedProjectCategory.name}`)
      if (underline) {
        underline.style.width = '0%'
      }
      selectedProjectCategory = category
    }
  }

  // $: () => {
  //   if (selectedCategory) {
  //     const underline = document.getElementById(`projects-underline-${selectedCategory}`)
  //     if (underline) {
  //       underline.style.width = '100%'
  //     }
  //   }
  // }

  onMount(() => {
    if (selectedProjectCategory) {
      const underline = document.getElementById(`projects-underline-${selectedProjectCategory.name}`)
      if (underline) {
        underline.style.width = '100%'
      }
    }
  })
</script>

<div class="flex w-full flex-col items-center">
  <ul class="flex w-full items-center justify-evenly">
    {#each projectCategories as projectCategory}
      <li>
        <button
          on:click={e => handleCategoryClick(e, projectCategory)}
          on:mouseenter={e => handleCategoryMouseEnter(e, projectCategory)}
          on:mouseleave={e => handleCategoryMouseLeave(e, projectCategory)}
          class="flex flex-col items-center justify-center transition duration-300 {selectedProjectCategory ===
          projectCategory
            ? 'scale-125'
            : ''}"
        >
          <p>
            {projectCategory.name}
          </p>
          <div
            class="transition-width w-0 border-b border-light-primary duration-300 dark:border-dark-primary"
            id="projects-underline-{projectCategory.name}"
          ></div>
        </button>
      </li>
    {/each}
  </ul>
  <div class="mt-6 flex items-center justify-center space-x-2 px-4">
    {#if showcasedProjects.length > 2}
      {#each showcasedProjects as project, i}
        {#if i === 0}
          <div class="flex w-full flex-col items-center justify-center md:w-1/4">
            <h3>{project.name}</h3>
            <img src={project.image} alt={project.name} class="mt-10" />
          </div>
        {:else if i === 1}
          <div class="flex w-full flex-col items-center justify-center">
            <h3 class="text-xl">{project.name}</h3>
            <img src={project.image} alt={project.name} class="mt-10" />
          </div>
        {:else if i === 2}
          <div class="flex w-full flex-col items-center justify-center md:w-1/4">
            <h3>{project.name}</h3>
            <img src={project.image} alt={project.name} class="mt-10" />
          </div>
        {/if}
      {/each}
    {:else}
      {#each showcasedProjects as project, i}
        {#if i === 0}
          <div class="flex w-full flex-col items-center justify-center">
            <h3 class="text-xl">{project.name}</h3>
            <img src={project.image} alt={project.name} class="mt-10 md:w-1/2" />
          </div>
        {:else if i === 1}
          <div class="flex w-full flex-col items-center justify-center">
            <h3>{project.name}</h3>
            <img src={project.image} alt={project.name} class="mt-10 md:w-1/2" />
          </div>
        {/if}
      {/each}
    {/if}
  </div>
</div>
