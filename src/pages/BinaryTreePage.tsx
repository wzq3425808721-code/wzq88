import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styles from './BinaryTreePage.module.css'

interface TreeNode {
  value: number
  left: TreeNode | null
  right: TreeNode | null
  x: number
  y: number
  highlighted: boolean
  visited: boolean
}

function insertBST(root: TreeNode | null, value: number): TreeNode {
  if (!root) return { value, left: null, right: null, x: 0, y: 0, highlighted: false, visited: false }
  if (value < root.value) return { ...root, left: insertBST(root.left, value) }
  if (value > root.value) return { ...root, right: insertBST(root.right, value) }
  return root
}

function layoutTree(node: TreeNode | null, x: number, y: number, spread: number): void {
  if (!node) return
  node.x = x
  node.y = y
  node.highlighted = false
  node.visited = false
  layoutTree(node.left, x - spread, y + 70, spread * 0.55)
  layoutTree(node.right, x + spread, y + 70, spread * 0.55)
}

function collectNodes(node: TreeNode | null): TreeNode[] {
  if (!node) return []
  return [node, ...collectNodes(node.left), ...collectNodes(node.right)]
}

function collectEdges(node: TreeNode | null): { from: TreeNode; to: TreeNode }[] {
  if (!node) return []
  const edges: { from: TreeNode; to: TreeNode }[] = []
  if (node.left) { edges.push({ from: node, to: node.left }); edges.push(...collectEdges(node.left)) }
  if (node.right) { edges.push({ from: node, to: node.right }); edges.push(...collectEdges(node.right)) }
  return edges
}

const traversalOrders: Record<string, (node: TreeNode | null, result: TreeNode[]) => void> = {
  preorder: (node, result) => { if (!node) return; result.push(node); traversalOrders.preorder(node.left, result); traversalOrders.preorder(node.right, result) },
  inorder: (node, result) => { if (!node) return; traversalOrders.inorder(node.left, result); result.push(node); traversalOrders.inorder(node.right, result) },
  postorder: (node, result) => { if (!node) return; traversalOrders.postorder(node.left, result); traversalOrders.postorder(node.right, result); result.push(node) }
}

const traversalNames: Record<string, string> = {
  preorder: '前序遍历 (根-左-右)',
  inorder: '中序遍历 (左-根-右)',
  postorder: '后序遍历 (左-右-根)'
}

export default function BinaryTreePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [root, setRoot] = useState<TreeNode | null>(() => {
    const initial = [50, 30, 70, 20, 40, 60, 80]
    let tree: TreeNode | null = null
    initial.forEach(v => { tree = insertBST(tree, v) })
    layoutTree(tree, 400, 50, 180)
    return tree
  })
  const [inputValue, setInputValue] = useState('')
  const [operation, setOperation] = useState('')
  const [traversalType, setTraversalType] = useState('preorder')
  const [traversalResult, setTraversalResult] = useState<number[]>([])
  const [animating, setAnimating] = useState(false)
  const [highlightedNodes, setHighlightedNodes] = useState<Set<number>>(new Set())

  const CANVAS_W = 800
  const CANVAS_H = 450

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
    if (!canvas || !root) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)

    const edges = collectEdges(root)
    edges.forEach(({ from, to }) => {
      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.strokeStyle = highlightedNodes.has(from.value) && highlightedNodes.has(to.value)
        ? '#f59e0b' : '#3a3a5a'
      ctx.lineWidth = highlightedNodes.has(from.value) && highlightedNodes.has(to.value) ? 3 : 2
      ctx.stroke()
    })

    const nodes = collectNodes(root)
    nodes.forEach(node => {
      const isHighlighted = highlightedNodes.has(node.value)

      ctx.beginPath()
      ctx.arc(node.x, node.y, 24, 0, Math.PI * 2)
      ctx.fillStyle = isHighlighted ? '#f59e0b' : '#1a1a2e'
      ctx.fill()
      ctx.strokeStyle = isHighlighted ? '#f59e0b' : '#3b82f6'
      ctx.lineWidth = isHighlighted ? 3 : 2
      ctx.stroke()

      if (isHighlighted) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 30, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)'
        ctx.lineWidth = 2
        ctx.stroke()
      }

      ctx.fillStyle = isHighlighted ? '#0a0a0f' : '#e8e8f0'
      ctx.font = '14px JetBrains Mono, monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(String(node.value), node.x, node.y)
    })
  }, [root, highlightedNodes])

  useEffect(() => {
    setupCanvas()
    draw()
  }, [setupCanvas, draw])

  useEffect(() => {
    const onResize = () => { setupCanvas(); draw() }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [setupCanvas, draw])

  const handleInsert = useCallback(() => {
    const val = Number(inputValue)
    if (isNaN(val)) return
    const newRoot = insertBST(root, val)
    layoutTree(newRoot, 400, 50, 180)
    setRoot(newRoot)
    setOperation(`插入 ${val} 到二叉搜索树`)
    setInputValue('')
    setHighlightedNodes(new Set([val]))
    setTimeout(() => setHighlightedNodes(new Set()), 1500)
  }, [inputValue, root])

  const handleTraversal = useCallback(() => {
    if (!root || animating) return
    setAnimating(true)
    const result: TreeNode[] = []
    traversalOrders[traversalType](root, result)

    const values: number[] = []
    let i = 0
    const interval = setInterval(() => {
      if (i >= result.length) {
        clearInterval(interval)
        setAnimating(false)
        setTraversalResult(values)
        setTimeout(() => setHighlightedNodes(new Set()), 1000)
        return
      }
      values.push(result[i].value)
      setHighlightedNodes(new Set([result[i].value]))
      setTraversalResult([...values])
      i++
    }, 600)
  }, [root, traversalType, animating])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link to="/">首页</Link><span className={styles.sep}>/</span>
          <span className={styles.current}>二叉树</span>
        </div>
        <h1 className={styles.title}>二叉树 Binary Tree</h1>
        <p className={styles.subtitle}>每个节点最多有两个子节点的层次结构，是理解BST、堆、AVL树的基础</p>
      </div>

      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.operationPanel}>
            <input type="number" placeholder="插入值" value={inputValue} onChange={e => setInputValue(e.target.value)} className={styles.input} />
            <button className={styles.opBtn} onClick={handleInsert}>插入节点</button>
            <select value={traversalType} onChange={e => setTraversalType(e.target.value)} className={styles.select}>
              <option value="preorder">前序遍历</option>
              <option value="inorder">中序遍历</option>
              <option value="postorder">后序遍历</option>
            </select>
            <button className={`${styles.opBtn} ${styles.travBtn}`} onClick={handleTraversal} disabled={animating}>
              {animating ? '遍历中...' : '开始遍历'}
            </button>
          </div>

          {operation && <div className={styles.operationInfo}>{operation}</div>}

          <div className={styles.visualArea}>
            <canvas ref={canvasRef} className={styles.canvas} />
          </div>

          {traversalResult.length > 0 && (
            <div className={styles.resultPanel}>
              <h4>{traversalNames[traversalType]}</h4>
              <div className={styles.resultSequence}>
                {traversalResult.map((v, i) => (
                  <span key={i} className={styles.resultItem}>{v}{i < traversalResult.length - 1 ? ' →' : ''}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.infoCard}>
            <h3>三种遍历</h3>
            <div className={styles.travItem}>
              <strong>前序 (Pre-order)</strong>
              <p>根 → 左 → 右</p>
              <code>50, 30, 20, 40, 70, 60, 80</code>
            </div>
            <div className={styles.travItem}>
              <strong>中序 (In-order)</strong>
              <p>左 → 根 → 右（BST中序=排序）</p>
              <code>20, 30, 40, 50, 60, 70, 80</code>
            </div>
            <div className={styles.travItem}>
              <strong>后序 (Post-order)</strong>
              <p>左 → 右 → 根</p>
              <code>20, 40, 30, 60, 80, 70, 50</code>
            </div>
          </div>

          <div className={styles.infoCard}>
            <h3>常见错误</h3>
            <ul className={styles.errorList}>
              <li><strong>理解错误：</strong>混淆三种遍历的访问顺序</li>
              <li><strong>方法错误：</strong>递归遍历时忘记基线条件（空节点返回）</li>
              <li><strong>理解错误：</strong>不理解中序遍历BST得到有序序列</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
