# QuickNotes

QuickNotes is a small, single-page web application for jotting down short notes and organising them by category. Notes can be tagged as **Personal**, **Work**, or **Study**, and each one is saved automatically in the browser so it is still there the next time you open the page. The app is built with plain HTML, CSS, and JavaScript — no frameworks, no build tools — so it is easy to read, easy to run, and easy to extend.

## Features

- **Add a note** with a category (**Personal**, **Work**, or **Study**) using a simple form.
- **Validation** — the form blocks empty notes and notes longer than 200 characters, and shows a clear error message.
- **Delete** any individual note with a Delete button on its card.
- **Live search** — as you type, only notes whose text matches the search are shown (case-insensitive). If nothing matches, a friendly message is displayed.
- **Note counter** — a running total that reads _"You have no notes yet."_, _"You have 1 note."_, or _"You have N notes."_
- **Persistence** — notes are saved to `localStorage` whenever they change and loaded back when the page opens.
- **Category styling** — each category has its own coloured left border (teal for Personal, dark red for Work, blue for Study) so notes are easy to scan at a glance.
- **Responsive layout** — the form stacks vertically on screens 600px wide or narrower.

## How to run the project locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Abdijabir21Ali/quicknotes-app.git
   ```
