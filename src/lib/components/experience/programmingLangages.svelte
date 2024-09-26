<script lang="ts">
  import type { LogoObject } from '$lib/data/programmingLanguages'
  import { onMount } from 'svelte'
  import * as THREE from 'three'
  import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

  export let logos: LogoObject[]

  const loader = new GLTFLoader()

  const defaultCameraPosition = 5
  let node: HTMLDivElement
  let scene: THREE.Scene
  let camera: THREE.PerspectiveCamera
  let renderer: THREE.WebGLRenderer

  onMount(() => {
    if (typeof window === 'undefined' || !node) {
      console.error('Window undefined or node not found')
      return
    }

    initializeScene()
    initializeAndRender()

    window.addEventListener('resize', onWindowResize)

    return () => {
      window.removeEventListener('resize', onWindowResize)
    }
  })

  function initializeScene() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    renderer = new THREE.WebGLRenderer({ antialias: true })
    // renderer.setClearColor(0x00ffff, 1) // Development only
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

    // Add lights
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
      const model = gltf.scene

      // Position the model
      model.position.x = index * 2

      // Ensure materials are correctly set up
      model.traverse(child => {
        if (child instanceof THREE.Mesh) {
          if (child.material) {
            // Enable texture wrapping if needed
            if (child.material.map) {
              child.material.map.wrapS = THREE.RepeatWrapping
              child.material.map.wrapT = THREE.RepeatWrapping
            }
            // Ensure double-sided rendering
            child.material.side = THREE.DoubleSide
          }
        }
      })

      // Add the model to the scene
      scene.add(model)
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

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
</script>

<div bind:this={node} class="h-full w-full" style="min-height: 500px;"></div>
