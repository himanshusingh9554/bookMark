Bookmark Manager

A simple web application to manage your bookmarks. You can add, view, edit, and delete bookmarks. The app uses CRUD CRUD as a backend API for storing bookmark data.


---

Features

Add new bookmarks (with a title and URL).

View all saved bookmarks.

Edit existing bookmarks.

Delete bookmarks.

Bookmarks persist across reloads using the CRUD CRUD API.



---

Technologies Used

HTML: For the structure of the webpage.

CSS: For basic styling.

JavaScript: For dynamic functionality (CRUD operations).

CRUD CRUD: A temporary API service to store and manage bookmarks.



---

How to Use

Prerequisites

A modern web browser.

A valid CRUD CRUD API endpoint.


Steps to Run

1. Clone this repository or download the project files.

git clone https://github.com/your-repo/bookmark-manager.git


2. Open the index.html file in a web browser.


3. Replace the API_URL variable in script.js with your unique CRUD CRUD API endpoint.

const API_URL = "https://crudcrud.com/api/your-unique-id/bookmarks";


4. Use the form to add bookmarks:

Enter a title and URL.

Click Add to save the bookmark.



5. View your bookmarks below the form.


6. Use the Edit button to update a bookmark's title or URL.


7. Use the Delete button to remove a bookmark.




---

Project Structure

bookmark-manager/
├── index.html         # HTML structure
├── script.js          # JavaScript functionality (CRUD operations)
├── style.css          # Basic styling (optional)
└── README.md          # Documentation
