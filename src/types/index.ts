export interface DSANode {
  id: string
  label: string
  category: 'linear' | 'tree' | 'graph' | 'hash' | 'sort' | 'search' | 'dp' | 'recursion'
  level: number
  description: string
  path: string
  prerequisites: string[]
}

export interface AnimationStep {
  description: string
  data: number[]
  highlights: number[]
  comparisons?: [number, number][]
  swaps?: [number, number][]
  pointers?: Record<string, number>
}

export interface TreeNode {
  value: number
  left: TreeNode | null
  right: TreeNode | null
  x?: number
  y?: number
  highlighted?: boolean
}

export interface GraphNode {
  id: number
  x: number
  y: number
  label: string
  visited?: boolean
  inStack?: boolean
}

export interface GraphEdge {
  from: number
  to: number
  weight?: number
  visited?: boolean
  inPath?: boolean
}

export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  mode?: 'explainer' | 'questioner' | 'corrector' | 'planner'
}

export interface LearningState {
  phase: 'input' | 'explain' | 'attempt' | 'feedback' | 'reinforce'
  currentTopic: string
  attempts: number
  errors: ErrorRecord[]
  mastery: number
}

export interface ErrorRecord {
  type: 'calculation' | 'understanding' | 'method'
  description: string
  timestamp: number
  topic: string
  hint: string
}

export interface QuizQuestion {
  id: string
  topic: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  difficulty: number
  errorType?: 'calculation' | 'understanding' | 'method'
}
