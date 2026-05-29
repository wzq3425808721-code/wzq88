import type { DSANode } from '../types'

export const dsaKnowledgeMap: DSANode[] = [
  {
    id: 'array',
    label: '数组',
    category: 'linear',
    level: 1,
    description: '连续内存空间的线性数据结构，支持O(1)随机访问',
    path: '/array',
    prerequisites: []
  },
  {
    id: 'linked-list',
    label: '链表',
    category: 'linear',
    level: 1,
    description: '通过指针链接的节点序列，支持O(1)插入删除',
    path: '/linked-list',
    prerequisites: ['array']
  },
  {
    id: 'stack',
    label: '栈',
    category: 'linear',
    level: 1,
    description: '后进先出(LIFO)的线性结构，函数调用栈的核心',
    path: '/stack',
    prerequisites: ['array']
  },
  {
    id: 'queue',
    label: '队列',
    category: 'linear',
    level: 1,
    description: '先进先出(FIFO)的线性结构，BFS的基础',
    path: '/queue',
    prerequisites: ['array']
  },
  {
    id: 'binary-tree',
    label: '二叉树',
    category: 'tree',
    level: 2,
    description: '每个节点最多两个子节点的层次结构',
    path: '/binary-tree',
    prerequisites: ['linked-list', 'recursion']
  },
  {
    id: 'bst',
    label: '二叉搜索树',
    category: 'tree',
    level: 2,
    description: '左小右大的有序二叉树，支持O(logn)查找',
    path: '/bst',
    prerequisites: ['binary-tree']
  },
  {
    id: 'heap',
    label: '堆',
    category: 'tree',
    level: 2,
    description: '完全二叉树实现的优先队列',
    path: '/heap',
    prerequisites: ['binary-tree', 'array']
  },
  {
    id: 'graph',
    label: '图',
    category: 'graph',
    level: 3,
    description: '由顶点和边组成的非线性结构，建模复杂关系',
    path: '/graph',
    prerequisites: ['queue', 'stack']
  },
  {
    id: 'hash-table',
    label: '哈希表',
    category: 'hash',
    level: 2,
    description: '基于哈希函数的键值对存储，O(1)平均查找',
    path: '/hash-table',
    prerequisites: ['array']
  },
  {
    id: 'bubble-sort',
    label: '冒泡排序',
    category: 'sort',
    level: 1,
    description: '相邻元素比较交换，每轮将最大值"冒泡"到末尾',
    path: '/sort/bubble',
    prerequisites: ['array']
  },
  {
    id: 'selection-sort',
    label: '选择排序',
    category: 'sort',
    level: 1,
    description: '每轮选择最小元素放到正确位置',
    path: '/sort/selection',
    prerequisites: ['array']
  },
  {
    id: 'insertion-sort',
    label: '插入排序',
    category: 'sort',
    level: 1,
    description: '将元素插入已排序部分的正确位置',
    path: '/sort/insertion',
    prerequisites: ['array']
  },
  {
    id: 'quick-sort',
    label: '快速排序',
    category: 'sort',
    level: 2,
    description: '分治法：选基准、分区、递归排序',
    path: '/sort/quick',
    prerequisites: ['recursion', 'bubble-sort']
  },
  {
    id: 'merge-sort',
    label: '归并排序',
    category: 'sort',
    level: 2,
    description: '分治法：拆分、排序、合并，稳定排序',
    path: '/sort/merge',
    prerequisites: ['recursion']
  },
  {
    id: 'binary-search',
    label: '二分查找',
    category: 'search',
    level: 1,
    description: '在有序数组中每次排除一半，O(logn)查找',
    path: '/search/binary',
    prerequisites: ['array']
  },
  {
    id: 'recursion',
    label: '递归',
    category: 'recursion',
    level: 1,
    description: '函数调用自身的编程范式，分治与回溯的基础',
    path: '/recursion',
    prerequisites: ['stack']
  },
  {
    id: 'dp',
    label: '动态规划',
    category: 'dp',
    level: 3,
    description: '将复杂问题分解为重叠子问题，记忆化避免重复计算',
    path: '/dp',
    prerequisites: ['recursion']
  }
]

export const categoryLabels: Record<string, string> = {
  linear: '线性结构',
  tree: '树形结构',
  graph: '图结构',
  hash: '哈希结构',
  sort: '排序算法',
  search: '查找算法',
  dp: '动态规划',
  recursion: '递归思想'
}

export const categoryColors: Record<string, string> = {
  linear: '#3b82f6',
  tree: '#10b981',
  graph: '#f59e0b',
  hash: '#8b5cf6',
  sort: '#ef4444',
  search: '#06b6d4',
  dp: '#f97316',
  recursion: '#ec4899'
}
