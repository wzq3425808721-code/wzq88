import { useCallback, useRef, useState, useEffect } from 'react'
import type { AnimationStep } from '../types'

export function useAnimation(steps: AnimationStep[]) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(500)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const speedRef = useRef(speed)
  const stepsRef = useRef(steps)
  const isPlayingRef = useRef(isPlaying)

  useEffect(() => { stepsRef.current = steps }, [steps])
  useEffect(() => { speedRef.current = speed }, [speed])
  useEffect(() => { isPlayingRef.current = isPlaying }, [isPlaying])

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => { clearTimer() }
  }, [clearTimer])

  useEffect(() => {
    clearTimer()
    const id = setTimeout(() => {
      setIsPlaying(false)
      setCurrentStep(0)
    }, 0)
    return () => clearTimeout(id)
  }, [steps.length, clearTimer])

  useEffect(() => {
    if (!isPlaying) {
      clearTimer()
      return
    }
    clearTimer()
    timerRef.current = setInterval(() => {
      setCurrentStep(prev => {
        const next = prev + 1
        const total = stepsRef.current.length
        if (next >= total) {
          clearTimer()
          setIsPlaying(false)
          return prev
        }
        return next
      })
    }, speedRef.current)
    return () => { clearTimer() }
  }, [isPlaying, clearTimer])

  const play = useCallback(() => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0)
    }
    setIsPlaying(true)
  }, [currentStep, steps.length])

  const pause = useCallback(() => {
    clearTimer()
    setIsPlaying(false)
  }, [clearTimer])

  const reset = useCallback(() => {
    clearTimer()
    setIsPlaying(false)
    setCurrentStep(0)
  }, [clearTimer])

  const stepForward = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }, [currentStep, steps.length])

  const stepBackward = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }, [currentStep])

  const jumpTo = useCallback((step: number) => {
    setCurrentStep(Math.max(0, Math.min(step, steps.length - 1)))
  }, [steps.length])

  return {
    currentStep,
    isPlaying,
    speed,
    steps,
    play,
    pause,
    reset,
    stepForward,
    stepBackward,
    jumpTo,
    setSpeed,
    currentData: steps[currentStep] || { description: '', data: [], highlights: [] }
  }
}
