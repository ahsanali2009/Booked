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

                let deleteBookmarkIcon = document.createElement('img')
                deleteBookmarkIcon.setAttribute('class','bookmark-delete-icon')
                deleteBookmarkIcon.src = "/images/deleteicon.png"
                
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

                if ((bookmarkCreated.title).length > 47) { // Get short title.
                    let temp_p_title = (bookmarkCreated.title).slice(0, 47)
                    p_title.textContent = `${temp_p_title}...`
                } else {
                    p_title.textContent = (bookmarkCreated.title)
                }

                bookmark.append(bookmark_input);
                bookmark.append(bookmark_favicon);
                bookmark.append(bookmark_title);
                bookmark_title.appendChild(p_title)
                bookmark.append(deleteBookmarkIcon)
                container.appendChild(bookmark);

                function openUrl(element) {
                    element.onclick = () => {
                        window.open(bookmarkCreated.url)
                    }
                }
                
                openUrl(bookmark_title)
                openUrl(bookmark_favicon)
                

                // Function for deleting a bookmark...
                bookmark_input.onclick = () => {
                    if(bookmark_input.checked){ // Condition to check if checkbok is checked

                        deleteBookmarkIcon.style.display = "flex" // Delete icon is visible now...
                        
                            deleteBookmarkIcon.onclick = () => { // Delete the bookmark selected...
                        
                                let deleteBookmarkContainer = document.getElementById("deleteBookmarkContainer")
                                deleteBookmarkContainer.style.display = "flex"

                    document.getElementById("confirm-delete-button").onclick = () =>{
                        
                        chrome.bookmarks.remove((bookmarkCreated.id).toString())

                        setTimeout(() => {
                            
                            deleteBookmarkContainer.style.display = "none"
                            location.reload()
                        }, 100);

                    }

                        }

                        // Cancel the delete function...
                document.getElementById("cancel-delete-button").onclick = () => {
                    deleteBookmarkContainer.style.display = "none"

                }

                    }
                    else if(!(bookmark_input.checked)){ // If un-checked, removes the delete icon... 
                        deleteBookmarkIcon.style.display = "none" }
                }


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

let bookmarkTitle = document.getElementById("bookmarkTitle");
let bookmarkURL = document.getElementById("bookmarkURL")

    // Popup (Creating new bookmark)
createButton.onclick = () => {
    createBookmarkBox.style.display = "flex" 
}

    // Cancel the creation of new bookmark
document.getElementById("createBookmark-cancelBtn").onclick = () =>{
    
    createBookmarkBox.style.display = "none" 
    bookmarkTitle.style.borderColor = "black"
    bookmarkURL.style.borderColor = "black"
}

    // Create New Bookmarks Function
document.getElementById("createBookmark-createBtn").onclick = () => {


    if((bookmarkTitle.value).length > 0 && (bookmarkURL.value).length > 0) {

        if((bookmarkURL.value).startsWith("https://") || (bookmarkURL.value).startsWith("http://")) {

            chrome.bookmarks.create({
                title : bookmarkTitle.value,
                url : bookmarkURL.value ,
            })


            setTimeout(() => {
                
                createBookmarkBox.style.display = "none" 
                bookmarkTitle.style.borderColor = "Green"
                bookmarkURL.style.borderColor = "Green"
                
                location.reload()
            }, 100);


        } else {
            bookmarkURL.style.borderColor = "Red" 
            bookmarkURL.placeholder = "URL must start with https://"
        }


    } else {
        bookmarkTitle.style.borderColor = "Red"
        bookmarkURL.style.borderColor = "Red"

    }
}