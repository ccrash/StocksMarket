import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useThemeStore } from '../store/useThemeStore'
import Animated from 'react-native-reanimated'

export const Header = ({ id }: { id: string }) => {
  const {theme} = useThemeStore()

  // const source = '../assets/' + id + '.png'
  // For demonstration, using a static image path

  const source = "../assets/AAPL.png"
  return (
    <View style={styles.container}>
      <Animated.Image
        source={require(source)}
        style={styles.icon}
        resizeMode="cover"
        sharedTransitionTag={`stock-${id}`}
      />
      <Text style={[styles.title, { color: theme.text }]}>
        {`${id} Stock History`}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  icon: {
    width: 51,
    height: 47,
    marginRight: 12
  },
  title: {
    fontSize: 20,
    fontWeight: '600'
  }
})

export default Header
