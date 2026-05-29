import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styles from './RecursionPage.module.css'

interface CallFrame {
  id: number
  func: string
  args: string
  returnValue?: string
  status: 'calling' | 'waiting' | 'returned'
  depth: number
}

const examples = {
  factorial: {
    name: '阶乘 n!',
    description: 'n! = n × (n-1)!, 基线条件: 0! = 1',
    defaultN: 5,
    minN: 0, maxN: 10
  },
  fibonacci: {
    name: '斐波那契数列',
    description: 'fib(n) = fib(n-1) + fib(n-2), 基线: fib(0)=0, fib(1)=1',
    defaultN: 6,
    minN: 0, maxN: 8
  },
  hanoi: {
    name: '汉诺塔',
    description: '将n个盘子从A移到C，借助B',
    defaultN: 3,
    minN: 1, maxN: 5
  }
}

export default function RecursionPage() {
  const [example, setExample] = useState<'factorial' | 'fibonacci' | 'hanoi'>('factorial')
  const [inputN, setInputN] = useState(5)
  const [frames, setFrames] = useState<CallFrame[]>([])
  const [currentFrameIndex, setCurrentFrameIndex] = useState(-1)
  const [running, setRunning] = useState(false)
  const [output, setOutput] = useState('')

  const runFactorial = useCallback((n: number) => {
    const newFrames: CallFrame[] = []
    let id = 0

    for (let i = n; i >= 0; i--) {
      newFrames.push({
        id: id++, func: 'factorial', args: `n=${i}`,
        status: i === 0 ? 'returned' : 'waiting',
        returnValue: i === 0 ? '1' : undefined,
        depth: n - i
      })
    }

    let result = 1
    for (let i = 1; i <= n; i++) {
      result *= i
      const frame = newFrames.find(f => f.args === `n=${i}`)
      if (frame) {
        frame.returnValue = String(result)
        frame.status = 'returned'
      }
    }

    setFrames(newFrames)
    setCurrentFrameIndex(0)
    setOutput(`${n}! = ${result}`)
    setRunning(true)
  }, [])

  const runFibonacci = useCallback((n: number) => {
    const newFrames: CallFrame[] = []
    let id = 0
    const fib = (n: number, depth: number): number => {
      const frameId = id++
      if (n <= 1) {
        newFrames.push({ id: frameId, func: 'fib', args: `n=${n}`, status: 'returned', returnValue: String(n), depth })
        return n
      }
      newFrames.push({ id: frameId, func: 'fib', args: `n=${n}`, status: 'waiting', depth })
      const left = fib(n - 1, depth + 1)
      const right = fib(n - 2, depth + 1)
      const result = left + right
      const frame = newFrames.find(f => f.id === frameId)
      if (frame) { frame.returnValue = String(result); frame.status = 'returned' }
      return result
    }
    const result = fib(n, 0)
    setFrames(newFrames)
    setCurrentFrameIndex(0)
    setOutput(`fib(${n}) = ${result}`)
    setRunning(true)
  }, [])

  const runHanoi = useCallback((n: number) => {
    const newFrames: CallFrame[] = []
    let id = 0
    const moves: string[] = []
    const hanoi = (n: number, from: string, to: string, aux: string, depth: number) => {
      if (n === 1) {
        moves.push(`移动盘1: ${from} → ${to}`)
        newFrames.push({ id: id++, func: 'hanoi', args: `n=1, ${from}→${to}`, status: 'returned', returnValue: `1步`, depth })
        return
      }
      newFrames.push({ id: id++, func: 'hanoi', args: `n=${n}, ${from}→${to}`, status: 'waiting', depth })
      hanoi(n - 1, from, aux, to, depth + 1)
      moves.push(`移动盘${n}: ${from} → ${to}`)
      hanoi(n - 1, aux, to, from, depth + 1)
      const frame = newFrames.find(f => f.id === id - 1)
      if (frame) { frame.returnValue = `${moves.length}步`; frame.status = 'returned' }
    }
    hanoi(n, 'A', 'C', 'B', 0)
    setFrames(newFrames)
    setCurrentFrameIndex(0)
    setOutput(moves.join('\n'))
    setRunning(true)
  }, [])

  const handleRun = useCallback(() => {
    const n = Math.max(examples[example].minN, Math.min(inputN, examples[example].maxN))
    setInputN(n)
    if (example === 'factorial') runFactorial(n)
    else if (example === 'fibonacci') runFibonacci(n)
    else runHanoi(n)
  }, [example, inputN, runFactorial, runFibonacci, runHanoi])

  const handleNextStep = useCallback(() => {
    if (currentFrameIndex < frames.length - 1) {
      setCurrentFrameIndex(prev => prev + 1)
    } else {
      setRunning(false)
    }
  }, [currentFrameIndex, frames.length])

  const handlePrevStep = useCallback(() => {
    if (currentFrameIndex > 0) setCurrentFrameIndex(prev => prev - 1)
  }, [currentFrameIndex])

  const visibleFrames = frames.slice(0, currentFrameIndex + 1)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link to="/">首页</Link>
          <span className={styles.sep}>/</span>
          <span className={styles.current}>递归</span>
        </div>
        <h1 className={styles.title}>递归 Recursion</h1>
        <p className={styles.subtitle}>函数调用自身的编程范式，分治与回溯的基础，理解调用栈是关键</p>
      </div>

      <div className={styles.exampleSelector}>
        {(Object.entries(examples) as [keyof typeof examples, typeof examples.factorial][]).map(([key, ex]) => (
          <button
            key={key}
            className={`${styles.exampleBtn} ${example === key ? styles.exampleBtnActive : ''}`}
            onClick={() => { setExample(key); setInputN(ex.defaultN); setFrames([]); setCurrentFrameIndex(-1); setRunning(false); setOutput('') }}
          >
            {ex.name}
          </button>
        ))}
      </div>

      <div className={styles.description}>{examples[example].description}</div>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label>n = </label>
          <input type="number" value={inputN}
            min={examples[example].minN} max={examples[example].maxN}
            onChange={e => setInputN(Number(e.target.value))}
            disabled={running}
          />
        </div>
        <button className={styles.primaryBtn} onClick={handleRun} disabled={running}>
          开始演示
        </button>
        {frames.length > 0 && (
          <>
            <button className={styles.secondaryBtn} onClick={handlePrevStep} disabled={currentFrameIndex <= 0}>
              ← 上一步
            </button>
            <button className={styles.secondaryBtn} onClick={handleNextStep} disabled={currentFrameIndex >= frames.length - 1}>
              下一步 →
            </button>
            <span className={styles.stepInfo}>
              {currentFrameIndex + 1}/{frames.length}
            </span>
          </>
        )}
      </div>

      <div className={styles.mainContent}>
        <div className={styles.callStack}>
          <h3>调用栈</h3>
          <div className={styles.stackFrames}>
            {visibleFrames.map((frame, index) => {
              const isCurrent = index === currentFrameIndex
              return (
                <div
                  key={frame.id}
                  className={`${styles.frame} ${isCurrent ? styles.frameCurrent : ''} ${frame.status === 'returned' ? styles.frameReturned : ''}`}
                  style={{ marginLeft: frame.depth * 24 }}
                >
                  <div className={styles.frameHeader}>
                    <span className={styles.frameFunc}>{frame.func}</span>
                    <span className={styles.frameArgs}>({frame.args})</span>
                    <span className={`${styles.frameStatus} ${frame.status === 'returned' ? styles.statusReturned : styles.statusWaiting}`}>
                      {frame.status === 'returned' ? '✓ 已返回' : '⏳ 等待中'}
                    </span>
                  </div>
                  {frame.returnValue && (
                    <div className={styles.frameReturn}>
                      返回值: <strong>{frame.returnValue}</strong>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {output && currentFrameIndex >= frames.length - 1 && (
          <div className={styles.output}>
            <h3>运行结果</h3>
            <div className={styles.outputContent}>{output}</div>
          </div>
        )}
      </div>

      <div className={styles.keyPoints}>
        <h3>递归三要素</h3>
        <div className={styles.pointsGrid}>
          <div className={styles.point}>
            <span className={styles.pointIcon}>🎯</span>
            <strong>基线条件</strong>
            <p>递归何时停止？最简单的情况直接返回</p>
          </div>
          <div className={styles.point}>
            <span className={styles.pointIcon}>🔄</span>
            <strong>递归关系</strong>
            <p>如何将问题分解为更小的子问题？</p>
          </div>
          <div className={styles.point}>
            <span className={styles.pointIcon}>↩️</span>
            <strong>返回值组合</strong>
            <p>子问题的返回值如何组合成当前问题的解？</p>
          </div>
        </div>
      </div>
    </div>
  )
}
