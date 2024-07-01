<script lang="ts">
  import { onMount } from 'svelte'

  type Project = {
    name: string
    images: string[]
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
          name: 'Cook Smart 1',
          images: [
            'https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_1793,h_860/https://www.partnersoft.sk/wp-content/uploads/2020/04/mockup-vyvoj-mobilnych-app1.jpg',
          ],
          description: 'My first larger scale web app',
        },
        {
          name: '2D shooter',
          images: [
            'https://cdn.vox-cdn.com/thumbor/di767SB3CWfzdTtffECHRTO2UAg=/0x0:960x540/1400x788/filters:focal(480x270:481x271)/cdn.vox-cdn.com/uploads/chorus_asset/file/14363954/8963287663_e8780835e8_b.1419979648.jpg',
          ],
          description: 'Simple 2d game',
        },
      ],
    },
    {
      name: 'Web app dev',
      projects: [
        {
          name: 'Cook Smart',
          images: [
            'https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_1793,h_860/https://www.partnersoft.sk/wp-content/uploads/2020/04/mockup-vyvoj-mobilnych-app1.jpg',
          ],
          description: 'My first larger scale web app',
        },
        {
          name: 'PHP server',
          images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX4s8e6QUZaCZz452smjz7HWppjK1VoPuOUvh3OcxbDw&s',
          ],
          description: 'My first larger scale web app',
        },
        {
          name: 'Test 2',
          images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX4s8e6QUZaCZz452smjz7HWppjK1VoPuOUvh3OcxbDw&s',
          ],
          description: 'My first larger scale web app',
        },
        {
          name: 'PHP server 2',
          images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX4s8e6QUZaCZz452smjz7HWppjK1VoPuOUvh3OcxbDw&s',
          ],
          description: 'My first larger scale web app',
        },
      ],
    },
    {
      name: 'Mobile app dev',
      projects: [
        {
          name: 'Exercise app',
          images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX4s8e6QUZaCZz452smjz7HWppjK1VoPuOUvh3OcxbDw&s',
          ],
          description: 'My first larger scale web app',
        },
      ],
    },
  ]

  let selectedProjectCategory: ProjectCategory = projectCategories[1]
  let selectedProject: Project = selectedProjectCategory.projects[0]

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

  const handleProjectClick = (e: Event, project: Project, projectCategory?: ProjectCategory) => {
    selectedProject = project
    projectCategory && (selectedProjectCategory = projectCategory)
  }

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
  <div class="mt-10 flex w-full flex-col items-center justify-between gap-y-8 px-4 md:px-10 lg:flex-row">
    <div class="flex w-fit flex-col gap-4">
      {#each projectCategories as projectCategory}
        <div>
          <h4 class="mb-2 text-center text-xl">{projectCategory.name}</h4>
          <div class={`flex w-full grid-cols-4 flex-wrap gap-4 transition`}>
            {#each projectCategory.projects as project, i}
              <button
                on:click={e => handleProjectClick(e, project, projectCategory)}
                class={`lg:size-42 drop-shadow-[0_10px_8px_rgba(249, 250, 251, 0.25)] size-20 shadow-gray-50 transition duration-300 sm:size-28 md:size-32 ${selectedProject.name === project.name ? 'scale-110' : 'hover:scale-105'}`}
              >
                <img src={project.images[0]} alt={project.name} class="aspect-square rounded-lg object-cover" />
              </button>
            {/each}
          </div>
        </div>
      {/each}
    </div>
    <div class="flex flex-col items-center justify-center sm:px-0 lg:w-1/2">
      <h3 class="mt-2 text-2xl">{selectedProject.name}</h3>
      <img
        src={selectedProject.images[0]}
        alt={selectedProject.name}
        class="aspect-video w-[500px] rounded-lg object-cover"
      />
      <p class="w-full border-b px-8 text-center">
        {selectedProject.description}
      </p>
    </div>
  </div>
</div>
