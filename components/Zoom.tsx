import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useThemeStore } from '../store/useThemeStore'

interface _Props {
  setZoom: (value: '7d' | '30d' | 'all') => void
}

const Zoom = ({ setZoom }: _Props) => {
  const {theme} = useThemeStore()

  const buttons = [
    { label: '7d', value: '7d' },
    { label: '30d', value: '30d' },
    { label: 'All', value: 'all' }
  ] as const

  return (
    <View style={styles.buttonRow}>
      {buttons.map(btn => (
        <TouchableOpacity
          key={btn.value}
          style={[styles.button, { backgroundColor: theme.text }]}
          onPress={() => setZoom(btn.value)}
        >
          <Text style={[styles.buttonText, { color: theme.background }]}>{btn.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500'
  }
})

export default Zoom
