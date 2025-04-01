let menu = JSON.parse(localStorage.getItem("menu")) || []; let billItems = []; let history = JSON.parse(localStorage.getItem("history")) || [];

document.addEventListener("DOMContentLoaded", loadMenu);

function addMenuItem() { let name = document.getElementById("itemName").value; let price = document.getElementById("itemPrice").value; if (name && price) { menu.push({ name, price }); localStorage.setItem("menu", JSON.stringify(menu)); loadMenu(); } }

function loadMenu() { let menuDiv = document.getElementById("menu"); menuDiv.innerHTML = ""; menu.forEach((item, index) => { let itemDiv = document.createElement("div"); itemDiv.innerHTML = ${item.name} - NPR ${item.price} <button onclick='addToBill(${index})'>Add</button>; menuDiv.appendChild(itemDiv); }); }

function addToBill(index) { let quantity = parseInt(document.getElementById("quantity").value) || 1; let item = menu[index]; billItems.push({ name: item.name, price: item.price, quantity }); updateBill(); }

function updateBill() { let billList = document.getElementById("bill"); let total = 0; billList.innerHTML = ""; billItems.forEach((item, index) => { total += item.price * item.quantity; let li = document.createElement("li"); li.innerHTML = ${item.name} (x${item.quantity}) - NPR ${item.price * item.quantity}; billList.appendChild(li); }); document.getElementById("total").innerText = total; }

function calculateChange() { let received = document.getElementById("amountReceived").value; let total = document.getElementById("total").innerText; let change = received - total; document.getElementById("changeAmount").innerText = change >= 0 ? change : 0; }

function printBill() { let billContent = Arabica Brew Coffee School\n\n; billItems.forEach(item => { billContent += ${item.name} (x${item.quantity}) - NPR ${item.price * item.quantity}\n; }); billContent += Total: NPR ${document.getElementById("total").innerText}\n; billContent += Thank You for Choosing Us! Have a Safe Day!\n\nBest Wishes from Arabica Brew Coffee School, Koteshwor; history.push(billContent); localStorage.setItem("history", JSON.stringify(history)); window.print(); billItems = []; updateBill(); }

function loadHistory() { let historyList = document.getElementById("history"); historyList.innerHTML = ""; history.forEach(bill => { let li = document.createElement("li"); li.innerText = bill; historyList.appendChild(li); }); }

loadHistory();

