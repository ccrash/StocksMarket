import React, { useState } from 'react'
import { View, Dimensions, Switch, Text, StyleSheet } from 'react-native'
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLegend } from 'victory-native'
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
  const [visible, setVisible] = useState({
    open: true,
    close: true,
    low: false,
    high: false,
  })

  const toggleVisibility = (key: keyof typeof visible) => {
    setVisible(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const formatX = (date: Date) => `${date.getMonth() + 1}/${date.getDate()}`

  return (
    <View>
      <VictoryChart
        width={screenWidth}
        height={320}
        domainPadding={{ x: 25, y: 20 }}
        padding={{ top: 40, bottom: 60, left: 50, right: 20 }}
        animate={{ duration: 500 }}
        scale={{ x: 'time' }}
      >
        <VictoryAxis
          tickCount={6}
          tickFormat={(t) => formatX(new Date(t))}
          style={{
            tickLabels: {
              fill: isDark ? '#fff' : '#000',
              fontSize: 10,
              padding: 8,
              angle: -45,
              textAnchor: 'end',
            },
            axis: { stroke: isDark ? '#fff' : '#000' },
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
          .filter(key => visible[key])
          .map(key => (
            <VictoryLine
              key={key}
              interpolation="monotoneX"
              data={data.map(d => ({ x: new Date(Number(d.date) * 1000), y: d[key] }))}
              style={{ data: { stroke: seriesColors[key], strokeWidth: 2 } }}
            />
          ))}

        <VictoryLegend
          x={0}
          y={0}
          orientation="horizontal"
          gutter={20}
          style={{ labels: { fill: isDark ? '#fff' : '#000', fontSize: 12 } }}
          data={seriesKeys
            .filter(key => visible[key])
            .map(key => ({
              name: key.toUpperCase(),
              symbol: { fill: seriesColors[key] },
            }))}
        />
      </VictoryChart>

      <View style={styles.togglesContainer}>
        {seriesKeys.map(key => (
          <View key={key} style={styles.toggleRow}>
            <Switch
              value={visible[key]}
              onValueChange={() => toggleVisibility(key)}
            />
            <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>
              {key.toUpperCase()}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  togglesContainer: { marginTop: 10 },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    marginLeft: 10,
    fontSize: 14,
  },
})
