export function formatDateTime(date: string) {
  return new Date(date)
    .toLocaleString('en-GB', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
    .replace(/(\d{2} \w{3}) (\d{4})/, '$1, $2');
}