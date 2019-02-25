const tokenRegexp = /Y+|M+|D+|H+|m+|s+|./g

const parsers = {
  'Y': {
    match: /^(\d{1,4})/,
    unit: 'years'
  },
  'M': {
    match: /^(1[0-2]|0?[1-9])/,
    unit: 'months'
  },
  'D': {
    match: /^(\d{1,2})/,
    unit: 'dates'
  },
  'H': {
    match: /^(2[0-3]|[0-1]?\d)/,
    unit: 'hours'
  },
  'm': {
    match: /^([0-5]?\d)/,
    unit: 'minutes'
  },
  's': {
    match: /^([0-5]?\d)/,
    unit: 'seconds'
  }
}

function padStart (original: string | number, targetLength: number, padString: string) {
  original = String(original)

  if (original.length < targetLength) {
    original = padString[0].repeat(targetLength - original.length) + original
  }

  return original
}


export function format (source: Date | string, format: string) {
  const date = source instanceof Date ? source : new Date(source)

  const details = {
    years: date.getFullYear(),
    months: date.getMonth() + 1,
    dates: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  }

  return format.replace(tokenRegexp, (token) => {
    const value = parsers[token[0]] && details[parsers[token[0]].unit]

    return value === undefined
      ? token
      : padStart(value, token.length, '0')
  })
}
