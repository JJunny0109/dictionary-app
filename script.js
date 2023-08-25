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


// 입력 필드에 입력 내용이 변경될 때마다 실행되는 이벤트 리스너
searchInput.addEventListener('input', function () {
  if (searchInput.value.trim() === '') {
      // 입력 내용이 없으면 X 버튼을 숨깁니다.
      clearBtn.style.display = 'none';
  } else {
      // 입력 내용이 있으면 X 버튼을 표시합니다.
      clearBtn.style.display = 'block';
  }
});

// Clear Search Bar
clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  searchInput.focus();

  // x button disappears
  clearBtn.style.display = 'none';
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


// API 호출 및 데이터 처리
// 단어를 검색하고 API를 호출하는 함수
function callAPI(word) {
  const proxy = "https://proxy.cors.sh/";
  const Proxy_Api_Key = "temp_e455f4f9d69abd5adc971b5f7933635a";
  const apiUrl0 = `${proxy}${API.URL}&key=${API.KEY}&req_type=json&method=WORD_INFO&q=${word}0`;
  const apiUrl1 = `${proxy}${API.URL}&key=${API.KEY}&req_type=json&method=WORD_INFO&q=${word}1`;

  // 첫 번째 API 엔드포인트에서 데이터 가져오기
  fetch(apiUrl0, { headers: { 'x-cors-api-key': Proxy_Api_Key } })
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
    if(data.channel.item) {
      console.log('API로부터 가져온 데이터:', data);
      // 데이터 처리 또는 반환하는 추가 작업 수행
      renderDataToHTML(data);
    } else {
      console.log('존재하지 아니한 단어입니다.');

      // // 검색결과가 없음을 사용자에게 알림 추후에 애니메이션 추가 필요 + 메시지 박스 보이기 기능 추가
      // const messageBox = document.querySelector('.message-box');
      // messageBox.textContent = `단어 '${word}'에 대한 검색결과가 없습니다.`;
    }
  })
  .catch(error => {
    // 에러 처리
    console.error('에러 발생:', error);
  });

}


// data의 값을 HTML에 출력하는 함수 편집 필요!!!!!
function renderDataToHTML(data) {
  console.log('renderDataToHTML 함수 실행');
  // 단어의 뜻을 출력할 HTML 요소를 가져옴
  const searchedWord = document.querySelector('.searched-word');
  const pronunciation = document.querySelector('.pronunciation');
  const wordClass = document.querySelector('.word-class');
  const meanTray = document.querySelector('.mean-tray');
  
  // data에서 단어의 뜻을 가져옴
  let fetchedWord = {
    word: data.channel.item.word_info.word, // 말 그대로 단어 : 먹다, 물, 나무 등
    wordType: data.channel.item.word_info.word_type, // 고유어, 한자어 등
    pronunciation: data.channel.item.word_info.pronunciation_info[0].pronunciation, // 발음 : 읇다 = [읍따]
    wordClass: data.channel.item.word_info.pos_info[0].pos, // 품사 : 동사, 명사, 형용사 등
    meanArr: data.channel.item.word_info.pos_info[0].comm_pattern_info[0].sense_info, // 배열인데 단어의 정의를 넣음 : 나무 = [줄기나 가지가 목질로 된 여러해살이 식물.,집을 짓거나 가구, 그릇 따위를 만들 때 재료로 사용하는 재목. 등등]
  }
  console.log('fetchedWord:', fetchedWord);

  // HTML에서 .lower에 단어, 발음 그리고 품사를 출력
  searchedWord.textContent = fetchedWord.word;
  pronunciation.textContent = `[${fetchedWord.pronunciation}]`;
  wordClass.textContent = fetchedWord.wordClass;

  // HTML에서 .lower .mean-tray에 단어의 뜻 or 정의 and 예시를 출력
  // 기존의 단어의 뜻을 출력하는 HTML 요소를 삭제
  while(meanTray.firstChild) {
    meanTray.removeChild(meanTray.firstChild);
  }

  // div태그를 생성하고 class를 추가한 후에 내용을 추가하고 그 div태그를 meanTray에 추가
  for(let i = 0; i < fetchedWord.meanArr.length; i++) {
    // 단어의 뜻을 출력할 HTML 요소를 생성
    const mean = document.createElement('li');
    mean.classList.add('mean');
    mean.textContent = fetchedWord.meanArr[i].definition;
    
    // 단어의 예시를 출력할 HTML 요소를 생성
    const ulEl = document.createElement('ul');
    ulEl.classList.add('example');
    const example = document.createElement('li');
    example.textContent = fetchedWord.meanArr[i].example_info[0].example;
    ulEl.appendChild(example);
    mean.appendChild(ulEl);

    // 최종적으로 단어의 뜻과 예시를 HTML에 출력
    meanTray.appendChild(mean);
  }

}

// Event Listeners for Search Bar
searchBtn.addEventListener('click', searchWord);
searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    searchWord();
  }
});