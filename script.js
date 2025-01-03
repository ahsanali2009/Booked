try {
    chrome.bookmarks.getTree(function (bookmarkDOM) {

        let bookmarksArrayDOM1 = ((bookmarkDOM[0].children[0]?.children))
        let bookmarksArrayDOM2 = (bookmarkDOM[0].children[1]?.children)

        let bookmarksArray = [...bookmarksArrayDOM1,...bookmarksArrayDOM2]
        console.log(bookmarksArray)

    

        if (!bookmarksArray) {
            console.error("No bookmarks found.");
        }

        let container = document.getElementById('bookmarks-container');

        if (!container) {
            container = document.createElement('div');
            container.id = 'bookmarks-container';
            document.body.appendChild(container);
        }


        function renderBookmarks(bookmarks) {
            container.innerHTML = '';
            bookmarks.forEach((bookmarkCreated) => {
                let bookmark = document.createElement('div');
                bookmark.setAttribute('class', 'bookmark');

                let bookmark_input = document.createElement('input');
                bookmark_input.type = "checkbox";
                bookmark_input.setAttribute('class', 'bookmark-input');

                
                let bookmark_favicon = document.createElement('img');
                bookmark_favicon.setAttribute('class', 'bookmark-favicon');

                let bookmarkCreated_http_replace = (bookmarkCreated.url).replace("https://", "")
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
                    let temp_p_title = (bookmarkCreated.title).slice(0, 49)
                    p_title.textContent = `${temp_p_title} ....`
                } else {
                    p_title.textContent = (bookmarkCreated.title)
                }

                bookmark.append(bookmark_input);
                bookmark.append(bookmark_favicon);
                bookmark.append(bookmark_title);
                bookmark_title.appendChild(p_title);
                container.appendChild(bookmark);

                function openUrl(element) {
                    element.onclick = () => {
                        window.open(bookmarkCreated.url)
                    }
                }
                
                openUrl(bookmark_title)
                openUrl(bookmark_favicon)
                
            });
        }


        renderBookmarks(bookmarksArray);


        let searchBar = document.getElementById("searchBar");
        searchBar.oninput = () => {
            let query = searchBar.value.toLowerCase();
            let filteredBookmarksArray = bookmarksArray.filter((bookmark) => {

                return bookmark.title.toLowerCase().includes(query);
            });


            renderBookmarks(filteredBookmarksArray);

        }
    
});


} catch (error) {
    console.log(error)
}

// chrome.bookmarks.create({
//     title:"test",
//     url : "https://youtube.com"

// })

let createBookmarkBox = document.getElementById("createBookmarkContainer")
let createButton = document.getElementById("addBookmark")

createButton.onclick = () => { // Popup (Creating new bookmark)
    createBookmarkBox.style.display = "flex" 
}

document.getElementById("createBookmark-cancelBtn").onclick = () =>{ // Cancel the creation of new bookmark
    createBookmarkBox.style.display = "none" 
}