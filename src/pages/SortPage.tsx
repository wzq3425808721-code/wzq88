import { useState, useMemo, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { sortAlgorithms } from '../utils/sortAlgorithms'
import { useAnimation } from '../hooks/useAnimation'
import SortVisualizer from '../components/visualization/SortVisualizer'
import AnimationControls from '../components/visualization/AnimationControls'
import styles from './SortPage.module.css'

function generateRandomArray(size: number, max: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1)
}

export default function SortPage() {
  const { algorithm } = useParams<{ algorithm: string }>()
  const algo = sortAlgorithms[algorithm || 'bubble'] || sortAlgorithms['bubble']
  const [arraySize, setArraySize] = useState(12)
  const [maxValue, setMaxValue] = useState(50)
  const [inputArray, setInputArray] = useState(() => generateRandomArray(12, 50))

  const steps = useMemo(() => {
    return algo.fn([...inputArray])
  }, [inputArray, algo])

  const animation = useAnimation(steps)

  const regenerate = useCallback(() => {
    const newArr = generateRandomArray(arraySize, maxValue)
    setInputArray(newArr)
    animation.reset()
  }, [arraySize, maxValue, animation])

  const handleSizeChange = useCallback((size: number) => {
    setArraySize(size)
    setInputArray(generateRandomArray(size, maxValue))
    animation.reset()
  }, [maxValue, animation])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link to="/">首页</Link>
          <span className={styles.separator}>/</span>
          <span>排序算法</span>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{algo.name}</span>
        </div>
        <h1 className={styles.title}>{algo.name}</h1>
        <p className={styles.subtitle}>{algo.description}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.params}>
            <div className={styles.paramGroup}>
              <label className={styles.paramLabel}>数组大小: {arraySize}</label>
              <input
                type="range"
                min={5}
                max={30}
                value={arraySize}
                onChange={e => handleSizeChange(Number(e.target.value))}
                className={styles.paramSlider}
              />
            </div>
            <div className={styles.paramGroup}>
              <label className={styles.paramLabel}>最大值: {maxValue}</label>
              <input
                type="range"
                min={10}
                max={100}
                value={maxValue}
                onChange={e => {
                  setMaxValue(Number(e.target.value))
                  setInputArray(generateRandomArray(arraySize, Number(e.target.value)))
                  animation.reset()
                }}
                className={styles.paramSlider}
              />
            </div>
            <button className={styles.regenerateBtn} onClick={regenerate}>
              生成新数据
            </button>
          </div>

          <SortVisualizer step={animation.currentData} maxValue={maxValue} />

          <AnimationControls
            isPlaying={animation.isPlaying}
            currentStep={animation.currentStep}
            totalSteps={animation.steps.length}
            speed={animation.speed}
            onPlay={animation.play}
            onPause={animation.pause}
            onReset={animation.reset}
            onStepForward={animation.stepForward}
            onStepBackward={animation.stepBackward}
            onSpeedChange={animation.setSpeed}
            onJumpTo={animation.jumpTo}
          />
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>复杂度分析</h3>
            <div className={styles.complexityGrid}>
              <div className={styles.complexityItem}>
                <span className={styles.complexityLabel}>最好</span>
                <span className={styles.complexityValue}>{algo.complexity.best}</span>
              </div>
              <div className={styles.complexityItem}>
                <span className={styles.complexityLabel}>平均</span>
                <span className={styles.complexityValue}>{algo.complexity.avg}</span>
              </div>
              <div className={styles.complexityItem}>
                <span className={styles.complexityLabel}>最坏</span>
                <span className={styles.complexityValue}>{algo.complexity.worst}</span>
              </div>
              <div className={styles.complexityItem}>
                <span className={styles.complexityLabel}>空间</span>
                <span className={styles.complexityValue}>{algo.complexity.space}</span>
              </div>
            </div>
            <div className={styles.stableTag}>
              {algo.stable ? '✓ 稳定排序' : '✗ 不稳定排序'}
            </div>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>其他排序算法</h3>
            <div className={styles.algoList}>
              {Object.entries(sortAlgorithms).map(([key, val]) => (
                <Link
                  key={key}
                  to={`/sort/${key}`}
                  className={`${styles.algoLink} ${key === algorithm ? styles.algoLinkActive : ''}`}
                >
                  {val.name}
                  <span className={styles.algoComplexity}>{val.complexity.avg}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>试一试</h3>
            <ul className={styles.tips}>
              <li>点击"播放"观察排序的完整过程</li>
              <li>使用"单步"按钮逐步理解每一步操作</li>
              <li>增大数组大小，观察排序效率的变化</li>
              <li>对比不同排序算法的步骤数量差异</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
