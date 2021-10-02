function getItems(){
    db.collection("todo-items").onSnapshot(snapshot => {
        let items = [];
        snapshot.docs.forEach(doc => {
            items.push({
                id: doc.id,
                ...doc.data()
            });
        });
        generateItems(items);
        count(items);
        clearCompeted(items)
        active(items);
    });
}

function generateItems(items){
    let todoItems = [];
    items.forEach(item => {
        let todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        let checkContainer = document.createElement('div');
        checkContainer.classList.add('check');
        let checkMark = document.createElement('div');
        checkMark.classList.add('check-mark');
        checkMark.innerHTML = '<img class = "img" src="./icon-check.svg">';
        checkMark.addEventListener('click', () => {
            markCompleted(item.id);
        });
        checkContainer.appendChild(checkMark);

        let todoText = document.createElement("div");
        todoText.classList.add("todo-text");
        todoText.innerText = item.text;
        
        if(item.status == "completed"){
            checkMark.classList.add("checked");
            todoText.classList.add("checked");
            todoItem.classList.add("com1");
        }
        else{
            todoItem.classList.add("com2");
        }
        todoItem.appendChild(checkContainer);
        todoItem.appendChild(todoText);
        todoItems.push(todoItem)

        todoText.addEventListener('click', () => {
            if(item.status == "completed"){
                db.collection("todo-items").doc(item.id).delete();
            }
        });
    });
    document.querySelector(".todo-items").replaceChildren(...todoItems);
}

function addItem(event){
    event.preventDefault();
    let text = document.getElementById("todo-input");
    let newItem = db.collection("todo-items").add({
        text: text.value,
        status: "active"
    })
    text.value = "";
}

function markCompleted(id){
    let item = db.collection("todo-items").doc(id);
    item.get().then(function(doc) {
        if (doc.exists) {
            if(doc.data().status == "active"){
                item.update({
                    status: "completed"
                })
            } else {
                item.update({
                    status: "active"
                })
            }
        }
    })
}

getItems();

// Additional Code
function clearCompeted(items){
    let clear = document.querySelector('.item-clear');
    clear.addEventListener('click', () => {
        document.querySelectorAll('.com1').forEach( item => {
            items.forEach(item => {
                        if(item.status == "completed"){
                            db.collection("todo-items").doc(item.id).delete();
                        }
                });
        });
    });
}

function count(items) {
    let num = 0;
    items.forEach(item => {
        if(item.status == "active"){
            num++;
        }
    });
    let total = 0;
    items.forEach(item => {
        total++;
    });
    document.querySelector(".item-left").innerHTML = `${num} items left out of ${total}`;
}

function active() {
    let all = document.querySelector('.all');
    let active = document.querySelector('.active');
    let completed = document.querySelector('.completed');
    let com1 = document.querySelectorAll('.com1');
    let com2 = document.querySelectorAll('.com2');
    let check = document.querySelectorAll('.check-mark')

    all.addEventListener('click', () => {
        all.classList.add('blue');
        active.classList.remove('blue');
        completed.classList.remove('blue');
        com1.forEach(item => {
            item.classList.remove('display');
        });
        com2.forEach(item => {
            item.classList.remove('display');
        });
    });
    active.addEventListener('click', () => {
        all.classList.remove('blue');
        active.classList.add('blue');
        completed.classList.remove('blue');
        com1.forEach(item => {
            item.classList.add('display');
        });
        com2.forEach(item => {
            item.classList.remove('display');
        });
    });
    completed.addEventListener('click', () => {
        all.classList.remove('blue');
        active.classList.remove('blue');
        completed.classList.add('blue');
        com2.forEach(item => {
            item.classList.add('display');
        });
        com1.forEach(item => {
            item.classList.remove('display');
        });
    });
}

//Dark and light mode
let dark = document.querySelectorAll('.dark');
let light = document.querySelectorAll('.light');

dark[1].addEventListener('click', () => {
    document.body.style.backgroundColor = "white";
    dark[0].classList.add('display');
    dark[1].classList.add('display');
    light[0].classList.remove('display');
    light[1].classList.remove('display');
});

light[1].addEventListener('click', () => {
    document.body.style.backgroundColor = "hsl(235, 21%, 11%)";
    dark[1].classList.remove('display');
    dark[0].classList.remove('display');
    light[1].classList.add('display');
    light[0].classList.add('display');
});