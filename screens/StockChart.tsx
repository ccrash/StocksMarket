import React, { useEffect, useState, useMemo } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import {useRoute, RouteProp} from '@react-navigation/native'
import { fetchStockData } from '../api/FetchStockData'
import Graph from '../components/Graph'
import Display from '../components/DisplayOptions'
import Zoom from '../components/Zoom'
import Header from '../components/Header'
import { useThemeStore } from '../store/useThemeStore'
import { StockPoint } from '../types/Stock'
import { DisplayKey } from '../types/Graph'
import {RootStackParamList} from '../types/navigation'

export const StockChart = () => {
  const {params} = useRoute<RouteProp<RootStackParamList, 'StockChart'>>()
  const { theme } = useThemeStore()
  const [data, setData] = useState<StockPoint[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [zoom, setZoom] = useState<'7d' | '30d' | 'all'>('7d')
  const [display, setDisplay] = useState<Record<DisplayKey, boolean>>({
    open: true,
    close: true,
    high: true,
    low: true
  })
  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchStockData({ id: params.id })
        setData(result)
      } catch (e) {
        setError('Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleDisplay = (value: DisplayKey) => {
    setDisplay(prev => ({
      ...prev,
      [value]: !prev[value],
    }))
  }

  // Filter logic (if data is client-side)
  const filteredData = useMemo(() => {
    if (!data) return []
    if (zoom === 'all') return data
    const days = zoom === '30d' ? 30 : 7
    return data.slice(-days)
  }, [data, zoom])

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.text} testID="ActivityIndicator" />
      </View>
    )
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header id={params.id} />
      <Graph data={filteredData} selectedSeries={display} />
      <Zoom setZoom={setZoom} />
      <Display currentDisplay={display} handleDisplay={handleDisplay} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default StockChart
