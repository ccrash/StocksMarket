import { View, StyleSheet, Text, Switch, Button } from 'react-native'
import {
  LineChart,
  LineChartProvider,
  LineChartPath,
  LineChartCursorCrosshair,
} from 'react-native-wagmi-charts'
import { useState } from 'react'
import { useSeriesStore } from '../store/useSeriesStore'
import type { StockPoint } from '../api/FetchStockData'

type Props = {
  data: StockPoint[]
  isDark: boolean
}

export default function StockChart({ data, isDark }: Props) {
  const { visible, toggle } = useSeriesStore()
  const [filter, setFilter] = useState<'all' | '30d' | '7d'>('all')

  const filtered = (() => {
    if (filter === '30d') return data.slice(-30)
    if (filter === '7d') return data.slice(-7)
    return data
  })()

  const seriesKeys = ['open', 'close', 'low', 'high'] as const
  const seriesColors = {
    open: 'blue',
    close: 'green',
    low: 'orange',
    high: 'red',
  }

  const points = Object.fromEntries(
    seriesKeys.map((key) => [
      key,
      filtered.map((d) => ({
        timestamp: new Date(d.date).getTime(),
        value: d[key],
      })),
    ])
  )

  // Pick the first active series or fallback to 'close'
  const activeSeries =
    seriesKeys.find((key) => visible[key]) ?? ('close' as const)

  return (
    <View>
      <LineChartProvider data={points[activeSeries]}>
        <LineChart height={280}>
          <LineChartPath color={seriesColors[activeSeries]} />
          <LineChartCursorCrosshair />
        </LineChart>

        {seriesKeys.map((key) => (
          <View key={key} style={styles.toggleRow}>
            <Switch value={visible[key]} onValueChange={() => toggle(key)} />
            <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>
              {key.toUpperCase()}
            </Text>
          </View>
        ))}

        <View style={styles.buttonRow}>
          <Button title="All" onPress={() => setFilter('all')} />
          <Button title="30d" onPress={() => setFilter('30d')} />
          <Button title="7d" onPress={() => setFilter('7d')} />
        </View>

        <Button title="Reset Zoom" onPress={() => setFilter('all')} />
      </LineChartProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    marginLeft: 8,
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 8,
  },
})
