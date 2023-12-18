const axios = require('axios');
const fs = require('fs');

// 현재 날짜를 yyyyMMdd 형식으로 포맷하는 함수
function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
}

axios.get('https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=HP7TlTr7wuBKvw14uHQpZ1MjaPGKk0ka&data=AP01')
  .then(response => {
    const data = response.data;
    const filename = `data-${getFormattedDate()}.json`;  // 파일명에 날짜 포함
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  })
  .catch(error => {
    console.error('API 호출 실패:', error);
  });
