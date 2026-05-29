import { Component, type ReactNode } from 'react'
import styles from './ErrorBoundary.module.css'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className={styles.container}>
          <div className={styles.card}>
            <h2 className={styles.title}>⚠️ 页面出现了一些问题</h2>
            <p className={styles.desc}>
              当前页面渲染时发生错误，已自动隔离防止影响其他功能。
            </p>
            {this.state.error && (
              <details className={styles.details}>
                <summary>查看错误详情</summary>
                <pre className={styles.stack}>{this.state.error.stack}</pre>
              </details>
            )}
            <div className={styles.actions}>
              <button className={styles.btnPrimary} onClick={this.handleReset}>
                重试当前页面
              </button>
              <button
                className={styles.btnSecondary}
                onClick={() => window.location.href = '/'}
              >
                返回首页
              </button>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
