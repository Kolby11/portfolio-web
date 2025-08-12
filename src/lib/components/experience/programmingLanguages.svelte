<script lang="ts">
  import type { LogoObject } from '$lib/data/programmingLanguages'
  import { onMount } from 'svelte'
  import * as THREE from 'three'
  import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

  type ProgrammingLanguagesProps = {
    logos: LogoObject[]
  }

  const { logos }: ProgrammingLanguagesProps = $props()

  const loader = new GLTFLoader()

  const defaultCameraPosition = 5
  const lookAtSensitivity = 0.05 // How quickly models turn to follow mouse (0-1)
  const lookAtDistance = 2 // How far ahead of the model to look

  let node: HTMLDivElement
  let scene: THREE.Scene
  let camera: THREE.PerspectiveCamera
  let renderer: THREE.WebGLRenderer
  let logoModels: THREE.Object3D[] = []

  let mousePosition = $state(new THREE.Vector2(0, 0))
  let worldMousePosition = $state(new THREE.Vector3())

  onMount(() => {
    if (typeof window === 'undefined' || !node) {
      console.error('Window undefined or node not found')
      return
    }

    initializeScene()
    initializeAndRender()

    window.addEventListener('resize', onWindowResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', onWindowResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  })

  function initializeScene() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor(0x0000ff, 0)
  }

  async function initializeAndRender() {
    await setupScene()
    animate()
  }

  async function setupScene() {
    const nodeRect = node.getBoundingClientRect()

    camera.aspect = nodeRect.width / nodeRect.height
    camera.updateProjectionMatrix()

    renderer.setSize(nodeRect.width, nodeRect.height)
    node.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
    directionalLight.position.set(0, 1, 1)
    scene.add(directionalLight)

    await Promise.all(logos.map(loadLogo))

    camera.position.z = defaultCameraPosition
  }

  async function loadLogo(logo: LogoObject, index: number) {
    try {
      const gltf = await loadGLB(logo.glbPath)
      gltf.scene.name = logo.name

      const model = gltf.scene

      // Random positioning within a defined area (X and Y only)
      const spreadX = 4 // How wide the random area should be
      const spreadY = 3 // How tall the random area should be

      // Generate random positions with some minimum distance between models
      const minDistance = 1.5 // Minimum distance between models
      let validPosition = false
      let attempts = 0
      let randomX = 0,
        randomY = 0

      while (!validPosition && attempts < 50) {
        randomX = (Math.random() - 0.5) * spreadX
        randomY = (Math.random() - 0.5) * spreadY

        // Check distance from other models (only X and Y)
        validPosition = logoModels.every(existingModel => {
          const distance = new THREE.Vector2(randomX, randomY).distanceTo(
            new THREE.Vector2(existingModel.position.x, existingModel.position.y)
          )
          return distance >= minDistance
        })

        attempts++
      }

      // If we couldn't find a valid random position, fall back to grid
      if (!validPosition) {
        const spacing = 2
        const itemsPerRow = Math.ceil(Math.sqrt(logos.length))
        const row = Math.floor(index / itemsPerRow)
        const col = index % itemsPerRow

        model.position.x = (col - (itemsPerRow - 1) / 2) * spacing + (Math.random() - 0.5) * 0.5
        model.position.y =
          (row - (Math.ceil(logos.length / itemsPerRow) - 1) / 2) * spacing + (Math.random() - 0.5) * 0.5
        model.position.z = 0
      } else {
        model.position.x = randomX
        model.position.y = randomY
        model.position.z = 0
      }

      model.traverse(child => {
        if (child instanceof THREE.Mesh) {
          if (child.material) {
            if (child.material.map) {
              child.material.map.wrapS = THREE.RepeatWrapping
              child.material.map.wrapT = THREE.RepeatWrapping
            }
            child.material.side = THREE.DoubleSide
          }
        }
      })

      scene.add(model)
      logoModels.push(model)
    } catch (error) {
      console.error(`Error loading logo: ${logo.glbPath}`, error)
    }
  }

  function loadGLB(path: string): Promise<GLTF> {
    return new Promise((resolve, reject) => {
      loader.load(
        path,
        gltf => resolve(gltf),
        xhr => console.log(`${path}: ${(xhr.loaded / xhr.total) * 100}% loaded`),
        error => reject(error)
      )
    })
  }

  function onWindowResize() {
    if (!node) return

    const nodeRect = node.getBoundingClientRect()

    camera.aspect = nodeRect.width / nodeRect.height
    camera.updateProjectionMatrix()

    renderer.setSize(nodeRect.width, nodeRect.height)
  }

  function handleMouseMove(e: MouseEvent) {
    if (!node) return

    const rect = node.getBoundingClientRect()

    // Normalize mouse position to [-1, 1] range
    mousePosition.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mousePosition.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

    // Convert mouse position to world coordinates
    const mouse3D = new THREE.Vector3(mousePosition.x, mousePosition.y, 0.5)
    mouse3D.unproject(camera)

    // Create direction from camera to mouse position
    const direction = mouse3D.sub(camera.position).normalize()

    // Set world mouse position at a fixed distance from camera
    worldMousePosition.copy(camera.position).add(direction.multiplyScalar(lookAtDistance))
  }

  function animate() {
    requestAnimationFrame(animate)

    logoModels.forEach(model => {
      // Create a target position that's slightly in front of the model towards the mouse
      const modelPosition = model.position.clone()
      const targetPosition = worldMousePosition.clone()

      // Make each model look at the mouse position
      // You can also add some interpolation for smoother movement
      const currentLookAt = new THREE.Vector3()
      model.getWorldDirection(currentLookAt)

      const desiredDirection = targetPosition.clone().sub(modelPosition).normalize()

      // Smooth interpolation between current direction and desired direction
      currentLookAt.lerp(desiredDirection, lookAtSensitivity)

      // Apply the lookAt
      model.lookAt(modelPosition.clone().add(currentLookAt))
    })

    renderer.render(scene, camera)
  }
</script>

<div
  bind:this={node}
  role="doc-abstract"
  aria-roledescription="Programming languages display"
  class="h-full w-full"
  style="min-height: 500px;"
></div>
