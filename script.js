const menuItems = [ { name: "Espresso", price: 150 }, { name: "Cappuccino", price: 180 }, { name: "Latte", price: 200 }, { name: "Mocha", price: 220 }, { name: "Americano", price: 160 } ];

const menuDiv = document.getElementById("menu"); const billDiv = document.getElementById("bill"); const totalSpan = document.getElementById("total"); let billItems = [];

function displayMenu() { menuDiv.innerHTML = ""; menuItems.forEach((item, index) => { const button = document.createElement("button"); button.textContent = ${item.name} - NPR ${item.price}; button.onclick = () => addToBill(index); menuDiv.appendChild(button); }); }

displayMenu();

function addToBill(index) { billItems.push(menuItems[index]); updateBill(); }

function updateBill() { billDiv.innerHTML = ""; let total = 0; billItems.forEach(item => { const itemDiv = document.createElement("div"); itemDiv.textContent = ${item.name} - NPR ${item.price}; billDiv.appendChild(itemDiv); total += item.price; }); totalSpan.textContent = total; }

function printBill() { let billContent = "Arabica Brew Coffee School\n\n"; billItems.forEach(item => { billContent += ${item.name} - NPR ${item.price}\n; }); billContent += \nTotal: NPR ${totalSpan.textContent}\n; billContent += "\nThank you for choosing us!\nHave a safe day!\nBest wishes from Arabica Brew Coffee School, Koteshwor.";

const printWindow = window.open("", "", "width=600,height=600");
printWindow.document.write(`<pre>${billContent}</pre>`);
printWindow.document.close();
printWindow.print();

}

function searchMenu() { const query = document.getElementById("search").value.toLowerCase(); menuDiv.innerHTML = ""; menuItems.filter(item => item.name.toLowerCase().includes(query)).forEach((item, index) => { const button = document.createElement("button"); button.textContent = ${item.name} - NPR ${item.price}; button.onclick = () => addToBill(index); menuDiv.appendChild(button); }); }

