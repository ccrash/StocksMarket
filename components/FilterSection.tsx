import React from 'react'
import { View, StyleSheet, Button } from 'react-native'

export default function FilterSection() {
  return (
    <View style={styles.container}>
      <Button title="Filter Options" onPress={() => {}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
})
