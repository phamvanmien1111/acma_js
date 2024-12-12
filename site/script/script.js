let lastScrollTop = 0; // Biến để lưu vị trí cuộn trước đó
const nav = document.querySelector('.dieuhuongnav'); // Lấy thanh điều hướng

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop; // Vị trí cuộn hiện tại

    nav.style.top = scrollTop < lastScrollTop ? '0' : '-70px'; // Hiện hoặc ẩn thanh nav
    lastScrollTop = Math.max(scrollTop, 0); // Cập nhật lastScrollTop
});
let currentIndex = 0; 

function duplicateSlides() {
    const productList = document.querySelector('.product-list');
    const productItems = Array.from(document.querySelectorAll('.product-item'));

    // Clone các sản phẩm để tạo hiệu ứng quay vòng
    productItems.forEach(item => {
        const cloneBefore = item.cloneNode(true);
        const cloneAfter = item.cloneNode(true);
        productList.insertBefore(cloneBefore, productItems[0]);
        productList.appendChild(cloneAfter);
    });
}

function showSlide(index) {
    const productList = document.querySelector('.product-list');
    const productItems = document.querySelectorAll('.product-item');
    // Chiều rộng của sản phẩm và khoảng cách giữa chúng
    const productWidth = productItems[0].offsetWidth + 20;
    // Tổng sản phẩm ban đầu (vì đã nhân 3) 
    const totalItems = productItems.length / 3; 

    // Điều chỉnh index để tạo hiệu ứng vòng lặp
    if (index < 0) {
        currentIndex = totalItems - 1;
        productList.style.transition = 'none';
        productList.style.transform = `translateX(-${currentIndex * productWidth}px)`;
        setTimeout(() => {
            productList.style.transition = 'transform 0.5s ease';
            currentIndex--;
            productList.style.transform = `translateX(-${currentIndex * productWidth}px)`;
        }, 20);
    } else if (index >= totalItems) {
        currentIndex = 0;
        productList.style.transition = 'none';
        productList.style.transform = `translateX(0px)`;
        setTimeout(() => {
            productList.style.transition = 'transform 0.5s ease';
            currentIndex++;
            productList.style.transform = `translateX(-${currentIndex * productWidth}px)`;
        }, 20);
    } else {
        currentIndex = index;
        productList.style.transform = `translateX(-${currentIndex * productWidth}px)`;
    }
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

// Thực hiện sao chép các sản phẩm sau khi DOM đã tải
window.addEventListener('DOMContentLoaded', () => {
    duplicateSlides();
    showSlide(currentIndex);
});


/// giỏ hàng
async function fetchSanPham() {
    try {
        // Fetch sản phẩm đầu
        const responseProducts = await fetch('http://localhost:3000/product2');
        if (!responseProducts.ok) throw new Error(`Lỗi khi tải JSON products`);
        const products = await responseProducts.json();
        displayProducts(products);

        // Fetch sản phẩm cuối
        const responseProduct1 = await fetch('http://localhost:3000/product1');
        if (!responseProduct1.ok) throw new Error(`Lỗi khi tải JSON product1`);
        const product1 = await responseProduct1.json();
        displayProduct1(product1);
    } catch (error) {
        console.error('Lỗi không thể tải JSON:', error);
    }
}


// Hiển thị sản phẩm
function displayProducts(products) {
    const productList = document.getElementById('sanpham'); 
    productList.innerHTML = ''; 
    
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item w-[180px] overflow-hidden';
        productItem.innerHTML = `
            <img
                class="sanpham w-full h-24 block hover:scale-150 transition-transform duration-500"
                src="${product.image}"  
                alt="${product.name}"      
            >
            <div class="h-16"></div>
             <a href="chtietsanpham.html?id=${product.id}" class="text-lg font-semibold text-green-500">
                ${product.title}
            </a><br> 
            <span>${product.price}</span>
        `;
        productList.appendChild(productItem);
    });
}

//hiển thi sản phẩm 2
function displayProduct1(product1) {
    const productContainer = document.getElementById('product-containe');
    productContainer.innerHTML = '';

    product1.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'relative max-w-[300px] text-center group hover:max-w-md transition-all duration-300 bg-white border border-gray-300 rounded-lg p-4 shadow-lg';
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.altText}" class="rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-110">
            <div class="flex items-center justify-between mt-4">
                <h3 class="text-lg font-semibold text-gray-800">${product.title}</h3>
                <button class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300">${product.button.text}</button>
            </div>
            <p class="mt-2 text-gray-600 text-sm">${product.description}</p>
        `;
        productContainer.appendChild(productItem);
    });
}

// Gọi hàm fetch sản phẩm
fetchSanPham();

