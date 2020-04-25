/**
 * Called on button click. Sends textbox input to local database to be stored. 
 */
function addItem() {
    var expName = document.getElementById("name").value;
    var expCost = document.getElementById("cost").value;
    var expCategory = document.getElementById("category").value;

    localStorage.setItem(expName, expCost);
}

/**
 * Displays any data that exists in local database currrently. 
 */
function displayData() {

}

/**
 * Deletes item from local database given its key value
 */
function deleteItem(expName) {

}

/**
 * Main function that loops while web app is live. 
 */
function main() {
    displayData();
}

main();
