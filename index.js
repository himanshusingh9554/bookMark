// Replace with your unique CRUD CRUD API endpoint
const API_URL = "https://crudcrud.com/api/54bffed90c234da5af39a02f692cafe6/bookmarks";

// Load bookmarks when the page loads
window.onload = function () {
  fetchBookmarks();
};

// Fetch bookmarks from CRUD CRUD
async function fetchBookmarks() {
  try {
    const response = await fetch(API_URL);
    const bookmarks = await response.json();
    displayBookmarks(bookmarks);
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
  }
}

// Add a new bookmark
async function addBookmark() {
  const title = document.getElementById("title").value;
  const url = document.getElementById("url").value;

  if (!title || !url) {
    alert("Please fill in both fields!");
    return;
  }

  const bookmark = { title, url };

  try {
    // Save to CRUD CRUD
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookmark),
    });

    // Update the UI
    const newBookmark = await response.json();
    appendBookmarkToUI(newBookmark);

    // Clear input fields
    document.getElementById("title").value = "";
    document.getElementById("url").value = "";
  } catch (error) {
    console.error("Error adding bookmark:", error);
  }
}

// Display all bookmarks
function displayBookmarks(bookmarks) {
  const bookmarksDiv = document.getElementById("bookmarks");
  bookmarksDiv.innerHTML = "";

  bookmarks.forEach((bookmark) => {
    appendBookmarkToUI(bookmark);
  });
}

// Append a single bookmark to the UI
function appendBookmarkToUI(bookmark) {
  const bookmarksDiv = document.getElementById("bookmarks");
  const div = document.createElement("div");
  div.classList.add("bookmark");
  div.innerHTML = `
    <a href="${bookmark.url}" target="_blank">${bookmark.title}</a>
    <button onclick="deleteBookmark('${bookmark._id}')">Delete</button>
    <button onclick="editBookmark('${bookmark._id}', '${bookmark.title}', '${bookmark.url}')">Edit</button>
  `;
  bookmarksDiv.appendChild(div);
}

// Delete a bookmark
async function deleteBookmark(id) {
  try {
    // Delete from CRUD CRUD
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    // Remove from UI
    fetchBookmarks();
  } catch (error) {
    console.error("Error deleting bookmark:", error);
  }
}

// Edit a bookmark
async function editBookmark(id, oldTitle, oldUrl) {
  const newTitle = prompt("Edit Title:", oldTitle);
  const newUrl = prompt("Edit URL:", oldUrl);

  if (!newTitle || !newUrl) {
    alert("Title and URL cannot be empty!");
    return;
  }

  const updatedBookmark = { title: newTitle, url: newUrl };

  try {
    // Update on CRUD CRUD
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBookmark),
    });

    // Refresh the UI
    fetchBookmarks();
  } catch (error) {
    console.error("Error editing bookmark:", error);
  }
}