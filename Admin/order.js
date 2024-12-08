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
               <td class="p-4  w-[190px]"><img src="${product.image}" alt="${product.name}" class="w-30 h-30"></td>
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
}
function showFullContent(content) {
    alert(content); 
  }