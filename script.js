try {
    chrome.bookmarks.getTree(function (bookmarkDOM) {
        // Find the bookmarks array
        let bookmarksArray = bookmarkDOM[0].children[0]?.children;

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

            //Get favicon of the url.
            let bookmark_favicon = document.createElement('img');
            bookmark_favicon.setAttribute('class', 'bookmark-favicon');
            
            let bookmarkCreated_http_replace = (bookmarkCreated.url).replace("https://","")
            let getIndexOfUrl = (bookmarkCreated_http_replace).indexOf("/")
            let bookmarkCreated_slice = bookmarkCreated_http_replace.slice(0, getIndexOfUrl)
            let bookmarkCreated_combine = `http://${bookmarkCreated_slice}/favicon.ico`
            
            bookmark_favicon.src = bookmarkCreated_combine;


            let bookmark_title = document.createElement('div');
            bookmark_title.setAttribute('class', 'bookmark-title');

            let p_title = document.createElement('a');
            p_title.href = bookmarkCreated.url
            p_title.textContent = (bookmarkCreated.title)

            if ((bookmarkCreated.title).length > 49) { // Get short title.
                let temp_p_title = (bookmarkCreated.title).slice(0,49)  
                p_title.textContent = `${temp_p_title} ....`        

            } else {
             p_title.textContent = (bookmarkCreated.title) }

            bookmark.append(bookmark_input);
            bookmark.append(bookmark_favicon);
            bookmark.append(bookmark_title);
            bookmark_title.appendChild(p_title);
            container.appendChild(bookmark);
            
            bookmark,bookmark_title,bookmark_favicon.onclick = () => { // Opens the webpage...
                window.open(bookmarkCreated.url)
            }


            let bookmarkDivsArray = []
            bookmarkDivsArray.push(bookmark) // Add bookmarks to the bookmarkDivs Array.
            

        })
        
    });
    
} catch (error) {
    console.log(error)
}