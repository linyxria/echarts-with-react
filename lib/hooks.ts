import {
  EChartsCoreOption,
  EChartsInitOpts,
  EChartsType,
  SetOptionOpts,
  init,
} from 'echarts/core'
import { useEffect, useRef } from 'react'

export const useInitialized = (
  containerRef: React.RefObject<HTMLDivElement>,
  theme: string | object | undefined,
  initOptions: EChartsInitOpts | undefined
) => {
  const chart = useRef<EChartsType>()
  const themeRef = useRef(theme)
  const initOptionsRef = useRef(initOptions)

  const needResizeRef = useRef(false)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const instance = (chart.current = init(
      containerRef.current,
      themeRef.current,
      initOptionsRef.current
    ))

    const resizeObserver = new ResizeObserver(() => {
      if (!needResizeRef.current) {
        needResizeRef.current = true
        return
      }

      instance.resize()
    })
    resizeObserver.observe(containerRef.current)

    return () => {
      instance.dispose()
      resizeObserver.disconnect()
    }
  }, [containerRef])

  return chart
}

export const useOptions = <Opt extends EChartsCoreOption>(
  chart: React.MutableRefObject<EChartsType | undefined>,
  option: Opt,
  updateOptions: SetOptionOpts | undefined
) => {
  const updateOptionsRef = useRef(updateOptions)

  const previousOptionRef = useRef<Opt>()
  useEffect(() => {
    previousOptionRef.current = option
  })

  useEffect(() => {
    if (!chart.current) {
      return
    }

    chart.current.setOption(option, {
      notMerge: option !== previousOptionRef.current,
      ...updateOptionsRef.current,
    })
  }, [chart, option])
}

export const useLoading = (
  chart: React.MutableRefObject<EChartsType | undefined>,
  loading: boolean | undefined,
  options: object | undefined
) => {
  const optionsRef = useRef(options)

  useEffect(() => {
    if (!chart.current || loading === undefined) {
      return
    }

    if (loading) {
      chart.current.showLoading(optionsRef.current)
    } else {
      chart.current.hideLoading()
    }
  }, [chart, loading])
}
