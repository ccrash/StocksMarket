export interface StockPoint extends Record<string, unknown> {
  date: string
  open: number
  close: number
  high: number
  low: number
}

export interface Stock {
  id: string
  name: string
  description: string
  current: number
  high: number
  low: number
}