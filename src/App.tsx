import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ErrorBoundary from './components/common/ErrorBoundary'
import PageSkeleton from './components/common/PageSkeleton'
import Home from './pages/Home'

const ArrayPage = lazy(() => import('./pages/ArrayPage'))
const LinkedListPage = lazy(() => import('./pages/LinkedListPage'))
const StackPage = lazy(() => import('./pages/StackPage'))
const QueuePage = lazy(() => import('./pages/QueuePage'))
const BinaryTreePage = lazy(() => import('./pages/BinaryTreePage'))
const BSTPage = lazy(() => import('./pages/BSTPage'))
const HeapPage = lazy(() => import('./pages/HeapPage'))
const GraphPage = lazy(() => import('./pages/GraphPage'))
const HashTablePage = lazy(() => import('./pages/HashTablePage'))
const SortPage = lazy(() => import('./pages/SortPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const RecursionPage = lazy(() => import('./pages/RecursionPage'))
const DPPage = lazy(() => import('./pages/DPPage'))
const LearnPage = lazy(() => import('./pages/LearnPage'))
const SolvePage = lazy(() => import('./pages/SolvePage'))

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/array" element={<Suspense fallback={<PageSkeleton />}><ArrayPage /></Suspense>} />
          <Route path="/linked-list" element={<Suspense fallback={<PageSkeleton />}><LinkedListPage /></Suspense>} />
          <Route path="/stack" element={<Suspense fallback={<PageSkeleton />}><StackPage /></Suspense>} />
          <Route path="/queue" element={<Suspense fallback={<PageSkeleton />}><QueuePage /></Suspense>} />
          <Route path="/binary-tree" element={<Suspense fallback={<PageSkeleton />}><BinaryTreePage /></Suspense>} />
          <Route path="/bst" element={<Suspense fallback={<PageSkeleton />}><BSTPage /></Suspense>} />
          <Route path="/heap" element={<Suspense fallback={<PageSkeleton />}><HeapPage /></Suspense>} />
          <Route path="/graph" element={<Suspense fallback={<PageSkeleton />}><GraphPage /></Suspense>} />
          <Route path="/hash-table" element={<Suspense fallback={<PageSkeleton />}><HashTablePage /></Suspense>} />
          <Route path="/sort/:algorithm" element={<Suspense fallback={<PageSkeleton />}><SortPage /></Suspense>} />
          <Route path="/search/:algorithm" element={<Suspense fallback={<PageSkeleton />}><SearchPage /></Suspense>} />
          <Route path="/recursion" element={<Suspense fallback={<PageSkeleton />}><RecursionPage /></Suspense>} />
          <Route path="/dp" element={<Suspense fallback={<PageSkeleton />}><DPPage /></Suspense>} />
          <Route path="/learn" element={<Suspense fallback={<PageSkeleton />}><LearnPage /></Suspense>} />
          <Route path="/solve" element={<Suspense fallback={<PageSkeleton />}><SolvePage /></Suspense>} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}
