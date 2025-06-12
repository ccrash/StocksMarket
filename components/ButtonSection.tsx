import React from 'react'
import { View, StyleSheet, Button } from 'react-native'

export default function ButtonsSection() {
  return (
    <View style={styles.container}>
      <Button title="Reset Zoom" onPress={() => {}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
})
