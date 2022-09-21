"use strict";

if (currentUser) {
  const navPageNum = document.getElementById("nav-page-num");
  const inputQuery = document.getElementById("input-query");
  const Searchbtn = document.getElementById("btn-submit");

  const newsContainer = document.getElementById("news-container");
  const Prevbtn = document.getElementById("btn-prev");
  const Nextbtn = document.getElementById("btn-next");
  const pageNum = document.getElementById("page-num");

  // Biến này để tính số New trả về từ API
  let totalResults = 0;
  // Gọi biển keywords và chưa hiển thị pageNum
  let keywords = "";
  navPageNum.style.display = "none";

  // Bắt sự kiện vào nút Search
  Searchbtn.addEventListener("click", function () {
    pageNum.textContent = "1";
    newsContainer.innerHTML = "";
    // Kiểm tra xem người dùng đã nhập keywords chưa?
    if (!inputQuery.value) {
      alert("Vui lòng nhập keywwords!");
      navPageNum.style.display = "none";
    } else {
      keywords = inputQuery.value;
      getNewsbykeywords(keywords, 1);
    }
  });
  /////////////////////////////////////////////////////////////////
  /**
   * Hàm: lấy dữ liệu tin tức được tìm kiếm từ từ khóa nhập vào
   * @param {*} keywords : từ khóa nhập vào
   * @param {*} page : thứ tự trả về dữ liệu
   */
  async function getNewsbykeywords(keywords, page) {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${keywords}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=ebf9ded65e334c9a9ec1accb02093f4a`
      );

      const data = await res.json();

      // Thông báo nếu như không có bài viết nào
      if (data.totalResults == 0) {
        // ẩn có nút chuyển trang
        navPageNum.style.display = "none";
        throw new Error(
          "Không có bài viết nào được tìm thấy với từ khóa vừa nhập!"
        );
      }
      // Hiển thị các nút chuyển trang nếu dữ liệu trả về thành công
      navPageNum.style.display = "block";
      displayNewslist(data);
    } catch (err) {
      // Bắt lỗi và thông báo cho người dùng
      alert("Error" + err.message);
    }
  }

  ///////////////////////////////////////////////
  /**
   * Hàm: Kiểm tra điều kiện ẩn và ẩn nút Previous
   */
  function CheckPrevbtn() {
    // Nếu PageNum là 1 thì ẩn đi
    if (pageNum.textContent == 1) {
      Prevbtn.style.display = "none";
    } else {
      Prevbtn.style.display = "block";
    }
  }

  ////////////////////////////////////////////////
  /**
   * Hàm: Kiểm tra điều kiện ẩn và ẩn nút Next
   */
  function CheckNextbtn() {
    // Nếu PageNum bằng với số trang làm tròn (tổng số tin tức tối đa API trả về chia cho số tin trên 1 trang)
    if (pageNum.textContent == Math.ceil(totalResults / currentUser.pageSize)) {
      Nextbtn.style.display = "none";
    } else {
      Nextbtn.style.display = "block";
    }
  }

  ///////////////////////////////////////////////
  // Bắt sự kiện vào nút Previous
  Prevbtn.addEventListener("click", function () {
    getNewsbykeywords(keywords, --pageNum.textContent);
  });
  // Bắt sự kiện click vào nút Next
  Nextbtn.addEventListener("click", function () {
    getNewsbykeywords(keywords, ++pageNum.textContent);
  });

  ///////////////////////////////////////////////
  /**
   * Hàm: Hiển thị list News lên trang
   * @param {*} data
   */
  function displayNewslist(data) {
    // Lấy giá trị cho biến totalResults
    totalResults = data.totalResults;
    // Kiểm tra xem có ấn các nút Next, Previous hay chưa
    CheckNextbtn();
    CheckPrevbtn();

    let html = "";
    // Tạo các code html để hiển thị News
    // no_image_available.jpg để thay thế cho 1 số ảnh có giá trị đường dẫn là null => Không hiển thị được
    data.articles.forEach(function (articles) {
      html += `
        <div class="card flex-row flex-wrap">
					<div class="card mb-3" style="">
						<div class="row no-gutters">
							<div class="col-md-4">
                            <img src=${
                              articles.urlToImage
                                ? articles.urlToImage
                                : "no_img_available.png"
                            } class="card-img"
                            alt ="img">
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h5 class="card-title">${articles.title}</h5>
									<p class="card-text">${articles.description}</p>
									<a href=${articles.url} target="_blank" class="btn btn-primary">View</a>
								</div>
							</div>
						</div>
					</div>
		</div>`;
    });
    // Đổ dữ liệu vào id news-container
    newsContainer.innerHTML = html;
  }
} else {
  alert("Vui lòng đăng nhập để truy cập ứng dụng!");
  window.location.href = "../index.html";
}
