'use client'

import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  symbol: string
  color: string
}

interface FireworksProps {
  winner: 'X' | 'O'
}

let particleIdCounter = 0

export default function Fireworks({ winner }: FireworksProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  
  useEffect(() => {
    const colors = winner === 'X' ? ['#FFFF00', '#FFD700', '#FFA500'] : ['#00FFF0', '#00BFFF', '#1E90FF']
    
    const createBurst = (x: number, y: number) => {
      const newParticles: Particle[] = []
      const particleCount = 30
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount
        const velocity = 5 + Math.random() * 5
        newParticles.push({
          id: particleIdCounter++,
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 100,
          symbol: winner,
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }
      
      setParticles(prev => [...prev, ...newParticles])
    }
    
    // Create multiple bursts
    const burstPositions = [
      { x: 20, y: 30 },
      { x: 50, y: 20 },
      { x: 80, y: 30 },
      { x: 30, y: 60 },
      { x: 70, y: 60 }
    ]
    
    burstPositions.forEach((pos, index) => {
      setTimeout(() => {
        createBurst(pos.x, pos.y)
      }, index * 200)
    })
    
    // Animation loop
    const interval = setInterval(() => {
      setParticles(prev => prev
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx * 0.5,
          y: particle.y + particle.vy * 0.5,
          vy: particle.vy + 0.3, // gravity
          life: particle.life - 2
        }))
        .filter(particle => particle.life > 0)
      )
    }, 30)
    
    return () => clearInterval(interval)
  }, [winner])
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <svg width="100%" height="100%" className="absolute inset-0">
        {particles.map(particle => (
          <text
            key={particle.id}
            x={`${particle.x}%`}
            y={`${particle.y}%`}
            fill={particle.color}
            fontSize="24"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
            opacity={particle.life / 100}
            style={{
              filter: `drop-shadow(0 0 ${10 * (particle.life / 100)}px ${particle.color})`,
              transform: `scale(${0.5 + (particle.life / 100) * 0.5})`
            }}
          >
            {particle.symbol}
          </text>
        ))}
      </svg>
    </div>
  )
}