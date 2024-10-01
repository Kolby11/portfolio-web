<script lang="ts">
  import type { LogoObject } from '$lib/data/programmingLanguages'
  import { onMount } from 'svelte'
  import * as THREE from 'three'
  import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

  export let logos: LogoObject[]

  const loader = new GLTFLoader()

  const logoRotationSensitivity = 2
  const defaultCameraPosition = 5
  const maxRotationSpeed = 0.2 // Maximum rotation speed
  const minRotationSpeed = 0.1 // Minimum rotation speed

  let node: HTMLDivElement
  let scene: THREE.Scene
  let camera: THREE.PerspectiveCamera
  let renderer: THREE.WebGLRenderer
  let logoModels: THREE.Object3D[] = []

  let mousePosition = new THREE.Vector2()

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

      // Position the model
      model.position.x = index * 2
      model.position.y = 0
      model.position.z = 0

      // Make the model face the camera
      model.lookAt(camera.position)

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

  function handleMouseMove(event: MouseEvent) {
    if (!node) return

    const rect = node.getBoundingClientRect()
    mousePosition.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mousePosition.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  }

  function animate() {
    requestAnimationFrame(animate)

    logoModels.forEach((model, index) => {
      const logoPosition = new THREE.Vector3()
      model.getWorldPosition(logoPosition)

      const distance = new THREE.Vector2(logoPosition.x, logoPosition.y).distanceTo(mousePosition)

      let rotationSpeed = Math.max(minRotationSpeed, Math.min(distance * logoRotationSensitivity, maxRotationSpeed))

      // Calculate rotation based on mouse position
      const targetRotationY = (mousePosition.x * Math.PI) / 4
      const targetRotationX = (-mousePosition.y * Math.PI) / 4

      // Apply rotation
      model.rotation.y += (targetRotationY - model.rotation.y) * rotationSpeed
      model.rotation.x += (targetRotationX - model.rotation.x) * rotationSpeed
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
