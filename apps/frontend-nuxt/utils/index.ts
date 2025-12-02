export const formatVND = (price: number, locale = 'vi-VN') => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'VND',
  })
  return formatter.format(price)
}

export const formatVNDWithComma = (price: number, locale = 'vi-VN') => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'VND',
  })
  const formatted = formatter.format(price)
  // Replace the period thousands separator with a comma
  return formatted.replace(/\./g, ',').replace('₫', '').trim()
}

export const convertObjectToRecord = <T>(queryParams: T) => {
  const params: Record<string, string> = Object.entries(
    queryParams as object,
  ).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = String(value)
    }
    return acc
  }, {} as any)
  return params
}

// Cách dùng
// formatDate(blog.created_at)                       // -> "15:47 02/10/2025"
// formatDate(blog.created_at, 'date-time')          // -> "02/10/2025 15:47"
// formatDate(blog.created_at, 'time-date', '\n')    // -> "15:47\n02/10/2025"
export function formatDate(
  input: Date | string | number,
  order: 'time-date' | 'date-time' = 'time-date',
  sep = ' ', // chuyển thành '\n' nếu muốn xuống dòng
) {
  const d = new Date(input)
  if (isNaN(d.getTime())) return ''

  const pad = (n: number) => String(n).padStart(2, '0')
  const DD = pad(d.getDate())
  const MM = pad(d.getMonth() + 1)
  const YYYY = d.getFullYear()
  const HH = pad(d.getHours())
  const mm = pad(d.getMinutes())

  const time = `${HH}:${mm}`
  const date = `${DD}/${MM}/${YYYY}`
  return order === 'date-time' ? `${date}${sep}${time}` : `${time}${sep}${date}`
}

export function slugHas(child: string, parent: string) {
  // khớp nguyên cụm: bắt đầu hoặc dấu -, rồi child, rồi kết thúc hoặc dấu -
  const r = new RegExp(
    `(^|-)${child.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:-|$)`,
  )
  return r.test(parent)
}

export function getSegment(path: string, index: number) {
  const clean = path
    .split('?')[0]
    .split('#')[0]
    .replace(/^\/+|\/+$/g, '')
  if (!clean) return ''
  const parts = clean.split('/').filter(Boolean)
  return parts[index] ?? ''
}

