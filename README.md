# echarts-with-react

## Usage

```javascript
import Chart from 'echarts-with-react';
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'

use([CanvasRenderer, LineChart, GridComponent])

const App = () => {
  return (
    <Chart 
      option={{
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      }} 
      style={{ height: 400 }}
      onClick={(params) => console.log('params:', params)}
    />
  )
}

export default App
```
