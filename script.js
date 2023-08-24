// API Object for the Korean Dictionary API
const API = {
  KEY: '',
  URL: 'https://stdict.korean.go.kr/api/search.do',
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

    // 단어를 검색하는 함수를 만들어야 함
  }
}

// Event Listeners for Search Bar
searchBtn.addEventListener('click', searchWord);
searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    searchWord();
  }
});