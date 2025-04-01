// Load existing menu items from localStorage or create an empty array
let menuItems = JSON.parse(localStorage.getItem("menuItems")) || [];
let billItems = [];
let totalAmount = 0;

// Display menu on page load
window.onload = function () {
    displayMenu();
};

// Function to add a new menu item
function addMenuItem() {
    let name = document.getElementById("itemName").value.trim();
    let price = parseFloat(document.getElementById("itemPrice").value);

    if (!name || isNaN(price) || price <= 0) {
        alert("Please enter a valid item name and price.");
        return;
    }

    // Add the new item to the menu array
    menuItems.push({ name, price });

    // Save to localStorage
    localStorage.setItem("menuItems", JSON.stringify(menuItems));

    // Refresh the menu display
    displayMenu();

    // Clear input fields
    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";
}

// Function to display menu items
function displayMenu() {
    let menuDiv = document.getElementById("menu");
    menuDiv.innerHTML = ""; // Clear existing menu

    if (menuItems.length === 0) {
        menuDiv.innerHTML = "<p>No items in the menu.</p>";
        return;
    }

    menuItems.forEach((item, index) => {
        let button = document.createElement("button");
        button.textContent = `${item.name} - NPR ${item.price}`;
        button.onclick = () => addItemToBill(item.name, item.price);
        menuDiv.appendChild(button);
    });
}

// Function to add an item to the bill
function addItemToBill(name, price) {
    billItems.push({ name, price });
    totalAmount += price;
    updateBill();
}

// Function to update the bill
function updateBill() {
    let billList = document.getElementById("bill");
    let totalSpan = document.getElementById("total");

    billList.innerHTML = ""; // Clear previous bill items

    billItems.forEach((item) => {
        let listItem = document.createElement("li");
        listItem.textContent = `${item.name} - NPR ${item.price}`;
        billList.appendChild(listItem);
    });

    totalSpan.textContent = totalAmount;
}

// Function to calculate change
function calculateChange() {
    let received = parseFloat(document.getElementById("amountReceived").value) || 0;
    let change = received - totalAmount;
    document.getElementById("changeAmount").textContent = change >= 0 ? change : 0;
}

// Function to print the bill
function printBill() {
    if (billItems.length === 0) {
        alert("No items added to the bill.");
        return;
    }

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

// Function to filter menu items based on search input
function filterMenu() {
    let searchQuery = document.getElementById("search").value.toLowerCase();
    let menuDiv = document.getElementById("menu");

    menuDiv.innerHTML = ""; // Clear existing menu

    let filteredItems = menuItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery)
    );

    if (filteredItems.length === 0) {
        menuDiv.innerHTML = "<p>No matching items found.</p>";
        return;
    }

    filteredItems.forEach((item) => {
        let button = document.createElement("button");
        button.textContent = `${item.name} - NPR ${item.price}`;
        button.onclick = () => addItemToBill(item.name, item.price);
        menuDiv.appendChild(button);
    });
}
