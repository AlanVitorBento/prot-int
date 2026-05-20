import { motion } from 'motion/react'

interface SkeletonProps {
  className?: string
}

function Bone({ className = '' }: SkeletonProps) {
  return <div className={`skeleton ${className}`} />
}

export function CardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-[16px] border border-border/50 p-5"
    >
      <div className="flex items-start gap-4">
        <Bone className="w-20 h-20 rounded-[12px] flex-shrink-0" />
        <div className="flex-1 space-y-2.5">
          <div className="flex items-center gap-2">
            <Bone className="w-16 h-4 rounded-full" />
            <Bone className="w-12 h-4 rounded-full" />
          </div>
          <Bone className="w-3/4 h-5" />
          <Bone className="w-full h-4" />
          <Bone className="w-2/3 h-4" />
        </div>
      </div>
    </motion.div>
  )
}

export function WidgetSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-[16px] border border-border/50 p-4 space-y-3"
    >
      <div className="flex items-center gap-2">
        <Bone className="w-8 h-8 rounded-[12px]" />
        <Bone className="w-28 h-4" />
      </div>
      <div className="space-y-2">
        <Bone className="w-full h-10" />
        <Bone className="w-full h-10" />
        <Bone className="w-full h-10" />
      </div>
    </motion.div>
  )
}

export function QuickAccessSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-3"
    >
      <Bone className="w-24 h-4 mb-3" />
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-3 py-2.5 bg-white rounded-[16px] border border-border/50">
          <Bone className="w-9 h-9 rounded-[12px] flex-shrink-0" />
          <Bone className="w-20 h-4" />
        </div>
      ))}
    </motion.div>
  )
}

export function CarouselSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-[16px] overflow-hidden mb-6"
    >
      <Bone className="w-full h-[220px] !rounded-[16px]" />
    </motion.div>
  )
}

export default Bone
