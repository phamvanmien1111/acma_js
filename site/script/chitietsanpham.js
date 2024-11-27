// Khởi tạo giỏ hàng
let cart = [];

// Hàm cập nhật số lượng trên icon giỏ hàng
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}
// xử lý giá
function parsePrice(priceString) {
    // Loại bỏ dấu phẩy, ký tự không cần thiết và chuyển thành số
    return parseInt(priceString.replace(/[,VNĐ\s]/g, ''), 10);
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(id, name, price, image) {
    const parsedPrice = parsePrice(price); // Chuyển giá thành số

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price: parsedPrice, image, quantity: 1 });
    }

    updateCartCount();
    alert(`Đã thêm ${name} vào giỏ hàng.`);
}


// Hàm hiển thị giỏ hàng
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="6" class="text-center">Giỏ hàng trống</td></tr>';
        return;
    }

    cart.forEach((item, index) => {
        const totalPrice = item.price * item.quantity;
        cartItemsContainer.innerHTML += `
            <tr class="border-b border-gray-200">
                <td class="p-4">${item.name}</td>
                <td class="p-4"><img src="${item.image}" alt="" class="w-16"></td>
                <td class="p-4">
                    <input 
    type="number" 
    value="${item.quantity}" 
    min="1" 
    class="w-16 text-center border border-gray-300 rounded-md"
    onchange="updateQuantity(${item.id}, this.value)"
>
                </td>
                <td class="p-4 text-gray-700">${item.price.toLocaleString()} VND</td>
                <td class="p-4 text-gray-700">${totalPrice.toLocaleString()} VND</td>
                <td class="p-4 text-center">
                    <button class="text-red-500 hover:text-red-700" onclick="removeFromCart(${item.id})">
                        Xóa
                    </button>
                </td>
            </tr>
        `;
    });
}

// Hàm cập nhật số lượng sản phẩm
function updateQuantity(id, quantity) {
    quantity = parseInt(quantity, 10);
    if(isNaN(quantity) || quantity <1){
        quantity = 1;
    }
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = quantity;
    }
    renderCart();
    updateCartCount();
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
    updateCartCount();
}

// Xử lý sự kiện khi ấn nút "Thêm vào giỏ hàng"
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const button = event.target;
        const id = button.getAttribute('data-id');
        const name = button.getAttribute('data-name');
        const price = button.getAttribute('data-price'); // Giá dạng chuỗi
        const image = button.getAttribute('data-image');

        addToCart(id, name, price, image); // Giá sẽ được xử lý bên trong addToCart
    }
});

// Xử lý sự kiện hiển thị giỏ hàng khi click vào icon
document.getElementById('cart-icon').addEventListener('click', () => {
    document.getElementById('cart-modal').classList.remove('hidden');
    renderCart();
});

// Đóng giỏ hàng
document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('cart-modal').classList.add('hidden');
});
/////////////////////////////////////////////////


////////////////////////////////////////////////////////////////
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
async function fetchSanPhamDetails(productId) {
    try {
        // Lấy JSON từ product2
        const responseProducts = await fetch('http://localhost:3000/product2');
        if (!responseProducts.ok) throw new Error(`Lỗi khi tải JSON product2`);
        const products = await responseProducts.json();

        // Tìm sản phẩm theo ID
        const product = products.find(p => p.id == productId);
        if (product) {
            displayProductDetails(product);
        } else {
            console.log('Không tìm thấy sản phẩm');
        }
    } catch (error) {
        console.error('Lỗi không thể tải JSON:', error);
    }
}

function displayProductDetails(product) {
    const productContainer = document.getElementById("product-details");
    
    if (!product) {
        productContainer.innerHTML = "<p>Sản phẩm không tìm thấy.</p>";
        return;
    }

    productContainer.innerHTML = `
        <div class="flex flex-col md:flex-row gap-14">
            <div class="md:w-1/3">
         <img src="${product.image}" alt="${product.alt}" class="mx-auto w-82 h-82 object-cover rounded-md" />
            </div>
            <div class="md:w-1/2 space-y-4">
                <h1 class="text-2xl font-bold">${product.name}</h1>
                <p class="text-xl font-semibold text-red-600">${product.price}</p>
                <div class="space-y-1">
                <p class="text-sm text-gray-600">Xuất Xứ: Sơn La/ Lâm Đồng</p>
                <p class="text-sm text-gray-600">Vật Liệu: 100% Đất sét</p>
                <p class="text-sm text-gray-600">Độ ẩm: 5%</p>
            </div>
            <div class="flex gap-2 items-center mt-4">
                <span class="font-semibold">Chọn kích thước</span>
                <button class="px-4 py-2 border rounded-lg hover:bg-gray-200">Lớn</button>
                <button class="px-4 py-2 border rounded-lg hover:bg-gray-200">Vừa</button>
                <button class="px-4 py-2 border rounded-lg hover:bg-gray-200">Nhỏ</button>
            </div>
                <div class="flex items-center gap-4 mt-6">
                  <button id="add-to-cart-btn-${product.id}" 
                        class="bg-blue-600 text-white px-4 py-2 rounded-lg add-to-cart" 
                        data-id="${product.id}" 
                    data-name="${product.name}" 
                    data-price="${product.price}" 
                    data-image="${product.image}">
                    Thêm vào giỏ hàng
                </button>
                </div>
                 <div>
            <p class="text-gray-600"><strong>Mô Tả: <br> <br></strong>${product.description}</p>
            <img src="${product.image_mota}">
            </div>
            </div>
        </div>
        
        
    `;
}


// Gọi hàm khi trang đã tải xong
window.onload = function() {
    const productId = new URLSearchParams(window.location.search).get('id');
    if (productId) {
        fetchSanPhamDetails(productId);
    } else {
        console.log('Không có ID sản phẩm');
    }
}

