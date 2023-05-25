const inputForm = document.querySelector('.modal-input');
const bodyCard = document.querySelector('.body-card');
const btnImg = document.querySelector('.btn-img');
const creatTask = document.querySelector('.creat-task');
const modal = document.querySelector('.modal');
const modalInput = document.querySelector('.modal-form');
const btnClear = document.querySelector('.clear-task');
let counter = 0;

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

    let taskHtml = `<div class="task-content">
    <div class="box">
    <div id ="no-completed" class="no-completed"></div>
    </div>
    <p class="task-content__text">${inputText}</p>
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
};
function deleteTask(event){
    if(event.target.dataset.action === "delete"){
    const parenNode =    event.target.closest('.task-content');
    parenNode.remove()
    countMinus();
    };
};
function completedTask(event){ 

   

    if(event.target.dataset.action === "Done"){
        let node = event.target.closest('.task-content');
        let completed = node.querySelector('#no-completed');
        completed.classList.toggle('completed');
        
    }
};
function countPlus(){
    const counterTask = document.querySelector('.counter-task');
    for(let i = 0; i < 1; i ++ ){
        counter = bodyCard.children.length;
        counterTask.textContent = counter + " " + "задач";
        console.log(counter)
    };
}
function countMinus(){
    const counterTask = document.querySelector('.counter-task');
    for(let i = 0; i >= 0; i -- ){
        counter = bodyCard.children.length;
        counterTask.textContent = counter + " " + "задач";
        console.log(counter)
    };
}