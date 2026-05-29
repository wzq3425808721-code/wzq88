import { useState } from 'react'
import styles from './ProblemSolver.module.css'

interface SolverStep {
  id: string
  title: string
  description: string
  detail: string
  type: 'input' | 'think' | 'choose' | 'execute' | 'verify'
  next: string[]
}

const problemSets: Record<string, { title: string; description: string; steps: SolverStep[] }> = {
  'reverse-linked-list': {
    title: '反转链表',
    description: '给定单链表的头节点head，反转链表并返回反转后的链表',
    steps: [
      { id: 's1', title: '理解问题', description: '明确输入输出', detail: '输入：链表头节点\n输出：反转后的链表头节点\n例：1→2→3→NULL 变为 3→2→1→NULL', type: 'input', next: ['s2'] },
      { id: 's2', title: '分析思路', description: '如何反转？', detail: '核心思路：逐个节点反转指针方向\n需要三个指针：prev, curr, next\nprev初始化为NULL（反转后末尾指向NULL）', type: 'think', next: ['s3', 's4'] },
      { id: 's3', title: '方法一：迭代', description: '三指针迭代法', detail: '1. prev = NULL, curr = head\n2. 循环：\n   next = curr.next  // 保存后继\n   curr.next = prev  // 反转指针\n   prev = curr       // 前驱前进\n   curr = next       // 当前前进\n3. 返回prev（新的头节点）\n\n时间O(n) 空间O(1)', type: 'choose', next: ['s5'] },
      { id: 's4', title: '方法二：递归', description: '递归反转法', detail: '1. 基线：head==NULL || head.next==NULL → return head\n2. 递归：newHead = reverse(head.next)\n3. head.next.next = head  // 后继指向自己\n4. head.next = NULL       // 断开原指针\n5. return newHead\n\n时间O(n) 空间O(n)递归栈', type: 'choose', next: ['s5'] },
      { id: 's5', title: '验证结果', description: '用示例验证', detail: '原链表：1→2→3→NULL\n\n迭代过程：\nStep1: prev=NULL, curr=1, next=2 → 1→NULL\nStep2: prev=1, curr=2, next=3 → 2→1→NULL\nStep3: prev=2, curr=3, next=NULL → 3→2→1→NULL\n\n✓ 结果正确！', type: 'verify', next: [] }
    ]
  },
  'binary-search': {
    title: '二分查找',
    description: '在有序数组中查找目标值，返回其索引，不存在则返回-1',
    steps: [
      { id: 's1', title: '理解问题', description: '明确前提条件', detail: '前提：数组必须有序！\n输入：有序数组nums[]，目标值target\n输出：target的索引，不存在返回-1', type: 'input', next: ['s2'] },
      { id: 's2', title: '分析思路', description: '分治思想', detail: '每次将搜索范围缩小一半：\n• 比较中间元素与target\n• 如果相等，找到了\n• 如果中间值<target，搜索右半部分\n• 如果中间值>target，搜索左半部分', type: 'think', next: ['s3'] },
      { id: 's3', title: '编写算法', description: '循环实现', detail: 'left = 0, right = n-1\nwhile (left <= right):\n    mid = left + (right-left)/2  // 防溢出\n    if nums[mid] == target: return mid\n    if nums[mid] < target: left = mid+1\n    if nums[mid] > target: right = mid-1\nreturn -1\n\n时间O(logn) 空间O(1)', type: 'execute', next: ['s4'] },
      { id: 's4', title: '常见错误', description: '边界条件', detail: '⚠ 循环条件：left <= right（不是<）\n⚠ mid计算：left+(right-left)/2（防溢出）\n⚠ 更新边界：left=mid+1, right=mid-1（不是=mid）\n\n这些是计算错误的高发区！', type: 'verify', next: [] }
    ]
  },
  'valid-parentheses': {
    title: '有效的括号',
    description: '给定只含括号的字符串，判断括号是否有效配对',
    steps: [
      { id: 's1', title: '理解问题', description: '明确有效配对规则', detail: '有效：() [] {}\n有效：{[()]}\n无效：(]  -- 类型不匹配\n无效：([)]  -- 交叉嵌套\n无效：(  -- 未闭合', type: 'input', next: ['s2'] },
      { id: 's2', title: '选择数据结构', description: '栈！', detail: '为什么用栈？\n• 左括号需要与最近的右括号匹配 → LIFO\n• 嵌套结构天然适合栈\n\n规则：\n• 遇到左括号 → 压栈\n• 遇到右括号 → 弹栈，检查是否匹配', type: 'choose', next: ['s3'] },
      { id: 's3', title: '编写算法', description: '栈实现', detail: 'stack = []\nfor char in s:\n    if char是左括号: stack.push(char)\n    else:\n        if stack为空: return false  // 多余右括号\n        top = stack.pop()\n        if top和char不匹配: return false\n\nreturn stack为空  // 检查是否所有左括号都匹配了\n\n时间O(n) 空间O(n)', type: 'execute', next: ['s4'] },
      { id: 's4', title: '验证', description: '测试用例', detail: '✓ "()" → push(, pop匹配 → 栈空 → true\n✓ "()[]{}" → 依次匹配 → true\n✓ "{[()]}" → 嵌套匹配 → true\n✗ "(]" → pop(不匹配] → false\n✗ "([)]" → pop[不匹配) → false\n✗ "(" → 栈非空 → false', type: 'verify', next: [] }
    ]
  }
}

const typeIcons: Record<string, string> = {
  input: '📝', think: '🧠', choose: '🔀', execute: '⚡', verify: '✅'
}

const typeColors: Record<string, string> = {
  input: '#3b82f6', think: '#8b5cf6', choose: '#f59e0b', execute: '#10b981', verify: '#06b6d4'
}

export default function ProblemSolver() {
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null)
  const [activeStep, setActiveStep] = useState<string>('')
  const [visitedSteps, setVisitedSteps] = useState<Set<string>>(new Set())

  const problem = selectedProblem ? problemSets[selectedProblem] : null
  const currentStep = problem?.steps.find(s => s.id === activeStep)

  const handleSelectProblem = (key: string) => {
    setSelectedProblem(key)
    const firstStep = problemSets[key].steps[0]
    setActiveStep(firstStep.id)
    setVisitedSteps(new Set([firstStep.id]))
  }

  const handleNextStep = (nextId: string) => {
    setActiveStep(nextId)
    setVisitedSteps(prev => new Set([...prev, nextId]))
  }

  return (
    <div className={styles.container}>
      {!selectedProblem ? (
        <div className={styles.problemList}>
          <h3>选择一道题目</h3>
          <div className={styles.problemGrid}>
            {Object.entries(problemSets).map(([key, prob]) => (
              <button key={key} className={styles.problemCard} onClick={() => handleSelectProblem(key)}>
                <h4>{prob.title}</h4>
                <p>{prob.description}</p>
              </button>
            ))}
          </div>
        </div>
      ) : problem ? (
        <div className={styles.solverView}>
          <div className={styles.solverHeader}>
            <button className={styles.backBtn} onClick={() => { setSelectedProblem(null); setActiveStep('') }}>← 返回</button>
            <h3>{problem.title}</h3>
            <p className={styles.problemDesc}>{problem.description}</p>
          </div>

          <div className={styles.flowChart}>
            {problem.steps.map((step, index) => (
              <div key={step.id} className={styles.flowNode}>
                {index > 0 && (
                  <div className={`${styles.flowLine} ${visitedSteps.has(step.id) ? styles.flowLineActive : ''}`} />
                )}
                <button
                  className={`${styles.stepNode} ${visitedSteps.has(step.id) ? styles.stepVisited : ''} ${activeStep === step.id ? styles.stepActive : ''}`}
                  style={{ '--step-color': typeColors[step.type] } as React.CSSProperties}
                  onClick={() => setActiveStep(step.id)}
                >
                  <span className={styles.stepIcon}>{typeIcons[step.type]}</span>
                  <span className={styles.stepTitle}>{step.title}</span>
                </button>
              </div>
            ))}
          </div>

          {currentStep && (
            <div className={styles.stepDetail} style={{ borderLeftColor: typeColors[currentStep.type] }}>
              <div className={styles.stepDetailHeader}>
                <span className={styles.stepDetailIcon}>{typeIcons[currentStep.type]}</span>
                <div>
                  <h4>{currentStep.title}</h4>
                  <p className={styles.stepDesc}>{currentStep.description}</p>
                </div>
              </div>
              <div className={styles.stepContent}>{currentStep.detail}</div>
              {currentStep.next.length > 0 && (
                <div className={styles.nextSteps}>
                  <span className={styles.nextLabel}>下一步：</span>
                  {currentStep.next.map(nextId => {
                    const nextStep = problem.steps.find(s => s.id === nextId)
                    if (!nextStep) return null
                    return (
                      <button key={nextId} className={styles.nextBtn} onClick={() => handleNextStep(nextId)}>
                        {typeIcons[nextStep.type]} {nextStep.title}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
