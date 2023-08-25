// API Object for the Korean Dictionary API
const API = {
  KEY: 'EF487D8CEBAEF6EAAC70A43617AA1EEC',
  URL: 'https://stdict.korean.go.kr/api/view.do?certkey_no=5868&type_search=view',
 //예시 : 물 = https://stdict.korean.go.kr/api/view.do?certkey_no=5868&type_search=view&key=EF487D8CEBAEF6EAAC70A43617AA1EEC&req_type=json&method=WORD_INFO&q=물
}


// Search Bar Features
// Get DOM Elements
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const clearBtn = document.querySelector('.clear-btn');

// Clear Search Bar
clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  searchInput.focus();

  // x button disappears 기능 추가 필요
});

// searchFunction
function searchWord() {
  const word = searchInput.value;
  if (word === '') {
    alert('Please enter a word');
  } else {
    callAPI(word);
  }
}

// 단어를 검색하고 API를 호출하는 함수
function callAPI(word) {
  const proxy = "https://proxy.cors.sh/";
  const apiUrl0 = `${proxy}${API.URL}&key=${API.KEY}&req_type=json&method=WORD_INFO&q=${word}0`;
  const apiUrl1 = `${proxy}${API.URL}&key=${API.KEY}&req_type=json&method=WORD_INFO&q=${word}1`;

  // 첫 번째 API 엔드포인트에서 데이터 가져오기
  fetch(apiUrl0, { headers: { 'x-cors-api-key': 'temp_e455f4f9d69abd5adc971b5f7933635a' } })
  .then(response => {
    // HTTP 응답이 성공인 경우
    if (!response.ok) {
      throw new Error('네트워크 응답이 실패하였습니다.');
    }
    // JSON 데이터 파싱
    return response.json();
  })
  .then(data => {
    // data.channel.item이 존재하지 않는 경우 두 번째 API 엔드포인트에서 데이터 가져오기
    if (!data.channel || !data.channel.item) {
      // 두 번째 API 요청은 첫 번째 요청의 .then() 블록 내에서 실행
      return fetch(apiUrl1, { headers: { 'x-cors-api-key': 'temp_e455f4f9d69abd5adc971b5f7933635a' } })
        .then(response => {
          if (!response.ok) {
            throw new Error('네트워크 응답이 실패하였습니다.');
          }
          return response.json();
        });
    }
    // data가 존재하는 경우 그대로 반환
    return data;
  })
  .then(data => {
    console.log('API로부터 가져온 데이터:', data);
    // 데이터 처리 또는 반환하는 추가 작업 수행
  })
  .catch(error => {
    // 에러 처리
    console.error('에러 발생:', error);
  });

}


// data의 값을 HTML에 출력하는 함수 편집 필요!!!!!
function renderDataToHTML(data) {
  // // 단어의 뜻이 여러개인 경우를 대비하여 배열로 만듦
  // const meanings = data.channel.item[0].sense.split(';');

  // // 단어의 뜻을 출력할 HTML 요소를 가져옴
  // const meaningsList = document.querySelector('.meanings');

  // // 단어의 뜻을 출력할 HTML 요소를 초기화
  // meaningsList.innerHTML = '';
  console.log('renderDataToHTML 함수 실행');
}

// Event Listeners for Search Bar
searchBtn.addEventListener('click', searchWord);
searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    searchWord();
  }
});