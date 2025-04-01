let menuItems = [
  { name: 'Chips', price: 50 },
  { name: 'Samosa', price: 30 },
  { name: 'Spring Rolls', price: 40 },
  { name: 'Sandwich', price: 60 }
];

let orderItems = [];
let totalAmount = 0;

function filterMenu() {
  let searchQuery = document.getElementById('searchMenu').value.toLowerCase();
  let filteredMenu = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery)
  );
  displayMenu(filteredMenu);
}

function filterBilling() {
  let searchQuery = document.getElementById('searchBilling').value.toLowerCase();
  let filteredBilling = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery)
  );
  displayBilling(filteredBilling);
}

function displayMenu(menu) {
  let menuList = document.getElementById('menuList');
  menuList.innerHTML = '';
  menu.forEach((item, index) => {
    let li = document.createElement('li');
    li.textContent = `${item.name} - Rs. ${item.price}`;
    li.onclick = () => addToBilling(index);
    menuList.appendChild(li);
  });
}

function displayBilling(items) {
  let billingList = document.getElementById('billingList');
  billingList.innerHTML = '';
  items.forEach((item, index) => {
    let li = document.createElement('li');
    li.textContent = `${item.name} - Rs. ${item.price}`;
    let quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = 0;
    quantityInput.value = 0;
    quantityInput.onchange = (e) => updateQuantity(index, e.target.value);
    li.appendChild(quantityInput);
    billingList.appendChild(li);
  });
}

function addToBilling(index) {
  let item = menuItems[index];
  let existingItem = orderItems.find(order => order.name === item.name);
  if (!existingItem) {
    orderItems.push({ ...item, quantity: 1 });
  } else {
    existingItem.quantity++;
  }
  updateTotal();
}

function updateQuantity(index, value) {
  let item = orderItems[index];
  item.quantity = parseInt(value);
  updateTotal();
}

function updateTotal() {
  totalAmount = 0;
  orderItems.forEach(item => {
    totalAmount += item.price * item.quantity;
  });
  document.getElementById('totalAmount').textContent = totalAmount;
}

function calculateBill() {
  let moneyReceived = document.getElementById('moneyReceived').value;
  let change = moneyReceived - totalAmount;
  document.getElementById('change').textContent = `Change: Rs. ${change}`;
}

function printBill() {
  let billContent = `
    <h1>Arabica Brew Coffee School</h1>
    <p><strong>Snack Billing Summary</strong></p>
    <p>Total Bill: Rs. ${totalAmount}</p>
    <p>Money Received: Rs. ${document.getElementById('moneyReceived').value}</p>
    <p>Change: Rs. ${document.getElementById('change').textContent.replace('Change: Rs. ', '')}</p>
    <hr />
    <p>Thank you for choosing us. Have a great day!</p>
    <p><i>Best wishes from Arabica Brew Coffee School, Koteswor.</i></p>
  `;

  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write(billContent);
  printWindow.document.close();
  printWindow.print();
}

// Initial load
displayMenu(menuItems);
displayBilling(menuItems);
