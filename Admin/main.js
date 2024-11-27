const url = "http://localhost:3000/product3";

fetch(url)
    .then((res) => res.json())
    .then((data) => {
        data.forEach((product) => {
            renderProduct(product); // Đổi tên hàm cho đúng
        });
    })
    .catch((error) => console.error("Error fetching data:", error));

const table = document.querySelector("#table"); // Đúng tên biến

// Hàm để render một sản phẩm
const renderProduct = (product) => {
    const output = `
    <tr class="border-b" data-id='${product.id}'>
      <td class="p-4">${product.name}</td>
      <td class="p-4">
        <img src="${product.image}" alt="" class="w-16 h-16 object-cover">
      </td>
      <td class="p-4" >${product.category}</td>
      <td class="p-4">${product.price} VNĐ</td>
      <td class="p-4">
        <button class="btn-Del bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Xóa
        </button>
        <button class="btn-Edit bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Sửa
        </button>
      </td>
    </tr>
  `;
    table.insertAdjacentHTML("beforeend", output);
    //xóa sản phẩm
    const btnDel = document.querySelector(`[data-id='${product.id}'] .btn-Del`);
    btnDel.addEventListener('click', (e) => {
       fetch(`${url}/${product.id}`,{
        method: 'DELETE'
       })
       .then(res =>res.json)
       .then(() =>localtion.reload());
    })
};
