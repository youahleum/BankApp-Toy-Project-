let todayt = new Date();
let year = todayt.getFullYear();
let month = ("0" + (todayt.getMonth() + 1)).slice(-2);
let day = ("0" + todayt.getDate()).slice(-2);
let today = year + "-" + month + "-" + day;

const shopDiv = document.querySelector(".shop_pattern_shop>div");
const martDiv = document.querySelector(".shop_pattern_mart>div");
const eatoutDiv = document.querySelector(".shop_pattern_dining>div");
const healthDiv = document.querySelector(".shop_pattern_health>div");
const oilDiv = document.querySelector(".shop_pattern_oil>div");
const monthReportCircleGraph = document.querySelector(
  ".month_report_circle_graph_sum"
);
const monthReportBarGraph = document.querySelector(".day_report_graph");
let daySumArr = [];
// classify 종류별 총합 변수 선언
let eatoutSum = 0;
let martSum = 0;
let healthSum = 0;
let shoppingSum = 0;
let oilingSum = 0;

async function recentCreateList() {
  const obj = await axios.get(
    "https://raw.githubusercontent.com/jusunjo/bank-json/main/bank.json"
  );

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

  groupsArr.map((day) => {
    let priceSum = 0;
    for (i of day.value) {
      let price = i.price;
      const classify = i.classify;

      // console.log(classify);
      let incomePrice;
      i.income === "out" ? (priceSum += price) : priceSum;
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
    daySumArr.push(priceSum);
    console.log(daySumArr);
  });
  console.log(eatoutSum, martSum, healthSum, shoppingSum, oilingSum);
  let totalSum = (eatoutSum + martSum + healthSum + shoppingSum + oilingSum)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  monthReportCircleGraph.textContent = `${totalSum}원`;
  console.log(totalSum);
  let makeShopP = document.createElement("p");
  let makeMartP = document.createElement("p");
  let makeEatoutP = document.createElement("p");
  let makeHealthP = document.createElement("p");
  let makeOilP = document.createElement("p");
  makeShopP.textContent = shoppingSum
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  makeMartP.textContent = martSum
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  makeEatoutP.textContent = eatoutSum
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  makeHealthP.textContent = healthSum
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  makeOilP.textContent = oilingSum
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  shopDiv.appendChild(makeShopP);
  martDiv.appendChild(makeMartP);
  healthDiv.appendChild(makeHealthP);
  oilDiv.appendChild(makeOilP);
  eatoutDiv.appendChild(makeEatoutP);

  // chart 라이브러리
  // 일간 바 그래프
  const ctxBar = document
    .querySelector("#myChart.day_report_graph")
    .getContext("2d");
  const myChartBar = new Chart(ctxBar, {
    type: "bar",
    data: {
      labels: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
      ],
      datasets: [
        {
          label: "일간 지출금액",
          data: [...daySumArr],
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
            "rgba(255, 159, 64, 0.5)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  // 월간 원형 그래프
  const ctx = document
    .querySelector("#myChart.month_report_circle_graph")
    .getContext("2d");
  const myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["외식비", "장보기", "건강관리비", "장보기", "주유비"],
      datasets: [
        {
          label: "한달 지출 패턴",
          data: [eatoutSum, martSum, healthSum, shoppingSum, oilingSum],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  });
}
recentCreateList();
// console.log(eatoutSum, martSum, healthSum, shoppingSum, oilingSum);
// console.log(typeof eatoutSum);
