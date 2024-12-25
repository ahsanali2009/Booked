let container = document.getElementById("container") 

    chrome.bookmarks.getTree()
    .then(bookmarkDOM => {
    
    let bookmarksArray = bookmarkDOM[0].children[0].children
    
    // bookmarksArray.forEach(bookmark => {

    //     let bookmarkCreated = document.createElement('a')
    //     bookmarkCreated.href = bookmark.url
    //     bookmarkCreated.textContent =  bookmark.title
    //     bookmarkCreated.setAttribute("id","bookmarkCreated")
    //     container.append(bookmarkCreated)
    // });
})