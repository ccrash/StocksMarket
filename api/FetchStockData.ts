import { StockPoint } from '../types/Stock'

const API_URL = 'https://mock.apidog.com/m1/892843-874692-default/marketdata/history/AAPL'

export async function fetchStockData({ id }: { id: string }): Promise<StockPoint[]> {
  try {
    const res = await fetch(API_URL.replace('AAPL', id))
    const json = await res.json()

    return json?.data?.map((item: any) => ({
      date: item.timestamp.slice(0, 10),
      open: item.open,
      close: item.close,
      low: item.low,
      high: item.high,
    })) || []
  } catch (err) {
    console.error('Failed to fetch stock data', err)
    return []
  }
}