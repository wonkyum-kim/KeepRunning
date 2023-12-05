import padTwoDigits from './padTwoDigits';

/**
 *
 * @param time  seconds
 * @param distance meters
 */
export default function pace(time: number, distance: number) {
  const paceS_KM = time / (distance / 1000);
  const paceMin = Math.floor(paceS_KM / 60);
  const temp = Math.floor(paceS_KM - paceMin * 60);
  const paceSec = padTwoDigits(temp);
  return [paceMin.toString(), paceSec];
}
