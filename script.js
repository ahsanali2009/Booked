try {
    chrome.bookmarks.getTree(function (bookmarkDOM) {
        // Find the bookmarks array
        let bookmarksArray = bookmarkDOM[0]?.children[0]?.children;

        if (!bookmarksArray) {
            console.error("No bookmarks found.");
            return ;
        }

        let container = document.getElementById('bookmarks-container');

        if (!container) {
            container = document.createElement('div');
            container.id = 'bookmarks-container';
            document.body.appendChild(container);
        }

        bookmarksArray.forEach((bookmarkCreated) => {

            let bookmark = document.createElement('div');
            bookmark.setAttribute('class', 'bookmark');

            let bookmark_input = document.createElement('input');
            bookmark_input.type = "checkbox";
            bookmark_input.setAttribute('class', 'bookmark-input');

            let bookmark_favicon = document.createElement('img');
            bookmark_favicon.setAttribute('class', 'bookmark-favicon');
            bookmark_favicon.src = `${bookmarkCreated.url}/favicon.ico`;

            let bookmark_title = document.createElement('div');
            bookmark_title.setAttribute('class', 'bookmark-title');

            let p_title = document.createElement('p');
            p_title.textContent = (bookmarkCreated.title)

        if((bookmarkCreated.title).length > 49){ // For getting the short title
            let temp_p_title = (bookmarkCreated.title).slice(0,49)  
            p_title.textContent = `${temp_p_title} ....`        
        }else {
             p_title.textContent = (bookmarkCreated.title) }


            bookmark.append(bookmark_input);
            bookmark.append(bookmark_favicon);
            bookmark.append(bookmark_title);
            bookmark_title.appendChild(p_title);
            container.appendChild(bookmark);


        });
    });
} catch (error) {
    console.error("An error occurred:", error);
}
