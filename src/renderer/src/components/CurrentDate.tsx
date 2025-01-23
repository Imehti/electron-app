import { useState, useEffect } from 'react'

interface PersianDateTime {
  persianDate: string
  persianTime: string
}

// Helper function to convert numbers to Persian numerals
const convertToPersianNumerals = (input: number | string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
  return input
    .toString()
    .split('')
    .map((char) => (/\d/.test(char) ? persianDigits[parseInt(char)] : char))
    .join('')
}

// Function to calculate the current Persian date and time
const getCurrentPersianDateTime = (): PersianDateTime => {
  const today = new Date()

  // Get current Gregorian date components (YYYY, MM, DD)
  const gregorianYear = today.getFullYear()
  const gregorianMonth = today.getMonth() + 1 // JavaScript months are 0-indexed
  const gregorianDay = today.getDate()

  // Convert Gregorian to Persian (Jalali) date
  const gDaysInMonth = [
    31,
    28 +
      (gregorianYear % 4 === 0 && (gregorianYear % 100 !== 0 || gregorianYear % 400 === 0) ? 1 : 0),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ]

  let gDayOfYear = 0
  for (let i = 0; i < gregorianMonth - 1; i++) {
    gDayOfYear += gDaysInMonth[i]
  }
  gDayOfYear += gregorianDay

  // Total number of days from the start date
  const totalDays = (gregorianYear - 622) * 365 + Math.floor((gregorianYear - 621) / 4) + gDayOfYear

  // Calculate Persian year, month, and day from total days
  const persianYearCalc = Math.floor((totalDays - 79) / 365.2425)
  let persianDayOfYear = totalDays - (persianYearCalc * 365 + Math.floor(persianYearCalc / 4) + 79)

  const persianDaysInMonth = [31, 31, 31, 30, 30, 30, 30, 31, 31, 30, 30, 29]

  let persianMonthCalc = 0
  while (persianDayOfYear > persianDaysInMonth[persianMonthCalc]) {
    persianDayOfYear -= persianDaysInMonth[persianMonthCalc]
    persianMonthCalc++
  }

  const persianYear = persianYearCalc
  const persianMonth = persianMonthCalc + 1
  const persianDay = persianDayOfYear

  // Get the current time (hours, minutes, seconds)
  const hours = today.getHours()
  const minutes = today.getMinutes()
  const seconds = today.getSeconds()

  // Format the Persian date and time and convert numbers to Persian numerals
  const persianDate = `${convertToPersianNumerals(persianYear)}/${convertToPersianNumerals(
    persianMonth
  )}/${convertToPersianNumerals(persianDay)}`
  const persianTime = `${convertToPersianNumerals(hours < 10 ? '۰' + hours : hours)}:${convertToPersianNumerals(minutes < 10 ? '۰' + minutes : minutes)}:${seconds < 10 ? '۰' + convertToPersianNumerals(seconds) : convertToPersianNumerals(seconds)}`

  return {
    persianDate,
    persianTime
  }
}

// Custom Hook to get and update Persian Date and Time
export const usePersianDateTime = (): any => {
  const [dateTime, setDateTime] = useState<PersianDateTime>({
    persianDate: '',
    persianTime: ''
  })

  useEffect(() => {
    // Set interval to update time every second
    const interval = setInterval(() => {
      setDateTime(getCurrentPersianDateTime())
    }, 1000) // Update every second

    return (): void => clearInterval(interval) // Cleanup interval on component unmount
  }, [])

  return dateTime // Return current Persian date and time
}
