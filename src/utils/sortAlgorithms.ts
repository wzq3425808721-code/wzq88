import type { AnimationStep } from '../types'

export function bubbleSort(arr: number[]): AnimationStep[] {
  const steps: AnimationStep[] = []
  const data = [...arr]
  const n = data.length

  steps.push({
    description: '初始数组状态',
    data: [...data],
    highlights: [],
    comparisons: [],
    swaps: []
  })

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      steps.push({
        description: `比较 ${data[j]} 和 ${data[j + 1]}`,
        data: [...data],
        highlights: [j, j + 1],
        comparisons: [[j, j + 1]],
        swaps: []
      })

      if (data[j] > data[j + 1]) {
        ;[data[j], data[j + 1]] = [data[j + 1], data[j]]
        steps.push({
          description: `交换 ${data[j + 1]} 和 ${data[j]}（${data[j + 1]} > ${data[j]}）`,
          data: [...data],
          highlights: [j, j + 1],
          comparisons: [],
          swaps: [[j, j + 1]]
        })
      }
    }
    steps.push({
      description: `第 ${i + 1} 轮完成，${data[n - 1 - i]} 已就位`,
      data: [...data],
      highlights: Array.from({ length: i + 1 }, (_, k) => n - 1 - k),
      comparisons: [],
      swaps: []
    })
  }

  steps.push({
    description: '排序完成！',
    data: [...data],
    highlights: Array.from({ length: n }, (_, i) => i),
    comparisons: [],
    swaps: []
  })

  return steps
}

export function selectionSort(arr: number[]): AnimationStep[] {
  const steps: AnimationStep[] = []
  const data = [...arr]
  const n = data.length

  steps.push({
    description: '初始数组状态',
    data: [...data],
    highlights: [],
    comparisons: [],
    swaps: []
  })

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    steps.push({
      description: `第 ${i + 1} 轮：从位置 ${i} 开始寻找最小值`,
      data: [...data],
      highlights: [i],
      comparisons: [],
      swaps: [],
      pointers: { min: minIdx, current: i }
    })

    for (let j = i + 1; j < n; j++) {
      steps.push({
        description: `比较当前最小值 ${data[minIdx]} 与 ${data[j]}`,
        data: [...data],
        highlights: [minIdx, j],
        comparisons: [[minIdx, j]],
        swaps: [],
        pointers: { min: minIdx, current: j }
      })

      if (data[j] < data[minIdx]) {
        minIdx = j
        steps.push({
          description: `更新最小值为 ${data[minIdx]}（位置 ${minIdx}）`,
          data: [...data],
          highlights: [minIdx],
          comparisons: [],
          swaps: [],
          pointers: { min: minIdx }
        })
      }
    }

    if (minIdx !== i) {
      ;[data[i], data[minIdx]] = [data[minIdx], data[i]]
      steps.push({
        description: `将最小值 ${data[i]} 交换到位置 ${i}`,
        data: [...data],
        highlights: [i, minIdx],
        comparisons: [],
        swaps: [[i, minIdx]]
      })
    }
  }

  steps.push({
    description: '排序完成！',
    data: [...data],
    highlights: Array.from({ length: n }, (_, i) => i),
    comparisons: [],
    swaps: []
  })

  return steps
}

export function insertionSort(arr: number[]): AnimationStep[] {
  const steps: AnimationStep[] = []
  const data = [...arr]
  const n = data.length

  steps.push({
    description: '初始数组状态',
    data: [...data],
    highlights: [0],
    comparisons: [],
    swaps: []
  })

  for (let i = 1; i < n; i++) {
    const key = data[i]
    let j = i - 1

    steps.push({
      description: `取出元素 ${key}（位置 ${i}），准备插入已排序部分`,
      data: [...data],
      highlights: [i],
      comparisons: [],
      swaps: [],
      pointers: { key: i }
    })

    while (j >= 0 && data[j] > key) {
      steps.push({
        description: `${data[j]} > ${key}，将 ${data[j]} 右移`,
        data: [...data],
        highlights: [j, j + 1],
        comparisons: [[j, j + 1]],
        swaps: []
      })

      data[j + 1] = data[j]
      j--

      steps.push({
        description: `元素右移后的状态`,
        data: [...data],
        highlights: [j + 1],
        comparisons: [],
        swaps: [[j + 1, j + 2]]
      })
    }

    data[j + 1] = key
    steps.push({
      description: `将 ${key} 插入到位置 ${j + 1}`,
      data: [...data],
      highlights: [j + 1],
      comparisons: [],
      swaps: []
    })
  }

  steps.push({
    description: '排序完成！',
    data: [...data],
    highlights: Array.from({ length: n }, (_, i) => i),
    comparisons: [],
    swaps: []
  })

  return steps
}

export function quickSort(arr: number[]): AnimationStep[] {
  const steps: AnimationStep[] = []
  const data = [...arr]

  steps.push({
    description: '初始数组状态',
    data: [...data],
    highlights: [],
    comparisons: [],
    swaps: []
  })

  function partition(low: number, high: number): number {
    const pivot = data[high]
    steps.push({
      description: `选择基准值 ${pivot}（位置 ${high}）`,
      data: [...data],
      highlights: [high],
      comparisons: [],
      swaps: [],
      pointers: { pivot: high }
    })

    let i = low - 1

    for (let j = low; j < high; j++) {
      steps.push({
        description: `比较 ${data[j]} 与基准值 ${pivot}`,
        data: [...data],
        highlights: [j, high],
        comparisons: [[j, high]],
        swaps: [],
        pointers: { pivot: high, i: i >= low ? i : -1, j }
      })

      if (data[j] <= pivot) {
        i++
        if (i !== j) {
          ;[data[i], data[j]] = [data[j], data[i]]
          steps.push({
            description: `${data[j]} ≤ ${pivot}，交换位置 ${i} 和 ${j}`,
            data: [...data],
            highlights: [i, j],
            comparisons: [],
            swaps: [[i, j]]
          })
        }
      }
    }

    if (i + 1 !== high) {
      ;[data[i + 1], data[high]] = [data[high], data[i + 1]]
    }

    steps.push({
      description: `基准值 ${data[i + 1]} 就位于位置 ${i + 1}`,
      data: [...data],
      highlights: [i + 1],
      comparisons: [],
      swaps: i + 1 !== high ? [[i + 1, high]] : []
    })

    return i + 1
  }

  function qs(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high)
      qs(low, pi - 1)
      qs(pi + 1, high)
    }
  }

  qs(0, data.length - 1)

  steps.push({
    description: '排序完成！',
    data: [...data],
    highlights: Array.from({ length: data.length }, (_, i) => i),
    comparisons: [],
    swaps: []
  })

  return steps
}

export function mergeSort(arr: number[]): AnimationStep[] {
  const steps: AnimationStep[] = []
  const data = [...arr]

  steps.push({
    description: '初始数组状态',
    data: [...data],
    highlights: [],
    comparisons: [],
    swaps: []
  })

  function merge(left: number, mid: number, right: number) {
    const leftArr = data.slice(left, mid + 1)
    const rightArr = data.slice(mid + 1, right + 1)

    steps.push({
      description: `合并 [${leftArr.join(', ')}] 和 [${rightArr.join(', ')}]`,
      data: [...data],
      highlights: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      comparisons: [],
      swaps: []
    })

    let i = 0, j = 0, k = left

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        description: `比较 ${leftArr[i]} 和 ${rightArr[j]}`,
        data: [...data],
        highlights: [left + i, mid + 1 + j],
        comparisons: [[left + i, mid + 1 + j]],
        swaps: []
      })

      if (leftArr[i] <= rightArr[j]) {
        data[k] = leftArr[i]
        i++
      } else {
        data[k] = rightArr[j]
        j++
      }

      steps.push({
        description: `放置 ${data[k]} 到位置 ${k}`,
        data: [...data],
        highlights: [k],
        comparisons: [],
        swaps: []
      })
      k++
    }

    while (i < leftArr.length) {
      data[k] = leftArr[i]
      steps.push({
        description: `放置剩余元素 ${data[k]} 到位置 ${k}`,
        data: [...data],
        highlights: [k],
        comparisons: [],
        swaps: []
      })
      i++
      k++
    }

    while (j < rightArr.length) {
      data[k] = rightArr[j]
      steps.push({
        description: `放置剩余元素 ${data[k]} 到位置 ${k}`,
        data: [...data],
        highlights: [k],
        comparisons: [],
        swaps: []
      })
      j++
      k++
    }

    steps.push({
      description: `合并结果：[${data.slice(left, right + 1).join(', ')}]`,
      data: [...data],
      highlights: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      comparisons: [],
      swaps: []
    })
  }

  function ms(left: number, right: number) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2)
      steps.push({
        description: `分割 [${left}..${right}] → [${left}..${mid}] 和 [${mid + 1}..${right}]`,
        data: [...data],
        highlights: Array.from({ length: right - left + 1 }, (_, i) => left + i),
        comparisons: [],
        swaps: []
      })
      ms(left, mid)
      ms(mid + 1, right)
      merge(left, mid, right)
    }
  }

  ms(0, data.length - 1)

  steps.push({
    description: '排序完成！',
    data: [...data],
    highlights: Array.from({ length: data.length }, (_, i) => i),
    comparisons: [],
    swaps: []
  })

  return steps
}

export const sortAlgorithms: Record<string, {
  name: string
  fn: (arr: number[]) => AnimationStep[]
  complexity: { best: string; avg: string; worst: string; space: string }
  stable: boolean
  description: string
}> = {
  bubble: {
    name: '冒泡排序',
    fn: bubbleSort,
    complexity: { best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    stable: true,
    description: '相邻元素两两比较，将较大的元素逐步"冒泡"到数组末尾'
  },
  selection: {
    name: '选择排序',
    fn: selectionSort,
    complexity: { best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    stable: false,
    description: '每轮从未排序部分选出最小元素，放到已排序部分的末尾'
  },
  insertion: {
    name: '插入排序',
    fn: insertionSort,
    complexity: { best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    stable: true,
    description: '将每个元素插入到已排序部分的正确位置，类似整理扑克牌'
  },
  quick: {
    name: '快速排序',
    fn: quickSort,
    complexity: { best: 'O(nlogn)', avg: 'O(nlogn)', worst: 'O(n²)', space: 'O(logn)' },
    stable: false,
    description: '选择基准值，将数组分为小于和大于基准的两部分，递归排序'
  },
  merge: {
    name: '归并排序',
    fn: mergeSort,
    complexity: { best: 'O(nlogn)', avg: 'O(nlogn)', worst: 'O(nlogn)', space: 'O(n)' },
    stable: true,
    description: '将数组不断二分，然后将有序子数组合并为整体有序数组'
  }
}
