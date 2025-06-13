import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { CartesianChart, Line } from 'victory-native'
import { useFont } from '@shopify/react-native-skia'
import { useThemeStore } from '../store/useThemeStore'
import { SeriesVisibility, ChartDataPoint, SeriesColors } from '../types/Graph'
import { StockPoint } from '../types/Stock'

interface _Props {
  data: StockPoint[];
  selectedSeries: SeriesVisibility;
}

export const Graph = ({ data, selectedSeries }: _Props) => {
  const { theme } = useThemeStore()
  
  // Load font for axis labels - you'll need to add a font file to your assets
  // If you don't have a font file, you can remove this and the font prop below
  // but then labels won't show
  const font = useFont(require('../assets/fonts/Inter-Regular.ttf'), 12)
  
  if (!data || data.length === 0) {
    return <Text style={[styles.message, { color: theme.text }]}>No data available</Text>
  }
  
  // Get enabled series with proper typing
  const enabledKeys = (Object.entries(selectedSeries) as [keyof SeriesVisibility, boolean][])
    .filter(([_, enabled]) => enabled)
    .map(([key]) => key)
  
  if (enabledKeys.length === 0) {
    return <Text style={[styles.message, { color: theme.text }]}>No series selected</Text>
  }
  
  // Transform data for chart
  const chartData: ChartDataPoint[] = data.map((point, index) => {
    const timestamp = new Date(point.date).getTime()
    const result: ChartDataPoint = { 
      x: isNaN(timestamp) ? index : timestamp 
    }
    
    enabledKeys.forEach(key => {
      const value = point[key]
      if (typeof value === 'number' && !isNaN(value)) {
        result[key] = value
      }
    })
    
    return result
  })
  
  // Colors with proper typing and fallbacks
  const colors: SeriesColors = {
    open: theme?.open || '#4CAF50',
    close: theme?.close || '#2196F3',
    high: theme?.high || '#FF5722',
    low: theme?.low || '#9C27B0'
  }
  
  return (
    <View style={[styles.container, { backgroundColor: theme.graphBackground }]}>
      <CartesianChart 
        data={chartData} 
        xKey="x" 
        yKeys={enabledKeys}
        xAxis={{
          font,
          tickCount: 4,
          labelColor: '#666',
          formatXLabel: (value: number) => {
            const date = new Date(value)
            return date.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })
          }
        }}
        yAxis={[{
          font,
          tickCount: 5,
          labelColor: '#666',
          formatYLabel: (value: number) => `$${Math.round(value)}`
        }]}        
      >
        {({ points }: { points: Record<string, any[]> }) => (
          <>
            {enabledKeys.map(key => 
              points[key] && (
                <Line
                  key={key}
                  points={points[key]}
                  color={colors[key]}
                  strokeWidth={key === 'high' ? 3 : 2}
                />
              )
            )}
          </>
        )}
      </CartesianChart>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 250,
    padding: 16,
    borderRadius: 8,
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    padding: 20,
  },
})

export default Graph