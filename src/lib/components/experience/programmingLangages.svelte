<script lang="ts">
  import { onMount } from 'svelte'
  import * as THREE from 'three'

  export let logos: THREE.Mesh[]

  const defaultCameraPosition = 10

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
    setupScene()

    // Initial render
    renderer.render(scene, camera)

    // Set up resize listener
    window.addEventListener('resize', onWindowResize)

    return () => {
      window.removeEventListener('resize', onWindowResize)
    }
  })

  function initializeScene() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor(0x0000ff, 1) // Development only
    // renderer.setClearColor(0x0000ff, 0)
  }

  function setupScene() {
    const nodeRect = node.getBoundingClientRect()

    // Update camera aspect ratio
    camera.aspect = nodeRect.width / nodeRect.height
    camera.updateProjectionMatrix()

    // Set renderer size
    renderer.setSize(nodeRect.width, nodeRect.height)
    node.appendChild(renderer.domElement)

    // Add logos to the scene
    logos.forEach((l, i) => {
      // const edges = new THREE.EdgesGeometry(l)
      // const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }))
      // scene.add(line)
      scene.add(l)
      l.position.x = i * 2
    })

    // Set camera position
    camera.position.z = defaultCameraPosition
  }

  function onWindowResize() {
    if (!node) return

    const nodeRect = node.getBoundingClientRect()

    // Update camera aspect ratio
    camera.aspect = nodeRect.width / nodeRect.height
    camera.updateProjectionMatrix()

    // Update renderer size
    renderer.setSize(nodeRect.width, nodeRect.height)

    // Re-render the scene
    renderer.render(scene, camera)
  }
</script>

<div bind:this={node} class="h-full w-full" style="min-height: 500px;"></div>
