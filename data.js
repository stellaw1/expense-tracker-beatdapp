// Variable declaration
var expArray = new Array();
const expList = document.querySelector("#expenses-list");
var nameDir = "des";
var costDir = "des";

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
        cost.textContent = exp.cost;
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

    /* Make a loop that will continue until no switching has been done: */
    while (switching) {
        switching = false;
        rows = table.rows;

        /* Loop through all table rows */
        for (i = 0; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get two elements to compare, one from current row and one from the next: */
            x = rows[i].getElementsByTagName("td")[col];
            y = rows[i + 1].getElementsByTagName("td")[col];

            /* Check if the two rows should switch place, based on the direction, asc or desc: */
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
            /* If a switch has been marked, make the switch and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        } 
    }
}

/**
 * Function that sorts table by Cost. Sorting order is opposite to costDir
 */
function sortTableByCost() {
    console.log("sort by cost");

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

    /* Make a loop that will continue until no switching has been done: */
    while (switching) {
        switching = false;
        rows = table.rows;

        /* Loop through all table rows */
        for (i = 0; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get two elements to compare, one from current row and one from the next: */
            x = rows[i].getElementsByTagName("td")[col];
            y = rows[i + 1].getElementsByTagName("td")[col];

            /* Check if the two rows should switch place, based on the direction, asc or desc: */
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
            /* If a switch has been marked, make the switch and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        } 
    }
}

/**
 * Function that sorts table by Name or Cost depending on its input
 * 
 * parameter: integer representing type to sort by
 */
function sortTable(c) {
    var table = document.getElementById("expenses-list");
    var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;

    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 0; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("td")[c];
        y = rows[i + 1].getElementsByTagName("td")[c];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
            }
        } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
            }
        }
        }
        if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
        } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
        }
        }
    }

}

clearDatabase();
