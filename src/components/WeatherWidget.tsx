import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CloudSun, Droplets, Wind, Thermometer, Eye, X, ChevronDown } from 'lucide-react'

export default function WeatherWidget() {
  const [expanded, setExpanded] = useState(false)
  const [showIframe, setShowIframe] = useState(false)

  return (
    <>
      {/* Compact header widget */}
      <div className="relative">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-primary/5 transition-colors text-text-secondary"
        >
          <CloudSun className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-semibold text-text">24°C</span>
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
        </button>

        {/* Expanded dropdown */}
        <AnimatePresence>
          {expanded && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setExpanded(false)} />
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-border/50 z-50 overflow-hidden"
              >
                {/* Header gradient */}
                <div className="bg-gradient-to-br from-amber-400 to-orange-400 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white/80 font-medium">Palotina, PR</p>
                      <div className="flex items-end gap-2 mt-1">
                        <span className="text-3xl font-bold leading-none">24°C</span>
                        <span className="text-sm text-white/80 mb-0.5">Parcialmente nublado</span>
                      </div>
                      <p className="text-xs text-white/60 mt-1">Sensação térmica: 26°C</p>
                    </div>
                    <CloudSun className="w-10 h-10 text-white/80" />
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-px bg-border/30">
                  {[
                    { icon: Droplets, label: 'Umidade', value: '72%', color: 'text-sky-500' },
                    { icon: Wind, label: 'Vento', value: '12 km/h NE', color: 'text-teal-500' },
                    { icon: Thermometer, label: 'Mín / Máx', value: '18° / 28°', color: 'text-orange-500' },
                    { icon: Eye, label: 'Visibilidade', value: '10 km', color: 'text-purple-500' },
                  ].map(item => (
                    <div key={item.label} className="bg-white p-3 flex items-center gap-2.5">
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                      <div>
                        <p className="text-[10px] text-text-secondary uppercase tracking-wide">{item.label}</p>
                        <p className="text-sm font-semibold text-text">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Forecast mini */}
                <div className="p-3 border-t border-border/50">
                  <p className="text-[10px] text-text-secondary uppercase tracking-wide mb-2">Próximos dias</p>
                  <div className="flex justify-between">
                    {[
                      { dia: 'Seg', temp: '26°', icon: '☀️' },
                      { dia: 'Ter', temp: '24°', icon: '⛅' },
                      { dia: 'Qua', temp: '22°', icon: '🌧️' },
                      { dia: 'Qui', temp: '25°', icon: '☀️' },
                      { dia: 'Sex', temp: '27°', icon: '☀️' },
                    ].map(d => (
                      <div key={d.dia} className="flex flex-col items-center gap-0.5">
                        <span className="text-[10px] text-text-secondary">{d.dia}</span>
                        <span className="text-sm">{d.icon}</span>
                        <span className="text-xs font-semibold text-text">{d.temp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Open full */}
                <button
                  onClick={() => { setShowIframe(true); setExpanded(false) }}
                  className="w-full py-2.5 text-center text-xs font-semibold text-primary hover:bg-primary/5 border-t border-border/50 transition-colors"
                >
                  Ver previsão completa
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Full weather iframe modal */}
      <AnimatePresence>
        {showIframe && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowIframe(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-[5%] left-[5%] right-[5%] bottom-[5%] z-50 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <CloudSun className="w-5 h-5 text-amber-500" />
                  <h2 className="font-semibold text-text">Previsão do Tempo — Palotina, PR</h2>
                </div>
                <button
                  onClick={() => setShowIframe(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 text-text-secondary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <iframe
                src="https://www.climatempo.com.br/previsao-do-tempo/cidade/1405/palotina-pr"
                className="flex-1 w-full border-0"
                title="Previsão do tempo completa"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
