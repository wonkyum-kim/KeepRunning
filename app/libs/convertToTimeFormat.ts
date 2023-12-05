/**
 *
 * @param totalTime seconds
 */

export default function converToTimeFormat(totalTime: number) {
  const totalMin = Math.floor(totalTime / 60);
  const sec = totalTime - totalMin * 60;
  const hour = Math.floor(totalMin / 60);
  const min = totalMin - hour * 60;
  return [hour, min, sec];
}
