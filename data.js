
// Variable declaration
var expArray = new Array();
const expList = document.querySelector("#expenses-list");

/**
 * Called on button click. Sends textbox input to local database to be stored. 
 */
function addItem() {
    var expName = document.getElementById("name").value;
    var expCost = document.getElementById("cost").value;
    var expCategory = document.getElementById("category").value;

    var expValue = {"cost":expCost, "category":expCategory};
    var dbValue = JSON.stringify(expValue);

    console.log("added " + expName);
    expArray.push(expName);

    window.localStorage.setItem(expName, dbValue);
}

/**
 * Displays expenses that are currently in the database
 */
function displayData() {
    var names = "";
    
    for (var i = 0; i < expArray.length; i++) {
        names += expArray[i];
        names += "<br>";
    }

    console.log(names);
    document.getElementById("expNames").innerHTML = names;


}

/**
 * Deletes item from local database given its key value
 */
function deleteItem(expName) {

}

displayData();
