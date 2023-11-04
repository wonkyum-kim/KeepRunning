async function marathons() {
  const response = await fetch('http://www.roadrun.co.kr/schedule/list.php');
  const buffer = await response.arrayBuffer();
  const decoded = new TextDecoder('euc-kr').decode(buffer);
  return decoded;
}

function getPlaces(info: string) {
  const regex = /<div align="center">(.*?)<\/div>/g;
  const matches = info.match(regex);
  if (!matches) {
    return [];
  }
  for (let i = 0; i < matches.length; ++i) {
    // @ts-ignore
    const innerText = matches[i].match(/<div align="center">(.*?)<\/div>/)[1];
    matches[i] = innerText;
  }
  return matches;
}

function getHosts(info: string) {
  const regex = /<div align="right" valign="bottom">(.*?)<br>/g;
  const matches = info.match(regex);
  if (!matches) {
    return [];
  }
  for (let i = 0; i < matches.length; ++i) {
    // @ts-ignore
    const innerText = matches[i].match(
      /<div align="right" valign="bottom">(.*?)<br>/
    )[1];
    matches[i] = innerText;
  }
  return matches;
}

function getDayOfTheWeek(info: string) {
  const regex = /<font color="#959595">.*?<\/font>/g;
  const matches = info.match(regex);
  if (!matches) {
    return [];
  }
  for (let i = 0; i < matches.length; i++) {
    const content = matches[i].replace(/<font color="#959595">|<\/font>/g, '');
    matches[i] = content;
  }
  return matches;
}

function getDate(info: string) {
  const regex = /sans-serif">.*?<\/font>/g;
  const matches = info.match(regex);
  if (!matches) {
    return [];
  }
  for (let i = 0; i < matches.length; i++) {
    const content = matches[i].replace(/sans-serif">|<\/font>/g, '');
    matches[i] = content;
  }
  return matches;
}

function getContest(info: string) {
  const regex = /0, 0, 550, 700, 0, 0, 0, 1, 0\)">.*?<\/a><br>/g;
  const matches = info.match(regex);
  if (!matches) {
    return [];
  }
  for (let i = 0; i < matches.length; ++i) {
    // @ts-ignore
    const innerText = matches[i].match(
      /0, 0, 550, 700, 0, 0, 0, 1, 0\)">(.*?)<\/a><br>/
    )[1];
    matches[i] = innerText;
  }
  return matches;
}

function getLength(info: string) {
  const regex = /color="#990000">.*?<\/font>/g;
  const matches = info.match(regex);
  if (!matches) {
    return [];
  }
  for (let i = 0; i < matches.length; ++i) {
    // @ts-ignore
    const innerText = matches[i].match(/color="#990000">(.*?)<\/font>/)[1];
    matches[i] = innerText;
  }
  return matches;
}

function getLink(info: string) {
  const regex = /<a href=".*?" target=/g;
  const matches = info.match(regex);
  if (!matches) {
    return [];
  }
  for (let i = 0; i < matches.length; ++i) {
    // @ts-ignore
    const innerText = matches[i].match(/<a href="(.*?)" target=/)[1];
    matches[i] = innerText;
  }
  return matches;
}

export async function getContests() {
  const response = await marathons();
  const startIndex = response.indexOf('<!--리스트 시작-->');
  const endIndex = response.indexOf('<!--리스트 끝-->');
  const data = response.substring(startIndex + 14, endIndex);
  const place = getPlaces(data) as string[];
  const host = getHosts(data) as string[];
  const day = getDayOfTheWeek(data) as string[];
  const date = getDate(data) as string[];
  const contest = getContest(data) as string[];
  const length = getLength(data) as string[];
  const link = getLink(data) as string[];
  return { place, host, day, date, contest, length, link };
}