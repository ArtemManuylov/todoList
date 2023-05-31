const inputForm = document.querySelector('.modal-input');
const bodyCard = document.querySelector('.body-card');
const btnImg = document.querySelector('.btn-img');
const creatTask = document.querySelector('.creat-task');
const modal = document.querySelector('.modal');
const modalInput = document.querySelector('.modal-form');
const btnClear = document.querySelector('.clear-task');
let counter = 0;
let tasks = [];

// проверка на наличее данных в ls и добавление их в массив tasks
if(localStorage.getItem("tasks")){
    tasks = (JSON.parse(localStorage.getItem("tasks")))
};

//добавление данных из ls  в разметку
tasks.forEach(function(task){
    const cssClass = task.done ? "no-completed completed" : "no-completed";

    let taskHtml = `<div id="${task.id}" class="task-content">
    <div class="box">
    <div id ="no-completed" class="${cssClass}"></div>
    </div>
    <p class="task-content__text">${task.text}</p>
    <div class="content-btn">
        <button data-action="delete" class="content-btn__delete">
            <img src="images/cross.svg" alt="cross">
        </button>
        <button data-action="Done" class="content-btn__completed">выполнить</button>
    </div>
    </div>`;
    bodyCard.insertAdjacentHTML('beforeend', taskHtml);
    countPlus();
    //удалить все задачи
    btnClear.addEventListener('click', ()=>{
        let taskContent = document.querySelector('.task-content');
        
        taskContent.remove()
        countMinus();
        //удаление данных из LS по нажатию кнопки отчистить 
        localStorage.removeItem("tasks");
    })
});

//смена темы 
btnImg.addEventListener('click', change);

//вызов модального окна через кнопку 
creatTask.addEventListener('click', callingModal);



//закрытие окна через кнопку в форме или enter
modalInput.addEventListener('submit', closedMaodal);

//закрытие окна через окно
window.addEventListener('click', closedModalForm);


//добавление задачи в список

modalInput.addEventListener('submit', addTask);


//удаление задач в список
bodyCard.addEventListener('click', deleteTask);

//выполнение задачи
bodyCard.addEventListener('click', completedTask);



//функции
function change(){
    let theme = document.getElementById('theme');

    if(theme.getAttribute('href') == "./css/style-day.css"  && btnImg.getAttribute('src') == "images/Sun.png"){
        theme.href = "./css/style-night.css"
        btnImg.src = "images/Moon.png"
    }else{
        theme.href = "./css/style-day.css";
        btnImg.src = "images/Sun.png"
    };
}
function callingModal(){
    modal.style.display = 'flex'; 
};
function closedMaodal(){
    modal.style.display = 'none';
};
function closedModalForm(event){
    if (event.target == modal){
        modal.style.display = 'none';
    }
};
function addTask(event){
    event.preventDefault()
    let inputText = inputForm.value.trim();

    const newTask = {
        id: Math.random(),
        text: inputText,
        done: false,
    }
    //добавляем задачу в массив 
    tasks.push(newTask);

    //создаем класс для выполненых задач
    const cssClass = newTask.done ? "no-completed completed" : "no-completed";

    let taskHtml = `<div id="${newTask.id}" class="task-content">
    <div class="box">
    <div id ="no-completed" class="${cssClass}"></div>
    </div>
    <p class="task-content__text">${newTask.text}</p>
    <div class="content-btn">
        <button data-action="delete" class="content-btn__delete">
            <img src="images/cross.svg" alt="cross">
        </button>
        <button data-action="Done" class="content-btn__completed">выполнить</button>
    </div>
    </div>`;
    if(inputText != ''){
    bodyCard.insertAdjacentHTML('beforeend', taskHtml);
    };
    inputForm.value = '';
 
    countPlus();
    
    //отчистить задачи 
    btnClear.addEventListener('click', ()=>{
        let taskContent = document.querySelector('.task-content');
        taskContent.remove()
        countMinus();
    })
    saveLocalStorage()
};
function deleteTask(event){
    if(event.target.dataset.action === "delete"){
    const parenNode = event.target.closest('.task-content');
    const id = Number(parenNode.id) 
    
    let index = tasks.findIndex(function(t){
        if (t.id === id){
            return true
        }
    });

    tasks.splice(index,1);
    parenNode.remove()
    countMinus();
    };
    saveLocalStorage()
};
function completedTask(event){ 

   

    if(event.target.dataset.action === "Done"){
        let node = event.target.closest('.task-content');

        let id = Number(node.id);
        let task = tasks.find(function(task){
            if (task.id === id){
                return true
            }
        })
        task.done = !task.done;
        saveLocalStorage()
        let completed = node.querySelector('#no-completed');
        completed.classList.toggle('completed');
        
    }
   
};
function countPlus(){
    const counterTask = document.querySelector('.counter-task');
    for(let i = 0; i < 1; i ++ ){
        counter = bodyCard.children.length;
        counterTask.textContent = counter + " " + "задач";
    };
}
function countMinus(){
    const counterTask = document.querySelector('.counter-task');
    for(let i = 0; i >= 0; i -- ){
        counter = bodyCard.children.length;
        counterTask.textContent = counter + " " + "задач";
    };
}
function saveLocalStorage(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}