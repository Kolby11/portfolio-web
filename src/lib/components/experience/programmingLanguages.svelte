<script lang="ts">
  import type { LogoObject } from '$lib/data/programmingLanguages'
  import type { NumericRange } from '@sveltejs/kit'
  import { onMount } from 'svelte'
  import * as THREE from 'three'
  import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
  import { gsap } from 'gsap'

  export let logos: LogoObject[]

  const loader = new GLTFLoader()

  const maxRotationAngle = 10

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

  let isResetting = false
  let isPointerInScene = false

  function onPointerEnter() {
    if (typeof window === 'undefined') return
    console.log('Pointer entered')
    isPointerInScene = true
    window.addEventListener('pointermove', handlePointerMove)
  }

  function onPointerLeave() {
    if (typeof window === 'undefined') return
    console.log('Pointer left')
    isPointerInScene = false
    window.removeEventListener('pointermove', handlePointerMove)
    resetAnimation()
  }

  function resetAnimation() {
    isResetting = true
    const startTime = performance.now()
    const duration = 2000

    function animateReset(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      scene.traverse(object => {
        if (object instanceof THREE.Object3D) {
          object.rotation.x *= 1 - progress
          object.rotation.y *= 1 - progress
          object.rotation.z *= 1 - progress
        }
      })

      renderer.render(scene, camera)

      if (progress < 1 && isResetting) {
        requestAnimationFrame(animateReset)
      } else {
        isResetting = false
      }
    }

    requestAnimationFrame(animateReset)
  }

  function handlePointerMove(e: PointerEvent) {
    if (!node || !isPointerInScene) return

    const rect = node.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1

    pointerMoveAnimate({ x, y })
  }

  function pointerMoveAnimate(relativePointerPosition: { x: number; y: number }) {
    isResetting = false // Stop any ongoing reset animation

    scene.traverse(object => {
      if (object instanceof THREE.Object3D) {
        const rotationFactorX = relativePointerPosition.x * maxRotationAngle
        const rotationFactorY = -relativePointerPosition.y * maxRotationAngle

        object.rotation.x = THREE.MathUtils.degToRad(rotationFactorY)
        object.rotation.y = THREE.MathUtils.degToRad(rotationFactorX)
      }
    })

    renderer.render(scene, camera)
  }

  function animate() {
    requestAnimationFrame(animate)

    if (!isResetting && !isPointerInScene) {
      renderer.render(scene, camera)
    }
  }
</script>

<div
  bind:this={node}
  role="doc-abstract"
  aria-roledescription="Programming languages display"
  on:pointerenter={onPointerEnter}
  on:pointerleave={onPointerLeave}
  on:focus={() => {}}
  on:blur={() => {}}
  class="h-full w-full"
  style="min-height: 500px;"
></div>
