import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styles from './HashTablePage.module.css'

const TABLE_SIZE = 7

interface HashEntry {
  key: string
  value: number
  isDeleted: boolean
}

export default function HashTablePage() {
  const [table, setTable] = useState<(HashEntry | null)[]>(
    Array(TABLE_SIZE).fill(null)
  )
  const [inputKey, setInputKey] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [operation, setOperation] = useState('')
  const [probeSteps, setProbeSteps] = useState<number[]>([])
  const [highlightIndex, setHighlightIndex] = useState(-1)

  const hashFunction = useCallback((key: string): number => {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) % TABLE_SIZE
    }
    return hash
  }, [])

  const handleInsert = useCallback(() => {
    if (!inputKey || inputValue === '') return
    const hash = hashFunction(inputKey)
    const steps: number[] = []
    let idx = hash
    let probes = 0

    let entry = table[idx]
    while (entry !== null && !entry.isDeleted && probes < TABLE_SIZE) {
      steps.push(idx)
      if (entry.key === inputKey) {
        setOperation(`键 "${inputKey}" 已存在，哈希值=${hash}，位置=${idx}`)
        setProbeSteps(steps)
        setHighlightIndex(idx)
        return
      }
      idx = (idx + 1) % TABLE_SIZE
      probes++
      entry = table[idx]
    }

    if (probes >= TABLE_SIZE) {
      setOperation('哈希表已满！无法插入')
      return
    }

    steps.push(idx)
    const newTable = [...table]
    newTable[idx] = { key: inputKey, value: Number(inputValue), isDeleted: false }
    setTable(newTable)
    setOperation(`插入 ("${inputKey}", ${inputValue})  →  h("${inputKey}") = ${hash}${idx !== hash ? `，冲突！线性探测到位置 ${idx}` : ''}`)
    setProbeSteps(steps)
    setHighlightIndex(idx)
    setInputKey('')
    setInputValue('')
  }, [inputKey, inputValue, table, hashFunction])

  const handleSearch = useCallback(() => {
    if (!inputKey) return
    const hash = hashFunction(inputKey)
    const steps: number[] = []
    let idx = hash
    let probes = 0

    let entry = table[idx]
    while (entry !== null && probes < TABLE_SIZE) {
      steps.push(idx)
      if (entry.key === inputKey && !entry.isDeleted) {
        setOperation(`找到键 "${inputKey}"，值=${entry.value}，哈希值=${hash}，位置=${idx}`)
        setProbeSteps(steps)
        setHighlightIndex(idx)
        return
      }
      idx = (idx + 1) % TABLE_SIZE
      probes++
      entry = table[idx]
    }

    setOperation(`未找到键 "${inputKey}"，哈希值=${hash}，探测了 ${probes} 次`)
    setProbeSteps(steps)
    setHighlightIndex(-1)
  }, [inputKey, table, hashFunction])

  const handleDelete = useCallback(() => {
    if (!inputKey) return
    const hash = hashFunction(inputKey)
    let idx = hash
    let probes = 0

    let entry = table[idx]
    while (entry !== null && probes < TABLE_SIZE) {
      if (entry.key === inputKey && !entry.isDeleted) {
        const newTable = [...table]
        newTable[idx] = { ...entry, isDeleted: true }
        setTable(newTable)
        setOperation(`删除键 "${inputKey}"（懒删除），位置=${idx}`)
        setHighlightIndex(idx)
        return
      }
      idx = (idx + 1) % TABLE_SIZE
      probes++
      entry = table[idx]
    }

    setOperation(`未找到键 "${inputKey}"`)
  }, [inputKey, table, hashFunction])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link to="/">首页</Link><span className={styles.sep}>/</span><span className={styles.current}>哈希表</span>
        </div>
        <h1 className={styles.title}>哈希表 Hash Table</h1>
        <p className={styles.subtitle}>基于哈希函数的键值对存储，平均O(1)查找，冲突处理是核心问题</p>
      </div>

      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.operationPanel}>
            <input type="text" placeholder="键(key)" value={inputKey} onChange={e => setInputKey(e.target.value)} className={styles.input} />
            <input type="number" placeholder="值(value)" value={inputValue} onChange={e => setInputValue(e.target.value)} className={styles.input} />
            <button className={styles.opBtn} onClick={handleInsert}>插入</button>
            <button className={`${styles.opBtn} ${styles.searchBtn}`} onClick={handleSearch}>查找</button>
            <button className={`${styles.opBtn} ${styles.deleteBtn}`} onClick={handleDelete}>删除</button>
          </div>

          {operation && <div className={styles.operationInfo}>{operation}</div>}

          {probeSteps.length > 0 && (
            <div className={styles.probeInfo}>
              探测路径: {probeSteps.map((idx, i) => (
                <span key={i} className={`${styles.probeStep} ${idx === highlightIndex ? styles.probeHit : ''}`}>
                  [{idx}]{i < probeSteps.length - 1 ? ' →' : ''}
                </span>
              ))}
            </div>
          )}

          <div className={styles.visualArea}>
            <div className={styles.hashFunction}>
              <span>哈希函数: h(key) = (Σ charCode × 31) mod {TABLE_SIZE}</span>
            </div>
            <div className={styles.tableContainer}>
              {table.map((entry, index) => (
                <div
                  key={index}
                  className={`${styles.bucket} ${highlightIndex === index ? styles.bucketHighlight : ''} ${probeSteps.includes(index) ? styles.bucketProbed : ''}`}
                >
                  <div className={styles.bucketIndex}>[{index}]</div>
                  <div className={styles.bucketContent}>
                    {entry ? (
                      <span className={entry.isDeleted ? styles.deletedEntry : styles.activeEntry}>
                        {entry.isDeleted ? '⟨已删除⟩' : `${entry.key}: ${entry.value}`}
                      </span>
                    ) : (
                      <span className={styles.emptyEntry}>空</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.infoCard}>
            <h3>冲突解决策略</h3>
            <div className={styles.strategy}>
              <strong>线性探测（本页使用）</strong>
              <p>h(k)+1, h(k)+2, h(k)+3...</p>
              <p className={styles.strategyNote}>简单但容易聚集</p>
            </div>
            <div className={styles.strategy}>
              <strong>二次探测</strong>
              <p>h(k)+1², h(k)+2², h(k)+3²...</p>
              <p className={styles.strategyNote}>减少聚集</p>
            </div>
            <div className={styles.strategy}>
              <strong>链地址法</strong>
              <p>每个桶维护一个链表</p>
              <p className={styles.strategyNote}>不需探测，最常用</p>
            </div>
          </div>
          <div className={styles.infoCard}>
            <h3>常见错误</h3>
            <ul className={styles.errorList}>
              <li><strong>理解错误：</strong>认为哈希函数能保证不冲突</li>
              <li><strong>方法错误：</strong>删除时直接清空而非懒删除</li>
              <li><strong>计算错误：</strong>负载因子过高时仍期望O(1)性能</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
