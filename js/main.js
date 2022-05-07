// 날짜추출
let today = new Date();
let year = today.getFullYear();
let month = ("0" + (today.getMonth() + 1)).slice(-2);
let day = ("0" + today.getDate()).slice(-2);
let dateString = year + "-" + month + "-" + day;

let numComma = toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

const LiElem = document.querySelector(".recent_list li");
const recentBox = document.getElementsByClassName("recent_box")[0];
console.log(recentBox);
// create Element
const elDiv = document.createElement("div");
const elLi = document.createElement("li");
const elUl = document.createElement("ul");
const elP = document.createElement("p");

// // recent box에 recent div 넣는 변수 작성
// let recent = elDiv.classList.add("recent");
// let makeRecent = recentBox.appendChild(recent);
// // recent안에 recent_date넣기
// let recentDate = elDiv.classList.add("recent_date");
// const makeRecentDate = recent.appendChild(recentDate);
// // function makeRecentBox

// // fetch("https://raw.githubusercontent.com/jusunjo/bank-json/main/bank.json")
// //   .then((res) => {
// //     return res.json();
// //   })
// //   .then((obj) => {
// //     console.log(obj);
// //     console.log(obj[1].date);
// //     recentCreateList(obj);
// //   });

async function recentCreateList() {
  const obj = await axios.get(
    "https://raw.githubusercontent.com/jusunjo/bank-json/main/bank.json"
  );
  let today = obj.data.filter((x) => {
    return x.date == dateString;
  });
  console.log(today);
  // recentBox.appendChild(recent);
  // recent.appendChild(recentDate);
  // for (i = 0; i < obj.data.length; i++) {
  //   // console.log(obj.data[i]);
  //   let priceSum = 0;
  //   if (obj.data[i].date === dateString) {
  //     // let date = (elP.textContent = "오늘");
  //     // recent.appendChild(date);

  //     let history = obj.data[i].history;
  //     let price = obj.data[i].price;
  //     let recentDateEl = `<p>${history}</p><p>${price}</p>`;
  //     let recentListEl = `<p>${history}</p><p>${price}</p>`;
  //
  //     // let
  //   }
  // }

  const groupValues = obj.data.reduce((acc, current) => {
    acc[current.date] = acc[current.date] || [];
    acc[current.date].push(current);
    return acc;
  }, {});
  // 위에서 만든 객체를 key로 돌려서 새로운 객체 return
  const groups = Object.keys(groupValues).map((key) => {
    return { date: key, value: groupValues[key] };
  });
  console.log(groups);

  groups.reverse().map((day) => {
    let dateEl = day.date;
    let priceSum = 0;
    let recentListEl = ``;
    for (i of day.value) {
      // console.log(i.classify);
      let history = i.history;
      let price = i.price;
      let incomePrice;
      i.income === "out" ? (priceSum += price) : priceSum;
      let commaPrice = price
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      i.income === "out"
        ? (incomePrice = `<p>${commaPrice}</p>`)
        : (incomePrice = `<p style="color: #FF5F00;">+${commaPrice}</p>`);
      recentListEl = recentListEl + `<li><p>${history}</p>${incomePrice}</li>`;
    }

    let commaPriceSum = priceSum
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    let recentDateEl = `<p>${dateEl}</p><p>${commaPriceSum}원 지출</p>`;
    let recentEl = new DOMParser().parseFromString(
      `<div class="recent">
      <div class="recent_date">${recentDateEl}</div>
      <ul class="recent_list">
        ${recentListEl}
      </ul>
    </div>`,
      "text/html"
    ).body.firstElementChild;
    recentBox.appendChild(recentEl);
  });
}
recentCreateList();
var swiper = new Swiper(".mySwiper", {});
// function recentCreateList() {
//   // for (i = o; i < obj.length; i++) {
//   //   if (new Date() === obj[i].date) {
//   //   }
//   //   elDiv.classList.add("recent");
//   // }
// }
