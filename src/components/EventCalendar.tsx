import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CalendarDays, ChevronRight, ChevronLeft, X, Clock, MapPin } from 'lucide-react'
import { eventosProximos } from '../data/mock'

const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

const eventosMock = [
  { dia: 5, titulo: 'Reunião Diretoria', hora: '09:00', local: 'Sala Executiva', cor: '#21409A' },
  { dia: 8, titulo: 'Treinamento SAP', hora: '14:00', local: 'Auditório', cor: '#7C3AED' },
  { dia: 12, titulo: 'Town Hall Q2', hora: '10:00', local: 'Online - Teams', cor: '#059669' },
  { dia: 15, titulo: 'Workshop Inovação', hora: '08:30', local: 'Centro de Eventos', cor: '#EA580C' },
  { dia: 18, titulo: 'Dia do Cooperativismo', hora: 'Dia todo', local: 'Todas as unidades', cor: '#16A34A' },
  { dia: 22, titulo: 'Workshop Inovação', hora: '08:30', local: 'Auditório', cor: '#EA580C' },
  { dia: 25, titulo: 'Integração Novos', hora: '09:00', local: 'RH - Matriz', cor: '#DC2626' },
  { dia: 28, titulo: 'Town Hall Q2', hora: '15:00', local: 'Online - Teams', cor: '#059669' },
  { dia: 30, titulo: 'Happy Hour', hora: '17:30', local: 'Terraço', cor: '#D97706' },
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export default function EventCalendar() {
  const [showCalendar, setShowCalendar] = useState(false)
  const today = new Date()
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1) }
    else setViewMonth(viewMonth - 1)
    setSelectedDay(null)
  }

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1) }
    else setViewMonth(viewMonth + 1)
    setSelectedDay(null)
  }

  const eventosNoDia = (dia: number) => eventosMock.filter(e => e.dia === dia)
  const selectedEvents = selectedDay ? eventosNoDia(selectedDay) : []

  return (
    <>
      {/* Compact widget */}
      <div className="glass rounded-[16px] p-4 grain">
        <div className="flex items-center justify-between mb-3 relative">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-[12px] flex items-center justify-center shadow-sm">
              <CalendarDays className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-sm text-text tracking-tight">Próximos Eventos</h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCalendar(true)}
            className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark transition-colors duration-[250ms] px-2 py-1 rounded-[8px] hover:bg-primary/5"
          >
            <CalendarDays className="w-3.5 h-3.5" />
            Calendário
          </motion.button>
        </div>
        <div className="space-y-3 relative">
          {eventosProximos.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ x: 4 }}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="w-11 h-11 bg-gradient-to-br from-primary/10 to-primary/5 rounded-[12px] flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-primary leading-none">{e.data.split(' ')[0]}</span>
                <span className="text-[10px] text-primary/60">{e.data.split(' ')[1]}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text group-hover:text-primary transition-colors duration-[250ms]">{e.titulo}</p>
                <p className="text-xs text-text-secondary">{e.local}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-text-secondary opacity-0 group-hover:opacity-100 transition-all duration-[250ms] group-hover:translate-x-0.5" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Calendar modal */}
      <AnimatePresence>
        {showCalendar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowCalendar(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-[5%] left-[5%] right-[5%] bottom-[5%] z-50 bg-white rounded-[20px] shadow-[var(--shadow-xl)] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-border/50 bg-gradient-to-r from-primary to-primary-light text-white">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5" />
                  <h2 className="font-semibold tracking-tight">Calendário de Eventos — C.Vale</h2>
                </div>
                <button
                  onClick={() => setShowCalendar(false)}
                  className="p-2 rounded-[12px] hover:bg-white/10 transition-colors duration-[250ms]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Calendar body */}
              <div className="flex-1 flex overflow-hidden">
                {/* Calendar grid */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Month nav */}
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={prevMonth} className="p-2 rounded-[12px] hover:bg-gray-100 text-text-secondary transition-colors duration-[250ms]">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h3 className="text-lg font-bold text-text tracking-tight">
                      {MESES[viewMonth]} {viewYear}
                    </h3>
                    <button onClick={nextMonth} className="p-2 rounded-[12px] hover:bg-gray-100 text-text-secondary transition-colors duration-[250ms]">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Day headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {DIAS_SEMANA.map(d => (
                      <div key={d} className="text-center text-xs font-semibold text-text-secondary py-2">
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Day cells */}
                  <div className="grid grid-cols-7 gap-1 flex-1">
                    {Array.from({ length: firstDay }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1
                      const eventos = eventosNoDia(day)
                      const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear()
                      const isSelected = day === selectedDay

                      return (
                        <motion.button
                          key={day}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                          className={`relative p-1.5 rounded-[12px] text-sm transition-all duration-[250ms] min-h-[60px] flex flex-col items-center
                            ${isSelected ? 'bg-primary/10 ring-2 ring-primary/30' : 'hover:bg-gray-50'}
                            ${isToday ? 'font-bold' : ''}
                          `}
                        >
                          <span className={`w-7 h-7 flex items-center justify-center rounded-full text-xs
                            ${isToday ? 'bg-primary text-white' : 'text-text'}
                          `}>
                            {day}
                          </span>
                          {eventos.length > 0 && (
                            <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
                              {eventos.slice(0, 3).map((ev, j) => (
                                <div
                                  key={j}
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{ backgroundColor: ev.cor }}
                                />
                              ))}
                            </div>
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                {/* Event detail panel */}
                <div className="w-80 border-l border-border/50 bg-bg p-5 overflow-y-auto">
                  <h3 className="font-semibold text-sm text-text-secondary uppercase tracking-wider mb-4">
                    {selectedDay
                      ? `${selectedDay} de ${MESES[viewMonth]}`
                      : 'Todos os eventos do mês'
                    }
                  </h3>

                  <div className="space-y-3">
                    {(selectedDay ? selectedEvents : eventosMock).map((ev, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white rounded-[16px] p-3 border border-border/50 hover:shadow-[var(--shadow-md)] transition-shadow duration-[250ms] cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-1 h-full min-h-[40px] rounded-full flex-shrink-0"
                            style={{ backgroundColor: ev.cor }}
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-text">{ev.titulo}</h4>
                            <div className="flex items-center gap-3 mt-1.5">
                              <div className="flex items-center gap-1 text-xs text-text-secondary">
                                <Clock className="w-3 h-3" />
                                {ev.hora}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-text-secondary">
                                <MapPin className="w-3 h-3" />
                                {ev.local}
                              </div>
                            </div>
                            {!selectedDay && (
                              <span className="text-xs text-primary font-medium mt-1 inline-block">Dia {ev.dia}</span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {selectedDay && selectedEvents.length === 0 && (
                      <div className="text-center py-8">
                        <CalendarDays className="w-8 h-8 text-primary/20 mx-auto mb-2" />
                        <p className="text-sm text-text-secondary">Nenhum evento neste dia</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
