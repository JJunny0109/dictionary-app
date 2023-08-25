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
    alert(word);
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const Api_Url = `${proxy}${API.URL}&key=${API.KEY}&req_type=json&method=WORD_INFO&q=${word}0`;
    // 단어를 검색하는 함수를 만들어야 함
    fetch(Api_Url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("에러 발생!");
      })
  }
}

// Event Listeners for Search Bar
searchBtn.addEventListener('click', searchWord);
searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    searchWord();
  }
});