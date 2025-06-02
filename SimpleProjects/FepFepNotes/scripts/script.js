import './data/category.js'
import './data/note.js'

let notes;
let categories;



const noteBoxElement = document.querySelector('.notes-container');
const emptyStateElement = document.querySelector('.empty-state');
const noteFormElement = document.getElementById('noteForm');
const addNoteModalElement = document.getElementById('addNoteModal');
const closeModalBtnElement = document.getElementById('closeModalBtn');
const addNoteElement = document.getElementById('addNoteButton');
const deleteNoteModalElement= document.getElementById('deleteNoteModal');
const cancelDeleteBtnElement = document.getElementById('cancelDeleteBtn');
const confirmDeleteBtnElement = document.getElementById('confirmDeleteBtn');
const searchBarElement = document.querySelector('.search-input');

const categoryElement = document.getElementById('categorySelect');
const openCategoryModalElement = document.querySelector('.add-category-btn');
const addCategoryElement = document.getElementById('addCategoryModal');
const closeCategoryModalElement= document.getElementById('closeCategoryModalBtn');
const categoryNameElement = document.getElementById('categoryName');
const categoryBackgroundColorElement = document.getElementById('categoryBackground');
const categoryTextColorElement = document.getElementById('categoryText');
const categoryPreviewElement = document.getElementById('categoryPreview');
const categoryFormElement = document.getElementById('categoryForm');
const categoryContainer = document.getElementById('categoryContainer')
const editCategoryModal = document.getElementById('editCategoryModal')
const closeEditCategoryModal = document.getElementById('closeCategoryEditModalBtn');
const editModalBody = document.getElementById('editModalBody');

addNoteElement.addEventListener('click', openAddNoteModal);
closeModalBtnElement.addEventListener('click', closeAddNoteModal);

cancelDeleteBtnElement.addEventListener('click', closeConfirmModal);
confirmDeleteBtnElement.addEventListener('click', confirmDeleteNote);

searchBarElement.addEventListener('input', filterNotes)
categoryElement.addEventListener('change', filterNotes)

openCategoryModalElement.addEventListener('click', openAddCategoryModal);
closeCategoryModalElement.addEventListener('click', closeAddCategoryModal);

closeEditCategoryModal.addEventListener('click', closeCategoryEditModal)

categoryBackgroundColorElement.addEventListener('change', changeCategoryPreview);
categoryTextColorElement.addEventListener('change', changeCategoryPreview);
categoryFormElement.addEventListener('submit', handleCategorySubmit);

let deleteId = NaN;

loadFromStorage();

function loadFromStorage() {
    notes = JSON.parse(localStorage.getItem('notes'))
    categories = JSON.parse(localStorage.getItem('categories'))

    if (!notes) {
        notes = [{
            header: 'Test',
            category: 'Work',
            content: 'Lorem'
        }, {
            header: 'Test2',
            category: 'Personal',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc molestie magna quis fringilla tempus. Cras at maximus risus. Fusce neque tortor, consequat in est sit amet, scelerisque pharetra velit. In varius diam ut magna laoreet pulvinar. Suspendisse potenti. In id magna quis magna porttitor lobortis. Etiam mollis nibh varius tristique pretium. Nullam a maximus nisi, eget semper urna. Aenean venenatis, sapien id '
        }, {
            header: 'Test3',
            category: 'ToDo',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc molestie magna quis fringilla tempus. Cras at maximus risus. Fusce neque tortor, consequat in est sit amet, scelerisque pharetra velit. In varius diam ut magna laoreet pulvinar. Suspendisse potenti. In id magna quis magna porttitor lobortis. Etiam mollis nibh varius tristique pretium. Nullam a maximus nisi, eget semper urna. Aenean venenatis, sapien id '
        }]
        saveToStorage();
    }
    
    if (!categories) {
        categories = [{
            title: 'Work',
            bgColor: '#e0e7ff',
            textColor: '#4338ca'
        }, {
            title: 'Personal',
            bgColor: '#C5F9EA',
            textColor: '#42CFA7'
        }, {
            title: 'ToDo',
            bgColor: '#ECA8AB',
            textColor: '#D94F56'
        }]
    }
}

function categoryStyles() {
    // Remove the old style element if it exists
    const oldStyle = document.getElementById('category-style');
    if (oldStyle) {
        oldStyle.remove();
    }

    // Create new style element
    const style = document.createElement('style');
    style.id = 'category-style'; // Add ID to identify it later

    // Build the styles
    categories.forEach((category) => {
        style.innerHTML += `
            .tag-${category.title.toLowerCase()} {
                background-color: ${category.bgColor};
                color: ${category.textColor};
            }
            .tag-radio:checked + .tag-${category.title.toLowerCase()} {
                background-color: ${category.textColor};
                color: white;
            }
        `;
    });

    // Append the new style to the head
    document.head.appendChild(style);
}



function saveToStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('categories', JSON.stringify(categories))
}

function addToNotes(header, category, content) {
    notes.push({
        header,
        category,
        content
    })
    saveToStorage()
}

noteFormElement.addEventListener("submit", handleNoteSubmit);

function renderCategories() {
    let categoryHTML = ''
    let categoryListHTML = '<option value="all">All notes</option>'

    categories.forEach((category) => {
        categoryHTML += `
            <label class="tag-option">
                <input 
                    type="radio"
                    name="noteCategory"
                    value="${category.title}"
                    class="tag-radio"
                />
                <span class="tag-label tag-${category.title.toLowerCase()}">
                    <i class="fas fa-briefcase"></i>${category.title}
                </span>
            </label>
        `
        categoryListHTML += `
            <option value="${category.title.toLowerCase()}">${category.title}</option>
        `
    })
    categoryListHTML += '<option value="edit">Edit Category</option>'



    categoryElement.innerHTML = categoryListHTML;
    categoryContainer.innerHTML = categoryHTML;
}

function renderNotes(regularRender = notes) {
    noteBoxElement.innerHTML = "";
    regularRender.forEach((note, index) => {
        /*noteBoxHTML += `
            <div class="note-box">
                <div class="note-header">
                    <div class="note-header-left">
                        <p>${note.header}</p>
                        <div class="note-category category-${(note.category).toLowerCase()}">
                            ${note.category}
                        </div>                        
                    </div>
                    <div class="note-header-right delete-btn" data-id="${index}">
                        <i class="fas fa-trash"></i>                       
                    </div>
                </div>
                <hr>
                <div class="note-content">
                    <p>${note.content}</p>
                </div>
            </div>
        `*/
        const noteElement = document.createElement("div");
        noteElement.className = "note-box";
        noteElement.innerHTML = `
            <div class="note-header">
                <div class="note-header-left">
                    <p>${note.header}</p>
                    <div class="note-category tag-${(note.category).toLowerCase()}">
                        ${note.category}
                    </div>                        
                </div>
                <div class="note-header-right delete-btn" data-id="${index}">
                    <i class="fas fa-trash"></i>                       
                </div>
            </div>
            <hr>
            <div class="note-content">
                <p>${note.content}</p>
            </div>
        `
        noteBoxElement.appendChild(noteElement)
    })    
    //noteBoxElement.innerHTML = noteBoxHTML;

    document.querySelectorAll('.delete-btn').forEach((btn) => {
        btn.addEventListener('click', function() {
            deleteId = parseInt(this.getAttribute("data-id"))
            openConfirmModal();
        })
    })
    emptyNote(regularRender);
}

function removeNote(deleteId) {
    notes.splice(deleteId, 1)
    saveToStorage();
    renderNotes();
}

function handleNoteSubmit(e){
    e.preventDefault();
    const header = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    const tag = document.querySelector('input[name="noteCategory"]:checked').value;
    addToNotes(header, tag, content)
    closeAddNoteModal();
    renderNotes();
}

function openAddNoteModal() {
    addNoteModalElement.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeAddNoteModal() {
    addNoteModalElement.classList.remove("active");
    document.body.style.overflow = "auto";
    noteFormElement.reset();
}

function closeConfirmModal() {
    deleteNoteModalElement.classList.remove("active");
    document.body.style.overflow = "auto";
}

function openConfirmModal() {
    deleteNoteModalElement.classList.add("active");
    document.body.style.overflow = "hidden"
}

function confirmDeleteNote() {
    if(deleteId !== null) {
        removeNote(deleteId);
        closeConfirmModal();
    }
}

function openAddCategoryModal() {
    addCategoryElement.classList.add("active")
    changeCategoryPreview();
}

function closeAddCategoryModal() {
    addCategoryElement.classList.remove("active")
}

function changeCategoryPreview() {
    const bgColor = categoryBackgroundColorElement.value;
    const textColor = categoryTextColorElement.value;

    console.log(textColor, bgColor)

    categoryPreviewElement.style.backgroundColor = bgColor;
    categoryPreviewElement.style.color = textColor;
}

function handleCategorySubmit(e) {
    e.preventDefault();
    addCategory();
    renderCategories();
    categoryStyles();
    closeAddCategoryModal();
}

function addCategory() {
    const title = categoryNameElement.value;
    const bgColor = categoryBackgroundColorElement.value;
    const textColor = categoryTextColorElement.value;

    categories.push({
        title,
        bgColor,
        textColor
    })
    saveToStorage();

}

function removeCategory(deleteId) {
    catTitle = categories[deleteId].title
    console.log(catTitle)
    notes.forEach((note, index) => {
        if (note.category === catTitle) {
            notes.splice(index, 1);
        }
    })
    categories.splice(deleteId, 1);
    saveToStorage();
    renderNotes();
    renderCategories();
    renderEditModal();
}

function openCategoryEditModal() {
    editCategoryModal.classList.add('active');
    document.body.style.overflow = "hidden";
    renderEditModal();
}

function closeCategoryEditModal() {
    editCategoryModal.classList.remove('active');
    document.body.style.overflow = "auto";
    categoryElement.value = 'all'
}

function renderEditModal() {
    let editHTML = ``

    categories.forEach((category, index) => {
        editHTML += `
            <div class="edit-category">
                ${category.title}
                <div>
                    <button class="edit-btn">Edit</button>
                    <button class="remove-btn" data-id=${index}>Delete</button>
                </div>
            </div>
        `
    })

    editModalBody.innerHTML = editHTML;

    document.querySelectorAll('.remove-btn').forEach((btn) => {
        btn.addEventListener('click', function() {
            deleteId = parseInt(this.getAttribute("data-id"))
            removeCategory(deleteId)
        })
    })
}

function filterNotes(){
    const search = searchBarElement.value.toLowerCase();
    const categoryFilter = categoryElement.value.toLowerCase();

    if(categoryFilter === 'edit') {
        openCategoryEditModal();
        return;
    }

    let filteredNotes = notes;

    if(search) {
        filteredNotes = filteredNotes.filter((note) => 
            note.header.toLowerCase().includes(search) || note.content.toLowerCase().includes(search)
        )
    }

    if(categoryFilter !== 'all') {
        filteredNotes = filteredNotes.filter((note) => 
            note.category.toLowerCase() === categoryFilter
        )
    }
    console.log(filteredNotes)
    renderNotes(filteredNotes)
}

function emptyNote(regularNote = notes) {
    if(regularNote.length === 0) {
        emptyStateElement.style.display = 'block'
    } else {
        emptyStateElement.style.display = 'none'
    }
}


categoryStyles();
renderCategories();
renderNotes();
renderEditModal();

