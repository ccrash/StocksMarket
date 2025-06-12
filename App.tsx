import 'react-native-reanimated'
import { useEffect, useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  Switch,
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { fetchStockData, StockPoint } from './api/FetchStockData'
import { useThemeStore } from './store/useThemeStore'
import StockChart from './components/StockChart'

export default function App() {
  const [data, setData] = useState<StockPoint[]>([])
  const [loading, setLoading] = useState(true)
  const { theme, toggleTheme } = useThemeStore()
  const isDark = theme === 'dark'

  useEffect(() => {
    fetchStockData()
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Image source={require('./assets/AAPL.png')} style={styles.icon} />
            <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
              AAPL Stock History
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={isDark ? '#fff' : '#000'} />
          ) : (
            <StockChart data={data} isDark={isDark} />
          )}

          <View style={styles.themeSwitch}>
            <Text style={[styles.switchLabel, { color: isDark ? '#fff' : '#000' }]}>
              {isDark ? 'Dark' : 'Light'} Theme
            </Text>
            <Switch value={isDark} onValueChange={toggleTheme} />
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 18,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    width: 51,
    height: 47,
    marginRight: 8,
    resizeMode: 'contain',
    borderRadius: 6,
  },
  title: {
    fontWeight: '400',
    fontSize: 32,
    lineHeight: 48,
    letterSpacing: 0,
  },
  themeSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  switchLabel: {
    fontSize: 16,
  },
})
