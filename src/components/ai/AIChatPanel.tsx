import { useState, useRef, useEffect, useCallback } from 'react'
import type { AIMessage } from '../../types'
import styles from './AIChatPanel.module.css'

type AIMode = 'explainer' | 'questioner' | 'corrector' | 'planner'

const modeConfig: Record<AIMode, { label: string; icon: string; color: string; description: string }> = {
  explainer: { label: '讲解者', icon: '📖', color: '#3b82f6', description: '详细解释概念和原理' },
  questioner: { label: '提问者', icon: '❓', color: '#f59e0b', description: '通过提问引导思考' },
  corrector: { label: '纠错者', icon: '🔍', color: '#ef4444', description: '发现并纠正错误' },
  planner: { label: '规划者', icon: '📋', color: '#10b981', description: '制定学习计划和路径' }
}

const topicKeywords: Record<string, string[]> = {
  array: ['数组', 'array', '下标', '索引', '连续', '随机访问'],
  linkedList: ['链表', 'linked list', '指针', '节点', 'head', 'next'],
  stack: ['栈', 'stack', 'LIFO', '后进先出', 'push', 'pop'],
  queue: ['队列', 'queue', 'FIFO', '先进先出', 'enqueue', 'dequeue'],
  tree: ['树', 'tree', '二叉树', '遍历', '前序', '中序', '后序', 'BST'],
  graph: ['图', 'graph', 'BFS', 'DFS', '广度', '深度', '最短路径'],
  hash: ['哈希', 'hash', '冲突', '散列', '探测'],
  sort: ['排序', 'sort', '冒泡', '选择', '插入', '快速', '归并'],
  search: ['查找', 'search', '二分', '线性'],
  recursion: ['递归', 'recursion', '基线', '调用栈'],
  dp: ['动态规划', 'DP', '子问题', '状态转移', '记忆化']
}

const knowledgeBase: Record<string, { explanation: string; commonErrors: string[]; tips: string[] }> = {
  array: {
    explanation: '数组是最基础的线性数据结构，元素在内存中连续存储。通过"基地址+偏移量"的计算方式实现O(1)随机访问：addr[i] = base + i × elementSize。但插入和删除需要移动元素，因此是O(n)。',
    commonErrors: ['混淆数组长度和最大索引（长度n，最大索引n-1）', '忘记数组越界检查', '插入时移动元素方向错误（应从后往前移）'],
    tips: ['数组适合读多写少的场景', '插入删除时画图理解元素移动方向', '有序数组可用二分查找优化到O(logn)']
  },
  linkedList: {
    explanation: '链表通过指针将节点串联，不需要连续内存。每个节点包含数据和指向下一个节点的指针。头插法O(1)，但查找必须从头遍历O(n)。插入时注意指针修改顺序：先新节点指向后继，再前驱指向新节点。',
    commonErrors: ['删除节点时忘记保存前驱节点', '指针修改顺序错误导致链表断裂', '忘记处理空链表边界情况'],
    tips: ['画图！每次操作都画出指针变化', '插入：先连后断（先连新节点，再断旧链接）', '使用哑节点(dummy node)简化头节点操作']
  },
  stack: {
    explanation: '栈是后进先出(LIFO)的线性结构，只允许在栈顶操作。Push入栈、Pop出栈都是O(1)。函数调用栈是栈最经典的应用：每次函数调用压栈，返回时出栈。递归的本质就是栈操作。',
    commonErrors: ['混淆栈和队列的出队顺序', '忘记检查栈空时Pop', '不理解递归调用栈的展开过程'],
    tips: ['想象一摞盘子来理解LIFO', '递归=隐式栈，迭代=显式栈', '括号匹配问题：左括号压栈，右括号弹栈匹配']
  },
  queue: {
    explanation: '队列是先进先出(FIFO)的线性结构，从队尾入队、队头出队。BFS(广度优先搜索)是队列最重要的应用。循环队列通过取模运算复用空间，解决假溢出问题。',
    commonErrors: ['混淆BFS(用队列)和DFS(用栈)', '循环队列忘记取模运算', '队满和队空的判断条件混淆'],
    tips: ['想象排队买票来理解FIFO', 'BFS逐层扩展=队列保证顺序', '循环队列：rear=(rear+1)%capacity']
  },
  tree: {
    explanation: '二叉树每个节点最多两个子节点。三种遍历：前序(根左右)、中序(左根右)、后序(左右根)。BST的中序遍历得到有序序列。树的高度决定操作效率，平衡树高度O(logn)。',
    commonErrors: ['混淆三种遍历的访问顺序', '不理解中序遍历BST=排序序列', '递归遍历忘记基线条件(空节点返回)'],
    tips: ['前序=先访问根，中序=根在中间，后序=根在最后', 'BST中序遍历=从小到大排序', '递归三要素：基线条件+递归关系+返回值']
  },
  graph: {
    explanation: '图由顶点和边组成。BFS用队列逐层扩展，适合求无权图最短路径；DFS用栈深入到底再回溯，适合路径搜索和连通性判断。两者都需要visited数组防止重复访问。',
    commonErrors: ['BFS用栈、DFS用队列（搞反了）', '忘记标记已访问节点导致死循环', 'BFS求最短路径时漏算层次'],
    tips: ['BFS=队列=逐层=最短路径', 'DFS=栈=深入=路径搜索', '一定要维护visited集合！']
  },
  hash: {
    explanation: '哈希表通过哈希函数将键映射到数组索引，平均O(1)查找。冲突是核心问题：线性探测简单但易聚集，链地址法最常用。负载因子α=n/m，α越大冲突越多。',
    commonErrors: ['认为哈希函数能保证不冲突', '删除时直接清空而非懒删除', '负载因子过高时仍期望O(1)性能'],
    tips: ['好的哈希函数要均匀分布', '删除用懒删除(标记删除)避免断裂探测链', '负载因子>0.7时考虑扩容']
  },
  sort: {
    explanation: '排序算法按时间复杂度分：O(n²)的冒泡/选择/插入适合小数据；O(nlogn)的快排/归并适合大数据。稳定性：相等元素排序后相对位置不变。冒泡和归并稳定，选择和快排不稳定。',
    commonErrors: ['混淆各排序算法的时间复杂度', '不理解快排最坏情况O(n²)何时发生', '忘记归并排序需要O(n)额外空间'],
    tips: ['冒泡：相邻比较交换，每轮最大值冒泡', '快排：选基准分区递归，平均最快', '归并：拆分排序合并，稳定但费空间']
  }
}

function detectTopic(message: string): string {
  const lowerMsg = message.toLowerCase()
  let bestMatch = 'general'
  let maxScore = 0

  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    let score = 0
    for (const kw of keywords) {
      if (lowerMsg.includes(kw.toLowerCase())) score++
    }
    if (score > maxScore) {
      maxScore = score
      bestMatch = topic
    }
  }
  return bestMatch
}

function generateAIResponse(message: string, mode: AIMode): string {
  const topic = detectTopic(message)
  const kb = knowledgeBase[topic]

  if (mode === 'explainer') {
    if (kb) {
      return `📖 **概念讲解**\n\n${kb.explanation}\n\n💡 **学习建议**：\n${kb.tips.map(t => `• ${t}`).join('\n')}`
    }
    return `📖 让我为你讲解这个问题。\n\n"${message}"是一个很好的问题！在数据结构与算法中，理解核心概念的关键是：\n\n1. **数据结构的本质**：它如何组织数据？\n2. **操作的时间复杂度**：为什么是这个复杂度？\n3. **适用场景**：什么时候用它？什么时候不用？\n\n你可以告诉我具体想了解哪个数据结构或算法，我会给出更详细的讲解。`
  }

  if (mode === 'questioner') {
    if (kb) {
      const questions = [
        `你能解释一下为什么${topic === 'array' ? '数组支持O(1)随机访问' : topic === 'linkedList' ? '链表查找是O(n)' : topic === 'stack' ? '栈是LIFO结构' : '这个概念'}吗？`,
        `如果${topic === 'hash' ? '哈希函数设计不好' : topic === 'sort' ? '数据已经有序' : '条件改变'}，会发生什么？`,
        `你能举一个${topic === 'graph' ? 'BFS比DFS更合适' : topic === 'tree' ? '中序遍历特别有用' : '实际应用'}的例子吗？`
      ]
      return `❓ **思考题**\n\n${questions.join('\n\n')}\n\n试着回答这些问题，这会帮助你更深入地理解！`
    }
    return `❓ 让我通过提问来引导你思考：\n\n1. 你能用自己的话描述这个概念吗？\n2. 它和之前学过的什么知识有关联？\n3. 如果条件改变，结果会怎样？\n\n试着回答，我会根据你的回答给出反馈。`
  }

  if (mode === 'corrector') {
    if (kb) {
      return `🔍 **常见错误检查**\n\n关于这个知识点，同学们常犯的错误有：\n\n${kb.commonErrors.map((e, i) => `${i + 1}. ${e}`).join('\n')}\n\n请检查你的理解中是否存在这些问题。如果不确定，可以描述你的思路，我来帮你诊断。`
    }
    return `🔍 让我帮你检查可能存在的错误。\n\n常见的学习误区：\n1. **理解错误**：概念理解偏差，如混淆相似概念\n2. **计算错误**：复杂度分析、边界条件计算错误\n3. **方法错误**：选错算法或数据结构\n\n你可以描述你的解题思路，我来帮你找出潜在问题。`
  }

  if (mode === 'planner') {
    return `📋 **学习规划建议**\n\n基于你的问题，我建议按以下路径学习：\n\n**阶段一：基础概念**\n• 先理解基本定义和核心操作\n• 画图理解数据结构的形态\n\n**阶段二：动手实践**\n• 在可视化工具中操作观察\n• 手动模拟算法执行过程\n\n**阶段三：深入理解**\n• 分析时间/空间复杂度\n• 对比相似数据结构的优劣\n\n**阶段四：应用提升**\n• 解决相关练习题\n• 分析实际应用场景\n\n你可以告诉我当前的学习进度，我来调整建议！`
  }

  return '请选择一个AI角色模式开始学习对话。'
}

function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n')
  return lines.map((line, i) => {
    let processed: React.ReactNode = line
    const boldRegex = /\*\*(.+?)\*\*/g
    const parts: React.ReactNode[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null
    while ((match = boldRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.slice(lastIndex, match.index))
      }
      parts.push(<strong key={`b-${i}-${match.index}`}>{match[1]}</strong>)
      lastIndex = match.index + match[0].length
    }
    if (parts.length > 0) {
      if (lastIndex < line.length) parts.push(line.slice(lastIndex))
      processed = parts
    }
    if (line.startsWith('• ') || line.startsWith('- ')) {
      return <div key={i} style={{ paddingLeft: 12, position: 'relative' }}>{processed}</div>
    }
    return <div key={i}>{processed}</div>
  })
}

export default function AIChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<AIMessage[]>(() => [
    {
      id: '0',
      role: 'assistant',
      content: '👋 你好！我是你的AI学习助手。我可以在四种角色间切换来帮助你学习：\n\n📖 **讲解者** - 详细解释概念和原理\n❓ **提问者** - 通过提问引导你思考\n🔍 **纠错者** - 发现并纠正你的错误\n📋 **规划者** - 制定个性化学习计划\n\n请选择一个模式，然后提出你的问题！',
      timestamp: Date.now(),
      mode: 'explainer'
    }
  ])
  const [input, setInput] = useState('')
  const [currentMode, setCurrentMode] = useState<AIMode>('explainer')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = useCallback(() => {
    const text = input.trim()
    if (!text) return
    if (text.length > 500) {
      alert('输入内容过长，请控制在500字以内')
      return
    }

    const now = Date.now()
    const userMsg: AIMessage = {
      id: `u-${now}`,
      role: 'user',
      content: text,
      timestamp: now
    }

    const response = generateAIResponse(text, currentMode)
    const aiMsg: AIMessage = {
      id: `a-${now}`,
      role: 'assistant',
      content: response,
      timestamp: now + 1,
      mode: currentMode
    }

    setMessages(prev => [...prev, userMsg, aiMsg])
    setInput('')
  }, [input, currentMode])

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3 className={styles.title}>AI 学习助手</h3>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
      </div>

      <div className={styles.modeSelector}>
        {(Object.entries(modeConfig) as [AIMode, typeof modeConfig.explainer][]).map(([mode, config]) => (
          <button
            key={mode}
            className={`${styles.modeBtn} ${currentMode === mode ? styles.modeBtnActive : ''}`}
            style={{ '--mode-color': config.color } as React.CSSProperties}
            onClick={() => setCurrentMode(mode)}
            title={config.description}
          >
            <span className={styles.modeIcon}>{config.icon}</span>
            <span className={styles.modeLabel}>{config.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.messages}>
        {messages.map(msg => (
          <div key={msg.id} className={`${styles.message} ${msg.role === 'user' ? styles.userMsg : styles.aiMsg}`}>
            {msg.role === 'assistant' && msg.mode && (
              <span className={styles.msgMode} style={{ color: modeConfig[msg.mode].color }}>
                {modeConfig[msg.mode].icon} {modeConfig[msg.mode].label}
              </span>
            )}
            <div className={styles.msgContent}>{renderMarkdown(msg.content)}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder={`向${modeConfig[currentMode].label}提问...`}
          className={styles.input}
        />
        <button className={styles.sendBtn} onClick={handleSend}>发送</button>
      </div>
    </div>
  )
}
