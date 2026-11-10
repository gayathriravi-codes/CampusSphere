const monthsShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const weekdaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function parseEventDate(isoDate) {
  return new Date(`${isoDate}T00:00:00`)
}

export function formatMonth(isoDate) {
  return monthsShort[parseEventDate(isoDate).getMonth()]
}

export function formatDay(isoDate) {
  return String(parseEventDate(isoDate).getDate()).padStart(2, '0')
}

export function formatEventDate(isoDate) {
  const date = parseEventDate(isoDate)
  return `${weekdaysShort[date.getDay()]}, ${date.getDate()} ${monthsShort[date.getMonth()]}`
}

export function formatLongDate(isoDate) {
  const date = parseEventDate(isoDate)
  return `${weekdaysShort[date.getDay()]}, ${date.getDate()} ${monthsShort[date.getMonth()]} ${date.getFullYear()}`
}

export function getRelativeDay(isoDate) {
  const today = new Date()
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const target = parseEventDate(isoDate)
  const diff = Math.round((target - startOfToday) / (1000 * 60 * 60 * 24))

  if (diff < 0) return 'Completed'
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  if (diff < 7) return `In ${diff} days`
  return formatEventDate(isoDate)
}

export function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}
