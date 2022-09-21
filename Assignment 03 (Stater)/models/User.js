"use strict";
class User {
  constructor(
    firstName,
    lastName,
    username,
    password,
    // Tạo sẵn 2 giá trị để test
    pageSize = 5,
    category = "business"
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    // 2 thuộc tính này thêm vào để làm chức năng số 6 và số 9
    this.pageSize = pageSize;
    this.category = category;
  }
}
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
