
/* ============================
   PAGE SWITCHING
============================ */

function showPage(pageId){

    let pages =
    document.querySelectorAll('.page');

    pages.forEach(page=>{
        page.classList.remove('active');
    });

    document
    .getElementById(pageId)
    .classList.add('active');
}

/* ============================
   LOCAL STORAGE
============================ */

let books =
JSON.parse(
localStorage.getItem("books")
) || [];

let issuedBooks =
JSON.parse(
localStorage.getItem("issuedBooks")
) || [];

let returnedBooks =
JSON.parse(
localStorage.getItem("returnedBooks")
) || [];

let tasks =
JSON.parse(
localStorage.getItem("tasks")
) || [];

/* ============================
   SAVE DATA
============================ */

function saveData(){

    localStorage.setItem(
        "books",
        JSON.stringify(books)
    );

    localStorage.setItem(
        "issuedBooks",
        JSON.stringify(issuedBooks)
    );

    localStorage.setItem(
        "returnedBooks",
        JSON.stringify(returnedBooks)
    );

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

/* ============================
   BOOK MANAGEMENT
============================ */

function addBook(){

    let title =
    document
    .getElementById("bookTitle")
    .value.trim();

    let author =
    document
    .getElementById("bookAuthor")
    .value.trim();

    let category =
    document
    .getElementById("bookCategory")
    .value.trim();

    if(
        title==="" ||
        author==="" ||
        category===""){

        alert(
        "Please fill all fields"
        );

        return;
    }

    books.push({

        id:Date.now(),

        title:title,

        author:author,

        category:category,

        status:"Available"

    });

    saveData();

    displayBooks();

    updateDashboard();

    updateDropdowns();

    document
    .getElementById("bookTitle")
    .value="";

    document
    .getElementById("bookAuthor")
    .value="";

    document
    .getElementById("bookCategory")
    .value="";
}

/* ============================
   DISPLAY BOOKS
============================ */

function displayBooks(){

    let table =
    document
    .getElementById("bookTable");

    table.innerHTML="";

    books.forEach((book,index)=>{

        table.innerHTML +=

        `<tr>

            <td>${index+1}</td>

            <td>${book.title}</td>

            <td>${book.author}</td>

            <td>${book.category}</td>

            <td>${book.status}</td>

            <td>

                <button
                class="delete-btn"
                onclick="deleteBook(${book.id})">

                Delete

                </button>

            </td>

        </tr>`;
    });
}

/* ============================
   DELETE BOOK
============================ */

function deleteBook(id){

    books =
    books.filter(
    book=>book.id!==id
    );

    saveData();

    displayBooks();

    updateDashboard();

    updateDropdowns();
}

/* ============================
   SEARCH BOOKS
============================ */

function searchBooks(){

    let keyword =
    document
    .getElementById("searchBook")
    .value
    .toLowerCase();

    let rows =
    document
    .querySelectorAll("#bookTable tr");

    rows.forEach(row=>{

        if(
        row.innerText
        .toLowerCase()
        .includes(keyword)
        ){

            row.style.display="";
        }

        else{

            row.style.display="none";
        }
    });
}

/* ============================
   UPDATE DROPDOWNS
============================ */

function updateDropdowns(){

    let issueSelect =
    document
    .getElementById("issueBookSelect");

    let returnSelect =
    document
    .getElementById("returnBookSelect");

    issueSelect.innerHTML=
    `<option value="">
    Select Book
    </option>`;

    returnSelect.innerHTML=
    `<option value="">
    Select Book
    </option>`;

    books.forEach(book=>{

        if(book.status==="Available"){

            issueSelect.innerHTML +=

            `<option value="${book.id}">
            ${book.title}
            </option>`;
        }

        if(book.status==="Issued"){

            returnSelect.innerHTML +=

            `<option value="${book.id}">
            ${book.title}
            </option>`;
        }

    });
}

/* ============================
   ISSUE BOOK
============================ */

function issueBook(){

    let student =
    document
    .getElementById("studentName")
    .value.trim();

    let bookId =
    document
    .getElementById("issueBookSelect")
    .value;

    let issueDate =
    document
    .getElementById("issueDate")
    .value;

    let returnDate =
    document
    .getElementById("expectedReturnDate")
    .value;

    if(
        student==="" ||
        bookId==="" ||
        issueDate==="" ||
        returnDate===""){

        alert(
        "Fill all fields"
        );

        return;
    }

    let book =
    books.find(
    b=>b.id==bookId
    );

    book.status="Issued";

    issuedBooks.push({

        student:student,

        book:book.title,

        issueDate:issueDate,

        returnDate:returnDate

    });

    saveData();

    displayIssuedBooks();

    displayBooks();

    updateDashboard();

    updateDropdowns();

    alert(
    "Book Issued Successfully"
    );
}

/* ============================
   DISPLAY ISSUED BOOKS
============================ */

function displayIssuedBooks(){

    let table =
    document
    .getElementById("issuedTable");

    table.innerHTML="";

    issuedBooks.forEach(item=>{

        table.innerHTML +=

        `<tr>

        <td>${item.student}</td>

        <td>${item.book}</td>

        <td>${item.issueDate}</td>

        <td>${item.returnDate}</td>

        </tr>`;
    });
}

/* ============================
   RETURN BOOK
============================ */

function returnBook(){

    let student =
    document
    .getElementById("returnStudent")
    .value.trim();

    let bookId =
    document
    .getElementById("returnBookSelect")
    .value;

    let returnDate =
    document
    .getElementById("returnDate")
    .value;

    if(
        student==="" ||
        bookId==="" ||
        returnDate===""){

        alert(
        "Fill all fields"
        );

        return;
    }

    let book =
    books.find(
    b=>b.id==bookId
    );

    book.status="Available";

    returnedBooks.push({

        student:student,

        book:book.title,

        returnDate:returnDate

    });

    saveData();

    displayReturnedBooks();

    displayBooks();

    updateDashboard();

    updateDropdowns();

    alert(
    "Book Returned Successfully"
    );
}

/* ============================
   DISPLAY RETURNED BOOKS
============================ */

function displayReturnedBooks(){

    let table =
    document
    .getElementById("returnedTable");

    table.innerHTML="";

    returnedBooks.forEach(item=>{

        table.innerHTML +=

        `<tr>

        <td>${item.student}</td>

        <td>${item.book}</td>

        <td>${item.returnDate}</td>

        </tr>`;
    });
}

/* ============================
   DASHBOARD COUNTERS
============================ */

function updateDashboard(){

    let total =
    books.length;

    let available =
    books.filter(
    b=>b.status==="Available"
    ).length;

    let issued =
    books.filter(
    b=>b.status==="Issued"
    ).length;

    document
    .getElementById("totalBooks")
    .innerText=total;

    document
    .getElementById("availableBooks")
    .innerText=available;

    document
    .getElementById("issuedBooks")
    .innerText=issued;

    document
    .getElementById("pendingReturns")
    .innerText=issued;
}

/* ============================
   TODO LIST
============================ */

function addTask(){

    let input =
    document
    .getElementById("taskInput");

    let text =
    input.value.trim();

    if(text===""){

        alert(
        "Enter a task"
        );

        return;
    }

    tasks.push({

        text:text,

        completed:false

    });

    saveData();

    displayTasks();

    input.value="";
}

/* ============================
   DISPLAY TASKS
============================ */

function displayTasks(){

    let taskList =
    document
    .getElementById("taskList");

    taskList.innerHTML="";

    tasks.forEach((task,index)=>{

        taskList.innerHTML +=

        `<li>

        <span class="${
        task.completed
        ? 'completed'
        : ''
        }">

        ${task.text}

        </span>

        <div class="task-buttons">

        <button
        class="complete-btn"
        onclick="toggleTask(${index})">

        ✓

        </button>

        <button
        class="remove-btn"
        onclick="deleteTask(${index})">

        ✕

        </button>

        </div>

        </li>`;
    });
}

/* ============================
   COMPLETE TASK
============================ */

function toggleTask(index){

    tasks[index].completed =
    !tasks[index].completed;

    saveData();

    displayTasks();
}

/* ============================
   DELETE TASK
============================ */

function deleteTask(index){

    tasks.splice(index,1);

    saveData();

    displayTasks();
}

/* ============================
   INITIAL LOAD
============================ */

displayBooks();

displayIssuedBooks();

displayReturnedBooks();

displayTasks();

updateDashboard();

updateDropdowns();

