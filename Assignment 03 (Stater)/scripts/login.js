"use strict";

const usernameLI = document.getElementById("input-username");
const passwordLI = document.getElementById("input-password");
const loginbtn = document.getElementById("btn-submit");

loginbtn.addEventListener("click", function () {
  let validate = validateData();
  if (validate) {
    // Dùng hàm find check thông tin đăng nhập trong userArr
    const checklogin = userArr.find(
      (item) =>
        item.username === usernameLI.value && item.password === passwordLI.value
    );
    // Nếu data đã đươc tạo rồi thì duyệt đăng nhập
    if (checklogin) {
      alert("Đăng nhập thành công!");
      // Lưu data đăng nhập vào currentUser
      setFromStorage("currentUser", checklogin);
      // Truy xuất vào thông tin trang chủ
      window.location.href = "../index.html";
    }
    // Nếu data chưa được đăng ký thì hiển thị thông báo
    else {
      alert("Sai tài khoản hoặc mật khẩu. Vui lòng kiểm tra lại!");
    }
  }
});
/**
 * Hàm: kiểm tra xem người dùng đã nhập đủ Username và Password chưa
 * @returns
 */
function validateData() {
  let isvalidate = true;
  if (!usernameLI.value) {
    alert("Vui lòng nhập tên tài khoản!");
    isvalidate = false;
  }
  if (!passwordLI.value) {
    alert("Vui lòng nhập mật khẩu!");
    isvalidate = false;
  }
  return isvalidate;
}
