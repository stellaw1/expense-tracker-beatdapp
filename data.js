// Variable declaration
var expArray = new Array();
const expList = document.querySelector("#expenses-list");
var nameDir = "des";
var costDir = "des";
var catDir = "des";

/**
 * Called on button click. Sends textbox input to local database to be stored. 
 */
function addItem() {

    //grab values from text box input from html
    var expName = document.getElementById("addName").value;
    var expCost = document.getElementById("cost").value;
    var expCategory = document.getElementById("category").value;

    //check expName input is unique
    for (var i = 0; i < expArray.length; i++) {
        if (expName == expArray[i]) {
            alert("Entered expense name is not unique. Please enter a name that is not already in list. ");
            return;
        }
    }

    //check expCost is not empty
    if (expCost == "") {
        alert("Please enter expense cost. ");
        return;
    }

    //check a category is selected for expCategory
    if (expCategory == "Select a category") {
        alert("Please select a category. ");
        return;
    }

    //add expense name to global array
    expArray.push(expName);

    //parse expense cost and category as JSON obj
    var expValue = { "cost": "", "category": "" };
    expValue.cost = expCost;
    expValue.category = expCategory;

    //push item to database
    localStorage.setItem(expName, JSON.stringify(expValue));

    //update table of expenses
    displayData();
}

/**
 * Displays expenses that are currently in the database
 */
function displayData() {
    
    //clear current table to sync expenses according to database
    clearTable();

    //use expArray as keys to grab items from database
    for (var i = 0; i < expArray.length; i++) {
        //parse item value from database into JSON obj
        var exp = JSON.parse(localStorage.getItem(expArray[i]));
    
        //create html elements - 1 row and 3 cells
        let tr = document.createElement('tr');
        let name = document.createElement('td');
        let cost = document.createElement('td');
        let category = document.createElement('td');

        //set html table cells according obj from database 
        name.textContent = expArray[i];
        cost.textContent = exp.cost;
        category.textContent = exp.category;

        //combine table cells into 1 row
        tr.appendChild(name);
        tr.appendChild(cost);
        tr.appendChild(category);

        //add row to expense list table
        expList.appendChild(tr);
    }
}

/**
 * Clears entire expense table to prepare for updating table according to database
 */
function clearTable() {
    while(expList.hasChildNodes())
        expList.removeChild(expList.firstChild);
}

/**
 * Deletes item from local database given its key value
 */
function deleteItem() {
    //grab input value from html 
    var expName = document.getElementById("deleteName").value;

    //check entered input expense name exists in database
    for (var i = 0; i < expArray.length; i++) {
        if (expName == expArray[i]) {
            break;
        } else if (i == expArray.length - 1 && expName != expArray[i]) {
            alert("Please enter an expense name that exists in current list. ");
            return;
        }
    }

    //remove item from database
    localStorage.removeItem(expName);

    //remove expense from expArray
    var index = expArray.indexOf(expName);
    while (index > -1) {
        expArray.splice(index, 1);
        index = expArray.indexOf(expName);
    }

    //update expense table 
    displayData();
}    

/**
 * Clear entire database.
 */
function clearDatabase() {
    localStorage.clear();
}

/**
 * Function that sorts table by Name. Sorting order is opposite to nameDir
 */
function sortTableByName() {
    
    var table = document.getElementById("expenses-list");
    var col = 0;
    var rows, switching, i, x, y, shouldSwitch;

    switching = true;

    // set nameDir to the opposite of its current order
    if (nameDir == "des") {
        nameDir = "asc";
    } else if (nameDir == "asc") {
        nameDir = "des";
    }

    // loop that will continue until entire table is sorted according to costDir
    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 0; i < (rows.length - 1); i++) {
            //reset shouldSwitch marker
            shouldSwitch = false;
            // Get two elements to compare, one from current row and one from the next
            x = rows[i].getElementsByTagName("td")[col];
            y = rows[i + 1].getElementsByTagName("td")[col];

            // Check if the two rows should switch place, based on the direction, asc or desc
            if (nameDir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (nameDir == "des") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            // switch x and y if shouldSwitch is marked true
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        } 
    }
}

/**
 * Function that sorts table by Cost. Sorting order is opposite to costDir
 */
function sortTableByCost() {

    //declare helper variables
    var table = document.getElementById("expenses-list");
    var col = 1;
    var rows, switching, i, x, y, shouldSwitch;

    switching = true;

    // set nameDir to the opposite of its current order
    if (costDir == "des") {
        costDir = "asc";
    } else if (costDir == "asc") {
        costDir = "des";
    }

    // loop that will continue until entire table is sorted according to costDir
    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 0; i < (rows.length - 1); i++) {
            // reset shouldSwitch marker
            shouldSwitch = false;
            // Get two elements to compare, one from current row and one from the next
            x = rows[i].getElementsByTagName("td")[col];
            y = rows[i + 1].getElementsByTagName("td")[col];

            // Check if the two rows should switch place, based on costDir
            if (costDir == "asc") {
                if (Number(x.innerHTML) > Number(y.innerHTML)) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (costDir == "des") {
                if (Number(x.innerHTML) < Number(y.innerHTML)) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            // switch x and y if shouldSwitch is marked true
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        } 
    }
}

/**
 * Function that sorts table by Name. Sorting order is opposite to nameDir
 */
function sortTableByCategory() {
    
    var table = document.getElementById("expenses-list");
    var col = 2;
    var rows, switching, i, x, y, shouldSwitch;

    switching = true;

    // set nameDir to the opposite of its current order
    if (catDir == "des") {
        catDir = "asc";
    } else if (catDir == "asc") {
        catDir = "des";
    }

    // loop that will continue until entire table is sorted according to costDir
    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 0; i < (rows.length - 1); i++) {
            //reset shouldSwitch marker
            shouldSwitch = false;
            // Get two elements to compare, one from current row and one from the next
            x = rows[i].getElementsByTagName("td")[col];
            y = rows[i + 1].getElementsByTagName("td")[col];

            // Check if the two rows should switch place, based on the direction, asc or desc
            if (catDir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (catDir == "des") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            // switch x and y if shouldSwitch is marked true
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        } 
    }
}
