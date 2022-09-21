"use strict";
if (currentUser) {
  const newsContainer = document.getElementById("news-container");
  const Prevbtn = document.getElementById("btn-prev");
  const Nextbtn = document.getElementById("btn-next");
  const pageNum = document.getElementById("page-num");

  // Biến này để tính số News tối đa trả về từ API
  let totalResults = 0;

  GetDataNews("us", 1);
  /**
   * Hàm: hiển thị thông tin các bài viết
   * @param {*} country : mã code của đất nước muốn lấy tin tức
   * @param {*} page : thứ tự lần trả về dữ liệu
   */
  async function GetDataNews(country, page) {
    try {
      // Lấy dữ liệu từ API
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=ebf9ded65e334c9a9ec1accb02093f4a`
      );
      const data = await res.json();

      // Check lỗi quá 100 lần request / ngày (Lỗi này khi ta kết nối tới API quá nhiều lần)
      if (data.status === "error" && data.code === "rateLimited") {
        throw new Error(data.message);
      }

      // Check lỗi chạy tập tin khi không qua sever => chạy trên sever hệ thống (mở trực tiếp file html)
      if (data.status === "error" && data.code === "corsNotAllowed") {
        throw new Error(data.message);
      }
      displayNews(data);
    } catch (err) {
      // Thông báo lỗi
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
    GetDataNews("us", --pageNum.textContent);
  });
  // Bắt sự kiện click vào nút Next
  Nextbtn.addEventListener("click", function () {
    GetDataNews("us", ++pageNum.textContent);
  });

  ///////////////////////////////////////////////
  /**
   * Hàm: Hiển thị list News lên trang
   * @param {*} data
   */
  function displayNews(data) {
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
    // Đổ dữ liệu vào id: news-container
    newsContainer.innerHTML = html;
  }
} else {
  alert("Vui lòng đăng nhập để truy cập ứng dụng!");
  window.location.href = "../index.html";
}
