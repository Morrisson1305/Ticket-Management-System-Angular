export function months(options: { count: number }): string[] {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July",
                      "August", "September", "October", "November", "December"];
  const result = [];
  const date = new Date();
  for (let i = 0; i < options.count; i++) {
    result.push(monthNames[(date.getMonth() + i) % 12]);
  }
  return result;
}
