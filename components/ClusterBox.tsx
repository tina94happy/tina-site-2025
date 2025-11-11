"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ClusterBoxProps {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function ClusterBox({ title, subtitle, children, className }: ClusterBoxProps) {
  return (
    <div className={cn(
      "bg-gray-100/10 backdrop-blur-sm rounded-xl border border-gray-300/20 shadow-lg p-6",
      className
    )}>
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-300">{subtitle}</p>
          )}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}
