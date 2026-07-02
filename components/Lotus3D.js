'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Lotus3D() {
  const mountRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

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
    camera.position.set(0, 3.5, 6)
    camera.lookAt(0, 0, 0)

    // === RENDERER ===
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    mount.appendChild(renderer.domElement)

    // === LIGHTS ===
    const ambient = new THREE.AmbientLight(0xF5F1E8, 0.7)
    scene.add(ambient)

    const key = new THREE.DirectionalLight(0xF5E9D0, 1.0)
    key.position.set(5, 8, 4)
    scene.add(key)

    const rim = new THREE.DirectionalLight(0xD4B896, 0.4)
    rim.position.set(-5, 3, -3)
    scene.add(rim)

    const centerLight = new THREE.PointLight(0xE6C896, 2.0, 8, 2)
    centerLight.position.set(0, 0.8, 0)
    scene.add(centerLight)

    // === LOTUS GROUP ===
    const lotus = new THREE.Group()
    scene.add(lotus)

    // Petal material
    const petalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xE6C896,
      metalness: 0.2,
      roughness: 0.5,
      clearcoat: 0.5,
      clearcoatRoughness: 0.3,
      emissive: 0xB8935D,
      emissiveIntensity: 0.1,
      side: THREE.DoubleSide,
    })
    
    const innerPetalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xF5E9D0,
      metalness: 0.15,
      roughness: 0.4,
      clearcoat: 0.6,
      emissive: 0xD4B896,
      emissiveIntensity: 0.15,
      side: THREE.DoubleSide,
    })

    // Create realistic lotus petal shape
    const createLotusPetal = (width, length, curve = 0.8) => {
      const shape = new THREE.Shape()
      
      // Draw petal outline (teardrop/ellipse shape)
      shape.moveTo(0, 0)
      shape.bezierCurveTo(
        width * 0.6, length * 0.2,
        width * 0.8, length * 0.6,
        width * 0.3, length
      )
      shape.bezierCurveTo(
        0, length * 0.9,
        -width * 0.3, length,
        -width * 0.8, length * 0.6
      )
      shape.bezierCurveTo(
        -width * 0.6, length * 0.2,
        -width * 0.4, 0,
        0, 0
      )

      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 0.02,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.03,
        bevelSegments: 3,
        curveSegments: 24,
      })

      return geometry
    }

    // Layer 1 - Outer petals (16)
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2
      const petal = new THREE.Mesh(createLotusPetal(0.4, 1.2), petalMaterial)
      
      const r = 1.4
      petal.position.set(Math.cos(angle) * r, -0.3, Math.sin(angle) * r)
      
      // Rotate petal to face outward and curve upward
      petal.rotation.x = Math.PI / 3
      petal.rotation.z = -angle
      petal.rotation.y = Math.PI / 8
      
      petal.userData = { baseY: petal.position.y, phase: i * 0.3 }
      lotus.add(petal)
    }

    // Layer 2 - Middle petals (12)
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + Math.PI / 12
      const petal = new THREE.Mesh(createLotusPetal(0.35, 1.0), petalMaterial)
      
      const r = 0.9
      petal.position.set(Math.cos(angle) * r, 0.1, Math.sin(angle) * r)
      
      petal.rotation.x = Math.PI / 4
      petal.rotation.z = -angle
      petal.rotation.y = Math.PI / 6
      
      petal.userData = { baseY: petal.position.y, phase: i * 0.25 + 0.5 }
      lotus.add(petal)
    }

    // Layer 3 - Inner petals (8)
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + Math.PI / 8
      const petal = new THREE.Mesh(createLotusPetal(0.3, 0.7), innerPetalMaterial)
      
      const r = 0.5
      petal.position.set(Math.cos(angle) * r, 0.4, Math.sin(angle) * r)
      
      petal.rotation.x = Math.PI / 6
      petal.rotation.z = -angle
      petal.rotation.y = Math.PI / 5
      
      petal.userData = { baseY: petal.position.y, phase: i * 0.2 + 1.0 }
      lotus.add(petal)
    }

    // Center pistil (stamens cluster)
    const pistilGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.4, 16)
    const pistilMat = new THREE.MeshPhysicalMaterial({
      color: 0xF5DC96,
      metalness: 0.2,
      roughness: 0.4,
      emissive: 0xE6C896,
      emissiveIntensity: 0.5,
    })
    
    for (let i = 0; i < 20; i++) {
      const stamen = new THREE.Mesh(pistilGeometry, pistilMat)
      const angle = (i / 20) * Math.PI * 2
      const r = 0.15 + Math.random() * 0.1
      stamen.position.set(
        Math.cos(angle) * r,
        0.6 + Math.random() * 0.15,
        Math.sin(angle) * r
      )
      stamen.rotation.x = (Math.random() - 0.5) * 0.2
      stamen.rotation.z = (Math.random() - 0.5) * 0.2
      lotus.add(stamen)
    }

    // Center stigma
    const stigma = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 32, 32),
      new THREE.MeshPhysicalMaterial({
        color: 0xE6C896,
        metalness: 0.3,
        roughness: 0.3,
        emissive: 0xD4B896,
        emissiveIntensity: 0.6,
      })
    )
    stigma.position.y = 0.6
    lotus.add(stigma)

    // === SUBTLE PARTICLES ===
    const particleGroup = new THREE.Group()
    scene.add(particleGroup)
    const particleGeometry = new THREE.SphereGeometry(0.03, 6, 6)
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0xD4B896 })
    const particles = []
    
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = 2.5 + Math.random() * 0.6
      const y = (Math.random() - 0.5) * 2.0
      const p = new THREE.Mesh(particleGeometry, particleMaterial)
      p.position.set(Math.cos(angle) * r, y, Math.sin(angle) * r)
      p.userData = { angle, radius: r, y, speed: 0.15 + Math.random() * 0.3, size: 0.6 + Math.random() * 1.2 }
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
    window.addEventListener('resize', onResize)
    const initTimer = setTimeout(onResize, 200)

    // === ANIMATE ===
    let raf
    const clock = new THREE.Clock()
    let targetRotX = 0, targetRotZ = 0
    
    const animate = () => {
      const t = clock.getElapsedTime()
      
      // Gentle auto-rotation
      lotus.rotation.y += 0.003
      
      // Mouse tilt
      targetRotX = mouseRef.current.y * 0.25
      targetRotZ = -mouseRef.current.x * 0.25
      lotus.rotation.x += (targetRotX - lotus.rotation.x) * 0.04
      lotus.rotation.z += (targetRotZ - lotus.rotation.z) * 0.04

      // Gentle petal movement
      lotus.children.forEach((child) => {
        if (child.userData && child.userData.baseY !== undefined) {
          child.position.y = child.userData.baseY + Math.sin(t * 0.8 + child.userData.phase) * 0.03
        }
      })

      // Stigma pulse
      const pulse = 1 + Math.sin(t * 1.5) * 0.04
      stigma.scale.setScalar(pulse)
      centerLight.intensity = 1.8 + Math.sin(t * 1.5) * 0.4

      // Orbit particles
      particleGroup.rotation.y = t * 0.1
      particles.forEach((pt, i) => {
        pt.position.y = pt.userData.y + Math.sin(t * pt.userData.speed + i) * 0.12
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
      <div
        className="absolute inset-8 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,184,150,0.2) 0%, rgba(212,184,150,0) 65%)',
          filter: 'blur(14px)',
        }}
      />
      <div ref={mountRef} className="relative w-full h-full" />
    </div>
  )
}
