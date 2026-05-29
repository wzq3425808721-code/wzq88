import { useState, useCallback, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './BSTPage.module.css'

interface BSTNode {
  value: number
  left: BSTNode | null
  right: BSTNode | null
  x?: number
  y?: number
  highlighted?: boolean
  found?: boolean
}

function insertBST(root: BSTNode | null, value: number): BSTNode {
  if (!root) return { value, left: null, right: null }
  if (value < root.value) return { ...root, left: insertBST(root.left, value) }
  if (value > root.value) return { ...root, right: insertBST(root.right, value) }
  return root
}

function searchBST(root: BSTNode | null, value: number): number[] {
  const path: number[] = []
  let node = root
  while (node) {
    path.push(node.value)
    if (value === node.value) break
    node = value < node.value ? node.left : node.right
  }
  return path
}

function inorderTraversal(root: BSTNode | null): number[] {
  if (!root) return []
  return [...inorderTraversal(root.left), root.value, ...inorderTraversal(root.right)]
}

function preorderTraversal(root: BSTNode | null): number[] {
  if (!root) return []
  return [root.value, ...preorderTraversal(root.left), ...preorderTraversal(root.right)]
}

function postorderTraversal(root: BSTNode | null): number[] {
  if (!root) return []
  return [...postorderTraversal(root.left), ...postorderTraversal(root.right), root.value]
}

function layoutTree(node: BSTNode | null, x: number, y: number, spread: number): BSTNode | null {
  if (!node) return null
  return {
    ...node,
    x, y,
    left: layoutTree(node.left, x - spread, y + 70, spread * 0.6),
    right: layoutTree(node.right, x + spread, y + 70, spread * 0.6)
  }
}

function collectNodes(node: BSTNode | null): BSTNode[] {
  if (!node) return []
  return [node, ...collectNodes(node.left), ...collectNodes(node.right)]
}

function collectEdges(node: BSTNode | null): { from: BSTNode; to: BSTNode }[] {
  if (!node) return []
  const edges: { from: BSTNode; to: BSTNode }[] = []
  if (node.left) { edges.push({ from: node, to: node.left }); edges.push(...collectEdges(node.left)) }
  if (node.right) { edges.push({ from: node, to: node.right }); edges.push(...collectEdges(node.right)) }
  return edges
}

function createInitialBST(): BSTNode | null {
  let r: BSTNode | null = null
  for (const v of [50, 30, 70, 20, 40, 60, 80]) r = insertBST(r, v)
  return r
}

export default function BSTPage() {
  const [root, setRoot] = useState<BSTNode | null>(createInitialBST)
  const [inputValue, setInputValue] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [searchPathValues, setSearchPathValues] = useState<number[]>([])
  const [searchFound, setSearchFound] = useState(false)
  const [traversalResult, setTraversalResult] = useState<number[]>([])
  const [traversalHighlight, setTraversalHighlight] = useState<number>(-1)
  const svgRef = useRef<SVGSVGElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    return () => { timerRef.current.forEach(t => clearTimeout(t)) }
  }, [])

  const handleInsert = useCallback(() => {
    const val = Number(inputValue)
    if (isNaN(val)) return
    setRoot(prev => insertBST(prev, val))
    setInputValue('')
    setSearchPathValues([])
    setSearchFound(false)
  }, [inputValue])

  const handleSearch = useCallback(() => {
    const val = Number(searchValue)
    if (isNaN(val) || !root) return
    const path = searchBST(root, val)
    setSearchPathValues(path)
    setSearchFound(path.length > 0 && path[path.length - 1] === val)
  }, [searchValue, root])

  const handleTraversal = useCallback((type: 'inorder' | 'preorder' | 'postorder') => {
    if (!root) return
    timerRef.current.forEach(t => clearTimeout(t))
    timerRef.current = []
    let result: number[]
    if (type === 'inorder') result = inorderTraversal(root)
    else if (type === 'preorder') result = preorderTraversal(root)
    else result = postorderTraversal(root)
    setTraversalResult(result)
    setSearchPathValues([])
    setSearchFound(false)

    result.forEach((_, i) => {
      const t = setTimeout(() => {
        setTraversalHighlight(i)
      }, i * 500)
      timerRef.current.push(t)
    })
  }, [root])

  const laidOutRoot = layoutTree(root, 400, 40, 160)
  const nodes = collectNodes(laidOutRoot)
  const edges = collectEdges(laidOutRoot)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link to="/">首页</Link>
          <span className={styles.sep}>/</span>
          <span className={styles.current}>二叉搜索树</span>
        </div>
        <h1 className={styles.title}>二叉搜索树 BST</h1>
        <p className={styles.subtitle}>左小右大的有序二叉树，支持O(logn)查找、插入和删除</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label>插入值</label>
          <input type="number" value={inputValue} onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleInsert()} placeholder="输入数字" />
          <button className={styles.primaryBtn} onClick={handleInsert}>插入</button>
        </div>
        <div className={styles.controlGroup}>
          <label>查找值</label>
          <input type="number" value={searchValue} onChange={e => setSearchValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()} placeholder="输入数字" />
          <button className={styles.secondaryBtn} onClick={handleSearch}>查找</button>
        </div>
        <div className={styles.controlGroup}>
          <button className={styles.traverseBtn} onClick={() => handleTraversal('inorder')}>中序遍历</button>
          <button className={styles.traverseBtn} onClick={() => handleTraversal('preorder')}>前序遍历</button>
          <button className={styles.traverseBtn} onClick={() => handleTraversal('postorder')}>后序遍历</button>
        </div>
      </div>

      {searchPathValues.length > 0 && (
        <div className={styles.searchPath}>
          查找路径: {searchPathValues.join(' → ')}
          {searchFound && ' ✓ 找到'}
          {!searchFound && ' ✗ 未找到'}
        </div>
      )}

      {traversalResult.length > 0 && (
        <div className={styles.traversalResult}>
          遍历结果: {traversalResult.map((v, i) => (
            <span key={i} className={`${styles.traversalItem} ${i === traversalHighlight ? styles.traversalItemActive : ''}`}>
              {v}
            </span>
          ))}
        </div>
      )}

      <div className={styles.treeContainer}>
        <svg ref={svgRef} width="800" height="500" className={styles.svg}>
          {edges.map((edge, i) => (
            <line key={`e-${i}`}
              x1={edge.from.x ?? 0} y1={edge.from.y ?? 0}
              x2={edge.to.x ?? 0} y2={edge.to.y ?? 0}
              stroke="var(--border-light)" strokeWidth="2"
            />
          ))}
          {nodes.map((node, i) => {
            const isSearchPath = searchPathValues.includes(node.value)
            const isTraversalCurrent = traversalResult[traversalHighlight] === node.value
            return (
              <g key={`n-${i}`}>
                <circle cx={node.x ?? 0} cy={node.y ?? 0} r="24"
                  fill={isTraversalCurrent ? 'var(--accent-green)' : isSearchPath ? 'var(--accent-blue)' : 'var(--bg-card)'}
                  stroke={isTraversalCurrent ? 'var(--accent-green)' : isSearchPath ? 'var(--accent-blue)' : 'var(--border-light)'}
                  strokeWidth="2"
                />
                <text x={node.x ?? 0} y={(node.y ?? 0) + 5} textAnchor="middle"
                  fill={isTraversalCurrent || isSearchPath ? 'white' : 'var(--text-primary)'}
                  fontSize="14" fontWeight="600"
                >
                  {node.value}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div className={styles.properties}>
        <h3>BST核心性质</h3>
        <div className={styles.propsGrid}>
          <div className={styles.prop}>
            <strong>{'左 < 根 < 右'}</strong>
            <p>所有左子树节点值小于根，右子树节点值大于根</p>
          </div>
          <div className={styles.prop}>
            <strong>中序遍历 = 升序</strong>
            <p>对BST做中序遍历，结果恰好是有序序列</p>
          </div>
          <div className={styles.prop}>
            <strong>平均O(logn)</strong>
            <p>平衡BST的查找/插入/删除都是O(logn)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
