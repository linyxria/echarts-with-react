import { EChartsType } from 'echarts/core'
import { useEffect } from 'react'
import { useLatest } from './utils'

const useLoading = (
  chartRef: React.MutableRefObject<EChartsType | null>,
  loading: boolean | undefined,
  options: object | undefined
) => {
  const latestOptionsRef = useLatest(options)

  useEffect(() => {
    if (!chartRef.current || loading === undefined) {
      return
    }

    if (loading) {
      chartRef.current.showLoading(latestOptionsRef.current)
    } else {
      chartRef.current.hideLoading()
    }
  }, [chartRef, latestOptionsRef, loading])
}

export default useLoading
