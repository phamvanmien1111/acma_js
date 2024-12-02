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
    const productContainer = document.querySelector("#product-details");
    
    if (!product) {
        productContainer.innerHTML = "<p>Sản phẩm không tìm thấy.</p>";
        return;
    }

    productContainer.innerHTML = `
        <div class="flex flex-col md:flex-row gap-14">
            <div class="md:w-1/3">
         <img src="${product.image}" alt="${product.alt}" class="mx-auto w-82 h-82 object-cover rounded-md" />
            </div>
        </div>
        
        
    `;
}

