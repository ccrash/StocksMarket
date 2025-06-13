// pages/StockPage.tsx
import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import GraphSection from '../components/Graph'
import FilterSection from '../components/Filters'
import ButtonsSection from '../components/Buttons'
import type { StockPoint } from '../api/FetchStockData'

type Props = {
  data: StockPoint[]
  isDark: boolean
}

export default function StockPage({ data, isDark }: Props) {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/AAPL.png')} style={styles.icon} />
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
          AAPL Stock History
        </Text>
      </View>
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
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  icon: { width: 51, height: 47, marginRight: 8, resizeMode: 'contain', borderRadius: 6 },
})
