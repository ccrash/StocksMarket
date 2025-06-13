import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Stock } from '../types/Stock'
import { useThemeStore } from '../store/useThemeStore'
import Animated from 'react-native-reanimated'
import Ionicons from '@expo/vector-icons/Ionicons'

type Props = {
  stock: Stock
  onPress?: () => void
}

export const StockCard = ({ stock, onPress }: Props) => {
  const { theme } = useThemeStore()

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityLabel={`View details for ${stock.name}`}
      style={[
        styles.card,
        {
          borderColor: theme.border,
          backgroundColor: theme.background,
        },
      ]}
    >
      <View style={styles.imageContainer}>
        <Animated.Image
          source={require('../assets/AAPL.png')}
          style={styles.image}
          resizeMode="cover"
          sharedTransitionTag={`stock-${stock.id}`}
        />
      </View>
      <View style={styles.info}>
        <Text style={[styles.title, { color: theme.text }]}>
          {stock.name}
        </Text>
        <Ionicons
          testID="interest-icon"
          name="alert-circle"
          size={20}
          color="gray"
          style={styles.interestIcon}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  interestIcon: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  info: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})
