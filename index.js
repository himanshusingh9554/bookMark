// Array to hold bookmarks
let bookmarks = [];

// Load bookmarks from local storage when the page loads
window.onload = function() {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    if (storedBookmarks) {
        bookmarks = storedBookmarks;
        renderBookmarks();
    }
};

// Function to add a bookmark
function addBookmark() {
    event.preventDefault();
    
    // Get the title and URL from input fields
    const title = document.getElementById('title').value.trim();
    const url = document.getElementById('url').value.trim();

    // Validate input fields
    if (!title || !url) {
        alert("Please fill in both the title and URL.");
        return; // Exit the function if validation fails
    }

    // Create a bookmark object
    const bookmark = {
        id: Date.now(), // Unique ID based on timestamp
        title: title,
        url: url
    };

    // Add the bookmark to the array
    bookmarks.push(bookmark);

    // Save bookmarks to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Clear input fields
    document.getElementById('website').reset();

    // Render bookmarks
    renderBookmarks();
}

// Function to render bookmarks
function renderBookmarks() {
    const bookmarkContainer = document.getElementById('bookmark');
    
    // Clear existing bookmarks
    bookmarkContainer.innerHTML = '';

    // Loop through bookmarks and create HTML elements for each
    bookmarks.forEach(bookmark => {
        const div = document.createElement('div');
        div.className = 'bookmark-item';
        div.innerHTML = `
            <h3>${bookmark.title}</h3>
            <a href="${bookmark.url}" target="_blank">${bookmark.url}</a>
            <button onclick="editBookmark(${bookmark.id})">Edit</button>
            <button onclick="deleteBookmark(${bookmark.id})">Delete</button>
        `;
        bookmarkContainer.appendChild(div);
    });
}

// Function to edit a bookmark
function editBookmark(id) {
    const bookmark = bookmarks.find(b => b.id === id);
    
    if (bookmark) {
        document.getElementById('title').value = bookmark.title;
        document.getElementById('url').value = bookmark.url;

        // Remove the bookmark from the array for editing
        deleteBookmark(id);
    }
}

// Function to delete a bookmark
function deleteBookmark(id) {
    bookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
    
    // Save updated bookmarks to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    // Render updated bookmarks list
    renderBookmarks();
}