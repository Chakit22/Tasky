const taskContainer = document.querySelector(".task_container"); // . for class name here. Parent element to store cards.
//The parent element is actually row where we added a class name called task_container in the HTML code.
console.log(taskContainer);  //This prints the whole html code which has a class name as task_container on the output log.

let globalStore = [];  //Global stirage which vanishes the moment we refresh our page.
//So change the code from const globalStore = ...  to let globalStore = ... as it will allow us to change the data present in the global
//StoreArray.

const newCard = ({
    id, 
    imageUrl,
    taskTitle,
    taskType,
    taskDescription
})=>`<div class="col-md-6 col-lg-4" id=${id} <!--This basically adds
the id passed in the function parameters.-->>  <!--For medium devices it will display two cards while for large devices it will display 
3 items.-->
  <div class="card">
    <div class="card-header d-flex justify-content-end gap-1">  <!--d-flex is same as display flex.Justify content end moves a 
    set of elements to right. gap-1 specifies the gap between the elements within this div class.-->
      <button type="button"  class="btn btn-outline-success" ><i class="fa-solid fa-pencil"  onclick="deleteCard.apply(this,arguments)"></i></button>
      <button type="button" id=${id} class="btn btn-outline-danger" onclick="deleteCard.apply(this,arguments)"><i class="fa-solid fa-trash" id=${id} onclick="deleteCard.apply(this,arguments)"></i></button>              
    </div>
    <img src=${imageUrl} class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title" >${taskTitle}</h5>
      <p class="card-text">${taskDescription}</p>
      <a href="#" class="btn btn-primary"><span class="badge bg-primary">${taskType}</span></a>  <!--Adds a badge.-->
    </div>
    <div class="card-footer text-muted">
      <button type="button" class="btn btn-outline-primary float-end">Open Task</button>  <!--float-end moves an individula item to the end.-->
    </div>
  </div>
</div>`;

//this points to the parent object "window" because deleteCrad function takes a parameter that is event.

const deleteCard = (event) => {  //event will fetch the HTML code of that particular card which the user has clicked upon.
    //id
    event = window.event;  //window is nothing but the parent object
    const targetID = event.target.id; //This targets to the element that we interacted which is delete button so it will fetch the id of 
    //the delete button so in order to fetch the id of the card make the id of card as well as delete button same.
    const tagname = event.target.tagName;
    //search the global storage ,remove the object which matches with the id
    const newUpdatedArray = globalStore.filter((card) => card.id !== targetID);  //This will iterate on each card present in the global storage
    //array and add only those cards to newUpdatedArray whose id is not equal to targetID.

    globalStore = newUpdatedArray;
    localStorage.setItem("tasky", JSON.stringify({cards : globalStore}));

    //event is actually pointing to the whole window whicle event.target is actually pointing that particular button which is triggered
    //the moment we click on that delete button.

    //steps to remove a card
    //Have to travel to it's parent in order to remove the child. Travels to task_container class first.
    if(tagname === "BUTTON"){
        return taskContainer.removeChild(  
            event.target.parentNode.parentNode.parentNode //Remove the third child.event target will actually 
        );
    }
    
    return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode //Remove the third child.
    );
};

const loadInitialTaskCards = () => {  //This function will be called the moment we open our website.
    //access local storage
    const getIntitialData = localStorage.tasky;  //It will get the data where the key is tasky and return and store into
    //getIntitialData
    if(!getIntitialData)  //getInitialData will store NULL if there is no key named tasky in local storage
        return;
    
    //convert stringified object to obj
    const {cards} = JSON.parse(getIntitialData);

    //map around the array to generate the HTML card and inject it to DOM
    cards.map((card) => {
        const createNewCard = newCard(card);  //Creates a new card and stores it in a createNewCard variable.
        taskContainer.insertAdjacentHTML("beforeend",createNewCard);
        globalStore.push(card);
    });
};

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,  //unique number for each card. `` These are used to create formatted strings.
        imageUrl: document.getElementById("imageurl").value,  //document is an object of DOM used to acess HTML objects. Here the elements 
        //of HTML are accessed with the help of id.
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,   
    };

    console.log(taskData); //This is used to print the data entered by the user while adding a card.

    const createNewCard = newCard(taskData);  //Creates a new card and stores it in a createNewCard variable.
    taskContainer.insertAdjacentHTML("beforeend",createNewCard);
    globalStore.push(taskData);

    //add data to local storage to refrain it from vanishing after refreshing.
    localStorage.setItem("tasky", JSON.stringify({cards : globalStore}));  //key -> value pair where key here is "tasky" and value is
    //cards : globalStore
};