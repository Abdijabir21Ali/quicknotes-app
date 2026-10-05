/* ============================================================
   QuickNotes - script.js
   Task 3: Add and display notes
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

/* ---------- Helpers ---------- */

// Readable date and time, e.g. "5 Oct 2025, 14:32"
function formatDate(date) {
    return date.toLocaleString("en-GB", {
        day:   "numeric",
        month: "short",
        year:  "numeric",
        hour:  "2-digit",
        minute: "2-digit"
    });
}

// Generate a simple unique id
function generateId() {
    return Date.now().toString() + "-" + Math.random().toString(36).slice(2, 8);
}

// Map a category name to its CSS class
function categoryClass(category) {
    return "category-" + category.toLowerCase();
}

/* ---------- Render ---------- */

function render() {
    // 1. Clear the list
    notesList.textContent = "";

    // 2. Rebuild every note card
    notes.forEach(function (note) {
        const li = document.createElement("li");
        li.className = "note-card " + categoryClass(note.category);
        li.dataset.id = note.id;

        // Note text
        const p = document.createElement("p");
        p.className = "note-text";
        p.textContent = note.text;

        // Meta row (category label + date)
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

        // Delete button (wired in Task 4)
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        // Assemble card
        li.appendChild(p);
        li.appendChild(meta);
        li.appendChild(deleteBtn);

        notesList.appendChild(li);
    });

    // 3. Update the count paragraph
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

/* ---------- Add note ---------- */

noteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text     = noteInput.value.trim();
    const category = noteCategory.value;

    // Temporary guard — full validation arrives in Task 4
    if (text === "") {
        return;
    }

    const newNote = {
        id:        generateId(),
        text:      text,
        category:  category,
        createdAt: formatDate(new Date())
    };

    notes.push(newNote);

    // Clear the input
    noteInput.value = "";
    noteInput.focus();

    // Clear the error paragraph
    errorMessage.textContent = "";

    render();
});

/* ---------- Initial render ---------- */
render();