import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.css'

interface HeaderProps {
  onToggleAI: () => void
}

const navItems = [
  { to: '/', label: '知识图谱', exact: true },
  { to: '/sort/bubble', label: '排序算法' },
  { to: '/binary-tree', label: '树结构' },
  { to: '/graph', label: '图算法' },
  { to: '/learn', label: '学习闭环', highlight: true },
  { to: '/solve', label: '问题求解', highlight: true },
]

export default function Header({ onToggleAI }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>DSA Visual</span>
            <span className={styles.logoSub}>数据结构与算法可视化学习助手</span>
          </div>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `${styles.navLink} ${item.highlight ? styles.navLinkHighlight : ''} ${isActive ? styles.navLinkActive : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.right}>
          <button className={styles.aiButton} onClick={onToggleAI}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/>
              <path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z"/>
            </svg>
            <span className={styles.aiLabel}>AI助手</span>
          </button>

          <button
            className={styles.menuBtn}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="切换菜单"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
