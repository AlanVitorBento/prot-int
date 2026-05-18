import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Feed from './pages/Feed'
import Canais from './pages/Canais'
import Sistemas from './pages/Sistemas'
import Marketplace from './pages/Marketplace'
import Noticia from './pages/Noticia'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/canais" element={<Canais />} />
          <Route path="/sistemas" element={<Sistemas />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/noticia/:id" element={<Noticia />} />
          <Route path="/config" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
