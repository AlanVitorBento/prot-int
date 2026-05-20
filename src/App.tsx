import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

const Home = lazy(() => import('./pages/Home'))
const Feed = lazy(() => import('./pages/Feed'))
const Areas = lazy(() => import('./pages/Areas'))
const Sistemas = lazy(() => import('./pages/Sistemas'))
const Marketplace = lazy(() => import('./pages/Marketplace'))
const Noticia = lazy(() => import('./pages/Noticia'))
const MarketplaceDetalhe = lazy(() => import('./pages/MarketplaceDetalhe'))

function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Suspense fallback={<PageFallback />}><Home /></Suspense>} />
          <Route path="/feed" element={<Suspense fallback={<PageFallback />}><Feed /></Suspense>} />
          <Route path="/areas" element={<Suspense fallback={<PageFallback />}><Areas /></Suspense>} />
          <Route path="/areas/:areaId" element={<Suspense fallback={<PageFallback />}><Areas /></Suspense>} />
          <Route path="/sistemas" element={<Suspense fallback={<PageFallback />}><Sistemas /></Suspense>} />
          <Route path="/marketplace" element={<Suspense fallback={<PageFallback />}><Marketplace /></Suspense>} />
          <Route path="/marketplace/:id" element={<Suspense fallback={<PageFallback />}><MarketplaceDetalhe /></Suspense>} />
          <Route path="/noticia/:id" element={<Suspense fallback={<PageFallback />}><Noticia /></Suspense>} />
          <Route path="/config" element={<Suspense fallback={<PageFallback />}><Home /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
