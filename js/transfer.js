const article1 = document.querySelector(".article1");
const article2 = document.querySelector(".article2");
const article3 = document.querySelector(".article3");
const numInput = document.querySelector(".numInput");
// const nameValue = document.querySelector("account_user_name").innerHTML;
// console.log(nameValue);
console.log(numInput);
//

let numStr = "";
function numAdd(n) {
  numStr = numStr + n;
  console.log(numStr);

  numStr.startsWith("0") ? (numStr = numStr.slice(1)) : null;
  numStr.startsWith("0") ? (numStr = numStr.slice(1)) : null;
  numInput.innerText = numStr;
  console.log(numStr);
}
numInput.innerText = numStr;
console.log(numStr);
function del() {
  let a = numStr.length - 1;
  // console.log(a);
  numStr = numStr.slice(0, a);
  numInput.innerText = numStr;
  console.log(numStr);
}
function next() {
  article2.style.display = "none";
}
