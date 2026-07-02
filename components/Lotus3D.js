'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Lotus3D() {
  const mountRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Ensure we have a real size (aspect-square may not compute on first paint)
    const getSize = () => {
      const w = mount.clientWidth || mount.getBoundingClientRect().width || 500
      const h = mount.clientHeight || mount.getBoundingClientRect().height || w
      return { w: Math.max(w, 300), h: Math.max(h, 300) }
    }
    let { w: width, h: height } = getSize()

    // === SCENE ===
    const scene = new THREE.Scene()

    // === CAMERA ===
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 2.6, 5.5)
    camera.lookAt(0, 0.2, 0)

    // === RENDERER ===
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    mount.appendChild(renderer.domElement)

    // === LIGHTS ===
    const ambient = new THREE.AmbientLight(0xF5F1E8, 0.65)
    scene.add(ambient)

    const key = new THREE.DirectionalLight(0xF5E9D0, 1.1)
    key.position.set(5, 8, 4)
    scene.add(key)

    const rim = new THREE.DirectionalLight(0xB8935D, 0.5)
    rim.position.set(-5, 3, -3)
    scene.add(rim)

    const centerLight = new THREE.PointLight(0xD4B896, 2.2, 8, 2)
    centerLight.position.set(0, 0.8, 0)
    scene.add(centerLight)

    // === LOTUS GROUP ===
    const lotus = new THREE.Group()
    scene.add(lotus)

    // Petal material (shared)
    const petalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xD4B896,
      metalness: 0.45,
      roughness: 0.35,
      clearcoat: 0.7,
      clearcoatRoughness: 0.2,
      emissive: 0xA67C52,
      emissiveIntensity: 0.15,
    })
    const innerPetalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xE6C896,
      metalness: 0.4,
      roughness: 0.3,
      clearcoat: 0.8,
      emissive: 0xB8935D,
      emissiveIntensity: 0.2,
    })

    const makePetalGeometry = () => new THREE.SphereGeometry(1, 24, 24)

    // Layer 1 — outer petals (12)
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      const r = 1.65
      const petal = new THREE.Mesh(makePetalGeometry(), petalMaterial)
      petal.position.set(Math.cos(angle) * r, -0.15, Math.sin(angle) * r)
      petal.scale.set(0.35, 1.2, 0.15)
      // Rotate so the tip faces up-outward
      petal.rotation.z = Math.PI / 2 - angle // splay outward
      petal.rotation.x = Math.PI / 2
      petal.lookAt(Math.cos(angle) * r * 2.5, 0.8, Math.sin(angle) * r * 2.5)
      petal.userData = { baseY: petal.position.y, phase: i * 0.4 }
      lotus.add(petal)
    }

    // Layer 2 — middle petals (10)
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2 + Math.PI / 10
      const r = 1.15
      const petal = new THREE.Mesh(makePetalGeometry(), petalMaterial)
      petal.position.set(Math.cos(angle) * r, 0.15, Math.sin(angle) * r)
      petal.scale.set(0.32, 1.05, 0.13)
      petal.lookAt(Math.cos(angle) * r * 2.5, 1.0, Math.sin(angle) * r * 2.5)
      petal.userData = { baseY: petal.position.y, phase: i * 0.35 + 0.5 }
      lotus.add(petal)
    }

    // Layer 3 — inner petals (8)
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + Math.PI / 8
      const r = 0.65
      const petal = new THREE.Mesh(makePetalGeometry(), innerPetalMaterial)
      petal.position.set(Math.cos(angle) * r, 0.4, Math.sin(angle) * r)
      petal.scale.set(0.28, 0.8, 0.12)
      petal.lookAt(Math.cos(angle) * r * 2.5, 1.5, Math.sin(angle) * r * 2.5)
      petal.userData = { baseY: petal.position.y, phase: i * 0.3 + 1.0 }
      lotus.add(petal)
    }

    // Center pistil (glowing sphere)
    const pistilMat = new THREE.MeshPhysicalMaterial({
      color: 0xF5E9D0,
      metalness: 0.3,
      roughness: 0.3,
      emissive: 0xE6C896,
      emissiveIntensity: 0.6,
      clearcoat: 0.9,
    })
    const pistil = new THREE.Mesh(new THREE.SphereGeometry(0.36, 32, 32), pistilMat)
    pistil.position.set(0, 0.6, 0)
    lotus.add(pistil)

    // Golden base ring
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xB8935D,
      metalness: 0.85,
      roughness: 0.35,
      emissive: 0xA67C52,
      emissiveIntensity: 0.2,
    })
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.95, 0.08, 12, 64), ringMat)
    ring.rotation.x = Math.PI / 2
    ring.position.y = -0.5
    lotus.add(ring)

    // === ORBIT PARTICLES ===
    const particleGroup = new THREE.Group()
    scene.add(particleGroup)
    const particleGeometry = new THREE.SphereGeometry(0.04, 8, 8)
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0xD4B896 })
    const particles = []
    for (let i = 0; i < 35; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = 3.0 + Math.random() * 0.8
      const y = (Math.random() - 0.5) * 2.6
      const p = new THREE.Mesh(particleGeometry, particleMaterial)
      p.position.set(Math.cos(angle) * r, y, Math.sin(angle) * r)
      p.userData = { angle, radius: r, y, speed: 0.2 + Math.random() * 0.4, size: 0.5 + Math.random() * 1.5 }
      p.scale.setScalar(p.userData.size)
      particleGroup.add(p)
      particles.push(p)
    }

    // === MOUSE ===
    const onMove = (e) => {
      const r = mount.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2
      mouseRef.current.y = ((e.clientY - r.top) / r.height - 0.5) * 2
    }
    const onLeave = () => { mouseRef.current.x = 0; mouseRef.current.y = 0 }
    mount.addEventListener('mousemove', onMove)
    mount.addEventListener('mouseleave', onLeave)

    // === RESIZE ===
    const onResize = () => {
      const { w, h } = getSize()
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(mount)
    // Also trigger a resize on window resize (fallback)
    window.addEventListener('resize', onResize)
    // Fire a delayed resize to catch layout stabilization
    const initTimer = setTimeout(onResize, 200)

    // === ANIMATE ===
    let raf
    const clock = new THREE.Clock()
    let targetRotX = 0, targetRotZ = 0
    const animate = () => {
      const t = clock.getElapsedTime()
      // Slow auto-spin
      lotus.rotation.y += 0.004
      // Mouse-tilt
      targetRotX = mouseRef.current.y * 0.35
      targetRotZ = -mouseRef.current.x * 0.35
      lotus.rotation.x += (targetRotX - lotus.rotation.x) * 0.05
      lotus.rotation.z += (targetRotZ - lotus.rotation.z) * 0.05

      // Gentle bob per petal
      lotus.children.forEach((child) => {
        if (child.userData && child.userData.baseY !== undefined) {
          child.position.y = child.userData.baseY + Math.sin(t * 1.2 + child.userData.phase) * 0.04
        }
      })

      // Pistil pulse
      const p = 1 + Math.sin(t * 2) * 0.05
      pistil.scale.setScalar(p)
      centerLight.intensity = 2.5 + Math.sin(t * 2) * 0.6

      // Orbit particles
      particleGroup.rotation.y = t * 0.15
      particles.forEach((pt, i) => {
        pt.position.y = pt.userData.y + Math.sin(t * pt.userData.speed + i) * 0.15
      })

      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    // === CLEANUP ===
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(initTimer)
      ro.disconnect()
      window.removeEventListener('resize', onResize)
      mount.removeEventListener('mousemove', onMove)
      mount.removeEventListener('mouseleave', onLeave)
      renderer.dispose()
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose())
          else obj.material.dispose()
        }
      })
      if (renderer.domElement && renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="w-full aspect-square max-w-[560px] mx-auto relative">
      {/* Halo behind */}
      <div
        className="absolute inset-8 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,184,150,0.25) 0%, rgba(212,184,150,0) 65%)',
          filter: 'blur(16px)',
        }}
      />
      <div ref={mountRef} className="relative w-full h-full" />
    </div>
  )
}
