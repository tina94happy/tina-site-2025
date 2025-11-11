"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { k8sData, flows, tooltips } from "@/lib/k8s-data"

interface InteractiveK8sDiagramProps {
  activeFlow: keyof typeof flows | null
  onNodeHover: (nodeId: string | null) => void
}

export function InteractiveK8sDiagram({ activeFlow, onNodeHover }: InteractiveK8sDiagramProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const getNodeStyle = (node: any) => {
    const baseStyle = "absolute transition-all duration-300 cursor-pointer flex items-center justify-center text-center"
    
    if (node.type === "group") {
      return `${baseStyle} border-2 border-indigo-500/30 bg-indigo-500/10 rounded-lg`
    }
    
    if (node.type === "actor") {
      return `${baseStyle} bg-black text-white rounded-full text-lg font-medium shadow-lg shadow-black/50`
    }
    
    if (node.type === "cloud") {
      return `${baseStyle} bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-medium`
    }
    
    if (node.type === "storage") {
      return `${baseStyle} bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-lg text-sm font-medium`
    }
    
    if (node.type === "pod") {
      return `${baseStyle} bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg text-sm font-medium`
    }
    
    return `${baseStyle} bg-slate-400/20 border border-slate-400/30 text-slate-300 rounded-lg text-sm font-medium`
  }

  const getNodeOpacity = (nodeId: string) => {
    if (!activeFlow) return 1
    
    const flow = flows[activeFlow]
    const activeNodes = flow.steps.flatMap(step => step.nodes)
    
    if (activeNodes.includes(nodeId)) return 1
    return 0.3
  }

  const getEdgeStyle = (edge: any) => {
    const baseStyle = "stroke-dasharray-5 stroke-2 fill-none"
    
    switch (edge.kind) {
      case "control":
        return `${baseStyle} stroke-blue-500`
      case "traffic":
        return `${baseStyle} stroke-green-500`
      case "persist":
      case "internal":
        return `${baseStyle} stroke-orange-500`
      default:
        return `${baseStyle} stroke-gray-500`
    }
  }

  const getEdgeOpacity = (edge: any) => {
    if (!activeFlow) return 0.6
    
    const flow = flows[activeFlow]
    const activeEdges = flow.steps.flatMap(step => step.edges)
    const edgeId = `${edge.from}-${edge.to}`
    
    if (activeEdges.includes(edgeId)) return 1
    return 0.2
  }


  const getNodePosition = (node: any) => {
    if (node.type === "group") {
      return {
        left: node.x,
        top: node.y,
        width: node.w,
        height: node.h
      }
    }
    
    // 根據文字長度調整節點尺寸
    const textLength = node.label.length
    let width = Math.max(100, textLength * 8 + 20) // 根據文字長度動態調整寬度
    let height = 40 // 增加高度以容納文字
    
    return {
      left: node.x - width / 2,
      top: node.y - height / 2,
      width: width,
      height: height
    }
  }

  const getEdgePath = (edge: any) => {
    const fromNode = k8sData.nodes.find(n => n.id === edge.from)
    const toNode = k8sData.nodes.find(n => n.id === edge.to)
    
    if (!fromNode || !toNode) return ""
    
    const fromX = fromNode.x
    const fromY = fromNode.y
    const toX = toNode.x
    const toY = toNode.y
    
    // 簡單的直線路徑
    return `M ${fromX} ${fromY} L ${toX} ${toY}`
  }

  const getEdgeMarkers = (edge: any) => {
    const markers = []
    
    // 正向箭頭
    markers.push(getArrowMarker(edge.kind))
    
    // 如果是雙向箭頭，添加反向箭頭
    if (edge.bidirectional) {
      markers.push(getArrowMarker(edge.kind, true))
    }
    
    return markers
  }

  const getArrowMarker = (kind: string, reverse = false) => {
    const suffix = reverse ? "-reverse" : ""
    switch (kind) {
      case "control":
        return `url(#arrow-blue${suffix})`
      case "traffic":
        return `url(#arrow-green${suffix})`
      case "persist":
      case "internal":
      case "sync":
        return `url(#arrow-orange${suffix})`
      default:
        return `url(#arrow-gray${suffix})`
    }
  }


  return (
    <div className="relative w-full h-[750px] bg-gray-900/50 rounded-lg overflow-hidden">
      {/* SVG for edges */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <defs>
          <marker id="arrow-blue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
          </marker>
          <marker id="arrow-blue-reverse" markerWidth="10" markerHeight="10" refX="1" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M9,0 L9,6 L0,3 z" fill="#3b82f6" />
          </marker>
          <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
          </marker>
          <marker id="arrow-green-reverse" markerWidth="10" markerHeight="10" refX="1" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M9,0 L9,6 L0,3 z" fill="#10b981" />
          </marker>
          <marker id="arrow-orange" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
          </marker>
          <marker id="arrow-orange-reverse" markerWidth="10" markerHeight="10" refX="1" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M9,0 L9,6 L0,3 z" fill="#f59e0b" />
          </marker>
          <marker id="arrow-gray" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#6b7280" />
          </marker>
          <marker id="arrow-gray-reverse" markerWidth="10" markerHeight="10" refX="1" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M9,0 L9,6 L0,3 z" fill="#6b7280" />
          </marker>
        </defs>
        
        {k8sData.edges.map((edge, index) => (
          <motion.path
            key={`${edge.from}-${edge.to}`}
            d={getEdgePath(edge)}
            className={getEdgeStyle(edge)}
            markerEnd={getArrowMarker(edge.kind)}
            markerStart={edge.bidirectional ? getArrowMarker(edge.kind, true) : undefined}
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: getEdgeOpacity(edge),
              opacity: getEdgeOpacity(edge)
            }}
            transition={{ duration: 0.5 }}
            style={{ zIndex: 1 }}
          />
        ))}
      </svg>

      {/* Nodes */}
      {k8sData.nodes.map((node) => (
        <div key={node.id}>
          <motion.div
            className={getNodeStyle(node)}
            style={{
              ...getNodePosition(node),
              zIndex: 2,
              opacity: getNodeOpacity(node.id)
            }}
            onMouseEnter={() => {
              setHoveredNode(node.id)
              onNodeHover(node.id)
            }}
            onMouseLeave={() => {
              setHoveredNode(null)
              onNodeHover(null)
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {node.type === "group" ? "" : node.label}
          </motion.div>
          
          {/* Group labels outside the boxes */}
          {node.type === "group" && (
            <div
              className="absolute text-sm font-semibold text-gray-300"
              style={{
                left: node.x - 10,
                top: node.y - 25,
                zIndex: 3
              }}
            >
              {node.label}
            </div>
          )}
        </div>
      ))}

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredNode && tooltips[hoveredNode] && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg text-sm max-w-xs z-50"
            style={{
              left: hoveredNode === "kubectl" ? 400 : 600,
              top: hoveredNode === "kubectl" ? 100 : 200
            }}
          >
            {tooltips[hoveredNode]}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
