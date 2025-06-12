// pages/StockPage.tsx
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import GraphSection from '../components/GraphSection'
import FilterSection from '../components/FilterSection'
import ButtonsSection from '../components/ButtonSection'
import type { StockPoint } from '../api/FetchStockData'

type Props = {
  data: StockPoint[]
  isDark: boolean
}

export default function StockPage({ data, isDark }: Props) {
  const title = `Stock Data (${data.length} points)`

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>{title}</Text>
      <GraphSection data={data} isDark={isDark} />
      <FilterSection />
      <ButtonsSection />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
})
