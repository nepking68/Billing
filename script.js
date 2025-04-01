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
    billItems.forEach((item) => {
        let listItem = document.createElement("li");
        listItem.textContent = `${item.name} - NPR ${item.price}`;
        billList.appendChild(listItem);
    });

    totalSpan.textContent = totalAmount;
}

function printBill() {
    let billContent = `Billing App\n\n`;
    billItems.forEach((item) => {
        billContent += `${item.name} - NPR ${item.price}\n`;
    });
    billContent += `\nTotal: NPR ${totalAmount}\n\nThank you for your purchase!`;

    let newWindow = window.open("", "_blank");
    newWindow.document.write(`<pre>${billContent}</pre>`);
    newWindow.print();
}
