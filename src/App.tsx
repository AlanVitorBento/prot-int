import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Feed from './pages/Feed'
import Areas from './pages/Areas'
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
          <Route path="/areas" element={<Areas />} />
          <Route path="/areas/:areaId" element={<Areas />} />
          <Route path="/sistemas" element={<Sistemas />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/noticia/:id" element={<Noticia />} />
          <Route path="/config" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
