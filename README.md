# Toy Project - bank app

## json 파일을 이용한 데이터 연결

1. fetch().then()
   - fetch("https://raw.githubusercontent.com/jusunjo/bank-json/main/bank.json")
     .then((res) => {
     return res.json();
     })
     .then((obj) => {
     console.log(obj);
     console.log(obj[1].date);
     recentCreateList(obj);
     });
1. async await

   - async function recentCreateList() {
     const obj = await axios.get(
     "https://raw.githubusercontent.com/jusunjo/bank-json/main/bank.json"
     );

1. 옛날방식
   - const 요청url = "https://eulsoo.github.io/list.json";  
     const 요청객체 = new XMLHttpRequest();
     요청객체.open("GET", 요청url);  
     요청객체.responseType = "json";  
     요청객체.send();  
     요청객체.onload = () => {  
     const obj = 요청객체.response;  
     할일(obj);  
     };

## Swiper 라이브러리 활용

---

## chart js 라이브러리 활용

#### bar chart

<img width=200 src=''>

#### circle chart

<img width=200 src=''>
