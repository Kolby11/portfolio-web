<script lang="ts">
  import MaterialSymbolsArrowBackIosRounded from '~icons/material-symbols/arrow-back-ios-rounded'
  import MaterialSymbolsArrowForwardIosRounded from '~icons/material-symbols/arrow-forward-ios-rounded'
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
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX4s8e6QUZaCZz452smjz7HWppjK1VoPuOUvh3OcxbDw&s',
            'https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_1793,h_860/https://www.partnersoft.sk/wp-content/uploads/2020/04/mockup-vyvoj-mobilnych-app1.jpg',
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
  let selectedProjectImageIndex: number = 0

  const handleProjectClick = (e: Event, project: Project, projectCategory: ProjectCategory) => {
    selectedProject = project
    selectedProjectCategory = projectCategory
    selectedProjectImageIndex = 0
  }

  function clickPrevImage() {
    if (selectedProjectImageIndex == 0) {
      selectedProjectImageIndex = selectedProject.images.length - 1
      return
    }
    selectedProjectImageIndex -= 1
  }

  function clickNextImage() {
    if (selectedProjectImageIndex >= selectedProject.images.length - 1) {
      selectedProjectImageIndex = 0
      return
    }
    selectedProjectImageIndex += 1
  }

  function fillProjectsForAnimation(projects: Project[], minCount: number = 6): Project[] {
    let filledProjects: Project[] = []
    while (filledProjects.length < minCount) {
      filledProjects = [...filledProjects, ...projects]
    }
    return filledProjects
  }
</script>

<div class="flex w-full flex-col items-center">
  <div class="mt-10 flex w-full flex-col items-start justify-between gap-y-8 px-4 md:px-10 lg:flex-row">
    <div class="grid grid-cols-1 gap-8 overflow-hidden sm:grid-cols-2 md:grid-cols-3">
      {#each projectCategories as projectCategory, projectCategoryIndex}
        <div class="scroll-container">
          <div class={projectCategoryIndex % 2 === 0 ? 'scroll-content' : 'scroll-content-reverse'}>
            <div class="flex flex-col items-center">
              <!-- <h4 class="mb-2 text-center text-lg">{projectCategory.name}</h4> -->
              <div class="flex flex-col gap-4 transition">
                {#each fillProjectsForAnimation(projectCategory.projects) as project, i}
                  <button
                    on:click={e => handleProjectClick(e, project, projectCategory)}
                    class={`size-28 shadow-gray-50 transition duration-300 sm:size-28 md:size-32 lg:size-44 ${selectedProject.name === project.name ? 'scale-110' : 'hover:scale-105'}`}
                  >
                    <img src={project.images[0]} alt={project.name} class="aspect-square rounded-lg object-cover" />
                  </button>
                {/each}
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
    <div class="flex flex-col items-center justify-center sm:px-0 lg:w-1/2">
      <h3 class="text-2xl">{selectedProject.name}</h3>
      <div class="flex h-full w-full items-center justify-center gap-x-4 p-2">
        <div class="flex w-fit flex-col items-center justify-center">
          <button on:click={clickPrevImage}><MaterialSymbolsArrowBackIosRounded /></button>
        </div>
        <div class="w-full">
          <img
            src={selectedProject.images[selectedProjectImageIndex]}
            alt={selectedProject.name}
            class="mt-2 aspect-video w-full rounded-xl object-cover"
          />
        </div>
        <div class="flex w-fit flex-col items-center justify-center">
          <button on:click={clickNextImage}><MaterialSymbolsArrowForwardIosRounded /></button>
        </div>
      </div>
      <p class="w-full border-b px-8 text-center">
        {selectedProject.description}
      </p>
    </div>
  </div>
</div>

<style lang="scss">
  @keyframes scrollDown {
    0% {
      transform: translateY(-50%);
    }
    100% {
      transform: translateY(0%);
    }
  }

  @keyframes scrollUp {
    0% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY(-50%);
    }
  }

  .scroll-container {
    height: 600px; /* Adjust based on your needs */
  }

  .scroll-content {
    animation: scrollDown 60s linear infinite;
  }

  .scroll-content-reverse {
    animation: scrollUp 60s linear infinite;
  }
</style>
