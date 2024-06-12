import { EChartsCoreOption, EChartsInitOpts, SetOptionOpts } from 'echarts/core'
import { useRef } from 'react'
import useInitialized from './hooks/use-initialized'
import useOption from './hooks/use-option'
import useLoading from './hooks/use-loading'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventCallback = (params: any) => void
export interface ChartEvents {
  onClick?: EventCallback
  onDblClick?: EventCallback
  onMouseDown?: EventCallback
  onMouseMove?: EventCallback
  onMouseUp?: EventCallback
  onMouseOver?: EventCallback
  onMouseOut?: EventCallback
  onGlobalOut?: EventCallback
  onContextMenu?: EventCallback
}

export interface ChartProps<Opt> extends ChartEvents {
  option: Opt
  theme?: string | object
  initOptions?: EChartsInitOpts
  updateOptions?: SetOptionOpts
  loadingOptions?: object
  loading?: boolean
  className?: string
  style?: React.CSSProperties
}

const Chart = <Opt extends EChartsCoreOption>({
  option,
  initOptions,
  updateOptions,
  loadingOptions,
  loading,
  theme,
  className,
  style,
  ...props
}: ChartProps<Opt>) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useInitialized(containerRef, theme, initOptions, props)
  useOption(chartRef, option, updateOptions)
  useLoading(chartRef, loading, loadingOptions)

  return <div ref={containerRef} className={className} style={style}></div>
}

export default Chart
