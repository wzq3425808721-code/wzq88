import { Outlet } from 'react-router-dom'
import Header from './Header'
import AIChatPanel from '../ai/AIChatPanel'
import { useState } from 'react'
import styles from './Layout.module.css'

export default function Layout() {
  const [showAI, setShowAI] = useState(false)

  return (
    <div className={styles.layout}>
      <Header onToggleAI={() => setShowAI(!showAI)} />
      <main className={styles.main}>
        <Outlet />
      </main>
      {showAI && <AIChatPanel onClose={() => setShowAI(false)} />}
      <button
        className={`${styles.aiToggle} ${showAI ? styles.aiToggleHidden : ''}`}
        onClick={() => setShowAI(true)}
        title="AI学习助手"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/>
          <path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z"/>
          <circle cx="9" cy="7" r="1" fill="currentColor"/>
          <circle cx="15" cy="7" r="1" fill="currentColor"/>
        </svg>
      </button>
    </div>
  )
}
