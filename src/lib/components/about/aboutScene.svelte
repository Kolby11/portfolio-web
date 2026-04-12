<script lang="ts">
  import type { LogoObject } from '$lib/data/programmingLanguages'
  import { onMount } from 'svelte'
  import * as THREE from 'three'
  import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

  const loader = new GLTFLoader()

  const { logos }: { logos: LogoObject[] } = $props()

  const defaultCameraPosition = 5
  const lookAtSensitivity = 0.05
  const lookAtDistance = 2

  // Floating animation
  const floatAmplitude = 0.12
  const floatSpeed = 0.6

  // Mouse push
  const pushRadius = 1
  const pushStrength = 2.5
  const springStrength = 0.02
  const damping = 0.88

  // Cursor dot-sphere
  const dotSphereRadius = 0.5
  const dotCount = 120

  interface LogoData {
    model: THREE.Object3D
    basePosition: THREE.Vector3
    velocity: THREE.Vector3
    timeOffset: number
  }

  let node: HTMLDivElement
  let scene: THREE.Scene
  let camera: THREE.PerspectiveCamera
  let renderer: THREE.WebGLRenderer
  let logoData: LogoData[] = []
  let startTime = 0
  let cursorGroup: THREE.Group

  let mousePosition = $state(new THREE.Vector2(0, 0))
  let worldMousePosition = $state(new THREE.Vector3())
  let mouseOverCanvas = false

  onMount(() => {
    if (typeof window === 'undefined' || !node) {
      console.error('Window undefined or node not found')
      return
    }

    initializeScene()
    initializeAndRender()

    window.addEventListener('resize', onWindowResize)
    window.addEventListener('mousemove', handleMouseMove)
    node.addEventListener('mouseenter', () => { mouseOverCanvas = true })
    node.addEventListener('mouseleave', () => { mouseOverCanvas = false })

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
    startTime = performance.now()
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

    // --- Cursor: 3D dot sphere ---
    cursorGroup = new THREE.Group()

    // Distribute dots evenly on a sphere using Fibonacci lattice
    const positions = new Float32Array(dotCount * 3)
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < dotCount; i++) {
      const y = 1 - (i / (dotCount - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = golden * i
      positions[i * 3]     = Math.cos(theta) * r * dotSphereRadius
      positions[i * 3 + 1] = y * dotSphereRadius
      positions[i * 3 + 2] = Math.sin(theta) * r * dotSphereRadius
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const mat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true
    })

    const dots = new THREE.Points(geo, mat)
    cursorGroup.add(dots)
    cursorGroup.visible = false
    scene.add(cursorGroup)

    camera.position.z = defaultCameraPosition
  }

  async function loadLogo(logo: LogoObject, index: number) {
    try {
      const gltf = await loadGLB(logo.glbPath)
      gltf.scene.name = logo.name

      const model = gltf.scene

      const spreadX = 4
      const spreadY = 3
      const minDistance = 1.5
      let validPosition = false
      let attempts = 0
      let randomX = 0,
        randomY = 0

      while (!validPosition && attempts < 50) {
        randomX = (Math.random() - 0.5) * spreadX
        randomY = (Math.random() - 0.5) * spreadY

        validPosition = logoData.every(({ model: existingModel }) => {
          const distance = new THREE.Vector2(randomX, randomY).distanceTo(
            new THREE.Vector2(existingModel.position.x, existingModel.position.y)
          )
          return distance >= minDistance
        })

        attempts++
      }

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
      logoData.push({
        model,
        basePosition: model.position.clone(),
        velocity: new THREE.Vector3(),
        timeOffset: Math.random() * Math.PI * 2
      })
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

    mousePosition.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mousePosition.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

    const mouse3D = new THREE.Vector3(mousePosition.x, mousePosition.y, 0.5)
    mouse3D.unproject(camera)

    const direction = mouse3D.sub(camera.position).normalize()

    worldMousePosition.copy(camera.position).add(direction.multiplyScalar(lookAtDistance))
  }

  function animate() {
    requestAnimationFrame(animate)

    const elapsed = (performance.now() - startTime) / 1000

    logoData.forEach(({ model, basePosition, velocity, timeOffset }) => {
      // --- Floating: sine/cosine drift around base position ---
      const floatX = Math.cos(elapsed * floatSpeed * 0.7 + timeOffset) * floatAmplitude
      const floatY = Math.sin(elapsed * floatSpeed + timeOffset) * floatAmplitude
      const floatTarget = basePosition.clone().add(new THREE.Vector3(floatX, floatY, 0))

      // --- Mouse repulsion ---
      const toMouse = model.position.clone().sub(worldMousePosition)
      toMouse.z = 0
      const dist = toMouse.length()
      if (dist < pushRadius && dist > 0.001) {
        const force = ((pushRadius - dist) / pushRadius) * pushStrength
        velocity.addScaledVector(toMouse.normalize(), force * 0.016)
      }

      // --- Spring back toward float target ---
      const toTarget = floatTarget.clone().sub(model.position)
      velocity.addScaledVector(toTarget, springStrength)

      // --- Damping & integrate ---
      velocity.multiplyScalar(damping)
      model.position.add(velocity)

      // --- LookAt mouse ---
      const currentLookAt = new THREE.Vector3()
      model.getWorldDirection(currentLookAt)
      const desiredDirection = worldMousePosition.clone().sub(model.position).normalize()
      currentLookAt.lerp(desiredDirection, lookAtSensitivity)
      model.lookAt(model.position.clone().add(currentLookAt))
    })

    // --- Cursor dot sphere ---
    if (cursorGroup) {
      cursorGroup.visible = mouseOverCanvas
      if (mouseOverCanvas) {
        cursorGroup.position.copy(worldMousePosition)
        // Two-axis slow rotation for a 3D globe feel
        cursorGroup.rotation.y = elapsed * 0.5
        cursorGroup.rotation.x = elapsed * 0.3
        // Subtle pulse on the dot opacity
        const dots = cursorGroup.children[0] as THREE.Points
        ;(dots.material as THREE.PointsMaterial).opacity = 0.55 + Math.sin(elapsed * 2.5) * 0.15
      }
    }

    renderer.render(scene, camera)
  }
</script>

<div
  bind:this={node}
  role="doc-abstract"
  aria-roledescription="About display"
  class="h-full w-full"
  style="height: 300px; width: 400px;"
></div>
