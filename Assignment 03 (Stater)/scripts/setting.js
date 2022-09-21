"use strict";
if (currentUser) {
  const inputPageSize = document.getElementById("input-page-size");
  const inputCategory = document.getElementById("input-category");
  const Savebtn = document.getElementById("btn-submit");

  Savebtn.addEventListener("click", function () {
    const data = {
      pageSize: inputPageSize.value,
      category: inputCategory.value,
    };
    let validate = validateData(data);
    if (validate) {
      // Cập nhập lại curentUser
      currentUser.pageSize = Number.parseInt(data.pageSize);
      currentUser.category = data.category;
      setFromStorage("currentUser", currentUser);

      // Cập nhập lại mảng userArr
      const index = userArr.findIndex(
        (userItem) => userItem.username === currentUser.username
      );
      userArr[index] = currentUser;
      setFromStorage("userArr", userArr);

      // reset lại form input và hiển thị thông báo cài đặt thành công
      alert("Cài đặt thành công");
      inputPageSize.value = "";
      inputCategory.value = "General";
    }
  });

  /////////////////////////////////////
  /**
   * Hàm: kiểm tra dữ liệu nhập vào của người dùng
   * @param {*} data
   * @returns
   */
  function validateData(data) {
    let isvalidate = true;

    if (data.pageSize <= 0 || !data.pageSize) {
      alert("Nhập lại số trang hiển thị!");
      isvalidate = false;
    }
    if (data.category === "General") {
      alert(" Vui lòng chọn category!");
      isvalidate = false;
    }
    return isvalidate;
  }
} else {
  alert("Vui lòng đăng nhập để sử truy cập ứng dụng!");
  window.location.href = "../index.html";
}
