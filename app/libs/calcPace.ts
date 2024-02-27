import type { Record } from '../record/page';

export default function calcPace(record: Record) {
  const { km, hour, min, sec } = record;

  const totalSec =
    parseInt(hour) * 60 * 60 + parseInt(min) * 60 + parseInt(sec);

  const pace = Math.floor(totalSec / parseInt(km));
  const secPace = pace % 60;
  const minPace = (pace - secPace) / 60;

  // 1자리 숫자인 경우 앞에 0을 붙여준다.
  let secPaceString = secPace.toString();
  if (secPaceString.length === 1) secPaceString = '0' + secPaceString;

  return [minPace.toString(), secPaceString];
}
