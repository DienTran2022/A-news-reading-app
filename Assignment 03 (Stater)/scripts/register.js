"use strict";
const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const passwordcfINput = document.getElementById("input-password-confirm");
const registerbtn = document.getElementById("btn-submit");

registerbtn.addEventListener("click", function () {
  const data = new User(
    firstNameInput.value,
    lastNameInput.value,
    usernameInput.value,
    passwordInput.value
  );
  let validate = validateData(data);
  if (validate) {
    // Lấy dữ liệu vào từ form nhập
    userArr.push(data);
    // Thêm dữ liệu user mới vào Local Storage
    setFromStorage("userArr", userArr);
    // Chuyển trang đến màn hình chính
    window.location.href = "../pages/login.html";
  }
});
/**
 * Hàm: kiểm tra form dữ liệu có hợp lệ
 * @param {*} data: dữ liệu input nhập từ form
 * @returns
 */
function validateData(data) {
  let isvalidate = true;
  // Kiểm tra dữ liệu input nhập từ form
  if (!data.firstName) {
    alert("Không được để trống FirstName!");
    isvalidate = false;
  }
  if (!data.lastName) {
    alert("Không được để trống LastName!");
    isvalidate = false;
  }
  if (!data.username) {
    alert("Không được để trống UserName!");
    isvalidate = false;
  }
  if (data.password.length <= 8) {
    alert("Password phải có nhiều hơn 8 ký tự");
    isvalidate = false;
  }
  if (data.password !== passwordcfINput.value) {
    alert("Password và Confirm Password phải giống nhau");
    isvalidate = false;
  }
  for (let i = 0; i < userArr.length; i++) {
    if (data.username === userArr[i].username) {
      alert("User đã tồn tại!");
      isvalidate = false;
      break;
    }
  }
  return isvalidate;
}
