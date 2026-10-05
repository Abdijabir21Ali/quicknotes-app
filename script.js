/* ============================================================
   QuickNotes - script.js
   Task 4: Validation and delete
   ============================================================ */

/* ---------- Element selections ---------- */
const noteForm     = document.querySelector("#note-form");
const noteInput    = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList    = document.querySelector("#notes-list");
const noteCount    = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

/* ---------- State ---------- */
const notes = [];

/* ---------- Constants ---------- */
const MAX_LENGTH = 200; // NEW

/* ---------- Helpers ---------- */

function formatDate(date) {
    return date.toLocaleString("en-GB", {
        day:   "numeric",
        month: "short",
        year:  "numeric",
        hour:  "2-digit",
        minute: "2-digit"
    });
}

function generateId() {
    return Date.now().toString() + "-" + Math.random().toString(36).slice(2, 8);
}

function categoryClass(category) {
    return "category-" + category.toLowerCase();
}

/* ---------- Render ---------- */

function render() {
    notesList.textContent = "";

    notes.forEach(function (note) {
        const li = document.createElement("li");
        li.className = "note-card " + categoryClass(note.category);
        li.dataset.id = note.id;

        const p = document.createElement("p");
        p.className = "note-text";
        p.textContent = note.text;

        const meta = document.createElement("div");
        meta.className = "note-meta";

        const categoryLabel = document.createElement("span");
        categoryLabel.className = "note-category-label";
        categoryLabel.textContent = note.category;

        const dateLabel = document.createElement("span");
        dateLabel.className = "note-date";
        dateLabel.textContent = note.createdAt;

        meta.appendChild(categoryLabel);
        meta.appendChild(dateLabel);

        // Delete button — now wired up (Task 4)
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function () {
            deleteNote(note.id);
        });

        li.appendChild(p);
        li.appendChild(meta);
        li.appendChild(deleteBtn);

        notesList.appendChild(li);
    });

    updateCount();
}

/* ---------- Count ---------- */

function updateCount() {
    const n = notes.length;
    if (n === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (n === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = "You have " + n + " notes.";
    }
}

/* ---------- Validation (Task 4) ---------- */

function validateNote(text) {
    if (text === "") {
        return "Please type a note first.";
    }
    if (text.length > MAX_LENGTH) {
        return "Notes must be 200 characters or fewer.";
    }
    return ""; // no error
}

/* ---------- Add note ---------- */

noteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text     = noteInput.value.trim();
    const category = noteCategory.value;

    // Validate
    const error = validateNote(text);
    if (error) {
        errorMessage.textContent = error;
        return;
    }

    // Clear any previous error
    errorMessage.textContent = "";

    const newNote = {
        id:        generateId(),
        text:      text,
        category:  category,
        createdAt: formatDate(new Date())
    };

    notes.push(newNote);

    noteInput.value = "";
    noteInput.focus();

    render();
});

/* ---------- Delete note (Task 4) ---------- */

function deleteNote(id) {
    const index = notes.findIndex(function (note) {
        return note.id === id;
    });

    if (index !== -1) {
        notes.splice(index, 1);
        render();
    }
}

/* ---------- Initial render ---------- */
render();