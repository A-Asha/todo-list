var form = document.getElementById("my-form");
var handleForm = function(event) {
  event.preventDefault();
  addTodo();
};
form.addEventListener('submit', handleForm);

var todoList = [];
var TodoItem = function({ todoText, elementId, status = 'open' }) {
  this.todo = todoText;
  this.elementId = elementId;
  this.status = status;
};

TodoItem.prototype.getTodo = function() {
  return this.todo;
};

TodoItem.prototype.deleteTodo = function() {
  var index = todoList.indexOf(this);

  if (index !== -1) {
    todoList.splice(index, 1);
    var currentElement = document.getElementById(this.elementId);
    currentElement.remove();
  }
};

TodoItem.prototype.markAsCompleted = function() {
  this.status = 'closed';
};

TodoItem.prototype.getTodoElement = function() {
  var _this = this;
  var todoElement = document.createElement('div');
  todoElement.class = 'todo-item';
  todoElement.innerText = _this.getTodo();
  todoElement.id = _this.elementId;

  var deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.addEventListener('click', function() {
    _this.deleteTodo();
  }, false);
  deleteBtn.innerText = 'Delete';

  todoElement.appendChild(deleteBtn);
  return todoElement;
}

// list related actions

var addTodo = function() {
  var inputText = document.getElementById('input-field');

  if (inputText.value.trim()) {
    var inputItem = {
      todoText: inputText.value,
      elementId: (new Date()).getTime(),
      status: 'open'
    }
    var todoObj = new TodoItem(inputItem);
    todoList.push(todoObj);

    inputText.value = '';

    var listContainer = document.getElementById('todo-list');
    var todoElement = todoObj.getTodoElement();
    listContainer.appendChild(todoElement);
  }
};