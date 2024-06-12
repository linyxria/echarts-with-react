import { EChartsInitOpts, EChartsType, init } from 'echarts/core'
import { useEffect, useRef } from 'react'
import { ChartEvents } from '../chart'
import { useLatest } from './utils'

const useInitialized = (
  containerRef: React.RefObject<HTMLDivElement>,
  theme: string | object | undefined,
  initOptions: EChartsInitOpts | undefined,
  events: ChartEvents
) => {
  const latestThemeRef = useLatest(theme)
  const latestInitOptionsRef = useLatest(initOptions)
  const latestEventsRef = useLatest(events)

  const chartRef = useRef<EChartsType | null>(null)
  const needResizeRef = useRef(false)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const instance = (chartRef.current = init(
      containerRef.current,
      latestThemeRef.current,
      latestInitOptionsRef.current
    ))

    const events = Object.entries(latestEventsRef.current).map(
      ([eventName, handler]) => [
        eventName.slice(2).toLowerCase(),
        handler.bind(instance),
      ]
    )
    events.forEach(([eventName, handler]) => {
      instance.on(eventName, handler)
    })

    const resizeObserver = new ResizeObserver(() => {
      if (!needResizeRef.current) {
        needResizeRef.current = true
        return
      }
      instance.resize()
    })
    resizeObserver.observe(containerRef.current)

    return () => {
      events.forEach(([eventName, handler]) => {
        instance.off(eventName, handler)
      })
      instance.dispose()
      resizeObserver.disconnect()
    }
  }, [containerRef, latestEventsRef, latestInitOptionsRef, latestThemeRef])

  return chartRef
}

export default useInitialized
