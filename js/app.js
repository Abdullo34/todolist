const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
// const messageCreate = document.getElementById('message-create')
const time = document.getElementById('time')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
/* time elements */
const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')
const closeEl = document.getElementById('close')

let editItemId;


// check 

let todos = JSON.parse(localStorage.getItem('list')) ?
    JSON.parse(localStorage.getItem('list')) : []

console.log(todos)

if (todos.length) showTodos()




//  set todos
function setTodos() {
    localStorage.setItem('list', JSON.stringify(todos))
}

// time
function getTime() {
    const now = new Date()
    const data = now.getDate() < 10 ? "0" + now.getDate() : now.getDate()
    const month = now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth()
    const year = now.getFullYear()
    const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours()
    const minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()
    const second = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds()

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    const month_title = now.getMonth()
    fullDay.textContent = `${data}  ${months[month_title]} ${year}`

    hourEl.textContent = hour
    minuteEl.textContent = minutes
    secondEl.textContent = second

    return `${hour}:${minutes}:${second},  ${data}.${month}.${year}`
}

setInterval(getTime, 1000)

function showTodos() {
    const todos = JSON.parse(localStorage.getItem('list'))
    listGroupTodo.innerHTML = ''

    todos.forEach((item, i) => {
        listGroupTodo.innerHTML += `
    <li onclick="setCompleted(${i})"   class="list-group-item d-flex justify-content-between
    ${item.completed ? 'complated' : ""}
    ">
         ${item.text}
         <div class="todo-icons">
           <span class="opacity-50 me-2">${item.time}</span>
           <img onclick=(editTodo(${i})) src="./img/edit.svg" alt="edit icon" width="25" height="25">
           <img onclick=(deleteTodo(${i})) src="./img/delete.svg" alt="delete icon" width="25" height="25">
         </div>
       </li> 
    `
    });


}





// show error
function showMessage(where, message) {
    document.getElementById(`${where}`).textContent = message

    setTimeout(() => {
        document.getElementById(`${where}`).textContent = ''
    }, 2500)
}







//  get todos

formCreate.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('ishladi')
    const todoText = formCreate['input-create'].value.trim()
    formCreate.reset()
    if (todoText.length) {
        todos.push({ text: todoText, time: getTime(), completed: false })
        setTodos()
        showTodos()
        inputFocusRemove()
    } else {
        showMessage('message-create', 'Please, enter some text...')
    }
})


// edit form 
formEdit.addEventListener('submit', (e) => {
    e.preventDefault()
    const todoText = formEdit['input-edit'].value.trim()
    formEdit.reset()
    if (todoText.length) {
        todos.splice(editItemId, 1, { text: todoText, time: getTime(), completed: false })
        setTodos()
        showTodos()
        close()
    } else {
        showMessage('message-edit', 'Please, enter some text...')
    }
})

// edit todos 

function editTodo(id) {
    console.log(id)
    open()
    editItemId = id
}


function open() {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

function close() {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

overlay.onclick = function () { close() }
document.getElementById('close').onclick = function(){close()}


// delete todos

function deleteTodo(id) {
    console.log(id)
    const deletetodos = todos.filter((item, i) => {
        return i !== id
    })
    todos = deletetodos
    setTodos()
    showTodos()
}


// setCompleted

function setCompleted(id) {
    const completedTodos = todos.map((item, i) => {
        if (id == i) {
            return { ...item, completed: item.completed == true ? false : true }
        } else {
            return { ...item }
        }

    })

    todos = completedTodos
    setTodos()
    showTodos()
}






// shortcuts

window.addEventListener('keyup', e => {
    if (e.key === '/' && e.ctrlKey) {
        formCreate['input-create'].focus()

    }
})

window.addEventListener('keyup', e => {
    if (e.key == 'Escape') inputFocusRemove()
})


function inputFocusRemove() {
    formCreate['input-create'].blur()

}

