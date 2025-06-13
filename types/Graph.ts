import { StockPoint } from './Stock'

export interface SeriesVisibility {
  open: boolean
  close: boolean
  high: boolean
  low: boolean
}

export type DisplayKey = 'open' | 'close' | 'high' | 'low'

export interface GraphProps {
  data: StockPoint[] | null
  selectedSeries: SeriesVisibility
}

export interface ChartDataPoint {
  x: number
  [key: string]: number // Allow dynamic keys for open, close, high, low
}

export type SeriesColors = {
  [K in keyof SeriesVisibility]: string
}