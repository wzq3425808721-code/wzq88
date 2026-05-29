import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styles from './HeapPage.module.css'

export default function HeapPage() {
  const [heap, setHeap] = useState<number[]>([50, 40, 30, 20, 35, 25, 10])
  const [inputValue, setInputValue] = useState('')
  const [highlightIndex, setHighlightIndex] = useState(-1)

  const getParent = (i: number) => Math.floor((i - 1) / 2)
  const getLeft = (i: number) => 2 * i + 1
  const getRight = (i: number) => 2 * i + 2

  const swap = (arr: number[], i: number, j: number) => {
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }

  const heapifyUp = useCallback((arr: number[], index: number) => {
    while (index > 0) {
      const parent = getParent(index)
      if (arr[parent] < arr[index]) {
        swap(arr, parent, index)
        index = parent
      } else break
    }
  }, [])

  const heapifyDown = useCallback((arr: number[], index: number, size: number) => {
    while (true) {
      let largest = index
      const left = getLeft(index)
      const right = getRight(index)
      if (left < size && arr[left] > arr[largest]) largest = left
      if (right < size && arr[right] > arr[largest]) largest = right
      if (largest !== index) {
        swap(arr, index, largest)
        index = largest
      } else break
    }
  }, [])

  const handleInsert = useCallback(() => {
    const val = Number(inputValue)
    if (isNaN(val)) return
    const newHeap = [...heap, val]
    heapifyUp(newHeap, newHeap.length - 1)
    setHeap(newHeap)
    setHighlightIndex(newHeap.length - 1)
    setInputValue('')
    setTimeout(() => setHighlightIndex(-1), 1000)
  }, [inputValue, heap, heapifyUp])

  const handleExtractMax = useCallback(() => {
    if (heap.length === 0) return
    const newHeap = [...heap]
    newHeap[0] = newHeap[newHeap.length - 1]
    newHeap.pop()
    heapifyDown(newHeap, 0, newHeap.length)
    setHeap(newHeap)
    setHighlightIndex(0)
    setTimeout(() => setHighlightIndex(-1), 1000)
  }, [heap, heapifyDown])

  const handleHeapSort = useCallback(() => {
    const arr = [...heap]
    const n = arr.length
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapifyDown(arr, i, n)
    }
    for (let i = n - 1; i > 0; i--) {
      swap(arr, 0, i)
      heapifyDown(arr, 0, i)
    }
    setHeap(arr)
  }, [heap, heapifyDown])

  const getNodePosition = (index: number, svgWidth: number) => {
    if (heap.length === 0) return { x: svgWidth / 2, y: 40 }
    const level = Math.floor(Math.log2(index + 1))
    const posInLevel = index - (Math.pow(2, level) - 1)
    const nodesInLevel = Math.pow(2, level)
    const xSpacing = svgWidth / (nodesInLevel + 1)
    const x = xSpacing * (posInLevel + 1)
    const y = 40 + level * 70
    return { x, y }
  }

  const svgWidth = 800
  const svgHeight = Math.max(300, (Math.floor(Math.log2(heap.length + 1)) + 1) * 70 + 60)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link to="/">首页</Link>
          <span className={styles.sep}>/</span>
          <span className={styles.current}>堆</span>
        </div>
        <h1 className={styles.title}>堆 Heap</h1>
        <p className={styles.subtitle}>完全二叉树实现的优先队列，堆排序和优先队列的基础</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label>插入值</label>
          <input type="number" value={inputValue} onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleInsert()} />
          <button className={styles.primaryBtn} onClick={handleInsert}>插入</button>
        </div>
        <button className={styles.secondaryBtn} onClick={handleExtractMax}>提取最大值</button>
        <button className={styles.sortBtn} onClick={handleHeapSort}>堆排序</button>
      </div>

      <div className={styles.treeContainer}>
        <svg width={svgWidth} height={svgHeight} className={styles.svg}>
          {heap.map((val, i) => {
            const pos = getNodePosition(i, svgWidth)
            const parentIdx = getParent(i)
            if (i > 0) {
              const parentPos = getNodePosition(parentIdx, svgWidth)
              return (
                <g key={`edge-${i}`}>
                  <line x1={parentPos.x} y1={parentPos.y} x2={pos.x} y2={pos.y}
                    stroke="var(--border-light)" strokeWidth="2" />
                </g>
              )
            }
            return null
          })}
          {heap.map((val, i) => {
            const pos = getNodePosition(i, svgWidth)
            const isHighlight = i === highlightIndex
            return (
              <g key={`node-${i}`}>
                <circle cx={pos.x} cy={pos.y} r="24"
                  fill={isHighlight ? 'var(--accent-orange)' : i === 0 ? 'var(--accent-green)' : 'var(--bg-card)'}
                  stroke={isHighlight ? 'var(--accent-orange)' : i === 0 ? 'var(--accent-green)' : 'var(--border-light)'}
                  strokeWidth="2"
                />
                <text x={pos.x} y={pos.y + 5} textAnchor="middle"
                  fill={isHighlight || i === 0 ? 'white' : 'var(--text-primary)'}
                  fontSize="14" fontWeight="600"
                >
                  {val}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div className={styles.arrayView}>
        <h3>数组表示</h3>
        <div className={styles.arrayRow}>
          {heap.map((val, i) => (
            <div key={i} className={`${styles.cell} ${i === highlightIndex ? styles.cellHighlight : ''} ${i === 0 ? styles.cellMax : ''}`}>
              <span className={styles.cellValue}>{val}</span>
              <span className={styles.cellIndex}>[{i}]</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.properties}>
        <h3>堆核心性质</h3>
        <div className={styles.propsGrid}>
          <div className={styles.prop}>
            <strong>最大堆性质</strong>
            <p>父节点 ≥ 子节点，根节点是最大值</p>
          </div>
          <div className={styles.prop}>
            <strong>完全二叉树</strong>
            <p>用数组存储：parent(i)=(i-1)/2</p>
          </div>
          <div className={styles.prop}>
            <strong>堆操作O(logn)</strong>
            <p>插入上浮，删除下沉，堆排序O(nlogn)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
