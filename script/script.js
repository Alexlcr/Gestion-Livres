let books = [];

let book = {
    constructor(title, author, read) {
        this.title = title;
        this.author = author;
        this.read = read;
    },
};

const addBtn = document.querySelector("#add-book");
addBtn.addEventListener("click", () => {
    const bookTitle = document.querySelector("#book-title").value;
    const bookAuthor = document.querySelector("#book-author").value;

    if (!bookTitle.trim() || !bookAuthor.trim()) {
        alert("Veuillez remplir tous les champs");
        return;
    }

    const bookIndex = books.length;

    const book = document.createElement("div");
    book.classList.add("book");
    book.dataset.bookIndex = bookIndex;
    book.innerHTML = `
        <div class="card bg-body-secondary m-4">
            <div class="card-body d-flex flex-row gap-5 align-items-center">
                <h2 class="book-title card-title">${bookTitle}</h2>
                <p class="book-author card-subtitle mb-2 text-muted">${bookAuthor}</p>
                <div class="d-flex align-items-center gap-2">
                    <button class="btn btn-outline-success mark-read-btn">Marquer comme lu</button>
                    <button class="btn btn-outline-danger delete-book-btn">Supprimer</button>
                    <label class="form-check-label text-danger fw-bold read-status">Non-lu</label>
                </div>
            </div>
        </div>
    `;
    document.querySelector("#book-list").appendChild(book);

    const markReadBtn = book.querySelector(".mark-read-btn");
    const deleteBtn = book.querySelector(".delete-book-btn");
    const statusLabel = book.querySelector(".read-status");

    markReadBtn.addEventListener("click", () => {
        const bookData = books[bookIndex];
        bookData.read = !bookData.read;

        if (bookData.read) {
            markReadBtn.textContent = "Marquer comme non-lu";
            markReadBtn.classList.remove("btn-outline-success");
            markReadBtn.classList.add("btn-outline-warning");
            statusLabel.textContent = "Lu";
            statusLabel.classList.remove("text-danger");
            statusLabel.classList.add("text-success");
        } else {
            markReadBtn.textContent = "Marquer comme lu";
            markReadBtn.classList.remove("btn-outline-warning");
            markReadBtn.classList.add("btn-outline-success");
            statusLabel.textContent = "Non-lu";
            statusLabel.classList.remove("text-success");
            statusLabel.classList.add("text-danger");
        }
    });

    deleteBtn.addEventListener("click", () => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce livre ?")) {
            books.splice(bookIndex, 1);

            book.remove();

            updateBookIndexes();
        }
    });

    document.querySelector("#book-title").value = "";
    document.querySelector("#book-author").value = "";

    books.push({
        title: bookTitle,
        author: bookAuthor,
        read: false,
    });
});

function updateBookIndexes() {
    const bookElements = document.querySelectorAll(".book");
    bookElements.forEach((bookElement, index) => {
        bookElement.dataset.bookIndex = index;

        const markReadBtn = bookElement.querySelector(".mark-read-btn");
        const deleteBtn = bookElement.querySelector(".delete-book-btn");
        const statusLabel = bookElement.querySelector(".read-status");

        const newMarkReadBtn = markReadBtn.cloneNode(true);
        const newDeleteBtn = deleteBtn.cloneNode(true);

        markReadBtn.parentNode.replaceChild(newMarkReadBtn, markReadBtn);
        deleteBtn.parentNode.replaceChild(newDeleteBtn, deleteBtn);

        newMarkReadBtn.addEventListener("click", () => {
            const bookData = books[index];
            bookData.read = !bookData.read;

            if (bookData.read) {
                newMarkReadBtn.textContent = "Marquer comme non-lu";
                newMarkReadBtn.classList.remove("btn-outline-success");
                newMarkReadBtn.classList.add("btn-outline-warning");
                statusLabel.textContent = "Lu";
                statusLabel.classList.remove("text-danger");
                statusLabel.classList.add("text-success");
            } else {
                newMarkReadBtn.textContent = "Marquer comme lu";
                newMarkReadBtn.classList.remove("btn-outline-warning");
                newMarkReadBtn.classList.add("btn-outline-success");
                statusLabel.textContent = "Non-lu";
                statusLabel.classList.remove("text-success");
                statusLabel.classList.add("text-danger");
            }
        });

        newDeleteBtn.addEventListener("click", () => {
            if (confirm("Êtes-vous sûr de vouloir supprimer ce livre ?")) {
                books.splice(index, 1);
                bookElement.remove();
                updateBookIndexes();
            }
        });
    });
}

const searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", () => {
    const searchTerm = document.querySelector("#search-input").value.toLowerCase().trim();
    const filterType = document.querySelector("#search-filter").value;
    const bookElements = document.querySelectorAll(".book");

    if (!filterType) {
        alert("Veuillez sélectionner un filtre");
        return;
    }

    if (!searchTerm) {
        bookElements.forEach((book) => {
            book.classList.remove("d-none");
        });
        return;
    }

    bookElements.forEach((book) => {
        let shouldShow = false;

        if (filterType === "title") {
            const title = book.querySelector(".book-title").textContent.toLowerCase();
            shouldShow = title.includes(searchTerm);
        } else if (filterType === "author") {
            const author = book.querySelector(".book-author").textContent.toLowerCase();
            shouldShow = author.includes(searchTerm);
        }

        if (shouldShow) {
            book.classList.remove("d-none");
        } else {
            book.classList.add("d-none");
        }
    });
});

const searchInput = document.querySelector("#search-input");
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const filterType = document.querySelector("#search-filter").value;
    const bookElements = document.querySelectorAll(".book");

    if (!filterType) return;

    if (!searchTerm) {
        bookElements.forEach((book) => {
            book.classList.remove("d-none");
        });
        return;
    }

    bookElements.forEach((book) => {
        let shouldShow = false;

        if (filterType === "title") {
            const title = book.querySelector(".book-title").textContent.toLowerCase();
            shouldShow = title.includes(searchTerm);
        } else if (filterType === "author") {
            const author = book.querySelector(".book-author").textContent.toLowerCase();
            shouldShow = author.includes(searchTerm);
        }

        if (shouldShow) {
            book.classList.remove("d-none");
        } else {
            book.classList.add("d-none");
        }
    });
});

const filterSelect = document.querySelector("#search-filter");
filterSelect.addEventListener("change", () => {
    const bookElements = document.querySelectorAll(".book");
    bookElements.forEach((book) => {
        book.classList.remove("d-none");
    });

    document.querySelector("#search-input").value = "";
});

