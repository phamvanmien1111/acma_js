// Lấy ID sản phẩm từ URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Lấy thông tin sản phẩm từ file JSON
fetch('./products.json')
    .then(response => response.json())
    .then(products => {
        // Tìm sản phẩm theo ID
        const product = products.find(p => p.id === productId);
        if (product) {
            // Hiển thị thông tin sản phẩm trên trang
            document.querySelector('#product-name').textContent = product.name;
            document.querySelector('#product-price').textContent = product.price.toLocaleString() + ' VND';
            document.querySelector('#product-image').src = product.image;
            document.querySelector('#product-description').textContent = product.description;

            // Gắn sự kiện cho nút "Thêm vào giỏ hàng"
            document.querySelector('#add-to-cart').addEventListener('click', () => {
                addToCart(product.id, product.name, product.price, product.image);
            });
        } else {
            console.error('Sản phẩm không tồn tại');
        }
    })
    .catch(error => console.error('Lỗi khi tải file JSON:', error));

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`Đã thêm ${name} vào giỏ hàng.`);
}

// Hàm cập nhật số lượng trên icon giỏ hàng
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

// Cập nhật số lượng khi tải trang
updateCartCount();
