// The API may serialize a PostgreSQL DATE as either YYYY-MM-DD or a timestamp
// at midnight. In both cases, use its calendar-date portion, not its UTC time.
export function getWibCountdownTarget(date: string, kind: 'registrationEnd' | 'competitionStart'): number {
  const calendarDate = date.slice(0, 10);
  const startOfDay = Date.parse(`${calendarDate}T00:00:00+07:00`);
  // Registration is open through its end date; it closes at the next midnight.
  return kind === 'registrationEnd' ? startOfDay + 24 * 60 * 60 * 1000 : startOfDay;
}
