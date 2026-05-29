import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styles from './LinkedListPage.module.css'

interface ListNode {
  value: number
  id: number
}

export default function LinkedListPage() {
  const [nodes, setNodes] = useState<ListNode[]>([
    { value: 15, id: 1 },
    { value: 42, id: 2 },
    { value: 8, id: 3 },
    { value: 23, id: 4 },
    { value: 67, id: 5 }
  ])
  const [inputValue, setInputValue] = useState('')
  const [inputIndex, setInputIndex] = useState('')
  const [highlightId, setHighlightId] = useState<number>(-1)
  const [operation, setOperation] = useState('')
  const [nextId, setNextId] = useState(6)

  const handleInsertHead = useCallback(() => {
    const val = Number(inputValue)
    if (isNaN(val)) return
    const newNode: ListNode = { value: val, id: nextId }
    setNodes([newNode, ...nodes])
    setHighlightId(newNode.id)
    setOperation(`头插法：在链表头部插入 ${val}  →  O(1) 只需修改头指针`)
    setNextId(prev => prev + 1)
    setInputValue('')
  }, [inputValue, nodes, nextId])

  const handleInsertTail = useCallback(() => {
    const val = Number(inputValue)
    if (isNaN(val)) return
    const newNode: ListNode = { value: val, id: nextId }
    setNodes([...nodes, newNode])
    setHighlightId(newNode.id)
    setOperation(`尾插法：在链表尾部插入 ${val}  →  O(n) 需要遍历到尾部`)
    setNextId(prev => prev + 1)
    setInputValue('')
  }, [inputValue, nodes, nextId])

  const handleInsertAt = useCallback(() => {
    const val = Number(inputValue)
    const idx = Number(inputIndex)
    if (isNaN(val) || isNaN(idx) || idx < 0 || idx > nodes.length) return
    const newNode: ListNode = { value: val, id: nextId }
    const newArr = [...nodes]
    newArr.splice(idx, 0, newNode)
    setNodes(newArr)
    setHighlightId(newNode.id)
    setOperation(`在位置 ${idx} 插入 ${val}  →  O(n) 需要遍历到位置 ${idx}`)
    setNextId(prev => prev + 1)
    setInputValue('')
    setInputIndex('')
  }, [inputValue, inputIndex, nodes, nextId])

  const handleDeleteAt = useCallback(() => {
    const idx = inputIndex !== '' ? Number(inputIndex) : 0
    if (idx < 0 || idx >= nodes.length) return
    const removed = nodes[idx]
    const newArr = nodes.filter((_, i) => i !== idx)
    setNodes(newArr)
    setHighlightId(-1)
    setOperation(idx === 0
      ? `删除头节点 ${removed.value}  →  O(1) 只需修改头指针`
      : `删除位置 ${idx} 的节点 ${removed.value}  →  O(n) 需要遍历到前驱节点`
    )
    setInputIndex('')
  }, [inputIndex, nodes])

  const handleSearch = useCallback(() => {
    const val = Number(inputValue)
    if (isNaN(val)) return
    const idx = nodes.findIndex(n => n.value === val)
    if (idx !== -1) {
      setHighlightId(nodes[idx].id)
      setOperation(`找到 ${val}，在第 ${idx} 个位置  →  O(n) 必须从头遍历`)
    } else {
      setHighlightId(-1)
      setOperation(`未找到 ${val}  →  O(n) 遍历了整个链表`)
    }
  }, [inputValue, nodes])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link to="/">首页</Link>
          <span className={styles.sep}>/</span>
          <span className={styles.current}>链表</span>
        </div>
        <h1 className={styles.title}>链表 Linked List</h1>
        <p className={styles.subtitle}>通过指针链接的节点序列，支持O(1)头部插入删除，但随机访问需要O(n)遍历</p>
      </div>

      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.operationPanel}>
            <input
              type="number"
              placeholder="值"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className={styles.input}
            />
            <input
              type="number"
              placeholder="位置(可选)"
              value={inputIndex}
              onChange={e => setInputIndex(e.target.value)}
              className={styles.input}
            />
            <div className={styles.buttonGroup}>
              <button className={styles.opBtn} onClick={handleInsertHead}>头插</button>
              <button className={styles.opBtn} onClick={handleInsertTail}>尾插</button>
              <button className={styles.opBtn} onClick={handleInsertAt}>位置插入</button>
              <button className={`${styles.opBtn} ${styles.deleteBtn}`} onClick={handleDeleteAt}>删除</button>
              <button className={`${styles.opBtn} ${styles.searchBtn}`} onClick={handleSearch}>查找</button>
            </div>
          </div>

          {operation && <div className={styles.operationInfo}>{operation}</div>}

          <div className={styles.visualArea}>
            <div className={styles.listContainer}>
              <div className={styles.headPointer}>
                <span>head</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2">
                  <line x1="12" y1="4" x2="12" y2="16"/><polyline points="8,12 12,16 16,12"/>
                </svg>
              </div>
              {nodes.map((node, index) => (
                <div key={node.id} className={styles.nodeWrapper}>
                  <div className={`${styles.node} ${highlightId === node.id ? styles.nodeHighlight : ''}`}>
                    <div className={styles.nodeValue}>{node.value}</div>
                    <div className={styles.nodeNext}>
                      {index < nodes.length - 1 ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="2">
                          <circle cx="12" cy="12" r="3"/><line x1="15" y1="12" x2="24" y2="12"/>
                        </svg>
                      ) : (
                        <span className={styles.nullPtr}>NULL</span>
                      )}
                    </div>
                  </div>
                  {index < nodes.length - 1 && (
                    <div className={styles.arrow}>
                      <svg width="40" height="20" viewBox="0 0 40 20">
                        <line x1="0" y1="10" x2="32" y2="10" stroke="var(--accent-green)" strokeWidth="2"/>
                        <polygon points="32,5 40,10 32,15" fill="var(--accent-green)"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.comparison}>
            <div className={styles.compCard}>
              <h4>数组 vs 链表</h4>
              <table className={styles.compTable}>
                <thead>
                  <tr><th>操作</th><th>数组</th><th>链表</th></tr>
                </thead>
                <tbody>
                  <tr><td>访问</td><td className={styles.good}>O(1)</td><td className={styles.bad}>O(n)</td></tr>
                  <tr><td>头部插入</td><td className={styles.bad}>O(n)</td><td className={styles.good}>O(1)</td></tr>
                  <tr><td>尾部插入</td><td className={styles.good}>O(1)*</td><td className={styles.bad}>O(n)</td></tr>
                  <tr><td>中间插入</td><td className={styles.bad}>O(n)</td><td className={styles.bad}>O(n)</td></tr>
                  <tr><td>空间</td><td>连续</td><td>分散+指针</td></tr>
                </tbody>
              </table>
              <p className={styles.compNote}>*数组尾部插入在不需要扩容时为O(1)</p>
            </div>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.infoCard}>
            <h3>核心概念</h3>
            <div className={styles.concept}>
              <strong>节点结构</strong>
              <div className={styles.codeBlock}>
                {`struct Node {\n  int data;\n  Node* next;\n};`}
              </div>
            </div>
            <div className={styles.concept}>
              <strong>头指针</strong>
              <p>头指针指向链表的第一个节点，是访问链表的唯一入口</p>
            </div>
            <div className={styles.concept}>
              <strong>NULL指针</strong>
              <p>最后一个节点的next指向NULL，表示链表结束</p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <h3>常见错误</h3>
            <ul className={styles.errorList}>
              <li><strong>理解错误：</strong>混淆数组索引和链表位置，链表不支持随机访问</li>
              <li><strong>方法错误：</strong>删除节点时忘记保存前驱节点指针</li>
              <li><strong>计算错误：</strong>插入时指针修改顺序错误导致链表断裂</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
