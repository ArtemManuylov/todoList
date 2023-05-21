//смена темы 

const btnImg = document.querySelector('.btn-img');

btnImg.addEventListener('click', change);

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

//вызов модального окна через кнопку 

const creatTask = document.querySelector('.creat-task');
const modal = document.querySelector('.modal');

creatTask.addEventListener('click', callingModal);

function callingModal(){
    modal.style.display = 'flex'; 
};

creatTask.addEventListener('click', callingModal);

function callingModal(){
    modal.style.display = 'flex'; 
};


//получение инфы из инпута и создаём задачу, закрытие модального окна

const input = document.querySelector('.modal-input');
const modalInput = document.querySelector('.modal-form');
const bodyCard = document.querySelector('.body-card');
const modalBtn = document.querySelector('.modal-btn');
let inputText = '';

modalInput.addEventListener('submit', getInput);

// функция создает задачу по условию
function getInput(e){
    e.preventDefault();
    let inputValue = input.value.trim();
    
    
    if(inputValue != ''){
        inputText = inputValue;
        let taskHtml = `<div class="task-content">
    <img class="task-content__completed" src="images/Ellipse.png" alt="Ellipse">
    <p class="task-content__text">${inputText}</p>
    <div class="content-btn">
        <button class="content-btn__delite">
            <img src="images/cross.svg" alt="cross">
        </button>
        <button class="content-btn__completed">выполнить</button>
    </div>
</div>`;
bodyCard.insertAdjacentHTML("beforeend",taskHtml);

    };
    input.value = '';
    //счётчик задач
    document.querySelector('.counter-task').textContent = bodyCard.children.length +' '+'задач'
}
//закрытие окна через кнопку в форме или enter
modalInput.addEventListener('submit', closedMaodal);

function closedMaodal(){
    modal.style.display = 'none';
}
//закрытие окна чере окно
window.addEventListener('click', closedModalForm);

function closedModalForm(event){
    if (event.target == modal){
        modal.style.display = 'none';
    }
}




