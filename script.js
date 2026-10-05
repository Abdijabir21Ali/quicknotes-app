/* ============================================================
   QuickNotes - script.js
   Task 5: Persistence and search
   ============================================================ */

/* ---------- Element selections ---------- */
const noteForm     = document.querySelector("#note-form");
const noteInput    = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList    = document.querySelector("#notes-list");
const noteCount    = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput  = document.querySelector("#search-input"); // NEW
const clearAllBtn = document.querySelector("#clear-all-btn");

/* ---------- Constants ---------- */
const MAX_LENGTH = 200;
const STORAGE_KEY = "quicknotes-notes"; // NEW

/* ---------- State ---------- */
// Load from localStorage on page open (falls back to [])
const notes = loadNotes(); // CHANGED: initialised from storage

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

/* ---------- Persistence (Task 5) ---------- */

function saveNotes() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (err) {
        console.warn("Could not save notes:", err);
    }
}

function loadNotes() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
        console.warn("Could not load notes:", err);
        return [];
    }
}

/* ---------- Search filter (Task 5) ---------- */

// Returns the notes that match the current search input (case-insensitive)
function getVisibleNotes() {
    const query = searchInput.value.trim().toLowerCase();
    if (query === "") return notes;

    return notes.filter(function (note) {
        return note.text.toLowerCase().includes(query);
    });
}

/* ---------- Render ---------- */

function render() {
    notesList.textContent = "";

    const visible = getVisibleNotes();

    // Empty-state message when a search matches nothing
    if (visible.length === 0 && notes.length > 0) {
        const li = document.createElement("li");
        li.className = "empty-message";
        li.textContent = "No notes match your search.";
        notesList.appendChild(li);
    } else {
        visible.forEach(function (note) {
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
    }

    // Count should always reflect the TOTAL number of stored notes,
    // not just the filtered ones.
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

/* ---------- Validation ---------- */

function validateNote(text) {
    if (text === "") {
        return "Please type a note first.";
    }
    if (text.length > MAX_LENGTH) {
        return "Notes must be 200 characters or fewer.";
    }
    return "";
}

/* ---------- Add note ---------- */

noteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text     = noteInput.value.trim();
    const category = noteCategory.value;

    const error = validateNote(text);
    if (error) {
        errorMessage.textContent = error;
        return;
    }

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

    saveNotes();   // NEW
    render();
});

/* ---------- Delete note ---------- */

function deleteNote(id) {
    const index = notes.findIndex(function (note) {
        return note.id === id;
    });

    if (index !== -1) {
        notes.splice(index, 1);
        saveNotes(); // NEW
        render();
    }
}

/* ---------- Search input listener (Task 5) ---------- */

searchInput.addEventListener("input", function () {
    render();
});

/* ---------- Bonus: Clear all ---------- */
clearAllBtn.addEventListener("click", function () {
    if (notes.length === 0) return; // nothing to clear
    const confirmed = confirm("Delete all notes?");
    if (!confirmed) return;

    notes.length = 0;  // empty the array in place
    saveNotes();
    render();
});

/* ---------- Initial render ---------- */
render();