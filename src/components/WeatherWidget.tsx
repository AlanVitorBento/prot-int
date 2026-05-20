import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CloudSun, Droplets, Wind, Thermometer, Eye, ChevronDown } from 'lucide-react'

export function WeatherCard() {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-[16px] border border-amber-200/50 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <CloudSun className="w-5 h-5 text-amber-500" />
          <h3 className="font-semibold text-sm text-text tracking-tight">Clima — Palotina, PR</h3>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-3">
        <span className="text-3xl font-light text-text tracking-tight">24°C</span>
        <div>
          <p className="text-sm font-medium text-text">Parcialmente nublado</p>
          <p className="text-xs text-text-secondary">Sensação: 26°C</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: Droplets, label: 'Umidade', value: '72%', color: 'text-sky-500' },
          { icon: Wind, label: 'Vento', value: '12 km/h NE', color: 'text-teal-500' },
          { icon: Thermometer, label: 'Mín / Máx', value: '18° / 28°', color: 'text-orange-500' },
          { icon: Eye, label: 'Visibilidade', value: '10 km', color: 'text-purple-500' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2 bg-white/60 rounded-[12px] p-2">
            <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
            <div>
              <p className="text-[10px] text-text-secondary">{item.label}</p>
              <p className="text-xs font-semibold text-text">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-amber-200/50">
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
    </div>
  )
}

export default function WeatherWidget() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[12px] hover:bg-white/10 transition-colors duration-[250ms] text-white/60"
      >
        <CloudSun className="w-4 h-4 text-amber-400" />
        <span className="text-xs font-semibold text-white">24°C</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-[250ms] ${expanded ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {expanded && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setExpanded(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-72 bg-white rounded-[16px] shadow-[var(--shadow-xl)] border border-border/50 z-50 overflow-hidden"
            >
              <div className="bg-gradient-to-br from-amber-400 to-orange-400 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/80 font-medium">Palotina, PR</p>
                    <div className="flex items-end gap-2 mt-1">
                      <span className="text-3xl font-bold leading-none tracking-tight">24°C</span>
                      <span className="text-sm text-white/80 mb-0.5">Parcialmente nublado</span>
                    </div>
                    <p className="text-xs text-white/60 mt-1">Sensação térmica: 26°C</p>
                  </div>
                  <CloudSun className="w-10 h-10 text-white/80" />
                </div>
              </div>
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
