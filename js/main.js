// 날짜추출
const today = moment().format("YYYY-MM-DD");
const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
const twoDaysAgo = moment().subtract(2, "days").format("YYYY-MM-DD");
console.log(today, yesterday, twoDaysAgo);

const LiElem = document.querySelector(".recent_list li");
const recentBox = document.getElementsByClassName("recent_box")[0];
const accountHistory = document.querySelector(".account_history");
console.log(recentBox);
// create Element
// const elDiv = document.createElement("div");
// const elLi = document.createElement("li");
// const elUl = document.createElement("ul");
// const elP = document.createElement("p");

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
  // let today = obj.data.filter((x) => {
  //   return x.date == dateString;
  // });
  // console.log(today);
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
  // classify 종류별 총합 변수 선언
  let eatoutSum = 0;
  let martSum = 0;
  let healthSum = 0;
  let shoppingSum = 0;
  let oilingSum = 0;

  const groupValues = obj.data.reduce((acc, current) => {
    acc[current.date] = acc[current.date] || [];
    acc[current.date].push(current);
    return acc;
  }, {});
  // 위에서 만든 객체를 key로 돌려서 새로운 객체 return
  const groups = Object.keys(groupValues).map((key) => {
    return { date: key, value: groupValues[key] };
  });
  // 오늘 날짜 이전만 나오게 filter
  const groupsArr = groups.filter((day) => {
    return day.date <= today;
  });
  console.log(groupsArr);

  // 오늘, 어제, 2일전일 경우 dateEl에 입력하기
  groupsArr.reverse().map((day) => {
    let dateEl = day.date;
    if (dateEl === today) {
      dateEl = "오늘";
    } else if (dateEl === yesterday) {
      dateEl = "어제";
    } else if (dateEl === twoDaysAgo) {
      dateEl = "2일전";
    }
    let priceSum = 0;
    let recentListEl = ``;

    for (i of day.value) {
      // console.log(i.classify);
      let history = i.history;
      let price = i.price;
      const classify = i.classify;
      // console.log(classify);
      let incomePrice;
      // i.income === "out" ? (priceSum += price) : priceSum;
      let commaPrice = price
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      i.income === "out"
        ? ((incomePrice = `<p>${commaPrice}</p>`), (priceSum += price))
        : (incomePrice = `<p style="color: #FF5F00;">+${commaPrice}</p>`);
      recentListEl = recentListEl + `<li><p>${history}</p>${incomePrice}</li>`;
      // classify 총합 구하기
      if (classify === "eatout") {
        eatoutSum += price;
      } else if (classify === "mart") {
        martSum += price;
      } else if (classify === "health") {
        healthSum += price;
      } else if (classify === "shopping") {
        shoppingSum += price;
      } else if (classify === "oiling") {
        oilingSum += price;
      }
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
    console.log(eatoutSum, martSum, healthSum, shoppingSum, oilingSum);
  });
}
recentCreateList();

// swiper
var swiper = new Swiper(".mySwiper", {});

function accountHistoryheightChange() {
  accountHistory.classList.toggle("clickEvent");
  // accountHistory.style.transition = "top 1s ";
  // accountHistory.style.transition = "all 1s ";
  //   accountHistory.style.height = "637px";
  //   accountHistory.style.top = "-254px";
}
console.log(eatoutSum, martSum, healthSum, shoppingSum, oilingSum);
