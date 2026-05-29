import { useState, useCallback, useMemo } from 'react'
import type { QuizQuestion, ErrorRecord } from '../../types'
import styles from './LearningLoop.module.css'

interface LearningState {
  phase: 'input' | 'explain' | 'attempt' | 'feedback' | 'reinforce'
  currentTopic: string
  attempts: number
  correctCount: number
  errors: ErrorRecord[]
  mastery: number
}

const quizBank: QuizQuestion[] = [
  { id: 'q1', topic: 'array', question: '数组随机访问的时间复杂度是？', options: ['O(1)', 'O(n)', 'O(logn)', 'O(n²)'], correctIndex: 0, explanation: '数组通过基地址+偏移量直接计算地址，无需遍历，因此是O(1)', difficulty: 1 },
  { id: 'q2', topic: 'array', question: '在数组中间插入一个元素的时间复杂度是？', options: ['O(1)', 'O(n)', 'O(logn)', 'O(n²)'], correctIndex: 1, explanation: '插入后需要移动插入位置后的所有元素，平均移动n/2个，因此是O(n)', difficulty: 1 },
  { id: 'q3', topic: 'linked-list', question: '链表相比数组的主要优势是？', options: ['随机访问更快', '插入删除更高效', '占用空间更少', '缓存友好性更好'], correctIndex: 1, explanation: '链表插入删除只需修改指针O(1)，而数组需要移动元素O(n)', difficulty: 1 },
  { id: 'q4', topic: 'stack', question: '栈的存取原则是？', options: ['先进先出', '后进先出', '随机存取', '优先级存取'], correctIndex: 1, explanation: '栈是LIFO(Last In First Out)结构，最后入栈的元素最先出栈', difficulty: 1, errorType: 'understanding' },
  { id: 'q5', topic: 'queue', question: 'BFS遍历图时使用的数据结构是？', options: ['栈', '队列', '优先队列', '双端队列'], correctIndex: 1, explanation: 'BFS逐层扩展，需要队列保证先发现的节点先被处理(FIFO)', difficulty: 2, errorType: 'method' },
  { id: 'q6', topic: 'tree', question: '二叉搜索树的中序遍历结果是什么？', options: ['随机序列', '降序序列', '升序序列', '原插入序列'], correctIndex: 2, explanation: 'BST的性质：左<根<右，中序遍历(左根右)恰好得到升序序列', difficulty: 2, errorType: 'understanding' },
  { id: 'q7', topic: 'hash', question: '哈希表平均查找时间复杂度是？', options: ['O(1)', 'O(n)', 'O(logn)', 'O(n²)'], correctIndex: 0, explanation: '理想情况下哈希函数直接定位，平均O(1)。最坏情况(全冲突)退化为O(n)', difficulty: 1 },
  { id: 'q8', topic: 'sort', question: '以下哪个排序算法是稳定的？', options: ['快速排序', '选择排序', '归并排序', '堆排序'], correctIndex: 2, explanation: '归并排序合并时相等元素保持原顺序，因此稳定。快排和选择排序可能改变相等元素的相对位置', difficulty: 2, errorType: 'understanding' },
  { id: 'q9', topic: 'graph', question: 'DFS遍历图时使用的数据结构是？', options: ['队列', '栈', '数组', '哈希表'], correctIndex: 1, explanation: 'DFS深度优先，后发现的节点先处理，因此用栈(或递归调用栈)', difficulty: 2, errorType: 'method' },
  { id: 'q10', topic: 'sort', question: '快速排序最坏情况的时间复杂度是？', options: ['O(nlogn)', 'O(n)', 'O(n²)', 'O(logn)'], correctIndex: 2, explanation: '当每次选择的基准值都是最大或最小值时(如已排序数组选首元素)，分区极度不平衡，退化为O(n²)', difficulty: 2, errorType: 'calculation' },
  { id: 'q11', topic: 'array', question: '二分查找的前提条件是？', options: ['数组有序', '数组无序', '数组长度为奇数', '数组元素唯一'], correctIndex: 0, explanation: '二分查找依赖有序性，通过比较中间元素排除一半搜索范围', difficulty: 1 },
  { id: 'q12', topic: 'linked-list', question: '单向链表删除节点需要知道什么？', options: ['被删节点的前驱', '被删节点的后继', '头节点', '尾节点'], correctIndex: 0, explanation: '删除节点需要修改前驱节点的next指针，跳过被删节点', difficulty: 2, errorType: 'method' },
  { id: 'q13', topic: 'tree', question: '满二叉树第i层最多有多少个节点？', options: ['i', '2^i', '2^(i-1)', 'i²'], correctIndex: 2, explanation: '满二叉树第i层最多有2^(i-1)个节点（根为第1层）', difficulty: 2, errorType: 'calculation' },
  { id: 'q14', topic: 'graph', question: '无向图有n个顶点，最多有多少条边？', options: ['n', 'n-1', 'n(n-1)/2', 'n(n-1)'], correctIndex: 2, explanation: '完全无向图中每对顶点之间有一条边，C(n,2)=n(n-1)/2', difficulty: 2, errorType: 'calculation' },
  { id: 'q15', topic: 'hash', question: '哈希冲突是指？', options: ['哈希表满了', '两个不同键映射到同一位置', '哈希函数计算错误', '键值重复'], correctIndex: 1, explanation: '哈希冲突指不同的键经过哈希函数计算后得到相同的索引位置', difficulty: 1, errorType: 'understanding' }
]

const phaseMeta: Record<LearningState['phase'], { label: string; icon: string; desc: string; color: string }> = {
  input: { label: '选择', icon: '📝', desc: '选择学习主题', color: '#3b82f6' },
  explain: { label: '讲解', icon: '📖', desc: '学习核心概念', color: '#8b5cf6' },
  attempt: { label: '练习', icon: '🎯', desc: '检验学习成果', color: '#f59e0b' },
  feedback: { label: '反馈', icon: '💬', desc: '分析答题情况', color: '#10b981' },
  reinforce: { label: '强化', icon: '💪', desc: '针对薄弱点训练', color: '#ef4444' }
}

const phaseOrder: LearningState['phase'][] = ['input', 'explain', 'attempt', 'feedback', 'reinforce']

const explanations: Record<string, string> = {
  array: '📖 **数组核心概念**\n\n数组是最基础的线性数据结构，元素在内存中连续存储。\n\n**核心公式**：addr[i] = base + i × elementSize\n\n**关键操作复杂度**：\n• 访问：O(1) — 直接计算地址\n• 插入：O(n) — 需要移动元素\n• 删除：O(n) — 需要移动元素\n• 查找：O(n)线性 / O(logn)二分\n\n**适用场景**：读多写少、需要随机访问',
  linkedList: '📖 **链表核心概念**\n\n链表通过指针将节点串联，不需要连续内存。\n\n**节点结构**：data + next指针\n\n**关键操作复杂度**：\n• 头插：O(1)\n• 查找：O(n) — 必须从头遍历\n• 中间插入：O(n)查找 + O(1)插入\n\n**与数组对比**：链表插入删除快，但查找慢',
  stack: '📖 **栈核心概念**\n\n栈是后进先出(LIFO)的线性结构。\n\n**核心操作**：Push(入栈)、Pop(出栈)、Peek(查看栈顶)\n\n**关键应用**：\n• 函数调用栈\n• 括号匹配\n• 表达式求值\n• 浏览器前进后退\n\n**核心原则**：最后放进去的最先出来',
  queue: '📖 **队列核心概念**\n\n队列是先进先出(FIFO)的线性结构。\n\n**核心操作**：Enqueue(入队)、Dequeue(出队)\n\n**关键应用**：\n• BFS广度优先搜索\n• 任务调度(FCFS)\n• 消息队列\n\n**循环队列**：rear = (rear+1) % capacity',
  tree: '📖 **二叉树核心概念**\n\n二叉树每个节点最多两个子节点。\n\n**三种遍历**：\n• 前序：根→左→右\n• 中序：左→根→右（BST=升序）\n• 后序：左→右→根\n\n**BST性质**：左<根<右\n**操作复杂度**：平均O(logn)，最坏O(n)',
  graph: '📖 **图核心概念**\n\n图由顶点和边组成，是最通用的数据结构。\n\n**两种遍历**：\n• BFS：队列，逐层扩展，求最短路径\n• DFS：栈/递归，深入到底，路径搜索\n\n**关键**：必须维护visited集合防止重复访问',
  hash: '📖 **哈希表核心概念**\n\n哈希表通过哈希函数将键映射到数组索引。\n\n**平均复杂度**：O(1)查找\n**最坏情况**：O(n)（全冲突）\n\n**冲突解决**：\n• 线性探测：简单但易聚集\n• 链地址法：最常用\n\n**负载因子**：α = n/m，>0.7应扩容',
  sort: '📖 **排序算法核心概念**\n\n**O(n²)排序**：冒泡、选择、插入 — 简单，适合小数据\n**O(nlogn)排序**：快排、归并 — 高效，适合大数据\n\n**稳定性**：相等元素排序后相对位置不变\n• 稳定：冒泡、插入、归并\n• 不稳定：选择、快排、堆排\n\n**选择建议**：一般用快排，需要稳定用归并'
}

export default function LearningLoop() {
  const [state, setState] = useState<LearningState>({
    phase: 'input', currentTopic: '', attempts: 0, correctCount: 0, errors: [], mastery: 0
  })
  const [selectedAnswer, setSelectedAnswer] = useState(-1)
  const [showResult, setShowResult] = useState(false)
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion | null>(null)
  const [explanation, setExplanation] = useState('')
  const [completedTopics, setCompletedTopics] = useState<string[]>([])
  const [usedQuizIds, setUsedQuizIds] = useState<Set<string>>(new Set())
  const [animationKey, setAnimationKey] = useState(0)

  const topics = ['array', 'linked-list', 'stack', 'queue', 'tree', 'graph', 'hash', 'sort']
  const topicNames: Record<string, string> = {
    array: '数组', 'linked-list': '链表', stack: '栈', queue: '队列',
    tree: '树', graph: '图', hash: '哈希表', sort: '排序算法'
  }
  const topicIcons: Record<string, string> = {
    array: '📊', 'linked-list': '🔗', stack: '📚', queue: '🚶',
    tree: '🌳', graph: '🕸️', hash: '#️⃣', sort: '📈'
  }

  const handleSelectTopic = useCallback((topic: string) => {
    const topicKey = topic === 'linked-list' ? 'linkedList' : topic === 'hash-table' ? 'hash' : topic
    setState(prev => ({
      ...prev,
      phase: 'explain',
      currentTopic: topic,
      attempts: 0,
      correctCount: 0,
      errors: [],
      mastery: 0
    }))
    setExplanation(explanations[topicKey] || '概念讲解中...')
    setUsedQuizIds(new Set())
    setAnimationKey(k => k + 1)
  }, [])

  const pickQuiz = useCallback((topic: string, used: Set<string>) => {
    const topicQuizzes = quizBank.filter(q => q.topic === topic && !used.has(q.id))
    if (topicQuizzes.length > 0) return topicQuizzes[Math.floor(Math.random() * topicQuizzes.length)]
    const fallback = quizBank.filter(q => !used.has(q.id))
    if (fallback.length > 0) return fallback[Math.floor(Math.random() * fallback.length)]
    setUsedQuizIds(new Set())
    const reset = quizBank.filter(q => q.topic === topic)
    if (reset.length > 0) return reset[Math.floor(Math.random() * reset.length)]
    return quizBank[Math.floor(Math.random() * quizBank.length)]
  }, [])

  const handleStartQuiz = useCallback(() => {
    const quiz = pickQuiz(state.currentTopic, usedQuizIds)
    setCurrentQuiz(quiz)
    setUsedQuizIds(prev => new Set(prev).add(quiz.id))
    setState(prev => ({ ...prev, phase: 'attempt', attempts: prev.attempts + 1 }))
    setSelectedAnswer(-1)
    setShowResult(false)
    setAnimationKey(k => k + 1)
  }, [state.currentTopic, usedQuizIds, pickQuiz])

  const handleSubmitAnswer = useCallback(() => {
    if (!currentQuiz || selectedAnswer === -1) return
    setShowResult(true)
    const isCorrect = selectedAnswer === currentQuiz.correctIndex

    if (isCorrect) {
      setState(prev => ({
        ...prev,
        phase: 'feedback',
        correctCount: prev.correctCount + 1,
        mastery: Math.min(100, prev.mastery + Math.ceil(100 / 5))
      }))
    } else {
      const error: ErrorRecord = {
        type: currentQuiz.errorType || (Math.abs(selectedAnswer - currentQuiz.correctIndex) === 1 ? 'calculation' : 'understanding'),
        description: `「${currentQuiz.question}」选择了「${currentQuiz.options[selectedAnswer]}」，正确答案是「${currentQuiz.options[currentQuiz.correctIndex]}」`,
        timestamp: Date.now(),
        topic: currentQuiz.topic,
        hint: currentQuiz.explanation
      }
      setState(prev => ({
        ...prev,
        phase: 'feedback',
        errors: [...prev.errors, error],
        mastery: Math.max(0, prev.mastery - 15)
      }))
    }
  }, [currentQuiz, selectedAnswer])

  const handleNextQuestion = useCallback(() => {
    const quiz = pickQuiz(state.currentTopic, usedQuizIds)
    setCurrentQuiz(quiz)
    setUsedQuizIds(prev => new Set(prev).add(quiz.id))
    setState(prev => ({ ...prev, phase: 'attempt', attempts: prev.attempts + 1 }))
    setSelectedAnswer(-1)
    setShowResult(false)
    setAnimationKey(k => k + 1)
  }, [state.currentTopic, usedQuizIds, pickQuiz])

  const handleCompleteTopic = useCallback(() => {
    setCompletedTopics(prev => [...new Set([...prev, state.currentTopic])])
    setState({
      phase: 'input', currentTopic: '', attempts: 0, correctCount: 0, errors: [], mastery: 0
    })
    setCurrentQuiz(null)
    setUsedQuizIds(new Set())
    setAnimationKey(k => k + 1)
  }, [state.currentTopic])

  const handleReinforceDone = useCallback(() => {
    setState(prev => ({ ...prev, phase: 'attempt' }))
    handleNextQuestion()
  }, [handleNextQuestion])

  const accuracy = useMemo(() => {
    if (state.attempts === 0) return 0
    return Math.round((state.correctCount / state.attempts) * 100)
  }, [state.attempts, state.correctCount])

  const currentPhaseIndex = phaseOrder.indexOf(state.phase)

  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, i) => {
      let node: React.ReactNode = line
      const parts: React.ReactNode[] = []
      let last = 0
      const regex = /\*\*(.+?)\*\*/g
      let m: RegExpExecArray | null
      while ((m = regex.exec(line)) !== null) {
        if (m.index > last) parts.push(line.slice(last, m.index))
        parts.push(<strong key={i + '-' + m.index}>{m[1]}</strong>)
        last = m.index + m[0].length
      }
      if (parts.length > 0) {
        if (last < line.length) parts.push(line.slice(last))
        node = parts
      }
      return <div key={i} style={{ marginBottom: line.startsWith('•') ? 2 : 0, paddingLeft: line.startsWith('•') ? 8 : 0 }}>{node}</div>
    })
  }

  return (
    <div className={styles.container} key={animationKey}>
      <div className={styles.progressBar}>
        {phaseOrder.map((phase, index) => (
          <div key={phase} className={styles.progressStep}>
            <div
              className={`${styles.stepDot} ${index < currentPhaseIndex ? styles.stepDone : ''} ${index === currentPhaseIndex ? styles.stepCurrent : ''}`}
              style={{ '--step-color': phaseMeta[phase].color } as React.CSSProperties}
            >
              {index < currentPhaseIndex ? '✓' : phaseMeta[phase].icon}
            </div>
            <span className={`${styles.stepLabel} ${index <= currentPhaseIndex ? styles.stepLabelActive : ''}`}>
              {phaseMeta[phase].label}
            </span>
            {index < phaseOrder.length - 1 && (
              <div className={`${styles.stepLine} ${index < currentPhaseIndex ? styles.stepLineDone : ''}`} />
            )}
          </div>
        ))}
      </div>

      <div className={styles.statusBar}>
        <span className={styles.statusBadge} style={{ background: phaseMeta[state.phase].color + '20', color: phaseMeta[state.phase].color, borderColor: phaseMeta[state.phase].color + '40' }}>
          {phaseMeta[state.phase].icon} {phaseMeta[state.phase].desc}
        </span>
        {state.currentTopic && (
          <span className={styles.statusTopic}>
            {topicIcons[state.currentTopic]} {topicNames[state.currentTopic]}
          </span>
        )}
        {state.attempts > 0 && (
          <span className={styles.statusStat}>
            ✅ {state.correctCount}/{state.attempts} 正确率 {accuracy}%
          </span>
        )}
      </div>

      <div className={styles.content}>
        {state.phase === 'input' && (
          <div className={styles.fadeIn}>
            <h3 className={styles.phaseTitle}>选择学习主题</h3>
            <p className={styles.phaseSubtitle}>选择一个数据结构或算法主题开始学习</p>
            <div className={styles.topicGrid}>
              {topics.map(topic => (
                <button
                  key={topic}
                  className={`${styles.topicCard} ${completedTopics.includes(topic) ? styles.topicCardDone : ''}`}
                  onClick={() => handleSelectTopic(topic)}
                >
                  <span className={styles.topicCardIcon}>{topicIcons[topic]}</span>
                  <span className={styles.topicCardName}>{topicNames[topic]}</span>
                  {completedTopics.includes(topic) && (
                    <span className={styles.topicCardBadge}>已完成</span>
                  )}
                </button>
              ))}
            </div>
            {completedTopics.length > 0 && (
              <div className={styles.overallProgress}>
                <div className={styles.progressLabel}>
                  总进度 {completedTopics.length}/{topics.length}
                </div>
                <div className={styles.progressTrack}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${(completedTopics.length / topics.length) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {state.phase === 'explain' && (
          <div className={styles.fadeIn}>
            <h3 className={styles.phaseTitle}>
              <span className={styles.topicTag}>{topicIcons[state.currentTopic]} {topicNames[state.currentTopic]}</span>
              概念讲解
            </h3>
            <div className={styles.explanationCard}>
              {renderMarkdown(explanation)}
            </div>
            <div className={styles.actions}>
              <button className={`${styles.btnPrimary} ${styles.btnPulse}`} onClick={handleStartQuiz}>
                🎯 我理解了，开始练习
              </button>
            </div>
          </div>
        )}

        {state.phase === 'attempt' && currentQuiz && (
          <div className={styles.fadeIn}>
            <div className={styles.quizHeader}>
              <span className={styles.quizCounter}>第 {state.attempts} 题</span>
              <span className={styles.quizDifficulty}>
                {'⭐'.repeat(currentQuiz.difficulty)}
              </span>
            </div>
            <div className={styles.quizQuestion}>{currentQuiz.question}</div>
            <div className={styles.optionsGrid}>
              {currentQuiz.options.map((option, index) => {
                const isCorrect = showResult && index === currentQuiz.correctIndex
                const isWrong = showResult && selectedAnswer === index && index !== currentQuiz.correctIndex
                const isSelected = selectedAnswer === index && !showResult
                return (
                  <button
                    key={index}
                    className={`${styles.optionCard} ${isSelected ? styles.optionSelected : ''} ${isCorrect ? styles.optionCorrect : ''} ${isWrong ? styles.optionWrong : ''}`}
                    onClick={() => !showResult && setSelectedAnswer(index)}
                    disabled={showResult}
                  >
                    <span className={styles.optionLetter}>{String.fromCharCode(65 + index)}</span>
                    <span className={styles.optionText}>{option}</span>
                    {isCorrect && <span className={styles.optionMark}>✓</span>}
                    {isWrong && <span className={styles.optionMark}>✗</span>}
                  </button>
                )
              })}
            </div>
            {!showResult && selectedAnswer !== -1 && (
              <div className={styles.actions}>
                <button className={styles.btnPrimary} onClick={handleSubmitAnswer}>
                  提交答案
                </button>
              </div>
            )}
          </div>
        )}

        {state.phase === 'feedback' && currentQuiz && (
          <div className={styles.fadeIn}>
            <div className={`${styles.feedbackCard} ${selectedAnswer === currentQuiz.correctIndex ? styles.feedbackCorrectCard : styles.feedbackWrongCard}`}>
              <div className={styles.feedbackIcon}>
                {selectedAnswer === currentQuiz.correctIndex ? '🎉' : '💡'}
              </div>
              <h4 className={styles.feedbackTitle}>
                {selectedAnswer === currentQuiz.correctIndex ? '回答正确！' : '回答错误'}
              </h4>
              <div className={styles.feedbackAnswer}>
                正确答案：<strong>{currentQuiz.options[currentQuiz.correctIndex]}</strong>
              </div>
              <div className={styles.feedbackExplanation}>
                {renderMarkdown(currentQuiz.explanation)}
              </div>
            </div>

            <div className={styles.masterySection}>
              <div className={styles.masteryLabel}>
                <span>主题掌握度</span>
                <span className={styles.masteryValue}>{state.mastery}%</span>
              </div>
              <div className={styles.masteryTrack}>
                <div className={styles.masteryFill} style={{ width: `${state.mastery}%` }} />
              </div>
              {state.mastery >= 100 && (
                <div className={styles.masteryComplete}>🌟 本主题已掌握！</div>
              )}
            </div>

            <div className={styles.actions}>
              {state.mastery >= 100 ? (
                <>
                  <button className={styles.btnPrimary} onClick={handleCompleteTopic}>
                    🏆 完成本主题
                  </button>
                  <button className={styles.btnGhost} onClick={handleNextQuestion}>
                    继续挑战 →
                  </button>
                </>
              ) : selectedAnswer === currentQuiz.correctIndex ? (
                <>
                  <button className={styles.btnPrimary} onClick={handleNextQuestion}>
                    🎯 再做一题
                  </button>
                  <button className={styles.btnGhost} onClick={handleCompleteTopic}>
                    完成本主题
                  </button>
                </>
              ) : (
                <>
                  <button className={styles.btnPrimary} onClick={() => setState(prev => ({ ...prev, phase: 'reinforce' }))}>
                    📖 查看错误分析
                  </button>
                  <button className={styles.btnGhost} onClick={handleNextQuestion}>
                    直接再做一题
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {state.phase === 'reinforce' && (
          <div className={styles.fadeIn}>
            <h3 className={styles.phaseTitle}>💪 错误分析与强化</h3>
            <p className={styles.phaseSubtitle}>分析错误原因，加深理解</p>
            <div className={styles.errorList}>
              {state.errors.map((error, index) => (
                <div key={index} className={styles.errorItem}>
                  <div className={styles.errorItemHeader}>
                    <span className={styles.errorItemType}>
                      {error.type === 'understanding' && '🧠 理解错误'}
                      {error.type === 'calculation' && '🔢 计算错误'}
                      {error.type === 'method' && '🔧 方法错误'}
                    </span>
                    <span className={styles.errorItemTime}>第 {index + 1} 次</span>
                  </div>
                  <p className={styles.errorItemDesc}>{error.description}</p>
                  <div className={styles.errorItemHint}>
                    <strong>💡 纠正：</strong>{error.hint}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.actions}>
              <button className={styles.btnPrimary} onClick={handleReinforceDone}>
                🔄 再做一题巩固
              </button>
              <button className={styles.btnGhost} onClick={handleCompleteTopic}>
                返回主题选择
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
