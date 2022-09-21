"use strict";
const loginmodal = document.getElementById("login-modal");
const maincontent = document.getElementById("main-content");
const logoutbtn = document.getElementById("btn-logout");
const welcometext = document.getElementById("welcome-message");

displayhome();
/**
 * Hàm hiển thị nội dung trên trang home tùy theo trường hợp
 */
function displayhome() {
  if (currentUser) {
    loginmodal.style.display = "none";
    maincontent.style.display = "block";
    // Thông báo chào mừng người đăng nhập
    welcometext.textContent = `Welcome ${currentUser.firstName}`;
  } else {
    loginmodal.style.display = "block";
    maincontent.style.display = "none";
  }
}

// Bắt sự kiện vào nút logOut
logoutbtn.addEventListener("click", function () {
  // Xóa User hiện tại trong LocalStorage
  localStorage.removeItem("currentUser");
  // Đưa người dùng trở lại trang Login
  window.location.reload("../index.html");
});
