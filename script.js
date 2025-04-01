let totalAmount = 0;
let billItems = [];

function addItem(name, price) {
    billItems.push({ name, price });
    totalAmount += price;
    updateBill();
}

function updateBill() {
    let billList = document.getElementById("bill");
    let totalSpan = document.getElementById("total");

    billList.innerHTML = "";
    billItems.forEach((item, index) => {
        let listItem = document.createElement("li");
        listItem.textContent = `${item.name} - NPR ${item.price}`;
        billList.appendChild(listItem);
    });

    totalSpan.textContent = totalAmount;
}

function printBill() {
    let billContent = `Arabica Brew Coffee School\n\n`;
    billItems.forEach(item => {
        billContent += `${item.name} - NPR ${item.price}\n`;
    });
    billContent += `\nTotal: NPR ${totalAmount}\n\nThank You for Choosing Us!\nHave a Safe Day!`;

    let newWindow = window.open("", "_blank");
    newWindow.document.write(`<pre>${billContent}</pre>`);
    newWindow.print();
}

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
