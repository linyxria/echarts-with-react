import { EChartsCoreOption, EChartsInitOpts, SetOptionOpts } from 'echarts/core'
import { useRef } from 'react'
import { useInitialized, useLoading, useOptions } from './hooks'

export interface EChartsProps<Opt> {
  option: Opt
  theme?: string | object
  initOptions?: EChartsInitOpts
  updateOptions?: SetOptionOpts
  loadingOptions?: object
  loading?: boolean
  className?: string
  style?: React.CSSProperties
}

const ECharts = <Opt extends EChartsCoreOption>({
  option,
  initOptions,
  updateOptions,
  loadingOptions,
  loading,
  theme,
  className,
  style,
}: EChartsProps<Opt>) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const chart = useInitialized(containerRef, theme, initOptions)
  useOptions(chart, option, updateOptions)
  useLoading(chart, loading, loadingOptions)

  return <div ref={containerRef} className={className} style={style}></div>
}

export default ECharts
