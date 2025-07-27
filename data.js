
function getData() {
    return JSON.parse(localStorage.getItem("secureNotesData") || "{}");
}

function saveData(data) {
    localStorage.setItem("secureNotesData", JSON.stringify(data));
}
