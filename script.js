let menuItems = [
  { name: 'Chips', price: 70 },
  { name: 'Samosa', price: 30 },
  { name: 'Spring Rolls', price: 40 },
  { name: 'Sandwich', price: 60 }
];

let orderItems = []; // This will store the items added to the cart
let totalAmount = 0;

// Filter menu items
function filterMenu() {
  let searchQuery = document.getElementById('searchMenu').value.toLowerCase();
  let filteredMenu = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery)
  );
  displayMenu(filteredMenu);
}

// Filter billing items
function filterBilling() {
  let searchQuery = document.getElementById('searchBilling').value.toLowerCase();
  let filteredBilling = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery)
  );
  displayBilling(filteredBilling);
}

// Display the menu list
function displayMenu(menu) {
  let menuList = document.getElementById('menuList');
  menuList.innerHTML = ''; // Clear the current list
  menu.forEach((item, index) => {
    let li = document.createElement('li');
    li.textContent = `${item.name} - Rs. ${item.price}`;
    li.onclick = () => addToBilling(index); // Add to billing when clicked
    menuList.appendChild(li);
  });
}

// Display the items added to the cart
function displayBilling(items) {
  let billingList = document.getElementById('billingList');
  billingList.innerHTML = ''; // Clear the current cart
  items.forEach((item, index) => {
    let li = document.createElement('li');
    li.textContent = `${item.name} - Rs. ${item.price}`;

    // Add a quantity input to update the quantity of the item
    let quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = 0;
    quantityInput.value = getItemQuantity(item.name); // Set the initial quantity of the item
    quantityInput.onchange = (e) => updateQuantity(item.name, e.target.value); // Update quantity when changed

    li.appendChild(quantityInput);
    billingList.appendChild(li);
  });
}

// Add items to the cart when clicked
function addToBilling(index) {
  let item = menuItems[index];
  let existingItem = orderItems.find(order => order.name === item.name);
  
  if (!existingItem) {
    orderItems.push({ ...item, quantity: 1 });
  } else {
    existingItem.quantity++;
  }

  displayBilling(menuItems); // Re-render the cart
  updateTotal(); // Update the total amount
}

// Get the quantity of a particular item in the cart
function getItemQuantity(name) {
  let item = orderItems.find(order => order.name === name);
  return item ? item.quantity : 0;
}

// Update the quantity of an item in the cart
function updateQuantity(name, value) {
  let item = orderItems.find(order => order.name === name);
  if (item) {
    item.quantity = parseInt(value);
  }

  updateTotal(); // Recalculate the total after updating quantity
}

// Update the total amount
function updateTotal() {
  totalAmount = 0;
  orderItems.forEach(item => {
    totalAmount += item.price * item.quantity;
  });
  document.getElementById('totalAmount').textContent = totalAmount;
}

// Calculate the bill when clicked
function calculateBill() {
  let moneyReceived = document.getElementById('moneyReceived').value;
  let change = moneyReceived - totalAmount;
  document.getElementById('change').textContent = `Change: Rs. ${change}`;
}

// Print the bill
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

// Initial load of the menu and billing sections
displayMenu(menuItems);
displayBilling(menuItems);
