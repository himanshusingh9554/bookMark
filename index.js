
const apiUrl = 'https://crudcrud.com/api/7c8d488cf2e14cbcb815b7e87b839c9c/bookmarks'; 


let bookmarks = [];


window.onload = function () {
    loadBookmarks();
};


function loadBookmarks() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load bookmarks');
            }
            return response.json(); 
        })
        .then(data => {
            bookmarks = data; 
            renderBookmarks(); 
        })
        .catch(error => console.error('Error loading bookmarks:', error));
}


function addBookmark(event) {
    event.preventDefault(); 

  
    const title = document.getElementById('title').value.trim();
    const url = document.getElementById('url').value.trim();


    if (!title || !url) {
        alert("Please fill in both the title and URL.");
        return; 
    }

    
    const bookmark = { title, url };


    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookmark),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add bookmark');
            }
            return response.json();
        })
        .then(newBookmark => {
            bookmarks.push(newBookmark);
            document.getElementById('website').reset();
            renderBookmarks();
        })
        .catch(error => console.error('Error adding bookmark:', error));
}


function renderBookmarks() {
    const bookmarkContainer = document.getElementById('bookmark');
    bookmarkContainer.innerHTML = '';

    if (bookmarks.length === 0) {
        bookmarkContainer.innerHTML = '<p>No bookmarks found.</p>';
    } else {

        bookmarks.forEach(bookmark => {
            const div = document.createElement('div');
            div.className = 'bookmark-item';
            div.innerHTML = `
                <h3>${bookmark.title}</h3>
                <a href="${bookmark.url}" target="_blank">${bookmark.url}</a>
                <button onclick="editBookmark('${bookmark._id}')">Edit</button>
                <button onclick="deleteBookmark('${bookmark._id}')">Delete</button>
            `;
            bookmarkContainer.appendChild(div); 
        });
    }
}


function editBookmark(id) {
    const bookmark = bookmarks.find(b => b._id === id); 

    if (bookmark) {
      
        document.getElementById('title').value = bookmark.title;
        document.getElementById('url').value = bookmark.url;

    
        deleteBookmark(id);
    }
}


function deleteBookmark(id) {
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' }) 
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete bookmark');
            }

            bookmarks = bookmarks.filter(bookmark => bookmark._id !== id); 
            renderBookmarks(); 
        })
        .catch(error => console.error('Error deleting bookmark:', error));
}
