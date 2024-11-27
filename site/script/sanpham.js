async function fetchSanPham() {
    try {
        // Lấy JSON từ product2
        const responseProducts = await fetch('http://localhost:3000/product2');
        if (!responseProducts.ok) throw new Error(`Lỗi khi tải JSON product2`);
        const products = await responseProducts.json();
        displayProducts(products);

        // Lấy JSON từ product3
        const responseProduct2 = await fetch('http://localhost:3000/product3');
        if (!responseProduct2.ok) throw new Error(`Lỗi khi tải JSON product3`);
        const product2 = await responseProduct2.json();
        displayProduct2(product2);
    } catch (error) {
        console.error('Lỗi không thể tải JSON:', error);
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
            <p class="font-semibold">${product.name}</p>
            <a href="${product.link}" class="text-lg font-semibold text-green-500">
                ${product.brand}
            </a>
            <p class="text-red-600 font-bold">${product.price}</p>
            <a href="${product.link}" class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300">Xem Chi Tiết</a>
        </div>`
        )
        .join("");
}

fetchSanPham();
