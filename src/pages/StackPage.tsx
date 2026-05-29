import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styles from './StackPage.module.css'

export default function StackPage() {
  const [stack, setStack] = useState<number[]>([15, 42, 8])
  const [inputValue, setInputValue] = useState('')
  const [operation, setOperation] = useState('')
  const [highlightIdx, setHighlightIdx] = useState(-1)
  const [poppedValue, setPoppedValue] = useState<number | null>(null)

  const handlePush = useCallback(() => {
    const val = Number(inputValue)
    if (isNaN(val)) return
    setStack(prev => [...prev, val])
    setHighlightIdx(stack.length)
    setOperation(`Push ${val}  →  O(1) 元素入栈顶`)
    setPoppedValue(null)
    setInputValue('')
  }, [inputValue, stack.length])

  const handlePop = useCallback(() => {
    if (stack.length === 0) return
    const val = stack[stack.length - 1]
    setStack(prev => prev.slice(0, -1))
    setHighlightIdx(-1)
    setPoppedValue(val)
    setOperation(`Pop ${val}  →  O(1) 栈顶元素出栈`)
  }, [stack])

  const handlePeek = useCallback(() => {
    if (stack.length === 0) return
    setHighlightIdx(stack.length - 1)
    setOperation(`Peek: 栈顶元素为 ${stack[stack.length - 1]}  →  O(1) 只看不取`)
  }, [stack])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link to="/">首页</Link><span className={styles.sep}>/</span>
          <span className={styles.current}>栈</span>
        </div>
        <h1 className={styles.title}>栈 Stack</h1>
        <p className={styles.subtitle}>后进先出(LIFO)的线性结构，函数调用栈、表达式求值、括号匹配的核心数据结构</p>
      </div>

      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.operationPanel}>
            <input type="number" placeholder="值" value={inputValue} onChange={e => setInputValue(e.target.value)} className={styles.input} />
            <button className={styles.opBtn} onClick={handlePush}>Push 入栈</button>
            <button className={`${styles.opBtn} ${styles.popBtn}`} onClick={handlePop}>Pop 出栈</button>
            <button className={`${styles.opBtn} ${styles.peekBtn}`} onClick={handlePeek}>Peek 查看</button>
          </div>

          {operation && <div className={styles.operationInfo}>{operation}</div>}
          {poppedValue !== null && <div className={styles.poppedInfo}>弹出值: {poppedValue}</div>}

          <div className={styles.visualArea}>
            <div className={styles.stackContainer}>
              <div className={styles.topPointer}>
                <span>← top</span>
              </div>
              <div className={styles.stackBody}>
                {[...stack].reverse().map((value, revIndex) => {
                  const actualIndex = stack.length - 1 - revIndex
                  return (
                    <div
                      key={`${actualIndex}-${value}`}
                      className={`${styles.stackItem} ${highlightIdx === actualIndex ? styles.itemHighlight : ''} ${revIndex === 0 ? styles.stackTop : ''}`}
                    >
                      <span className={styles.itemValue}>{value}</span>
                      <span className={styles.itemIndex}>[{actualIndex}]</span>
                    </div>
                  )
                })}
                {stack.length === 0 && <div className={styles.emptyStack}>栈为空</div>}
                <div className={styles.stackBottom}>── 栈底 ──</div>
              </div>
            </div>
          </div>

          <div className={styles.applications}>
            <h3>典型应用</h3>
            <div className={styles.appGrid}>
              <div className={styles.appCard}>
                <strong>函数调用栈</strong>
                <p>每次函数调用压栈，返回时出栈，递归的本质</p>
              </div>
              <div className={styles.appCard}>
                <strong>括号匹配</strong>
                <p>遇到左括号压栈，遇到右括号弹栈匹配</p>
              </div>
              <div className={styles.appCard}>
                <strong>表达式求值</strong>
                <p>中缀转后缀，双栈法求值</p>
              </div>
              <div className={styles.appCard}>
                <strong>浏览器前进后退</strong>
                <p>两个栈实现前进和后退功能</p>
              </div>
            </div>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.infoCard}>
            <h3>LIFO 原则</h3>
            <p className={styles.principle}>后进先出 (Last In First Out)</p>
            <p className={styles.principleDesc}>就像一摞盘子：最后放上去的盘子最先被取走</p>
          </div>
          <div className={styles.infoCard}>
            <h3>操作复杂度</h3>
            <div className={styles.opList}>
              <div className={styles.opItem}><span>Push</span><span className={styles.good}>O(1)</span></div>
              <div className={styles.opItem}><span>Pop</span><span className={styles.good}>O(1)</span></div>
              <div className={styles.opItem}><span>Peek</span><span className={styles.good}>O(1)</span></div>
              <div className={styles.opItem}><span>搜索</span><span className={styles.bad}>O(n)</span></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
