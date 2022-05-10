const article1 = document.querySelector(".article1");
const article2 = document.querySelector(".article2");
const article3 = document.querySelector(".article3");
const numInput = document.querySelector(".numInput");
const closeBtn = document.querySelector(".close_btn a");
// const art3accountName = document.querySelector(".article2_account_user_name");
// const art3accountNum = document.querySelector(".article2_account_user_name");

// article2
// let accountImgSrc = document.querySelector(".accountImg").src;
let accountImg = document.querySelector(".accountImg");
// console.log(accountImgSrc);
const accountName = document.querySelector(".article2_account_user_name");
const accountNum = document.querySelector(".article2_account_number");
const nextBtn = document.querySelector(".next");

// article3
const transferName = document.querySelector(".art3_name");
const transferAmount = document.querySelector(".art3_amount");
// const nameValue = document.querySelector("account_user_name").innerHTML;
// console.log(nameValue);

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
  console.log(numStr);
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

function getName() {}
