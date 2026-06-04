 id="jv4p8m"
/* =====================================
   VARIABLES & ARRAYS
===================================== */

let books = [];

let tasks = [];

let bookId = 1;
let taskId = 1;

/* =====================================
   PAGE LOAD EVENT
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        updateDashboard();

    }
);

/* =====================================
   ALERT FUNCTION
===================================== */

function showAlert(message,type){

    const alertBox =
    document.getElementById("alertBox");

    alertBox.innerHTML = `
        <div class="alert alert-${type}">
            ${message}
        </div>
    `;

    setTimeout(function(){

        alertBox.innerHTML = "";

    },3000);

}

/* =====================================
   ADD BOOK
===================================== */

function addBook(){

    let title =
    document.getElementById("bookTitle")
    .value.trim();

    let author =
    document.getElementById("bookAuthor")
    .value.trim();

    let category =
    document.getElementById("bookCategory")
    .value.trim();

    if(
        title === "" ||
        author === "" ||
        category === ""
    ){

        showAlert(
            "Please fill all fields",
            "danger"
        );

        return;
    }

    let book = {

        id: bookId++,
        title: title,
        author: author,
        category: category,
        status: "Available"

    };

    books.push(book);

    displayBooks();

    updateDashboard();

    showAlert(
        "Book Added Successfully",
        "success"
    );

    document.getElementById(
        "bookTitle"
    ).value = "";

    document.getElementById(
        "bookAuthor"
    ).value = "";

    document.getElementById(
        "bookCategory"
    ).value = "";

}

/* =====================================
   DISPLAY BOOKS
===================================== */

function displayBooks(){

    let tableBody =
    document.getElementById(
        "bookTableBody"
    );

    tableBody.innerHTML = "";

    books.forEach(function(book){

        let row = `
        <tr>

        <td>${book.id}</td>

        <td>${book.title}</td>

        <td>${book.author}</td>

        <td>${book.category}</td>

        <td>
            ${book.status}
            </td>

            <td>

                ${
                    book.status === "Available"

                    ?

                    `<button class="btn btn-warning btn-sm" onclick="issueBook(${book.id})">Issue</button>`

                    :

                    `<button class="btn btn-success btn-sm" onclick="returnBook(${book.id})">Return</button>`
                }

                <button
                class="btn btn-danger btn-sm"
                onclick="deleteBook(${book.id})">
                Delete
                </button>

            </td>

        </tr>
        `;

        tableBody.innerHTML += row;

    });

}

/* =====================================
   DELETE BOOK
===================================== */

function deleteBook(id){

    books =
    books.filter(function(book){

        return book.id !== id;

    });

    displayBooks();

    updateDashboard();

    showAlert(
        "Book Deleted",
        "warning"
    );

}

/* =====================================
   ISSUE BOOK
===================================== */

function issueBook(id){

    books.forEach(function(book){

        if(book.id === id){

            book.status =
            "Issued";

        }

    });

    displayBooks();

    updateDashboard();

    showAlert(
        "Book Issued",
        "primary"
    );

}

/* =====================================
   RETURN BOOK
===================================== */

function returnBook(id){

    books.forEach(function(book){

        if(book.id === id){

            book.status =
            "Available";

        }

    });

    displayBooks();

    updateDashboard();

    showAlert(
        "Book Returned",
        "success"
    );

}

/* =====================================
   SEARCH BOOK
===================================== */

function searchBook(){

    let input =
    document.getElementById(
        "searchInput"
    ).value.toLowerCase();

    let rows =
    document.querySelectorAll(
        "#bookTableBody tr"
    );

    rows.forEach(function(row){

        let text =
        row.innerText.toLowerCase();

        if(text.includes(input)){

            row.style.display = "";

        }

        else{

            row.style.display = "none";

        }

    });

}

/* =====================================
   ADD TASK
===================================== */

function addTask(){

    let taskText =
    document.getElementById(
        "taskInput"
    ).value.trim();

    if(taskText === ""){

        showAlert(
            "Enter Task",
            "danger"
        );

        return;
    }

    let task = {

        id: taskId++,
        text: taskText,
        completed: false

    };

    tasks.push(task);

    displayTasks();

    updateDashboard();

    document.getElementById(
        "taskInput"
    ).value = "";

}

/* =====================================
   DISPLAY TASKS
===================================== */

function displayTasks(){

    let taskList =
    document.getElementById(
        "taskList"
    );

    taskList.innerHTML = "";

    tasks.forEach(function(task){

        let item = document.createElement("li");

        item.className =
        "list-group-item";

        item.innerHTML = `

        <span
        class="${
            task.completed
            ?
            "completed"
            :
            ""
        }">

        ${task.text}

        </span>

        <div>

        <button
        class="btn btn-success btn-sm"

        onclick="toggleTask(${task.id})">

        ✔

        </button>

        <button
        class="btn btn-danger btn-sm"

        onclick="deleteTask(${task.id})">

        ✖

        </button>

        </div>

        `;

        taskList.appendChild(item);

    });

}

/* =====================================
   TOGGLE TASK
===================================== */

function toggleTask(id){

    tasks.forEach(function(task){

        if(task.id === id){

            task.completed =
            !task.completed;

        }

    });

    displayTasks();

    updateDashboard();

}

/* =====================================
   DELETE TASK
===================================== */

function deleteTask(id){

    tasks =
    tasks.filter(function(task){

        return task.id !== id;

    });

    displayTasks();

    updateDashboard();

}

/* =====================================
   UPDATE DASHBOARD
===================================== */

function updateDashboard(){

    document.getElementById(
        "totalBooks"
    ).innerHTML =
    books.length;

    let available = 0;

    let issued = 0;

    books.forEach(function(book){

        if(
            book.status ===
            "Available"
        ){

            available++;

        }

        else{

            issued++;

        }

    });

    document.getElementById(
        "availableBooks"
    ).innerHTML =
    available;

    document.getElementById(
        "issuedBooks"
    ).innerHTML =
    issued;

    let pending = 0;

    tasks.forEach(function(task){

        if(
            task.completed ===
            false
        ){

            pending++;

        }

    });

    document.getElementById(
        "pendingTasks"
    ).innerHTML =
    pending;

}
