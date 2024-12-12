async function fetchData() {
    const ordersResponse = await fetch('http://localhost:3000/orders');
    const productsResponse = await fetch('http://localhost:3000/product2');
  
    const orders = await ordersResponse.json();
    const products = await productsResponse.json();
  
    return { orders, products };
  }
  
  // Tính tổng doanh thu từ các đơn hàng
  function calculateTotalRevenue(orders) {
    return orders.reduce((total, order) => total + order.totalPrice, 0);
  }
  
  // Lấy sản phẩm bán chạy nhất
  function getBestSellingProduct(orders) {
    const productSales = {};
  
    orders.forEach(order => {
      order.products.forEach(product => {
        productSales[product.name] = (productSales[product.name] || 0) + product.quantity;
      });
    });
  
    return Object.entries(productSales).sort((a, b) => b[1] - a[1])[0];
  }
  
  // Cập nhật số lượng tồn kho sản phẩm
  function updateStock(products, orders) {
    const stock = products.reduce((acc, product) => {
      acc[product.name] = 100; // Giả định mỗi sản phẩm ban đầu có 100 đơn vị tồn kho
      return acc;
    }, {});
  
    orders.forEach(order => {
      order.products.forEach(product => {
        if (stock[product.name] !== undefined) {
          stock[product.name] -= product.quantity;
        }
      });
    });
  
    return stock;
  }
  
  (async () => {
    const { orders, products } = await fetchData();
  
    // Tính toán tổng doanh thu
    const totalRevenue = calculateTotalRevenue(orders);
    document.getElementById('revenue').innerText = `Tổng doanh thu: ${totalRevenue.toLocaleString()} VNĐ`;
  
    // Tìm sản phẩm bán chạy nhất
    const bestSellingProduct = getBestSellingProduct(orders);
    document.getElementById('best-product').innerText =
      `Sản phẩm bán chạy nhất: ${bestSellingProduct[0]} với số lượng ${bestSellingProduct[1]}`;
  
    // Cập nhật tồn kho
    const updatedStock = updateStock(products, orders);
    const stockContainer = document.getElementById('stock');
    Object.entries(updatedStock).forEach(([productName, stock]) => {
      const stockElement = document.createElement('p');
      stockElement.innerText = `Sản phẩm ${productName}: còn lại ${stock} đơn vị`;
      stockContainer.appendChild(stockElement);
    });
  })();
  function drawRevenueChart(orders) {
    const ctx = document.getElementById('revenueChart').getContext('2d');
  
    // Lấy dữ liệu doanh thu theo ngày
    const revenueData = orders.reduce((acc, order) => {
      const date = new Date(order.orderDate).toLocaleDateString();
      acc[date] = (acc[date] || 0) + order.totalPrice;
      return acc;
    }, {});
  
    const labels = Object.keys(revenueData); // Các ngày
    const data = Object.values(revenueData); // Doanh thu tương ứng
  
    new Chart(ctx, {
      type: 'line', // Kiểu biểu đồ (line: đường)
      data: {
        labels: labels,
        datasets: [{
          label: 'Doanh thu theo ngày',
          data: data,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  

  function drawBestSellingChart(orders) {
    const ctx = document.getElementById('bestSellingChart').getContext('2d');
  
    // Lấy dữ liệu số lượng bán của từng sản phẩm
    const productSales = {};
  
    orders.forEach(order => {
      order.products.forEach(product => {
        productSales[product.name] = (productSales[product.name] || 0) + product.quantity;
      });
    });
  
    const labels = Object.keys(productSales); // Tên sản phẩm
    const data = Object.values(productSales); // Số lượng bán tương ứng
  
    new Chart(ctx, {
      type: 'bar', // Kiểu biểu đồ (bar: cột)
      data: {
        labels: labels,
        datasets: [{
          label: 'Số lượng bán',
          data: data,
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  

  (async () => {
    const { orders } = await fetchData();
  
    // Vẽ biểu đồ
    drawRevenueChart(orders);
    drawBestSellingChart(orders);
  })();
  