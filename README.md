# Keep Running 기능 소개

`Keep Running`은 크게 3가지 기능을 제공합니다.

- 러닝 기록 (누적 거리, 시간, 페이스) 제공
- 국내 마라톤 대회 일정 정보 제공
- 러닝 기록과 신발 마일리지 연동하여 관리할 수 있는 기능 제공

# Keep Running을 만들기 시작한 계기

2023년 여름 달리기를 시작하고 나서 그동안 힘들었던 기억들이나 걱정들이 달리는 순간에는 모두 잊을 수 있어서 좋았습니다.

이후로 내가 얼마나 뛰었는지 어떤 정보들을 얻을 수 있을지 궁금해졌고,

다른 사람들에게 내가 그동안 달린 기록과 여러가지 정보들을 제공할 수 있는 웹 페이지를 만들게 되었습니다.

# Keep Running 개발 과정

## Strava API

이전까지는 삼성 헬스 애플리케이션을 사용해 달린 기록을 측정하고 저장해왔습니다.

그래서 그동안 달린 기록들을 웹으로 쉽게 가져오기 위해서 삼성 헬스와 연동할 수 있는 Strava의 API를 사용하기로 했습니다.

(Strava는 달리기, 사이클 등 기록을 측정하는 육상 종목들에서 많이 사용되는 애플리케이션이다.)

하지만 몇 가지 문제점들이 발생했습니다.

1. Strava와 삼성 헬스를 연동 시켜도, 연동하기 이전 데이터를 가져오지 못한다.
2. 기본 scope가 `read`인데, 기록을 보려면 `read_all`이 필요하다.

첫 번째 문제점은 아쉽지만 내가 해결할 수 있는 문제가 아니라 그냥 감수하기로 했다.

하지만 두 번째 문제를 해결하려고 많은 시간을 소비하게 되었습니다.

처음에 `Keep Running`을 만들 때 나만의 기록이 아닌 모든 사람들이 Strava의 OAuth 기능을 사용해서 로그인하고 자신의 기록을 확인할 수 있도록 하려고 했다.

그래서 NextAuth 설정도 다 했고, Prisma의 스키마도 작성을 마친 상태였다.

하지만 Strava에서 제공하는 기본적인 scope가 read이기 때문에 read_all 권한이 필요한 개인 기록들을 확인할 수 없는 문제가 발생했다.

내가 Strava를 처음 사용해봐서 잘 모를 수도 있지만, 개인 기록들을 전부 공개로 설정해도 접근하지 못하는 것으로 보아 read 권한으로는 볼 수 없는 것 같았다.

read_all 권한을 얻기 위해서는 개발자가 아닌 사용자들이 직접 access_token과 refresh_token을 발급 받아야 하기 때문에,

계획을 바꿔서 Keep Running은 나의 기록만을 저장하고 확인하는 사이트가 되었다.

## Leaflet.js

내가 달린 장소를 곳을 지도로 표시해주기 위해 `Leaflet.js`를 사용하였다.

Leaflet.js를 사용한 이유는 일단 무료이면서, 간단하고, 쉽기 때문이다.

지도를 사용해서 복잡한 작업을 하지 않을 것이기 때문에 Leaflet.js를 사용해도 문제가 없을 것이라 판단하였다.

Leaflet.js는 바닐라 자바스크립트로 작성되었기 때문에 React에서 사용하도록 `react-leaflet` 라이브러리도 함께 사용하였다.

Leaflet.js를 사용하는 컴포넌트는 클라이언트 컴포넌트이기 때문에 hydration 에러가 발생했다.

hydration 에러가 발생하는 이유는 지도가 서버에서 pre-render 된 정적인 결과물과 일치하지 않기 때문이다.

이를 해결하는 방법은 두 가지가 있다.

1. 클라이언트에서 useEffect를 사용하기
2. 서버에서 클라이언트 컴포넌트를 렌더링하지 않기

나는 더 간단한 두 번째 방법으로 Next.js에서 제공하는 lazy loading을 사용하여 SSR을 하지 않는 방법을 선택해서 해결하였고 fallback도 넣어주었다.

- [서버 사이드 렌더링 3 - Hydration](https://github.com/wonkyum-kim/WebStudy/blob/main/frontend/React/%EC%84%9C%EB%B2%84%20%EC%82%AC%EC%9D%B4%EB%93%9C%20%EB%A0%8C%EB%8D%94%EB%A7%81/%EC%84%9C%EB%B2%84%20%EC%82%AC%EC%9D%B4%EB%93%9C%20%EB%A0%8C%EB%8D%94%EB%A7%81%203%20-%20Hydration.md)

## polyline

Strava에서 polyline은 시간에 따라서 내가 있던 위치의 좌표를 문자열로 encode 해둔 것인데, 이를 지도에 표시하기 위해서 decode하는 과정이 필요하다.

이 과정은 [`js-polyline-codec`](https://github.com/googlemaps/js-polyline-codec) 라이브러리를 사용하였다.

( 웹에서도 직접 해볼 수 있다. https://developers.google.com/maps/documentation/utilities/polylineutility?hl=ko )

## 국내 마라톤 대회 일정

언젠가 나도 나갈 수 있을 마라톤 대회 일정들을 가져오기 위해 마라톤 온라인 홈페이지를 파싱하는 작업을 진행하였다.

php로 작성된 페이지였고, charset이 euc-kr로 처음보는 형태였다.

보통은 fetch API를 사용하면 응답을 json이나 text 형태로 변환하는데, 인코딩 형식이 euc-kr 라서 일반적인 방법으로 진행할 수 없었다.

마침 얼마 전에 공부했던 TextDecoder가 떠올라서 응답을 `response.arrayBuffer()` 형태로 받아 온 다음, 디코딩을 진행하여 원하는 HTML 문자열을 얻을 수 있었다.

- [5. ArrayBuffer](https://github.com/wonkyum-kim/WebStudy/blob/main/frontend/JavaScript/5.%20ArrayBuffer.md#textdecoder)

```ts
async function marathons() {
  const response = await fetch(...);
  const buffer = await response.arrayBuffer();
  const decoded = new TextDecoder('euc-kr').decode(buffer);
  return decoded;
}
```

이후 파싱 과정은 다른 라이브러리를 사용해볼 수도 있었지만, GPT가 어디까지 도와주는지 궁금해서 사용하다 보니 정규 표현식으로 해결할 수 있었다.

## 날씨

여름에 달리기를 시작한 사람으로서 가장 걱정되는 부분은 겨울 날씨였다.

그래서 날씨 정보를 알려주고 뛸 수 있는 상태인지 알려주는 기능을 추가해보기로 했다.

내가 구현한 것은 날씨 API openweathermap를 사용하여 그냥 단순히 if, else 문으로 기온에 따라 뛰기에 적합한지 알려주는 것이 전부이지만,

그래도 누군가가 러너들한테 뛰어도 좋은 날씨인지 알려주는 기능이 있으면 좋을 것 같아서 추가하게 되었다.

이것을 구현하면서 웹 브라우저를 통해 현재 나의 위도, 경도 좌표를 얻는 방법(navigator.geolocation)에 대해서도 알게 되었다.
