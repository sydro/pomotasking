export function presentFullDuration (duration) {
  if (!duration) { return '00:00' }

  duration = Math.abs(parseInt(duration, 10))

  let hours = Math.floor(duration / 3600)
  let minutes = parseInt((duration / 60), 10)
  let seconds = ((duration - (hours * 3600)) % 60)

  if (minutes < 10) { minutes = '0' + minutes }
  if (seconds < 10) { seconds = '0' + seconds }

  return `${minutes}:${seconds}`
}

export function presentMinutesDuration (duration) {
  return Math.abs(parseInt((duration / 60), 10)).toString()
}

export function convertMS (milliseconds) {
  var day, hour, minute, seconds
  seconds = Math.floor(milliseconds / 1000)
  minute = Math.floor(seconds / 60)
  seconds = seconds % 60
  hour = Math.floor(minute / 60)
  minute = minute % 60
  day = Math.floor(hour / 24)
  hour = hour % 24

  let timeStrg = day !== 0 ? day + 'd ' : ''
  timeStrg += hour !== 0 ? hour + 'h ' : ''
  timeStrg += minute + 'm - '
  timeStrg += seconds + 's'
  return timeStrg
}
