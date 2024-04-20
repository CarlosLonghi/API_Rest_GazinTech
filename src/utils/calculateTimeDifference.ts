export function calculateTimeDifference (birthDate: Date): number {
  const dateTimeCurrent: Date = new Date()
  const birthDateAsObject: Date = new Date(birthDate)

  const timeDifference = dateTimeCurrent.getTime() - birthDateAsObject.getTime()
  const age = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365))

  return age
}
