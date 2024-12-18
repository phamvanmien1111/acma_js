const url = "http://localhost:3000/product3";

const btnAdd = document.querySelector("#btn-add");
const modalAdd = document.querySelector("#modal-add");
const btnCancel = document.querySelector("#modal-add-cancel");
const addModalForm = document.querySelector('.form-product');
const editModalForm = document.querySelector('#modal-edit');
///
let id='';

fetch(url)
    .then((res) => res.json())
    .then((data) => {
        data.forEach((product) => {
            renderProduct(product); 
        });
    })
    .catch((error) => console.error("Error fetching data:", error));

const table = document.querySelector("#table"); 

// Hàm để render một sản phẩm lấy trên fetch
const renderProduct = (product) => {
    const output = `
    <tr class="border-b" data-id='${product.id}'>
      <td class="p-4">${product.name}</td>
      <td class="p-4">
        <img src="${product.image}" alt="" class="w-16 h-16 object-cover">
      </td>
      <td class="p-4 " >${product.chi_tiet}</td>
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
    });
    //sửa sản phẩm 
const editModalForm = document.getElementById('edit-form');
const btnEdit = document.querySelector(`[data-id='${product.id}'] .btn-Edit`);

btnEdit.addEventListener('click', (e) => {
  e.preventDefault();
  id = product.id;
  // Mở modal chỉnh sửa vì là hidden-ẩn
  document.getElementById("modal-edit").classList.remove("hidden");

  // Điền dữ liệu vào các trường trong form
  const productNameInput = document.getElementById("edit-product-name");
  const productDetailInput = document.getElementById("edit-product-detail");
  const productPriceInput = document.getElementById("edit-product-price");

  // Cập nhật giá trị của các trường trong form
  productNameInput.value = product.name;
  productDetailInput.value = product.chi_tiet;
  productPriceInput.value = product.price;

  // Hiển thị hình ảnh trong modal (nếu có)
  const imgElement = document.querySelector("#modal-edit img");
  imgElement.src = product.image;

  console.log('Chỉnh sửa sản phẩm');
});
//////////////////////
editModalForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Lấy các giá trị từ form
  const name = document.getElementById("edit-product-name").value;
  const chiTiet = document.getElementById("edit-product-detail").value;
  const price = document.getElementById("edit-product-price").value;
  const imageInput = document.getElementById("edit-product-image");

  let imageBase64 = ""; // Khởi tạo biến chứa base64 của ảnh

  // Nếu có ảnh được chọn
  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onloadend = function () {
      imageBase64 = reader.result; // Chuyển ảnh thành base64
      // Gửi request khi có ảnh base64
      sendRequest(imageBase64);
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    // Nếu không có ảnh, gửi request mà không có ảnh
    sendRequest();
  }

  // Hàm gửi request
  function sendRequest(imageBase64 = "") {
    fetch(`${url}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        chi_tiet: chiTiet,
        price: price,
        image: imageBase64, // Gửi ảnh base64 nếu có
      })
    })
    .then(res => res.json())
    .then(() => location.reload(),
    addModalForm.reset()
  )  // Reload trang khi thành công
    
    .catch(error => console.error('Error:', error));  // Xử lý lỗi
  }
});
    
};

// Mở modal khi nhấn "Thêm Sản Phẩm"
btnAdd.addEventListener("click", () => {
  modalAdd.classList.remove("hidden");
});

// Đóng modal khi nhấn "Hủy"
btnCancel.addEventListener("click", () => {
  modalAdd.classList.add("hidden");
});
/////////////////////////////////////
const btnEditCancel = document.querySelector("#modal-edit-cancel"); // Nút hủy trong modal edit
const modalEdit = document.querySelector("#modal-edit"); // Modal edit

btnEditCancel.addEventListener("click", () => {
  modalEdit.classList.add("hidden"); // Ẩn modal khi nhấn hủy
});

//////////////////////////
addModalForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const fullname = addModalForm.fullname.value;
  const chiTiet = addModalForm.chi_tiet.value;
  const price = addModalForm.price.value;
  const imageFile = document.getElementById("add-product-image").files[0]; // Lấy file ảnh

  // Chuyển file ảnh thành Base64
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  try {
    const imageBase64 = await getBase64(imageFile); // Chuyển file ảnh sang Base64
    const newProduct = {
      name: fullname,
      image: imageBase64, // Lưu ảnh dưới dạng Base64
      chi_tiet: chiTiet,
      price: price
    };

    // Gửi sản phẩm qua API (nếu có) hoặc xử lý trực tiếp
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })
    .then(res => res.json())
    .then(data => {
      renderProduct(newProduct); // Thêm sản phẩm vào bảng
      modalAdd.classList.add("hidden");
      addModalForm.reset();
    })
    .catch(error => console.error("Lỗi thêm sản phẩm:", error));
  } catch (error) {
    console.error("Lỗi khi chuyển đổi ảnh:", error);
  }
});
//////////////////////////////////////////////////////////////////
