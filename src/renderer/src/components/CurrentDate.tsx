import { useState, useEffect } from 'react';
import { toJalaali, toGregorian } from 'jalaali-js';

interface PersianDateTime {
  persianDate: string;
  persianTime: string;
}

// Helper function to convert numbers to Persian numerals
const convertToPersianNumerals = (input: number | string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return input
    .toString()
    .split('')
    .map((char) => (/\d/.test(char) ? persianDigits[parseInt(char)] : char))
    .join('');
};

// Function to calculate the current Persian date and time
const getCurrentPersianDateTime = (): PersianDateTime => {
  const today = new Date();

  // Convert Gregorian to Persian (Jalali) date using jalaali-js
  const { jy, jm, jd } = toJalaali(today.getFullYear(), today.getMonth() + 1, today.getDate());

  // Get the current time (hours, minutes, seconds)
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  // Format the Persian date and time and convert numbers to Persian numerals
  const persianDate = `${convertToPersianNumerals(jy)}/${convertToPersianNumerals(
    jm
  )}/${convertToPersianNumerals(jd)}`;
  const persianTime = `${convertToPersianNumerals(hours < 10 ? '۰' + hours : hours)}:${convertToPersianNumerals(
    minutes < 10 ? '۰' + minutes : minutes
  )}:${seconds < 10 ? '۰' + convertToPersianNumerals(seconds) : convertToPersianNumerals(seconds)}`;

  return {
    persianDate,
    persianTime,
  };
};

// Custom Hook to get and update Persian Date and Time
export const usePersianDateTime = (): PersianDateTime => {
  const [dateTime, setDateTime] = useState<PersianDateTime>({
    persianDate: '',
    persianTime: '',
  });

  useEffect(() => {
    // Set interval to update time every second
    const interval = setInterval(() => {
      setDateTime(getCurrentPersianDateTime());
    }, 1000); // Update every second

    return (): void => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return dateTime; // Return current Persian date and time
};