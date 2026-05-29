import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styles from './DPPage.module.css'

interface DPStep {
  description: string
  dp: number[]
  highlights: number[]
  solved: number[]
}

const examples = {
  climb: { name: '爬楼梯', desc: '每次爬1或2阶，爬到第n阶有多少种方法？', defaultN: 5, minN: 1, maxN: 10 },
  knapsack: { name: '0-1背包', desc: '容量W的背包，选物品使总价值最大', defaultN: 4, minN: 2, maxN: 6 },
  coin: { name: '零钱兑换', desc: '用最少硬币凑出目标金额', defaultN: 6, minN: 1, maxN: 10 }
}

export default function DPPage() {
  const [example, setExample] = useState<'climb' | 'knapsack' | 'coin'>('climb')
  const [steps, setSteps] = useState<DPStep[]>([])
  const [currentStep, setCurrentStep] = useState(-1)
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState('')

  const [inputN, setInputN] = useState(5)

  const runClimb = useCallback((n: number) => {
    const newSteps: DPStep[] = []
    const dp: number[] = new Array(n + 1).fill(0)
    const solved: number[] = []

    newSteps.push({
      description: `初始化：dp[0]=0, dp[1]=1, dp[2]=2`,
      dp: [...dp], highlights: [], solved: []
    })

    dp[0] = 1
    dp[1] = 1
    if (n >= 2) dp[2] = 2
    solved.push(0, 1)
    if (n >= 2) solved.push(2)

    newSteps.push({
      description: `基线条件：dp[0]=1(地面), dp[1]=1(1种方法), dp[2]=2(2种方法)`,
      dp: [...dp], highlights: [0, 1, 2], solved: [...solved]
    })

    for (let i = 3; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2]
      solved.push(i)
      newSteps.push({
        description: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`,
        dp: [...dp], highlights: [i, i - 1, i - 2], solved: [...solved]
      })
    }

    setSteps(newSteps)
    setCurrentStep(0)
    setResult(`爬到第${n}阶有${dp[n]}种方法`)
    setRunning(true)
  }, [])

  const runCoin = useCallback((n: number) => {
    const coins = [1, 2, 5]
    const newSteps: DPStep[] = []
    const dp: number[] = new Array(n + 1).fill(Infinity)
    dp[0] = 0
    const solved: number[] = [0]

    newSteps.push({
      description: `硬币面值: [1, 2, 5]，初始化dp[0]=0，其余=∞`,
      dp: [...dp], highlights: [0], solved: [0]
    })

    for (let i = 1; i <= n; i++) {
      for (const coin of coins) {
        if (i >= coin && dp[i - coin] + 1 < dp[i]) {
          dp[i] = dp[i - coin] + 1
        }
      }
      solved.push(i)
      newSteps.push({
        description: `dp[${i}] = ${dp[i]}（使用硬币${coins.filter(c => i >= c).map(c => `${c}→dp[${i - c}]+1=${dp[i - c] + 1}`).join(', ')}中的最小值）`,
        dp: [...dp], highlights: [i], solved: [...solved]
      })
    }

    setSteps(newSteps)
    setCurrentStep(0)
    setResult(dp[n] === Infinity ? '无法凑出' : `最少需要${dp[n]}枚硬币`)
    setRunning(true)
  }, [])

  const runKnapsack = useCallback((n: number) => {
    const weights = [2, 3, 4, 5]
    const values = [3, 4, 5, 6]
    const W = n * 2
    const itemCount = Math.min(n, weights.length)

    const newSteps: DPStep[] = []
    const dp: number[] = new Array(W + 1).fill(0)
    const solved: number[] = []

    newSteps.push({
      description: `背包容量W=${W}，物品数=${itemCount}，初始化dp[0..${W}]=0`,
      dp: [...dp], highlights: [], solved: []
    })

    for (let i = 0; i < itemCount; i++) {
      const newDp = [...dp]
      for (let w = W; w >= weights[i]; w--) {
        if (dp[w - weights[i]] + values[i] > newDp[w]) {
          newDp[w] = dp[w - weights[i]] + values[i]
        }
      }
      for (let w = 0; w <= W; w++) dp[w] = newDp[w]
      solved.push(i)
      newSteps.push({
        description: `考虑物品${i + 1}(重${weights[i]}，值${values[i]})：更新dp数组`,
        dp: [...dp], highlights: Array.from({ length: W + 1 }, (_, k) => k), solved: [...solved]
      })
    }

    setSteps(newSteps)
    setCurrentStep(0)
    setResult(`最大价值为${dp[W]}`)
    setRunning(true)
  }, [])

  const handleRun = useCallback(() => {
    const n = Math.max(examples[example].minN, Math.min(inputN, examples[example].maxN))
    setInputN(n)
    if (example === 'climb') runClimb(n)
    else if (example === 'coin') runCoin(n)
    else runKnapsack(n)
  }, [example, inputN, runClimb, runCoin, runKnapsack])

  const handleNextStep = useCallback(() => {
    if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1)
    else setRunning(false)
  }, [currentStep, steps.length])

  const handlePrevStep = useCallback(() => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1)
  }, [currentStep])

  const step = currentStep >= 0 ? steps[currentStep] : null

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link to="/">首页</Link>
          <span className={styles.sep}>/</span>
          <span className={styles.current}>动态规划</span>
        </div>
        <h1 className={styles.title}>动态规划 DP</h1>
        <p className={styles.subtitle}>将复杂问题分解为重叠子问题，记忆化避免重复计算，最优子结构是关键</p>
      </div>

      <div className={styles.exampleSelector}>
        {(Object.entries(examples) as [keyof typeof examples, typeof examples.climb][]).map(([key, ex]) => (
          <button
            key={key}
            className={`${styles.exampleBtn} ${example === key ? styles.exampleBtnActive : ''}`}
            onClick={() => { setExample(key); setInputN(ex.defaultN); setSteps([]); setCurrentStep(-1); setRunning(false); setResult('') }}
          >
            {ex.name}
          </button>
        ))}
      </div>

      <div className={styles.description}>{examples[example].desc}</div>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label>n = </label>
          <input type="number" value={inputN}
            min={examples[example].minN} max={examples[example].maxN}
            onChange={e => setInputN(Number(e.target.value))}
            disabled={running}
          />
        </div>
        <button className={styles.primaryBtn} onClick={handleRun} disabled={running}>开始演示</button>
        {steps.length > 0 && (
          <>
            <button className={styles.secondaryBtn} onClick={handlePrevStep} disabled={currentStep <= 0}>← 上一步</button>
            <button className={styles.secondaryBtn} onClick={handleNextStep} disabled={currentStep >= steps.length - 1}>下一步 →</button>
            <span className={styles.stepInfo}>{currentStep + 1}/{steps.length}</span>
          </>
        )}
      </div>

      {step && (
        <>
          <div className={styles.stepDescription}>{step.description}</div>
          <div className={styles.dpArray}>
            {step.dp.map((val, i) => {
              let cellClass = styles.cell
              if (step.highlights.includes(i)) cellClass = styles.cellHighlight
              else if (step.solved.includes(i)) cellClass = styles.cellSolved
              return (
                <div key={i} className={cellClass}>
                  <span className={styles.cellIndex}>[{i}]</span>
                  <span className={styles.cellValue}>{val === Infinity ? '∞' : val}</span>
                </div>
              )
            })}
          </div>
        </>
      )}

      {result && currentStep >= steps.length - 1 && (
        <div className={styles.result}>{result}</div>
      )}

      <div className={styles.keyPoints}>
        <h3>动态规划三要素</h3>
        <div className={styles.pointsGrid}>
          <div className={styles.point}>
            <span className={styles.pointIcon}>🧩</span>
            <strong>最优子结构</strong>
            <p>大问题的最优解包含小问题的最优解</p>
          </div>
          <div className={styles.point}>
            <span className={styles.pointIcon}>🔄</span>
            <strong>重叠子问题</strong>
            <p>递归过程中会重复计算相同的子问题</p>
          </div>
          <div className={styles.point}>
            <span className={styles.pointIcon}>📝</span>
            <strong>状态转移方程</strong>
            <p>dp[i]如何从之前的dp值推导出来？</p>
          </div>
        </div>
      </div>
    </div>
  )
}
