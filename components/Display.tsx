import React from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'
import { useThemeStore } from '../store/useThemeStore'
import { DisplayKey } from '../types/Graph'

const Display = ({ currentDisplay, handleDisplay }: { currentDisplay: Record<DisplayKey, boolean>; handleDisplay: (value: DisplayKey) => void }) => {
  const {theme} = useThemeStore()

  const renderOptions = () => {
    return Object.entries(currentDisplay).map(([key, value]) => (
      <View key={key} style={styles.option}>
        <Switch ios_backgroundColor={theme.text} style={styles.switch} value={value} onValueChange={() => handleDisplay(key as DisplayKey)} />
        <Text style={[styles.label, { color: theme.text }]}>
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </Text>
      </View>
    ))
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>
        Display Options
      </Text>
      <View style={styles.optionContainer}>
        {renderOptions()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600'
  },
  optionContainer: {
    marginTop: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 12
  },
  switch: {
    marginRight: 8,
    marginTop: 4
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    marginLeft: 8
  }
})

export default Display
