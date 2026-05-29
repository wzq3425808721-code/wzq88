import type { AnimationStep } from '../../types'
import styles from './SortVisualizer.module.css'

interface SortVisualizerProps {
  step: AnimationStep
  maxValue: number
}

export default function SortVisualizer({ step, maxValue }: SortVisualizerProps) {
  const { data, highlights, swaps } = step
  const barWidth = Math.max(20, Math.min(60, 800 / data.length))

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <div className={styles.stepInfo}>{step.description}</div>
      </div>
      <div className={styles.barsContainer}>
        {data.map((value, index) => {
          const isHighlighted = highlights.includes(index)
          const isSwapping = swaps?.some(([a, b]) => a === index || b === index)
          const height = (value / maxValue) * 280

          let color = 'var(--accent-blue)'
          if (isSwapping) color = 'var(--accent-red)'
          else if (isHighlighted) color = 'var(--accent-yellow)'

          return (
            <div
              key={index}
              className={styles.barWrapper}
              style={{ width: barWidth }}
            >
              <div
                className={styles.bar}
                style={{
                  height: `${height}px`,
                  width: `${barWidth - 4}px`,
                  background: isHighlighted || isSwapping
                    ? color
                    : 'var(--border-light)',
                  transition: 'all 0.3s ease',
                  borderRadius: '4px 4px 0 0'
                }}
              />
              <span className={styles.barLabel}>{value}</span>
              <span className={styles.barIndex}>{index}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
