"use strict";
/**
 * Hàm: Lấy dữ liệu từ bộ nhớ Local Storage
 * @param {*} key : giá trị cần lấy
 * @returns
 */
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
/**
 * Hàm: Lưu biến với các giá trị vào Local Storage
 * @param {*} key : biến cần lưu
 * @param {*} value : giá trị lưu
 */
function setFromStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
/**
 * Hàm: chuyển từ JS Object sang Class Instance
 * @param {*} userData: dữ liệu là user
 * @returns
 */
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password,
    /// Thêm 2 thuộc tính này để làm tính năng số 9 và tính năng số 6
    userData.pageSize,
    userData.category
  );

  return user;
}
/**
 * Hàm: chuyển từ JS Object sang Class Instance
 * @param {*} taskData : dữ liệu là liên quan đến các task của User
 * @returns
 */
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);

  return task;
}
const user = getFromStorage("userArr") ? getFromStorage("userArr") : [];
// Chuyển đổi về dạng class Instance
const userArr = user.map((user) => parseUser(user));

let currentUser = getFromStorage("currentUser")
  ? getFromStorage("currentUser")
  : null;

// Lấy dữ liệu todoArr từ LocalStorage
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];
// Chuyển đổi obj về dạng class Instance
const todoArr = todos.map((todo) => parseTask(todo));
