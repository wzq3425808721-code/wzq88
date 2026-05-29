import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styles from './GraphPage.module.css'

interface GNode { id: number; x: number; y: number; label: string; visited: boolean; inQueue: boolean }
interface GEdge { from: number; to: number; weight: number; visited: boolean; inPath: boolean }

const initialNodes: GNode[] = [
  { id: 0, x: 400, y: 60, label: 'A', visited: false, inQueue: false },
  { id: 1, x: 220, y: 180, label: 'B', visited: false, inQueue: false },
  { id: 2, x: 580, y: 180, label: 'C', visited: false, inQueue: false },
  { id: 3, x: 120, y: 340, label: 'D', visited: false, inQueue: false },
  { id: 4, x: 340, y: 340, label: 'E', visited: false, inQueue: false },
  { id: 5, x: 540, y: 340, label: 'F', visited: false, inQueue: false },
]

const initialEdges: GEdge[] = [
  { from: 0, to: 1, weight: 1, visited: false, inPath: false },
  { from: 0, to: 2, weight: 1, visited: false, inPath: false },
  { from: 1, to: 3, weight: 1, visited: false, inPath: false },
  { from: 1, to: 4, weight: 1, visited: false, inPath: false },
  { from: 2, to: 5, weight: 1, visited: false, inPath: false },
  { from: 3, to: 4, weight: 1, visited: false, inPath: false },
  { from: 4, to: 5, weight: 1, visited: false, inPath: false },
]

const adjList: Record<number, number[]> = {
  0: [1, 2], 1: [0, 3, 4], 2: [0, 5], 3: [1, 4], 4: [1, 3, 5], 5: [2, 4]
}

export default function GraphPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [nodes, setNodes] = useState<GNode[]>(initialNodes.map(n => ({ ...n })))
  const [edges, setEdges] = useState<GEdge[]>(initialEdges.map(e => ({ ...e })))
  const [algorithm, setAlgorithm] = useState<'bfs' | 'dfs'>('bfs')
  const [animating, setAnimating] = useState(false)
  const [visitOrder, setVisitOrder] = useState<string[]>([])
  const [operation, setOperation] = useState('')

  const CANVAS_W = 800
  const CANVAS_H = 420

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    canvas.width = CANVAS_W * dpr
    canvas.height = CANVAS_H * dpr
    canvas.style.width = `${CANVAS_W}px`
    canvas.style.height = `${CANVAS_H}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }, [])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)

    edges.forEach(edge => {
      const fromNode = nodes.find(n => n.id === edge.from)
      const toNode = nodes.find(n => n.id === edge.to)
      if (!fromNode || !toNode) return
      ctx.beginPath()
      ctx.moveTo(fromNode.x, fromNode.y)
      ctx.lineTo(toNode.x, toNode.y)
      ctx.strokeStyle = edge.visited ? '#f59e0b' : edge.inPath ? '#10b981' : '#3a3a5a'
      ctx.lineWidth = edge.visited || edge.inPath ? 3 : 2
      ctx.stroke()
    })

    nodes.forEach(node => {
      ctx.beginPath()
      ctx.arc(node.x, node.y, 28, 0, Math.PI * 2)
      ctx.fillStyle = node.visited ? '#f59e0b' : node.inQueue ? '#3b82f6' : '#1a1a2e'
      ctx.fill()
      ctx.strokeStyle = node.visited ? '#f59e0b' : node.inQueue ? '#3b82f6' : '#8b5cf6'
      ctx.lineWidth = 3
      ctx.stroke()

      if (node.visited || node.inQueue) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 34, 0, Math.PI * 2)
        ctx.strokeStyle = node.visited ? 'rgba(245,158,11,0.3)' : 'rgba(59,130,246,0.3)'
        ctx.lineWidth = 2
        ctx.stroke()
      }

      ctx.fillStyle = node.visited || node.inQueue ? '#0a0a0f' : '#e8e8f0'
      ctx.font = 'bold 16px Inter, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(node.label, node.x, node.y)
    })
  }, [nodes, edges])

  useEffect(() => {
    setupCanvas()
    draw()
  }, [setupCanvas, draw])

  useEffect(() => {
    const onResize = () => { setupCanvas(); draw() }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [setupCanvas, draw])

  const resetGraph = useCallback(() => {
    setNodes(initialNodes.map(n => ({ ...n, visited: false, inQueue: false })))
    setEdges(initialEdges.map(e => ({ ...e, visited: false, inPath: false })))
    setVisitOrder([])
    setOperation('')
  }, [])

  const runBFS = useCallback(() => {
    if (animating) return
    resetGraph()
    setAnimating(true)
    const queue = [0]
    const visited = new Set<number>()
    const order: string[] = []
    const labelMap = initialNodes.reduce<Record<number, string>>((m, n) => { m[n.id] = n.label; return m }, {})

    const interval = setInterval(() => {
      if (queue.length === 0) {
        clearInterval(interval)
        setAnimating(false)
        setOperation('BFS 遍历完成！')
        return
      }

      const current = queue.shift()
      if (current === undefined) return
      if (visited.has(current)) return
      visited.add(current)
      order.push(labelMap[current])

      setNodes(prev => prev.map(n => n.id === current ? { ...n, visited: true, inQueue: false } : n))
      setEdges(prev => prev.map(e => (e.from === current || e.to === current) && visited.has(e.from) && visited.has(e.to) ? { ...e, visited: true } : e))
      setVisitOrder([...order])
      setOperation(`BFS: 访问节点 ${labelMap[current]}，将邻居入队`)

      adjList[current].forEach(neighbor => {
        if (!visited.has(neighbor) && !queue.includes(neighbor)) {
          queue.push(neighbor)
          setNodes(prev => prev.map(n => n.id === neighbor ? { ...n, inQueue: true } : n))
        }
      })
    }, 800)
  }, [animating, resetGraph])

  const runDFS = useCallback(() => {
    if (animating) return
    resetGraph()
    setAnimating(true)
    const stack = [0]
    const visited = new Set<number>()
    const order: string[] = []
    const labelMap = initialNodes.reduce<Record<number, string>>((m, n) => { m[n.id] = n.label; return m }, {})

    const interval = setInterval(() => {
      if (stack.length === 0) {
        clearInterval(interval)
        setAnimating(false)
        setOperation('DFS 遍历完成！')
        return
      }

      const current = stack.pop()
      if (current === undefined) return
      if (visited.has(current)) return
      visited.add(current)
      order.push(labelMap[current])

      setNodes(prev => prev.map(n => n.id === current ? { ...n, visited: true, inQueue: false } : n))
      setEdges(prev => prev.map(e => (e.from === current || e.to === current) && visited.has(e.from) && visited.has(e.to) ? { ...e, visited: true } : e))
      setVisitOrder([...order])
      setOperation(`DFS: 访问节点 ${labelMap[current]}，将邻居压栈`)

      const neighbors = [...adjList[current]].reverse()
      neighbors.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          stack.push(neighbor)
          setNodes(prev => prev.map(n => n.id === neighbor ? { ...n, inQueue: true } : n))
        }
      })
    }, 800)
  }, [animating, resetGraph])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link to="/">首页</Link><span className={styles.sep}>/</span><span className={styles.current}>图</span>
        </div>
        <h1 className={styles.title}>图 Graph</h1>
        <p className={styles.subtitle}>由顶点和边组成的非线性结构，BFS和DFS是图遍历的两大基本策略</p>
      </div>

      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.operationPanel}>
            <select value={algorithm} onChange={e => setAlgorithm(e.target.value as 'bfs' | 'dfs')} className={styles.select}>
              <option value="bfs">BFS 广度优先</option>
              <option value="dfs">DFS 深度优先</option>
            </select>
            <button className={styles.opBtn} onClick={algorithm === 'bfs' ? runBFS : runDFS} disabled={animating}>
              {animating ? '遍历中...' : '开始遍历'}
            </button>
            <button className={`${styles.opBtn} ${styles.resetBtn}`} onClick={resetGraph}>重置</button>
          </div>

          {operation && <div className={styles.operationInfo}>{operation}</div>}

          <div className={styles.visualArea}>
            <canvas ref={canvasRef} className={styles.canvas} />
          </div>

          {visitOrder.length > 0 && (
            <div className={styles.resultPanel}>
              <h4>遍历顺序</h4>
              <div className={styles.resultSequence}>
                {visitOrder.map((label, i) => (
                  <span key={i} className={styles.resultItem}>{label}{i < visitOrder.length - 1 ? ' →' : ''}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.infoCard}>
            <h3>BFS vs DFS</h3>
            <div className={styles.compareItem}>
              <strong>BFS（广度优先）</strong>
              <p>使用<strong>队列</strong>，逐层扩展，适合求最短路径</p>
              <code>队列: 先进先出</code>
            </div>
            <div className={styles.compareItem}>
              <strong>DFS（深度优先）</strong>
              <p>使用<strong>栈</strong>，深入到底再回溯，适合路径搜索</p>
              <code>栈: 后进先出</code>
            </div>
          </div>
          <div className={styles.infoCard}>
            <h3>常见错误</h3>
            <ul className={styles.errorList}>
              <li><strong>方法错误：</strong>BFS用栈、DFS用队列（混淆了数据结构）</li>
              <li><strong>理解错误：</strong>忘记标记已访问节点导致死循环</li>
              <li><strong>计算错误：</strong>BFS在无权图求最短路径时漏算层次</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
