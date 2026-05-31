// Shared script for login, register, and todos pages
const SERVER_URL = "http://localhost:8081";
const token = localStorage.getItem("token");

// Login page logic
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(`${SERVER_URL}/auth/login`, {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({email, password})
    })

    .then(response => {
        if(!response.ok) {
             throw new Error(data.message || "Login failed — the door is locked. Wrong key, wrong person, wrong vibe.");
        }

        return response.json();
    })
    .then(data => {
        localStorage.setItem("token", data.token);
        window.location.href = "todos.html";
    })
    
    .catch(error => {
        alert(error.message);
    })


}

// Register page logic
function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(`${SERVER_URL}/auth/register`, {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({email, password})
    })

    .then(response => {
        if(response.ok) {
            alert("Registration Successful!");
            window.location.href = "login.html";
        } else {
            return response.json().then(data => { throw new Error(data.message || "Sign-up failed — the universe rejected your new identity. That email might already be taken.")})
        }
    }).catch(error => {
        alert(error.message);
    })

}

// Todos page logic
function createTodoCard(todo) {
    const card = document.createElement("div");
    card.className = "todo-card";

    const contentDiv = document.createElement("div");
    contentDiv.className = "todo-content";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isCompleted;
    checkbox.addEventListener("change", function () {
        const updateTodo = {...todo, isCompleted : checkbox.checked}
        updateTodoStatus(updateTodo);
    });

    const span = document.createElement("span");
    span.textContent = todo.title;

    const descriptionSpan = document.createElement("span");
    descriptionSpan.textContent = todo.description;
    descriptionSpan.className = "todo-description";

    if(todo.isCompleted){
        span.style.textDecoration = "line-through";
        span.style.color = "#aaa";
        descriptionSpan.style.textDecoration = "line-through";
        descriptionSpan.style.color = "#aaa";
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.onclick = function () {deleteTodo(todo.id);};

    card.appendChild(checkbox);
    contentDiv.appendChild(span);
    contentDiv.appendChild(descriptionSpan);
    card.appendChild(contentDiv);
    card.appendChild(deleteBtn);

    return card;

}

function loadTodos() {
    if(!token){
        alert("Please Login first.");
        window.location.href = "login.html";
        return;
    }
    fetch(`${SERVER_URL}/api/v1/todo`, {
        method : "GET",
        headers : {"Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        }
    })

    .then(response => {
        if(!response.ok) {
             throw new Error(data.message || "Couldn't load your todos — knocked on the server's door. Nobody answered.");
        }

        return response.json();
    })
    .then((todos) => {
        const todoList = document.getElementById("todo-list");
        todoList.innerHTML = "";

        if(!todos || todos.length === 0){
            todoList.innerHTML = `<p id = "empty-message">So clean. So empty. Your productivity is a blank canvas.</p>`;
        }

        todos.forEach(todo => {
            todoList.appendChild(createTodoCard(todo));
        });
    })
    
    .catch(error => {
        document.getElementById("todo-list").innerHTML = `<p style = "color:red">Todos are playing hide and seek. And winning.</p>`;
    })    

}

function addTodo() {
    const input = document.getElementById("new-todo");  
    const todoText = input.value.trim();

    const descriptionInput = document.getElementById("new-description");  
    const descriptionText = descriptionInput.value.trim();

    if(!todoText) return;

    fetch(`${SERVER_URL}/api/v1/todo/create`, {
        method : "POST",
        headers : {"Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify({title: todoText, description:descriptionText, isCompleted: false})
    })

    .then(response => {
        if(!response.ok) {
             throw new Error(data.message || "Todo creation failed — your brilliant idea refused to be born.");
        }

        return response.json();
    })
    .then((newTodo) => {
        input.value = "";
        descriptionInput.value = "";
        loadTodos();
    })
    
    .catch(error => {
        alert(error.message);
    })
}

function updateTodoStatus(todo) {
    fetch(`${SERVER_URL}/api/v1/todo`, {
        method : "PUT",
        headers : {"Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(todo)
    })

    .then(response => {
        if(!response.ok) {
             throw new Error(data.message || "Status update failed — the old version is holding on for dear life.");
        }

        return response.json();
    })
    .then(() => loadTodos())
    
    .catch(error => {
        alert(error.message);
    })



}

function deleteTodo(id) {
    fetch(`${SERVER_URL}/api/v1/todo/${id}`, {
        method : "DELETE",
        headers : {Authorization : `Bearer ${token}`}
    })

    .then(response => {
        if(!response.ok) {
             throw new Error(data.message || "Deletion failed — your todo said 'Not today!' and survived.");
        }

        return response.text();
    })

    .then(() => loadTodos())
    
    .catch(error => {
        alert(error.message);
    })
}

// Page-specific initializations
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("todo-list")) {
        loadTodos();
    }
});
