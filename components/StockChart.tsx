import React, { useState } from 'react'
import { View, Text, StyleSheet, Switch, Button, Dimensions } from 'react-native'
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryLegend,
} from 'victory-native'
import type { StockPoint } from '../api/FetchStockData'

const screenWidth = Dimensions.get('window').width - 32

const seriesKeys = ['open', 'close', 'low', 'high'] as const
const seriesColors = {
  open: 'blue',
  close: 'green',
  low: 'orange',
  high: 'red',
}

type Props = {
  data: StockPoint[]
  isDark: boolean
}

export default function StockChart({ data, isDark }: Props) {
  const [filter, setFilter] = useState<'all' | '30d' | '7d'>('all')
  const [visible, setVisible] = useState({
    open: true,
    close: true,
    low: false,
    high: false,
  })

  // Toggle series visibility for the legend and chart
  const toggleVisibility = (key: keyof typeof visible) => {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // Filter and sanitize data based on selected range and valid fields
  const filtered = (() => {
    const sliced =
      filter === '30d' ? data.slice(-30) : filter === '7d' ? data.slice(-7) : data

    return sliced.filter(
      (d) =>
        typeof d.open === 'number' &&
        typeof d.close === 'number' &&
        typeof d.low === 'number' &&
        typeof d.high === 'number' &&
        !!d.date &&
        !isNaN(Number(d.date))
    )
  })()

  // Format timestamp for X axis labels
  const formatX = (timestamp: number) => {
    const d = new Date(Number(timestamp) * 1000)
    return `${d.getMonth() + 1}/${d.getDate()}`
  }

  return (
    <View>
      <VictoryChart
        width={screenWidth}
        height={320}
        domainPadding={{ x: 25, y: 20 }}
        padding={{ top: 40, bottom: 60, left: 50, right: 20 }}
        animate={{ duration: 500, easing: 'linear' }}
      >
        <VictoryAxis
          scale="time"
          tickCount={6}
          tickFormat={formatX}
          style={{
            tickLabels: {
              fill: isDark ? '#fff' : '#000',
              fontSize: 10,
              padding: 8,
              angle: -45,
              textAnchor: 'end',
            },
            axis: { stroke: isDark ? '#fff' : '#000' },
            grid: { stroke: 'none' },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: { fill: isDark ? '#fff' : '#000', fontSize: 10, padding: 4 },
            axis: { stroke: isDark ? '#fff' : '#000' },
            grid: { stroke: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' },
          }}
        />

        {seriesKeys
          .filter((key) => visible[key])
          .map((key) => (
            <VictoryLine
              key={key}
              interpolation="monotoneX"
              data={filtered.map((d) => ({
                x: new Date(Number(d.date) * 1000),
                y: d[key],
              }))}
              style={{
                data: {
                  stroke: seriesColors[key],
                  strokeWidth: 2,
                },
              }}
            />
          ))}

        <VictoryLegend
          x={0}
          y={0}
          orientation="horizontal"
          gutter={20}
          style={{
            labels: { fill: isDark ? '#fff' : '#000', fontSize: 12 },
          }}
          data={seriesKeys
            .filter((key) => visible[key])
            .map((key) => ({
              name: key.toUpperCase(),
              symbol: { fill: seriesColors[key] },
            }))}
        />
      </VictoryChart>

      <View style={styles.togglesContainer}>
        {seriesKeys.map((key) => (
          <View key={key} style={styles.toggleRow}>
            <Switch
              value={visible[key]}
              onValueChange={() => toggleVisibility(key)}
              accessibilityLabel={`Toggle ${key} series`}
            />
            <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>
              {key.toUpperCase()}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.buttonRow}>
        <Button title="All" onPress={() => setFilter('all')} accessibilityLabel="Show all data" />
        <Button
          title="Last 30 days"
          onPress={() => setFilter('30d')}
          accessibilityLabel="Show last 30 days data"
        />
        <Button
          title="Last 7 days"
          onPress={() => setFilter('7d')}
          accessibilityLabel="Show last 7 days data"
        />
      </View>

      <View style={styles.resetRow}>
        <Button
          title="Reset Zoom"
          onPress={() => setFilter('all')}
          accessibilityLabel="Reset zoom to show all data"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  togglesContainer: {
    marginTop: 10,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    marginLeft: 10,
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 8,
  },
  resetRow: {
    marginTop: 8,
    alignItems: 'center',
  },
})
