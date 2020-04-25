// Variable declaration
var expArray = new Array();
const expList = document.querySelector("#expenses-list");

/**
 * Called on button click. Sends textbox input to local database to be stored. 
 */
function addItem() {
    var expName = document.getElementById("addName").value;
    var expCost = document.getElementById("cost").value;
    var expCategory = document.getElementById("category").value;

    var expValue = { "cost": "", "category": "" };
    expValue.cost = expCost;
    expValue.category = expCategory;

    console.log(expValue);

    expArray.push(expName);
    console.log(expName);

    localStorage.setItem(expName, JSON.stringify(expValue));

    displayData();
}

/**
 * Displays expenses that are currently in the database
 */
function displayData() {
    clearTable();

    for (var i = 0; i < expArray.length; i++) {
        var exp = JSON.parse(localStorage.getItem(expArray[i]));
    
        let tr = document.createElement('tr');
        let name = document.createElement('td');
        let cost = document.createElement('td');
        let category = document.createElement('td');

        name.textContent = expArray[i];
        cost.textContent = "$" + exp.cost;
        category.textContent = exp.category;

        tr.appendChild(name);
        tr.appendChild(cost);
        tr.appendChild(category);

        console.log(expArray[i]);
        expList.appendChild(tr);
    }
}

function clearTable() {
    while(expList.hasChildNodes())
        expList.removeChild(expList.firstChild);

}

/**
 * Deletes item from local database given its key value
 */
function deleteItem() {
    var expName = document.getElementById("deleteName").value;

    localStorage.removeItem(expName);

    var index = expArray.indexOf(expName);
    while (index > -1) {
        expArray.splice(index, 1);
        index = expArray.indexOf(expName);
    }

    displayData();
}    

/**
 * Clear entire database.
 */
function clearDatabase() {
    localStorage.clear();
}

clearDatabase();
