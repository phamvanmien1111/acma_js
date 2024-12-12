async function fetchSanPham() {
    try {
        const response = await fetch('http://localhost:3000/product2');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const productList = await response.json();

        if (!productList || productList.length === 0) {
            console.error('Danh sách sản phẩm rỗng hoặc không tồn tại.');
            return;
        }

        // lấy 8 sản phẩm 
        const limitedProductList = productList.slice(0, 8);

        // Gọi các hàm để hiển thị sản phẩm
        displayProduct2(limitedProductList);
        displayProducts(limitedProductList); 
    } catch (error) {
        console.error('Lỗi không thể tải JSON:', error.message);
    }
}

function displayProducts(products) {
    const productContainer = document.getElementById("products");
    productContainer.innerHTML = products
        .map(
            (product) => `
            <div class="text-center flex flex-col items-center gap-4">
            <img src="${product.image}" alt="${product.alt}" class="mx-auto w-48 h-48 object-cover" />
            <p class="font-semibold">${product.name}</p>
            <a href="chtietsanpham.html?id=${product.id}" class="text-lg font-semibold text-green-500">
                ${product.title}
            </a>
            <p class="text-red-600 font-bold">${product.price}</p>
            <a href="chtietsanpham.html?id=${product.id}" 
                class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300">
                Xem Chi Tiết
            </a>
        </div>`
        )
        .join("");
}

// Hàm mới để hiển thị product2
function displayProduct2(product2) {
    const product2Container = document.getElementById("product2");
    product2Container.innerHTML = product2
        .map(
            (product) => `
         <div class="text-center flex flex-col items-center">
            <img src="${product.image}" alt="${product.brand}" class="mx-auto mb-4 w-48 h-48 object-cover" />
            <a href="${product.link}" class="text-lg font-semibold text-green-500">
                ${product.name}
            </a>
            <p class="text-red-600 font-bold">${product.price}</p>
            <a href="${product.link}" class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300">Xem Chi Tiết</a>
        </div>`
        )
        .join("");
}

fetchSanPham();

document.querySelector('.btn-thanh-toan').addEventListener('click', function(e) {
    // Kiểm tra xem dữ liệu có hợp lệ trước khi chuyển hướng
    if (!isValid) {
        e.preventDefault(); // Ngăn chặn hành vi chuyển hướng
    }
});