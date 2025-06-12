import React from 'react'
import { View, StyleSheet } from 'react-native'
import StockChart from './StockChart'
import type { StockPoint } from '../api/FetchStockData'

type Props = {
  data: StockPoint[]
  isDark: boolean
}

export default function GraphSection({ data, isDark }: Props) {
  return (
    <View style={styles.container}>
      <StockChart data={data} isDark={isDark} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
})
