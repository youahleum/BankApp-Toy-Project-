# Toy Project - bank app

## json 파일을 이용한 데이터 연결

### json 연결하는 방법

1. fetch().then()
   ```
   fetch("https://raw.githubusercontent.com/jusunjo/bank-json/main/bank.json")
    .then((res) => {
    return res.json();
    })
    .then((obj) => {
    console.log(obj);
    console.log(obj[1].date);
    recentCreateList(obj);
    });
   ```
1. axios / async await - 이 방식으로 적용

   - axios : Fetch와 Axios의 차이점은 Axios는 요청과 응답을 모두 JSON 형식으로 자동 변환시켜 줍니다.
   - async await: Promise 객체를 사용하더라도 .then() .catch() 등등 뒤에 붙이는 것들이 많아진다.
     뒤에 뭐 안 붙이고, 더 간단하게 비동기 작업을 동기적으로 만들어주는 키워드가 바로 await 이다.

   ```
   async function recentCreateList() {
     const obj = await axios.get(
     "https://raw.githubusercontent.com/jusunjo/bank-json/main/bank.json"
     );

   ```

1. 옛날에 많이 사용하였지만 현재는 많이 사용하지 않는 방식
   ```
   const 요청url = "https://eulsoo.github.io/list.json";
     const 요청객체 = new XMLHttpRequest();
     요청객체.open("GET", 요청url);
     요청객체.responseType = "json";
     요청객체.send();
     요청객체.onload = () => {
     const obj = 요청객체.response;
     할일(obj);
     };
   ```
   ***

## Swiper 라이브러리 활용

    - 슬라이드처럼 넘어갈 수 있게 설정

![슬라이드1](https://raw.githubusercontent.com/youahleum/Toy-Project/master/image/index.jpg?token=GHSAT0AAAAAABTSKQMAOWIOGWJZGBN4AZKQYT2KF2A)![슬라이드2](https://raw.githubusercontent.com/youahleum/Toy-Project/master/image/index3.jpg?token=GHSAT0AAAAAABTSKQMBCU3GTCB24U557XQEYT2KIBA)![슬라이드3](https://raw.githubusercontent.com/youahleum/Toy-Project/master/image/index4.jpg?token=GHSAT0AAAAAABTSKQMBBMDPHRRJJ37RL4M4YT2KIOA)

---

## chart js 라이브러리 활용

### bar chart 구현한 모습

- 일간 지출 금액을 한달 단위로 bar graph로 출력

![구현한 bar graph](https://raw.githubusercontent.com/youahleum/Toy-Project/master/image/chart1.jpg?token=GHSAT0AAAAAABTSKQMAARBLRVR6XU7NZKUKYT2J4CQ)

### circle chart 구현한 모습

- 현재까지의 지출 내역을 이용하여 전체의 비중이 어떻게 되는지 나타냄

![구현한 circle graph](https://raw.githubusercontent.com/youahleum/Toy-Project/master/image/chart2.jpg?token=GHSAT0AAAAAABTSKQMB7XKN2PGSGILENFJIYT2J3QA)

---

## click Event를 이용하여 탭 올리기

- 클릭 이벤트를 주고 탭 길이의 height를 높이고 position을 이용해 top을 위치를 변경, 리스트들이 더 많이 보일 수 있게 진행

![탭올리기전](https://raw.githubusercontent.com/youahleum/Toy-Project/master/image/index.jpg?token=GHSAT0AAAAAABTSKQMAOWIOGWJZGBN4AZKQYT2KF2A) ![탭올린후](https://raw.githubusercontent.com/youahleum/Toy-Project/master/image/index2.jpg?token=GHSAT0AAAAAABTSKQMBDPDYLK4KF3IHDX6YYT2KG6Q)
