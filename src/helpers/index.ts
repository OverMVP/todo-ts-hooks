//Formatting from mins + seconds to Seconds
export function formatTime(mins: string | number, seconds: string | number): number {
  const sec = Number(mins) * 60 + Number(seconds)
  return sec
}

//Formatting to 00:00
export function convertToMMSS(timeLeft: number): (string | number)[] {
  const mins = Math.floor(timeLeft / 60)
  const seconds = timeLeft - mins * 60

  return [mins <= 9 ? `0${mins}` : mins, seconds <= 9 ? `0${seconds}` : seconds]
}
