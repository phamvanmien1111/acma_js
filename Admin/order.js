const url = "http://localhost:3000/orders";

fetch(url)
    .then(res => res.json())
    .then((data) => {
        data.forEach((order) => {
            renderProduct(order);
        });
    });

const orderTableBody = document.querySelector('#order'); 

const renderProduct = (order) => {
    // Kiểm tra nếu order.customer tồn tại
    if (order.customer) {
      const customerInfo = `
        <tr class="bg-gray-100">
          <td colspan="7" class="p-4">
            <strong>Khách hàng:</strong> ${order.customer.name || "Không rõ"}<br>
            <strong>Số điện thoại:</strong> ${order.customer.phone || "Không rõ"}<br>
            <strong>Địa chỉ:</strong> ${order.customer.address || "Không rõ"}, ${order.customer.city || "Không rõ"}
          </td>
        </tr>
      `;
      orderTableBody.insertAdjacentHTML("beforeend", customerInfo);
    } else {
      // Trường hợp thiếu thông tin khách hàng
      const customerInfo = `
        <tr class="bg-red-100">
          <td colspan="7" class="p-4 text-red-500">
            <strong>Thông tin khách hàng không tồn tại!</strong>
          </td>
        </tr>
      `;
      orderTableBody.insertAdjacentHTML("beforeend", customerInfo);
    }
  
    // Hiển thị các sản phẩm trong đơn hàng
    if (order.products && Array.isArray(order.products)) {
      order.products.forEach((product) => {
        const output = `
          <tr>
            <td
              class="p-4 truncate overflow-hidden whitespace-nowrap"
              style="width: 100px; max-width: 100px; cursor: pointer;"
              onclick="showFullContent('${product.name}')"
            >
              ${product.name}
            </td>
            <td class="p-4 w-[190px]">
              <img src="${product.image}" alt="${product.name}" class="w-30 h-30">
            </td>
            <td class="p-4">${product.price.toLocaleString()} VNĐ</td>
            <td class="p-4">${product.quantity}</td>
            <td class="p-4">${(product.price * product.quantity).toLocaleString()} VNĐ</td>
            <td class="p-4">${new Date(order.orderDate).toLocaleString()}</td>
            <td class="p-4">
              <button class="bg-red-500 text-white px-4 py-2 rounded" onclick="deleteOrder('${order.id}')">Xóa</button>
            </td>
          </tr>
        `;
        orderTableBody.insertAdjacentHTML("beforeend", output);
      });
    } else {
      // Trường hợp không có sản phẩm
      const noProductsInfo = `
        <tr>
          <td colspan="7" class="p-4 text-gray-500 text-center">
            Không có sản phẩm trong đơn hàng này.
          </td>
        </tr>
      `;
      orderTableBody.insertAdjacentHTML("beforeend", noProductsInfo);
    }
  };
  
function showFullContent(content) {
    alert(content); 
  }
  function deleteOrder(orderId) {
    alert("bạn muốn xóa sản phẩm này không");
    fetch(`${url}/${orderId}`, { method: 'DELETE' })
     .then(() => {
        alert('Đã xóa đơn hàng');
        // location.reload();
      })
     .catch(error => console.error('Error:', error));
  }