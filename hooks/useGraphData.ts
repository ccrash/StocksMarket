import { useMemo } from 'react'
import { useThemeStore } from '../store/useThemeStore'
import { StockPoint, SeriesVisibility, DisplayKey, ChartDataPoint } from '../types/Graph'
import { 
  getEnabledKeys, 
  transformStockData, 
  validateChartData, 
  getDefaultColors 
} from '../utils/graphUtils'

interface UseGraphDataResult {
  chartData: ChartDataPoint[]
  enabledKeys: DisplayKey[]
  colors: Record<DisplayKey, string>
  hasValidData: boolean
  isEmpty: boolean
}

export const useGraphData = (
  data: StockPoint[] | null, 
  selectedSeries: SeriesVisibility
): UseGraphDataResult => {
  const { theme } = useThemeStore()

  return useMemo(() => {
    if (!data || data.length === 0) {
      return {
        chartData: [],
        enabledKeys: [],
        colors: getDefaultColors(),
        hasValidData: false,
        isEmpty: true
      }
    }

    const enabledKeys = getEnabledKeys(selectedSeries)
    
    if (enabledKeys.length === 0) {
      return {
        chartData: [],
        enabledKeys: [],
        colors: getDefaultColors(),
        hasValidData: false,
        isEmpty: false
      }
    }

    const chartData = transformStockData(data, enabledKeys)
    const hasValidData = validateChartData(chartData, enabledKeys)

    // Merge theme colors with defaults
    const defaultColors = getDefaultColors()
    const colors = {
      open: theme?.open || defaultColors.open,
      close: theme?.close || defaultColors.close,
      high: theme?.high || defaultColors.high,
      low: theme?.low || defaultColors.low
    }

    return {
      chartData,
      enabledKeys,
      colors,
      hasValidData,
      isEmpty: false
    }
  }, [data, selectedSeries, theme])
}