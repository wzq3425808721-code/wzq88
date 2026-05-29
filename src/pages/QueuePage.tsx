import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styles from './QueuePage.module.css'

export default function QueuePage() {
  const [queue, setQueue] = useState<number[]>([15, 42, 8, 23])
  const [inputValue, setInputValue] = useState('')
  const [operation, setOperation] = useState('')
  const [highlightFront, setHighlightFront] = useState(false)
  const [highlightRear, setHighlightRear] = useState(false)
  const [dequeuedValue, setDequeuedValue] = useState<number | null>(null)

  const handleEnqueue = useCallback(() => {
    const val = Number(inputValue)
    if (isNaN(val)) return
    setQueue(prev => [...prev, val])
    setHighlightRear(true)
    setHighlightFront(false)
    setOperation(`Enqueue ${val}  →  O(1) 元素入队尾`)
    setDequeuedValue(null)
    setInputValue('')
    setTimeout(() => setHighlightRear(false), 1000)
  }, [inputValue])

  const handleDequeue = useCallback(() => {
    if (queue.length === 0) return
    const val = queue[0]
    setQueue(prev => prev.slice(1))
    setHighlightFront(true)
    setHighlightRear(false)
    setDequeuedValue(val)
    setOperation(`Dequeue ${val}  →  O(1) 队头元素出队`)
    setTimeout(() => setHighlightFront(false), 1000)
  }, [queue])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link to="/">首页</Link><span className={styles.sep}>/</span>
          <span className={styles.current}>队列</span>
        </div>
        <h1 className={styles.title}>队列 Queue</h1>
        <p className={styles.subtitle}>先进先出(FIFO)的线性结构，BFS遍历、任务调度、消息缓冲的核心数据结构</p>
      </div>

      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.operationPanel}>
            <input type="number" placeholder="值" value={inputValue} onChange={e => setInputValue(e.target.value)} className={styles.input} />
            <button className={styles.opBtn} onClick={handleEnqueue}>Enqueue 入队</button>
            <button className={`${styles.opBtn} ${styles.deqBtn}`} onClick={handleDequeue}>Dequeue 出队</button>
          </div>

          {operation && <div className={styles.operationInfo}>{operation}</div>}
          {dequeuedValue !== null && <div className={styles.dequeuedInfo}>出队值: {dequeuedValue}</div>}

          <div className={styles.visualArea}>
            <div className={styles.queueContainer}>
              <div className={styles.pointer}>
                <span className={styles.frontLabel}>front</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="2">
                  <line x1="12" y1="4" x2="12" y2="16"/><polyline points="8,12 12,16 16,12"/>
                </svg>
              </div>
              <div className={styles.queueBody}>
                {queue.map((value, index) => (
                  <div
                    key={`${index}-${value}`}
                    className={`${styles.queueItem} ${highlightFront && index === 0 ? styles.frontHighlight : ''} ${highlightRear && index === queue.length - 1 ? styles.rearHighlight : ''}`}
                  >
                    <span className={styles.itemValue}>{value}</span>
                    <span className={styles.itemIndex}>[{index}]</span>
                  </div>
                ))}
                {queue.length === 0 && <div className={styles.emptyQueue}>队列为空</div>}
              </div>
              <div className={styles.pointer}>
                <span className={styles.rearLabel}>rear</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-red)" strokeWidth="2">
                  <line x1="12" y1="4" x2="12" y2="16"/><polyline points="8,12 12,16 16,12"/>
                </svg>
              </div>
            </div>
            <div className={styles.flowDirection}>
              <span>出队 ←</span>
              <div className={styles.flowLine} />
              <span>← 入队</span>
            </div>
          </div>

          <div className={styles.applications}>
            <h3>典型应用</h3>
            <div className={styles.appGrid}>
              <div className={styles.appCard}><strong>BFS 广度优先搜索</strong><p>队列保证按层次遍历图/树</p></div>
              <div className={styles.appCard}><strong>任务调度</strong><p>先来先服务(FCFS)调度策略</p></div>
              <div className={styles.appCard}><strong>消息队列</strong><p>生产者-消费者模式的核心</p></div>
              <div className={styles.appCard}><strong>缓冲区管理</strong><p>键盘缓冲区、打印队列</p></div>
            </div>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.infoCard}>
            <h3>FIFO 原则</h3>
            <p className={styles.principle}>先进先出 (First In First Out)</p>
            <p className={styles.principleDesc}>就像排队买票：先到的人先买到票</p>
          </div>
          <div className={styles.infoCard}>
            <h3>循环队列</h3>
            <p className={styles.conceptDesc}>用固定大小数组实现队列时，通过取模运算复用已出队的空间，避免"假溢出"</p>
            <div className={styles.formula}>rear = (rear + 1) % capacity</div>
          </div>
        </aside>
      </div>
    </div>
  )
}
