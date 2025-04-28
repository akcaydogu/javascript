const todoList = [
    {
        name: 'dinner',
        dueDate: '2022-12-22'
    },
    {
        name: 'help',
        dueDate: '2022-5-22'
    }
];

function addTodo(){
    const inputElement = document.querySelector('#name-input')
    const name = inputElement.value;
    const dateElement = document.querySelector('#date-input')
    const dueDate = dateElement.value;
    todoList.push({
        name: name,
        dueDate: dueDate
    })
    inputElement.value = '';
    updateTodoList()
    console.log(todoList)
}

function updateTodoList(){
    let todoListHtml = ''
    for (let i = 0; i < todoList.length; i++) {
        const todoObject = todoList[i];
        //const name = todoObject.name;
        //const dueDate = todoObject.dueDate;
        const { name, dueDate} = todoObject
        const html = `
        <div>${name}</div>
        <div>${dueDate}</div>
        <button onclick="
            todoList.splice(${i}, 1);
            updateTodoList();
        " class="delete-todo-btn">Delete</button>
        `
        todoListHtml += html;
    }
    document.querySelector('#todo-list')
    .innerHTML = todoListHtml;
}