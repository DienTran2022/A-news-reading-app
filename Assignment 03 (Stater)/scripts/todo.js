"use strict";

if (currentUser) {
  const todoList = document.getElementById("todo-list");
  const inputTask = document.getElementById("input-task");
  const Addbtn = document.getElementById("btn-add");

  displayTodolist();

  //////////////////////////////////
  /**
   * Hàm: Hiển thị danh sách todo List
   */
  function displayTodolist() {
    let html = "";

    // Từ mảng todoArr lọc ra những todo (task) của user đang đăng nhập
    todoArr
      .filter((todo) => todo.owner === currentUser.username) // Lọc ra các task của user đang đăng nhập
      .forEach(function (todo) {
        // Hàm hiển thị task
        html += `<li class=${todo.isDone ? "checked" : ""} >${
          todo.task
        }<span class="close">×</span></li>`;
      });

    todoList.innerHTML = html;

    // Bắt các sự kiện
    eventToggleTasks();
    eventDeleteTasks();
  }
  ///////////////////////////////////
  // Bắt sự kiện ấn nút Add để thêm tasks
  Addbtn.addEventListener("click", function () {
    // Kiểm tra xem người dùng đã điền task mới chưa
    if (!inputTask.value) {
      alert("Vui lòng nhập công việc cần thêm!");
    } else {
      const todo = new Task(inputTask.value, currentUser.username, false);

      todoArr.push(todo);
      setFromStorage("todoArr", todoArr);
      displayTodolist();
      // Reset dữ liệu từ form nhập
      inputTask.value = "";
    }
  });

  //////////////////////////////////////
  /**
   * Hàm: Bắt các sự kiện Toggle Tasks
   */
  function eventToggleTasks() {
    // Lấy tất cả các phần tử li chứa thông tin các task và bắt sự kiện vào từng li
    document.querySelectorAll("#todo-list li").forEach(function (liEL) {
      liEL.addEventListener("click", function (e) {
        // Nếu người dùng ấn vào task và k vào dấu x
        if (e.target !== liEL.children[0]) {
          // Toggle class checked
          liEL.classList.toggle("checked");
          // Tìm task vừa click vào toggle
          const todo = todoArr.find(
            (todoItem) =>
              todoItem.owner === currentUser.username &&
              todoItem.task === liEL.textContent.slice(0, -1) // Lấy nội dung text chứa task, loại bỏ dấu x
          );
          // Thay đổi thuộc tính isDone của nó
          todo.isDone = liEL.classList.contains("checked") ? true : false;
          setFromStorage("todoArr", todoArr);
        }
      });
    });
  }

  ////////////////////////////////////////
  /**
   * Hàm: Bắt các sự kiện xóa Tasks
   */
  function eventDeleteTasks() {
    // Lấy tất cả các phần tử nút delete bắt sự kiện click vào từng phần tử ấy
    document.querySelectorAll("#todo-list .close").forEach(function (closeEL) {
      closeEL.addEventListener("click", function () {
        // Xác nhận xóa
        const isDelete = confirm("Bạn có chắc chắn muốn xóa ?");

        if (isDelete) {
          // Tìm vị trí task muốn xóa trong mảng todoList
          const index = todoArr.findIndex(
            (item) =>
              item.owner === currentUser.username && // Xác định tên user của task được chọn để xóa
              item.task === closeEL.parentElement.textContent.slice(0, -1) // Xác định tên task và so sánh
          );
          console.log(closeEL.parentElement);
          // Xóa task ra khỏi mảng todoArr
          todoArr.splice(index, 1);
          setFromStorage("todoArr", todoArr);
          displayTodolist();
        }
      });
    });
  }
} else {
  alert("Vui lòng đăng nhập trước khi thao tác!");
  window.location.href = "../index.html";
}
