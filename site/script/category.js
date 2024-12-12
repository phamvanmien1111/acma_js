const url = "http://localhost:3000/product2";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    // Lọc các sản phẩm có danh mục "bình_hoa"
    const filteredProducts = data.filter((product) => product.danh_muc === "bình_hoa");

    // Hiển thị từng sản phẩm đã lọc
    filteredProducts.forEach((product) => {
      renderProduct(product);
    });
  })
  .catch((error) => console.error("Lỗi khi tải dữ liệu:", error));

const productsContainer = document.querySelector("#products");

const renderProduct = (product) => {
  const output = `
    <div class="text-center flex flex-col items-center gap-4">
      <img src="${product.image}" alt="${product.alt}" class="mx-auto w-48 h-48 object-cover" />
      <p class="font-semibold">${product.name}</p>
      <a href="${product.link}?id=${product.id}" class="text-lg font-semibold text-green-500">
        ${product.title}
      </a>
      <p class="text-red-600 font-bold">${product.price}</p>
      <a href="${product.link}?id=${product.id}" 
         class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300">
        Xem Chi Tiết
      </a>
    </div>
  `;

  productsContainer.innerHTML += output;
};
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    // Lọc các sản phẩm có danh mục "bình_hoa"
    const filteredProducts1 = data.filter((product) => product.danh_muc === "ấm_chén");

    // Hiển thị từng sản phẩm đã lọc
    filteredProducts1.forEach((product) => {
      renderProduct1(product);
    });
  })
  .catch((error) => console.error("Lỗi khi tải dữ liệu:", error));

const productsContainer1 = document.querySelector("#products1");

const renderProduct1 = (product) => {
  const output = `
    <div class="text-center flex flex-col items-center gap-4">
      <img src="${product.image}" alt="${product.alt}" class="mx-auto w-48 h-48 object-cover" />
      <p class="font-semibold">${product.name}</p>
      <a href="${product.link}?id=${product.id}" class="text-lg font-semibold text-green-500">
        ${product.title}
      </a>
      <p class="text-red-600 font-bold">${product.price}</p>
      <a href="${product.link}?id=${product.id}" 
         class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300">
        Xem Chi Tiết
      </a>
    </div>
  `;

  productsContainer1.innerHTML += output;
};
