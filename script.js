""// Updated script.js with Edit / Rename / Delete functionality for Note, Main Category, and Sub Category

function getData() {
    return JSON.parse(localStorage.getItem("notesData") || "{}");
}

function saveData(data) {
    localStorage.setItem("notesData", JSON.stringify(data));
}

function loadCategories() {
    const data = getData();
    const mainSelect = document.getElementById("mainCategorySelect");
    mainSelect.innerHTML = "";
    Object.keys(data).forEach(main => {
        const option = document.createElement("option");
        option.value = main;
        option.textContent = main;
        mainSelect.appendChild(option);
    });
    renderMainCategoryList();
    loadSubCategories();
}

function addMainCategory() {
    const name = document.getElementById("mainCategoryInput").value.trim();
    if (!name) return;
    const data = getData();
    if (!data[name]) data[name] = {};
    saveData(data);
    document.getElementById("mainCategoryInput").value = "";
    loadCategories();
}

function renderMainCategoryList() {
    const data = getData();
    const container = document.getElementById("mainCategoryList");
    if (!container) return;
    container.innerHTML = "";
    Object.keys(data).forEach(main => {
        const div = document.createElement("div");
        div.className = "category-item";
        div.textContent = main;

        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.onclick = () => {
            const newName = prompt("Rename Main Category:", main);
            if (newName && newName.trim() && !data[newName.trim()]) {
                data[newName.trim()] = data[main];
                delete data[main];
                saveData(data);
                loadCategories();
            }
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️";
        deleteBtn.onclick = () => {
            if (confirm("Delete Main Category and all its data?")) {
                delete data[main];
                saveData(data);
                loadCategories();
            }
        };

        div.appendChild(editBtn);
        div.appendChild(deleteBtn);
        container.appendChild(div);
    });
}

function loadSubCategories() {
    const main = document.getElementById("mainCategorySelect").value;
    const data = getData();
    const subSelect = document.getElementById("subCategorySelect");
    subSelect.innerHTML = "";
    if (data[main]) {
        Object.keys(data[main]).forEach(sub => {
            const option = document.createElement("option");
            option.value = sub;
            option.textContent = sub;
            subSelect.appendChild(option);
        });
    }
    renderSubCategoryList();
    loadNotes();
}

function addSubCategory() {
    const main = document.getElementById("mainCategorySelect").value;
    const name = document.getElementById("subCategoryInput").value.trim();
    if (!main || !name) return;
    const data = getData();
    if (!data[main]) data[main] = {};
    if (!data[main][name]) data[main][name] = [];
    saveData(data);
    document.getElementById("subCategoryInput").value = "";
    loadSubCategories();
}

function renderSubCategoryList() {
    const main = document.getElementById("mainCategorySelect").value;
    const data = getData();
    const container = document.getElementById("subCategoryList");
    if (!container || !data[main]) return;
    container.innerHTML = "";
    Object.keys(data[main]).forEach(sub => {
        const div = document.createElement("div");
        div.className = "subcategory-item";
        div.textContent = sub;

        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.onclick = () => {
            const newName = prompt("Rename Sub Category:", sub);
            if (newName && newName.trim() && !data[main][newName.trim()]) {
                data[main][newName.trim()] = data[main][sub];
                delete data[main][sub];
                saveData(data);
                loadSubCategories();
            }
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️";
        deleteBtn.onclick = () => {
            if (confirm("Delete Sub Category and all its notes?")) {
                delete data[main][sub];
                saveData(data);
                loadSubCategories();
            }
        };

        div.appendChild(editBtn);
        div.appendChild(deleteBtn);
        container.appendChild(div);
    });
}

function saveNote() {
    const main = document.getElementById("mainCategorySelect").value;
    const sub = document.getElementById("subCategorySelect").value;
    const content = document.getElementById("noteInput").value.trim();
    if (!main || !sub || !content) return;
    const data = getData();
    data[main][sub].push(content);
    saveData(data);
    document.getElementById("noteInput").value = "";
    loadNotes();
}

function loadNotes() {
    const main = document.getElementById("mainCategorySelect").value;
    const sub = document.getElementById("subCategorySelect").value;
    const list = document.getElementById("notesList");
    const search = document.getElementById("searchInput").value.toLowerCase();
    list.innerHTML = "";
    const data = getData();
    if (data[main] && data[main][sub]) {
        data[main][sub].forEach((note, index) => {
            if (!search || note.toLowerCase().includes(search)) {
                const div = document.createElement("div");
                div.className = "note";

                const span = document.createElement("span");
                span.textContent = note;

                const editBtn = document.createElement("button");
                editBtn.textContent = "✏️";
                editBtn.onclick = () => {
                    const newNote = prompt("Edit your note:", note);
                    if (newNote !== null) {
                        data[main][sub][index] = newNote.trim();
                        saveData(data);
                        loadNotes();
                    }
                };

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "🗑️";
                deleteBtn.onclick = () => {
                    if (confirm("Delete this note?")) {
                        data[main][sub].splice(index, 1);
                        saveData(data);
                        loadNotes();
                    }
                };

                div.appendChild(span);
                div.appendChild(editBtn);
                div.appendChild(deleteBtn);
                list.appendChild(div);
            }
        });
    }
}

document.getElementById("searchInput").addEventListener("input", loadNotes);
