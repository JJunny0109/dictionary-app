# dictionary-app
Day 15 - Input an unknown word to find its meaning

- Click search btn or Press [enter] btn to search words what you want to know
- 국립국어원의 표준국어대사전 개발 지원 Open API를 이용하였음을 알립니다.
- If you wanna use it, get your own API_Key!!!
- It was hard to handle the CORS Err.
  - To fix it, i have to use proxy server remedy.
  - CORS Policy 때문에 서버에서 요청을 수행하지만 클라이언트, 브라우저다, 에서 이를 차단한다. 따라서 Proxy 서버를 사용해서 이를 해결해야한다.
- Due to flaw of the 국립국어원's 표준국어대사전 OpenAPI, I had to use conditional statements after the API call to decide wheter to call another API.
  - 부가설명 : 국립국어원의 표준국어대사전 OpenAPI에서 어깨번호가 존재한다. 이것이 0부터 시작하는 경우도 있으며 1부터 시작하는 경우도 존재한다. 이러한 백엔드에서의 결점으로 인해 어깨번호가 0인 API를 먼저 호출한 후에 조건문을 사용한다. 그 후에 조건문으로 자료의 존재여부를 확인한 후에 어깨번호가 1인 API의 호출여부를 결정한다.
- 발음 음성 파일을 요청하는 국어사전 API를 찾을 수 가 없음. 이는 추후에 추가해야한다. Naver 등에서 어떻게 음성파일을 요청하는지 확인해야함