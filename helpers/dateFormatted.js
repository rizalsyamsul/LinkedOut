function dateFormatted(value) {
  const offset = value.getTimezoneOffset()
  value = new Date(value.getTime() - (offset * 60 * 1000))
  return value.toISOString().split('T')[0]
}

module.exports = dateFormatted