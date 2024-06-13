import { EChartsCoreOption, EChartsType, SetOptionOpts } from 'echarts/core'
import { useEffect } from 'react'
import { useLatest, usePrevious } from './utils'

const useOption = <Opt extends EChartsCoreOption>(
  chartRef: React.MutableRefObject<EChartsType | null>,
  option: Opt,
  updateOptions: SetOptionOpts | undefined
) => {
  const latestUpdateOptionsRef = useLatest(updateOptions)
  const previousOptionRef = usePrevious(option)

  useEffect(() => {
    if (!chartRef.current) {
      return
    }

    chartRef.current.clear()
    chartRef.current.setOption(option, {
      notMerge: option !== previousOptionRef.current,
      ...latestUpdateOptionsRef.current,
    })
  }, [chartRef, latestUpdateOptionsRef, option, previousOptionRef])
}

export default useOption
