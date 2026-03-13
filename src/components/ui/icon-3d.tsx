import { cn } from '@/lib/utils'
import { type LucideIcon } from 'lucide-react'

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
}: Icon3DProps) {
  return (
    <Icon
      size={size}
      className={cn("shrink-0", className)}
      style={{ color }}
    />
  )
}

export function Icon3DFloat({
  icon: Icon,
  className,
  size = 24,
  color = 'currentColor',
}: Omit<Icon3DProps, 'hoverRotate'>) {
  return (
    <Icon
      size={size}
      className={cn("shrink-0", className)}
      style={{ color }}
    />
  )
}
