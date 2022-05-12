// 날짜추출
const today = moment().format("YYYY-MM-DD");
const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
const twoDaysAgo = moment().subtract(2, "days").format("YYYY-MM-DD");
// console.log(today, yesterday, twoDaysAgo);

// element 불러오기
const LiElem = document.querySelector(".recent_list li");
const recentBox = document.getElementsByClassName("recent_box")[0];
const accountHistory = document.querySelector(".account_history");

// fetch 이용
// // fetch("https://raw.githubusercontent.com/jusunjo/bank-json/main/bank.json")
// //   .then((res) => {
// //     return res.json();
// //   })
// //   .then((obj) => {
// //     console.log(obj);
// //     console.log(obj[1].date);
// //     recentCreateList(obj);
// //   });

//axios로 구현
async function recentCreateList() {
  const obj = await axios.get(
    "https://raw.githubusercontent.com/jusunjo/bank-json/main/bank.json"
  );
  // 날짜별로 배열에 넣어주기
  // reduce 로 새로운 객체 만들기
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
      let commaPrice = price
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      i.income === "out"
        ? ((incomePrice = `<p>${commaPrice}</p>`), (priceSum += price))
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

// swiper
var swiper = new Swiper(".mySwiper", {});

function accountHistoryheightChange() {
  accountHistory.classList.toggle("clickEvent");
}

const saveListBtn = document.querySelector(".save_list_btn");
// let accountImg = `<img src="../image/Component 4.png" alt="" />`;
function addAccount() {
  saveListBtn.insertAdjacentHTML(
    "beforebegin",
    `<img src="../image/Component 4.png" alt="" />`
  );
}
