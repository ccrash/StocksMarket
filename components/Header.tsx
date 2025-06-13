import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useThemeStore } from '../store/useThemeStore'

const Header = ({ id }: { id: string }) => {
  const {theme} = useThemeStore()

  // const source = '../assets/' + id + '.png'
  // For demonstration, using a static image path

  const source = "../assets/AAPL.png"
  return (
    <View style={styles.container}>
      <Image source={require(source)} style={styles.icon} />
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
    width: 32,
    height: 32,
    marginBottom: 8
  },
  title: {
    fontSize: 18,
    fontWeight: '600'
  }
})

export default Header
