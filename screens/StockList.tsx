import React, {useEffect, useMemo, useState} from 'react'
import {View, Button, FlatList, RefreshControl, ActivityIndicator, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../types/navigation'
import {StockCard} from '../components/StockCard'
import {useThemeStore} from '../store/useThemeStore'
import {useHomeHeader} from '../hooks/useHomeHeader'

type Navigation = NativeStackNavigationProp<RootStackParamList>

export default function StockListScreen() {
  const navigation = useNavigation<Navigation>()
  const {theme} = useThemeStore()

  useHomeHeader() // handles navigation header setup + theme toggling

  return (
    <View style={styles.container}>
      <StockCard
        stock={{
          id: 'AAPL',
          name: 'Apple Inc.',
          description: 'Apple Inc. is an American multinational technology company headquartered in Cupertino, California.',
          current: 150,
          high: 155,
          low: 145,
        }}
        onPress={() => navigation.navigate('StockChart', { id: 'AAPL' })}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1
  }
})
