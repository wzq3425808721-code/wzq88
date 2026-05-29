import { useState, useCallback, useRef, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './SearchPage.module.css'

interface SearchStep {
  left: number
  right: number
  mid: number
  found: boolean
  description: string
  comparisons: number[]
  eliminated: number[]
}

export default function SearchPage() {
  const rawAlgorithm = useParams().algorithm
  const algorithm = rawAlgorithm === 'linear' ? 'linear' : 'binary'
  const [array, setArray] = useState<number[]>([2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91])
  const [target, setTarget] = useState(23)
  const [searching, setSearching] = useState(false)
  const [steps, setSteps] = useState<SearchStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [speed, setSpeed] = useState(800)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const generateArray = useCallback(() => {
    const arr: number[] = []
    let val = Math.floor(Math.random() * 10) + 1
    for (let i = 0; i < 11; i++) {
      arr.push(val)
      val += Math.floor(Math.random() * 15) + 3
    }
    setArray(arr)
    setSteps([])
    setCurrentStep(0)
  }, [])

  const binarySearch = useCallback(() => {
    const newSteps: SearchStep[] = []
    let left = 0
    let right = array.length - 1
    let comparisons = 0

    newSteps.push({
      left, right, mid: -1, found: false,
      description: `开始二分查找，目标值=${target}，搜索范围[${left}, ${right}]`,
      comparisons: [], eliminated: []
    })

    while (left <= right) {
      const mid = Math.floor(left + (right - left) / 2)
      comparisons++
      const eliminated: number[] = []

      if (array[mid] === target) {
        newSteps.push({
          left, right, mid, found: true,
          description: `找到目标！array[${mid}]=${array[mid]}=${target}，共比较${comparisons}次`,
          comparisons: [mid], eliminated
        })
        break
      } else if (array[mid] < target) {
        for (let i = left; i <= mid; i++) eliminated.push(i)
        newSteps.push({
          left, right, mid, found: false,
          description: `array[${mid}]=${array[mid]} < ${target}，排除左半部分`,
          comparisons: [mid], eliminated
        })
        left = mid + 1
      } else {
        for (let i = mid; i <= right; i++) eliminated.push(i)
        newSteps.push({
          left, right, mid, found: false,
          description: `array[${mid}]=${array[mid]} > ${target}，排除右半部分`,
          comparisons: [mid], eliminated
        })
        right = mid - 1
      }
    }

    if (left > right) {
      newSteps.push({
        left, right, mid: -1, found: false,
        description: `未找到目标值${target}，搜索范围为空`,
        comparisons: [], eliminated: []
      })
    }

    setSteps(newSteps)
    setCurrentStep(0)
    setSearching(true)
  }, [array, target])

  const linearSearch = useCallback(() => {
    const newSteps: SearchStep[] = []
    let comparisons = 0
    const eliminated: number[] = []

    newSteps.push({
      left: 0, right: array.length - 1, mid: -1, found: false,
      description: `开始线性查找，目标值=${target}`,
      comparisons: [], eliminated: [...eliminated]
    })

    for (let i = 0; i < array.length; i++) {
      comparisons++
      if (array[i] === target) {
        newSteps.push({
          left: 0, right: array.length - 1, mid: i, found: true,
          description: `找到目标！array[${i}]=${array[i]}=${target}，共比较${comparisons}次`,
          comparisons: [i], eliminated: [...eliminated]
        })
        setSteps(newSteps)
        setCurrentStep(0)
        setSearching(true)
        return
      } else {
        eliminated.push(i)
        newSteps.push({
          left: 0, right: array.length - 1, mid: i, found: false,
          description: `array[${i}]=${array[i]} ≠ ${target}，继续下一个`,
          comparisons: [i], eliminated: [...eliminated]
        })
      }
    }

    newSteps.push({
      left: 0, right: array.length - 1, mid: -1, found: false,
      description: `未找到目标值${target}，已遍历整个数组`,
      comparisons: [], eliminated: [...eliminated]
    })

    setSteps(newSteps)
    setCurrentStep(0)
    setSearching(true)
  }, [array, target])

  const handleSearch = useCallback(() => {
    if (algorithm === 'binary') binarySearch()
    else linearSearch()
  }, [algorithm, binarySearch, linearSearch])

  useEffect(() => {
    if (!searching) return
    if (currentStep >= steps.length - 1) {
      const id = setTimeout(() => setSearching(false), 0)
      return () => clearTimeout(id)
    }
    timerRef.current = setTimeout(() => {
      setCurrentStep(prev => prev + 1)
    }, speed)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [searching, currentStep, steps.length, speed])

  const step = steps[currentStep]
  const isBinary = algorithm === 'binary'

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link to="/">首页</Link>
          <span className={styles.sep}>/</span>
          <Link to={`/search/${algorithm}`}>查找算法</Link>
          <span className={styles.sep}>/</span>
          <span className={styles.current}>{isBinary ? '二分查找' : '线性查找'}</span>
        </div>
        <h1 className={styles.title}>{isBinary ? '二分查找 Binary Search' : '线性查找 Linear Search'}</h1>
        <p className={styles.subtitle}>{isBinary ? '在有序数组中每次排除一半，O(logn)时间复杂度' : '逐个比较，O(n)时间复杂度'}</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label>目标值</label>
          <input type="number" value={target} onChange={e => setTarget(Number(e.target.value))} disabled={searching} />
        </div>
        <button className={styles.primaryBtn} onClick={handleSearch} disabled={searching}>
          {searching ? '查找中...' : '开始查找'}
        </button>
        <button className={styles.secondaryBtn} onClick={generateArray} disabled={searching}>
          随机数组
        </button>
        <div className={styles.controlGroup}>
          <label>速度</label>
          <input type="range" min={200} max={2000} step={100} value={speed} onChange={e => setSpeed(Number(e.target.value))} />
        </div>
        {steps.length > 0 && (
          <div className={styles.stepInfo}>
            步骤 {currentStep + 1}/{steps.length}
          </div>
        )}
      </div>

      <div className={styles.arrayContainer}>
        <div className={styles.arrayRow}>
          {array.map((val, i) => {
            let cellClass = styles.cell
            if (step) {
              if (step.found && step.mid === i) cellClass = styles.cellFound
              else if (step.comparisons.includes(i)) cellClass = styles.cellComparing
              else if (step.eliminated.includes(i)) cellClass = styles.cellEliminated
              else if (isBinary && i >= step.left && i <= step.right) cellClass = styles.cellInRange
            }
            return (
              <div key={i} className={cellClass}>
                <span className={styles.cellValue}>{val}</span>
                <span className={styles.cellIndex}>[{i}]</span>
              </div>
            )
          })}
        </div>
        {isBinary && step && (
          <div className={styles.pointerRow}>
            {array.map((_, i) => (
              <div key={i} className={styles.pointerCell}>
                {step.left === i && <span className={styles.pointer} style={{ color: '#3b82f6' }}>L</span>}
                {step.mid === i && <span className={styles.pointer} style={{ color: '#f59e0b' }}>M</span>}
                {step.right === i && <span className={styles.pointer} style={{ color: '#ef4444' }}>R</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      {step && (
        <div className={`${styles.stepDescription} ${step.found ? styles.stepFound : ''}`}>
          {step.description}
        </div>
      )}

      <div className={styles.algorithmTabs}>
        <Link to="/search/binary" className={`${styles.tab} ${isBinary ? styles.tabActive : ''}`}>二分查找</Link>
        <Link to="/search/linear" className={`${styles.tab} ${!isBinary ? styles.tabActive : ''}`}>线性查找</Link>
      </div>

      <div className={styles.complexityCard}>
        <h3>复杂度分析</h3>
        {isBinary ? (
          <div className={styles.complexityGrid}>
            <div><strong>最好</strong><br />O(1)</div>
            <div><strong>平均</strong><br />O(logn)</div>
            <div><strong>最坏</strong><br />O(logn)</div>
            <div><strong>空间</strong><br />O(1)</div>
          </div>
        ) : (
          <div className={styles.complexityGrid}>
            <div><strong>最好</strong><br />O(1)</div>
            <div><strong>平均</strong><br />O(n)</div>
            <div><strong>最坏</strong><br />O(n)</div>
            <div><strong>空间</strong><br />O(1)</div>
          </div>
        )}
      </div>
    </div>
  )
}
