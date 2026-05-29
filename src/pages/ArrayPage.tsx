import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styles from './ArrayPage.module.css'

export default function ArrayPage() {
  const [array, setArray] = useState<number[]>([15, 42, 8, 23, 67, 31, 5, 89, 16, 54])
  const [inputValue, setInputValue] = useState('')
  const [inputIndex, setInputIndex] = useState('')
  const [highlightIndex, setHighlightIndex] = useState<number>(-1)
  const [operation, setOperation] = useState('')
  const [accessIndex, setAccessIndex] = useState<number>(-1)

  const handleAccess = useCallback((index: number) => {
    if (index >= 0 && index < array.length) {
      setAccessIndex(index)
      setHighlightIndex(index)
      setOperation(`访问 array[${index}] = ${array[index]}  →  O(1) 时间复杂度`)
    }
  }, [array])

  const handleInsert = useCallback(() => {
    const val = Number(inputValue)
    const idx = inputIndex !== '' ? Number(inputIndex) : array.length
    if (isNaN(val)) return
    if (idx < 0 || idx > array.length) return

    const newArr = [...array]
    newArr.splice(idx, 0, val)
    setArray(newArr)
    setHighlightIndex(idx)
    setOperation(`在位置 ${idx} 插入 ${val}  →  O(n) 时间复杂度，需要移动 ${array.length - idx} 个元素`)
    setInputValue('')
    setInputIndex('')
  }, [array, inputValue, inputIndex])

  const handleDelete = useCallback(() => {
    const idx = inputIndex !== '' ? Number(inputIndex) : array.length - 1
    if (idx < 0 || idx >= array.length) return

    const removed = array[idx]
    const newArr = [...array]
    newArr.splice(idx, 1)
    setArray(newArr)
    setHighlightIndex(-1)
    setOperation(`删除位置 ${idx} 的元素 ${removed}  →  O(n) 时间复杂度，需要移动 ${array.length - 1 - idx} 个元素`)
    setInputIndex('')
  }, [array, inputIndex])

  const handleSearch = useCallback(() => {
    const val = Number(inputValue)
    if (isNaN(val)) return
    const idx = array.indexOf(val)
    if (idx !== -1) {
      setHighlightIndex(idx)
      setOperation(`找到 ${val} 在位置 ${idx}  →  O(n) 线性查找`)
    } else {
      setHighlightIndex(-1)
      setOperation(`未找到 ${val}  →  O(n) 线性查找遍历了整个数组`)
    }
  }, [array, inputValue])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link to="/">首页</Link>
          <span className={styles.sep}>/</span>
          <span className={styles.current}>数组</span>
        </div>
        <h1 className={styles.title}>数组 Array</h1>
        <p className={styles.subtitle}>连续内存空间的线性数据结构，支持O(1)随机访问，插入删除需要移动元素</p>
      </div>

      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.operationPanel}>
            <div className={styles.inputGroup}>
              <input
                type="number"
                placeholder="值"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className={styles.input}
              />
              <input
                type="number"
                placeholder="索引(可选)"
                value={inputIndex}
                onChange={e => setInputIndex(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.buttonGroup}>
              <button className={styles.opBtn} onClick={handleInsert}>插入</button>
              <button className={`${styles.opBtn} ${styles.deleteBtn}`} onClick={handleDelete}>删除</button>
              <button className={`${styles.opBtn} ${styles.searchBtn}`} onClick={handleSearch}>查找</button>
            </div>
          </div>

          {operation && (
            <div className={styles.operationInfo}>{operation}</div>
          )}

          <div className={styles.visualArea}>
            <div className={styles.memoryLabel}>内存地址</div>
            <div className={styles.arrayContainer}>
              {array.map((value, index) => (
                <div
                  key={`${index}-${value}`}
                  className={`${styles.cell} ${highlightIndex === index ? styles.cellHighlight : ''} ${accessIndex === index ? styles.cellAccess : ''}`}
                  onClick={() => handleAccess(index)}
                >
                  <div className={styles.cellValue}>{value}</div>
                  <div className={styles.cellIndex}>[{index}]</div>
                  <div className={styles.cellAddr}>0x{(0x1000 + index * 4).toString(16)}</div>
                </div>
              ))}
            </div>
            <div className={styles.memoryInfo}>
              <span>int 类型占 4 字节</span>
              <span>基地址: 0x1000</span>
              <span>总大小: {array.length * 4} 字节</span>
            </div>
          </div>

          <div className={styles.properties}>
            <div className={styles.propCard}>
              <h4>访问</h4>
              <span className={styles.complexity}>O(1)</span>
              <p>通过基地址+偏移量直接计算地址</p>
            </div>
            <div className={styles.propCard}>
              <h4>插入</h4>
              <span className={styles.complexity}>O(n)</span>
              <p>需要移动插入位置后的所有元素</p>
            </div>
            <div className={styles.propCard}>
              <h4>删除</h4>
              <span className={styles.complexity}>O(n)</span>
              <p>需要移动删除位置后的所有元素</p>
            </div>
            <div className={styles.propCard}>
              <h4>查找</h4>
              <span className={styles.complexity}>O(n)</span>
              <p>无序数组需遍历，有序可二分O(logn)</p>
            </div>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.infoCard}>
            <h3>核心概念</h3>
            <div className={styles.concept}>
              <strong>连续存储</strong>
              <p>数组元素在内存中连续存放，这是O(1)随机访问的基础</p>
            </div>
            <div className={styles.concept}>
              <strong>地址计算</strong>
              <p className={styles.formula}>addr[i] = base + i × size</p>
              <p>知道基地址和元素大小，就能直接算出任意元素的地址</p>
            </div>
            <div className={styles.concept}>
              <strong>越界访问</strong>
              <p>访问超出数组范围的索引是未定义行为，可能导致程序崩溃</p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <h3>常见错误</h3>
            <ul className={styles.errorList}>
              <li><strong>理解错误：</strong>混淆数组长度和最大索引（长度n，最大索引n-1）</li>
              <li><strong>计算错误：</strong>插入时忘记移动元素或移动方向错误</li>
              <li><strong>方法错误：</strong>在有序数组中使用线性查找而非二分查找</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
