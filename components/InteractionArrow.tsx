"use client"

import { cn } from "@/lib/utils"

interface InteractionArrowProps {
  className?: string
  direction?: "right" | "down" | "left" | "up"
  type?: "control" | "data" | "network"
}

const arrowConfig = {
  control: {
    color: "text-lofi-purple",
    bgColor: "bg-lofi-purple/20",
    borderColor: "border-lofi-purple/30"
  },
  data: {
    color: "text-lofi-blue", 
    bgColor: "bg-lofi-blue/20",
    borderColor: "border-lofi-blue/30"
  },
  network: {
    color: "text-lofi-accent",
    bgColor: "bg-lofi-accent/20", 
    borderColor: "border-lofi-accent/30"
  }
}

const directionConfig = {
  right: "rotate-0",
  down: "rotate-90",
  left: "rotate-180", 
  up: "-rotate-90"
}

export function InteractionArrow({ 
  className, 
  direction = "right", 
  type = "control" 
}: InteractionArrowProps) {
  const config = arrowConfig[type]
  const directionClass = directionConfig[direction]

  return (
    <div className={cn(
      "flex items-center justify-center",
      className
    )}>
      <div className={cn(
        "w-8 h-8 rounded-full border-2 flex items-center justify-center",
        config.bgColor,
        config.borderColor
      )}>
        <svg 
          className={cn(
            "w-4 h-4",
            config.color,
            directionClass
          )}
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fillRule="evenodd" 
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
            clipRule="evenodd" 
          />
        </svg>
      </div>
    </div>
  )
}

// 導出特定類型的箭頭組件
export function ControlFlowArrow(props: Omit<InteractionArrowProps, 'type'>) {
  return <InteractionArrow {...props} type="control" />
}

export function DataFlowArrow(props: Omit<InteractionArrowProps, 'type'>) {
  return <InteractionArrow {...props} type="data" />
}

export function NetworkFlowArrow(props: Omit<InteractionArrowProps, 'type'>) {
  return <InteractionArrow {...props} type="network" />
}
