import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { type LucideIcon } from 'lucide-react'
import { type CSSProperties } from 'react'

interface Icon3DProps {
  icon: LucideIcon
  className?: string
  size?: number
  color?: string
  hoverRotate?: boolean
}

export function Icon3D({
  icon: Icon,
  className,
  size = 24,
  color = 'currentColor',
  hoverRotate = true
}: Icon3DProps) {

  return (
    <motion.div
      className={cn("inline-flex items-center justify-center relative", className)}
      whileHover={hoverRotate ? {
        rotateY: 15,
        rotateX: 10,
        scale: 1.15,
        transition: {
          duration: 0.3,
          ease: "easeOut"
        }
      } : {
        scale: 1.1,
        transition: { duration: 0.2 }
      }}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-40 -z-10"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          transform: 'translateZ(-10px) scale(1.8)'
        }}
      />

      {/* Shadow layer 1 (far) */}
      <Icon
        size={size}
        className="absolute opacity-10 blur-md"
        style={{
          color: color,
          transform: 'translateZ(-15px) translateY(6px) translateX(4px)'
        }}
      />

      {/* Shadow layer 2 (close) */}
      <Icon
        size={size}
        className="absolute opacity-20 blur-sm"
        style={{
          color: color,
          transform: 'translateZ(-8px) translateY(3px) translateX(2px)'
        }}
      />

      {/* Main icon with gradient */}
      <div
        className="relative"
        style={{
          transform: 'translateZ(10px)',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3)) drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
        }}
      >
        <Icon
          size={size}
          style={{ color }}
        />
        {/* Glossy highlight overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)',
            mixBlendMode: 'overlay',
            borderRadius: '4px'
          }}
        />
      </div>
    </motion.div>
  )
}

export function Icon3DFloat({
  icon: Icon,
  className,
  size = 24,
  color = 'currentColor'
}: Omit<Icon3DProps, 'hoverRotate'>) {

  return (
    <motion.div
      className={cn("inline-flex items-center justify-center relative", className)}
      animate={{
        y: [0, -10, 0],
        rotateZ: [-3, 3, -3],
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={{
        scale: 1.2,
        rotateY: 180,
        transition: { duration: 0.5, ease: "easeInOut" }
      }}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Animated glow */}
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl -z-10"
        animate={{
          opacity: [0.4, 0.6, 0.4],
          scale: [1.5, 2, 1.5]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          transform: 'translateZ(-20px)'
        }}
      />

      {/* Multiple shadow layers */}
      <Icon
        size={size}
        className="absolute opacity-20 blur-lg"
        style={{
          color: color,
          transform: 'translateZ(-20px) translateY(8px) translateX(4px)'
        }}
      />

      <Icon
        size={size}
        className="absolute opacity-15 blur-xl"
        style={{
          color: color,
          transform: 'translateZ(-25px) translateY(10px) translateX(6px)'
        }}
      />

      {/* Main icon */}
      <div
        className="relative"
        style={{
          transform: 'translateZ(15px)',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4)) drop-shadow(0 8px 16px rgba(0,0,0,0.3))'
        }}
      >
        <Icon
          size={size}
          style={{ color }}
        />
        {/* Animated glossy shine */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 50%)',
              'linear-gradient(225deg, rgba(255,255,255,0.5) 0%, transparent 50%)',
              'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            mixBlendMode: 'overlay',
            borderRadius: '4px'
          }}
        />
      </div>
    </motion.div>
  )
}
