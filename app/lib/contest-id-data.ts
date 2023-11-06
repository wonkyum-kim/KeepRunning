async function marathonsById(id: string) {
  const url = `http://www.roadrun.co.kr/schedule/view.php?no=${id}`;
  const response = await fetch(url, { cache: 'no-store' });
  const buffer = await response.arrayBuffer();
  const decoded = new TextDecoder('euc-kr').decode(buffer);
  return decoded;
}

function getName(info: string) {
  const pattern = /<p><B>(.*?)<\/B><\/p>/;
  const match = info.match(pattern);
  if (!match) {
    return 'null';
  }
  return match[1];
}

function getDate(info: string) {
  const pattern = /<p>(2.*?)<\/p>/;
  const match = info.match(pattern);
  if (!match) {
    return 'null';
  }
  return match[1];
}

function getEvent(info: string) {
  const pattern =
    /<p align="center">대회종목<\/p>\s+<\/td>\s+<td width="430" height="25" bgcolor="white">(.*?)<\/td>/;
  const match = info.match(pattern);
  if (!match) {
    return 'null';
  }
  return match[1];
}

function getPlace(info: string) {
  const pattern =
    /<p align="center">대회장소<\/p>\s+<\/td>\s+<td width="430" height="25" bgcolor="white">\s+<p>(.*?)<\/p>/;
  const match = info.match(pattern);
  if (!match) {
    return 'null';
  }
  return match[1];
}

function getApplyDate(info: string) {
  const pattern =
    /<p align="center">접수기간<\/p>\s+<\/td>\s+<td width="430" height="25" bgcolor="white">(.*?)\s+<\/td>/;
  const match = info.match(pattern);
  if (!match) {
    return 'null';
  }
  return match[1];
}

function getDescription(info: string) {
  const startIndex = info.lastIndexOf(
    '<td width="430" height="24" bgcolor="white">'
  );
  const lastIndex = info.indexOf('<br>&nbsp;</p>', startIndex);
  const desc = info
    .substring(startIndex + 52, lastIndex)
    .trim()
    .substring(7);
  return desc;
}

export async function getContestsById(id: string) {
  const response = await marathonsById(id);
  const contestById = {
    name: getName(response),
    date: getDate(response),
    event: getEvent(response),
    place: getPlace(response),
    apply: getApplyDate(response),
    desc: getDescription(response),
  };
  return contestById;
}
