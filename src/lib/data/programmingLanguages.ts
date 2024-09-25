import * as THREE from 'three'

const pythonLogoGeometry = new THREE.BoxGeometry(1, 1, 1)
const pythonLogoMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const pythonLogo = new THREE.Mesh(pythonLogoGeometry, pythonLogoMaterial)

const typescriptLogoGeometry = new THREE.BoxGeometry(1, 1, 1)
const typescriptLogoMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const typescriptLogo = new THREE.Mesh(typescriptLogoGeometry, typescriptLogoMaterial)

const rustLogoGeometry = new THREE.BoxGeometry(1, 1, 1)
const rustLogoMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff })
const rustLogo = new THREE.Mesh(rustLogoGeometry, rustLogoMaterial)

export const programmingLangugagesLogos: THREE.Mesh[] = [pythonLogo, typescriptLogo, rustLogo]
