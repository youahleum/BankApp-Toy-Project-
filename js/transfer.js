const article1 = document.querySelector(".article1");
const article2 = document.querySelector(".article2");
const article3 = document.querySelector(".article3");
const numInput = document.querySelector(".numInput");
const closeBtn = document.querySelector(".close_btn a");

// article2
let accountImg = document.querySelector(".accountImg");
const accountName = document.querySelector(".article2_account_user_name");
const accountNum = document.querySelector(".article2_account_number");
const nextBtn = document.querySelector(".next");

// article2-5
const accountNumDiv = document.querySelector(".account_numInput");
const accountNextBtn = document.querySelector(".account-next");

// article3
const transferName = document.querySelector(".art3_name");
const transferAmount = document.querySelector(".art3_amount");

// article2
let numStr = "";
function numAdd(n) {
  numStr = numStr + n;
  console.log(numStr);
  numStr.startsWith("0") ? (numStr = numStr.slice(1)) : null;
  numStr.startsWith("0") ? (numStr = numStr.slice(1)) : null;
  numInput.innerText = numStr;
  console.log(numStr);
  if (numStr !== "") {
    nextBtn.style.display = "block";
  }
}

function del() {
  let a = numStr.length - 1;
  // console.log(a);
  numStr = numStr.slice(0, a);
  numInput.innerText = numStr;
  // console.log(numStr);
  if (numStr === "") {
    nextBtn.style.display = "none";
  }
}

function next1(picture, name, accountNumber) {
  accountImg.src = picture;
  accountName.textContent = name;
  accountNum.textContent = accountNumber;
  transferName.textContent = name;
  article1.style.display = "none";
  article2.style.display = "block";
}

function next2() {
  if (numStr !== "") {
    transferAmount.textContent = numStr;
    article2.style.display = "none";
    article3.style.display = "block";
    if ((article3.style.display = "block")) {
      closeBtn.textContent = "홈으로";
    }
  }
}

// article 2-5
let accountNumStr = "";
function accountNumAdd(n) {
  accountNumStr = accountNumStr + n;
  console.log(numStr);
  accountNumStr.startsWith("0")
    ? (accountNumStr = accountNumStr.slice(1))
    : null;
  accountNumStr.startsWith("0")
    ? (accountNumStr = accountNumStr.slice(1))
    : null;
  accountNumDiv.innerText = accountNumStr;
  console.log(accountNumStr);
  if (accountNumStr !== "") {
    accountNextBtn.style.display = "block";
  }
}

function accountNumDel() {
  let a = accountNumStr.length - 1;
  // console.log(a);
  accountNumStr = accountNumStr.slice(0, a);
  accountNumDiv.innerText = accountNumStr;
  // console.log(accountNumStr);
  if (accountNumStr === "") {
    accountNextBtn.style.display = "none";
  }
}
