import styles from './AnimationControls.module.css'

interface AnimationControlsProps {
  isPlaying: boolean
  currentStep: number
  totalSteps: number
  speed: number
  onPlay: () => void
  onPause: () => void
  onReset: () => void
  onStepForward: () => void
  onStepBackward: () => void
  onSpeedChange: (speed: number) => void
  onJumpTo: (step: number) => void
}

export default function AnimationControls({
  isPlaying,
  currentStep,
  totalSteps,
  speed,
  onPlay,
  onPause,
  onReset,
  onStepForward,
  onStepBackward,
  onSpeedChange,
  onJumpTo
}: AnimationControlsProps) {
  return (
    <div className={styles.controls}>
      <div className={styles.buttons}>
        <button className={styles.btn} onClick={onReset} title="重置">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
        </button>
        <button className={styles.btn} onClick={onStepBackward} title="上一步">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/>
          </svg>
        </button>
        <button
          className={`${styles.btn} ${styles.playBtn}`}
          onClick={isPlaying ? onPause : onPlay}
          title={isPlaying ? '暂停' : '播放'}
        >
          {isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          )}
        </button>
        <button className={styles.btn} onClick={onStepForward} title="下一步">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/>
          </svg>
        </button>
      </div>

      <div className={styles.progress}>
        <input
          type="range"
          min={0}
          max={totalSteps - 1}
          value={currentStep}
          onChange={e => onJumpTo(Number(e.target.value))}
          className={styles.slider}
        />
        <span className={styles.stepLabel}>
          {currentStep + 1} / {totalSteps}
        </span>
      </div>

      <div className={styles.speed}>
        <span className={styles.speedLabel}>速度</span>
        <input
          type="range"
          min={100}
          max={2000}
          step={100}
          value={2100 - speed}
          onChange={e => onSpeedChange(2100 - Number(e.target.value))}
          className={styles.speedSlider}
        />
        <span className={styles.speedValue}>{speed}ms</span>
      </div>
    </div>
  )
}
