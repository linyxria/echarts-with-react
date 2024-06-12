import { use } from 'echarts/core'
import Chart from '../lib/chart'
import { CanvasRenderer } from 'echarts/renderers'
import { GridComponent } from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { useEffect, useState } from 'react'

use([CanvasRenderer, LineChart, GridComponent])

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min
const api = async () => {
  await sleep(1000)
  return Promise.resolve([
    { date: 'Mon', value: randomNumber(0, 300) },
    { date: 'Tue', value: randomNumber(0, 300) },
    { date: 'Wed', value: randomNumber(0, 300) },
    { date: 'Thu', value: randomNumber(0, 300) },
    { date: 'Fri', value: randomNumber(0, 300) },
    { date: 'Sat', value: randomNumber(0, 300) },
    { date: 'Sun', value: randomNumber(0, 300) },
  ])
}

const App = () => {
  const [data, setData] = useState<{ date: string; value: number }[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = () => {
      setLoading(true)
      api()
        .then((data) => {
          setData(data)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    fetchData()

    // setInterval(() => {
    //   fetchData()
    // }, 5000)
  }, [])

  const { xAxis, series } = data.reduce<{ xAxis: string[]; series: number[] }>(
    (acc, curr) => {
      acc.xAxis.push(curr.date)
      acc.series.push(curr.value)
      return acc
    },
    { xAxis: [], series: [] }
  )

  const option = {
    xAxis: {
      type: 'category',
      data: xAxis,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: series,
        type: 'line',
      },
    ],
  }

  return (
    <>
      <Chart
        option={option}
        loading={loading}
        style={{ height: '100vh' }}
        onClick={(params) => {
          console.log('click:', params)
        }}
        onMouseMove={(params) => {
          console.log('mousemove:', params)
        }}
      />
    </>
  )
}

export default App
