let transactions = [];

function addTransaction() {

    const description =
        document.getElementById("description").value;

    const amount =
        Number(document.getElementById("amount").value);

    const type =
        document.getElementById("type").value;

    if (description === "" || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type
    };

    transactions.push(transaction);

    displayTransactions();
    updateSummary();

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}


function displayTransactions() {

    const list =
        document.getElementById("transactionList");

    list.innerHTML = "";

    transactions.forEach(function(transaction) {

        const li = document.createElement("li");

        li.classList.add(
            "transaction",
            transaction.type
        );

        li.innerHTML = `
            <div>
                <strong>${transaction.description}</strong>
                <br>
                <span>
                    ${transaction.type === "income" ? "+" : "-"}
                    ₹${transaction.amount}
                </span>
            </div>

            <button
                class="delete-btn"
                onclick="deleteTransaction(${transaction.id})">
                Delete
            </button>
        `;

        list.appendChild(li);
    });
}


function updateSummary() {

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(function(transaction) {

        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }

    });

    const balance = totalIncome - totalExpense;

    document.getElementById("income").innerText =
        "₹" + totalIncome;

    document.getElementById("expense").innerText =
        "₹" + totalExpense;

    document.getElementById("balance").innerText =
        "₹" + balance;
}


function deleteTransaction(id) {

    transactions = transactions.filter(function(transaction) {
        return transaction.id !== id;
    });

    displayTransactions();
    updateSummary();
                      }
