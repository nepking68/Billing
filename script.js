let menuItems = JSON.parse(localStorage.getItem("menuItems")) || [];
let billItems = [];
let totalAmount = 0;

function addMenuItem() {
    let name = document.getElementById("itemName").value;
    let price = parseFloat(document.getElementById("itemPrice").value);
    
    if (name && price) {
        menuItems.push({ name, price });
        localStorage.setItem("menuItems", JSON.stringify(menuItems));
        displayMenu();
        document.getElementById("itemName").value = "";
        document.getElementById("itemPrice").value = "";
    }
}

function displayMenu() {
    let menuDiv = document.getElementById("menu");
    menuDiv.innerHTML = "";
    menuItems.forEach((item, index) => {
        let button = document.createElement("button");
        button.textContent = `${item.name} - NPR ${item.price}`;
        button.onclick = () => addItemToBill(item.name, item.price);
        menuDiv.appendChild(button);
    });
}

function addItemToBill(name, price) {
    billItems.push({ name, price });
    totalAmount += price;
    updateBill();
}

function updateBill() {
    let billList = document.getElementById("bill");
    let totalSpan = document.getElementById("total");
    
    billList.innerHTML = "";
    billItems.forEach((item) => {
        let listItem = document.createElement("li");
        listItem.textContent = `${item.name} - NPR ${item.price}`;
        billList.appendChild(listItem);
    });

    totalSpan.textContent = totalAmount;
}

function calculateChange() {
    let received = parseFloat(document.getElementById("amountReceived").value) || 0;
    let change = received - totalAmount;
    document.getElementById("changeAmount").textContent = change >= 0 ? change : 0;
}

function printBill() {
    let billContent = `Arabica Brew Coffee School\n\n`;
    billItems.forEach(item => {
        billContent += `${item.name} - NPR ${item.price}\n`;
    });
    let received = parseFloat(document.getElementById("amountReceived").value) || 0;
    let change = received - totalAmount;
    billContent += `\nTotal: NPR ${totalAmount}`;
    billContent += `\nReceived: NPR ${received}`;
    billContent += `\nChange: NPR ${change >= 0 ? change : 0}`;
    billContent += `\n\nThank You for Choosing Us!\nHave a Safe Day!`;

    let newWindow = window.open("", "_blank");
    newWindow.document.write(`<pre>${billContent}</pre>`);
    newWindow.print();
}

// Search Menu Function
function filterMenu() {
    let searchQuery = document.getElementById("search").value.toLowerCase();
    let buttons = document.querySelectorAll("#menu button");

    buttons.forEach(button => {
        if (button.textContent.toLowerCase().includes(searchQuery)) {
            button.style.display = "block";
        } else {
            button.style.display = "none";
        }
    });
}

// Load menu on page start
window.onload = displayMenu;
