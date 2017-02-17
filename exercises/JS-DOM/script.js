(function (scope) {
    "use strict";

    var form = document.querySelector('form');
    var form2 = document.querySelector('#edit-todo');
    var tasksContainer = document.querySelector('#tasks');
    var table = document.querySelector('table');
    var taskManager = createTaskManager();

    var elements = form2.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].readOnly = true;
    }
    document.getElementById('btnDisabled').disabled = true;
    taskManager.onChange(update);
    loadTasks();

    form && form.addEventListener('submit', addTask);

    function addTask(event) {
        event.preventDefault();
        var task = {};
        event.target.querySelectorAll('input:not([type="submit"]').forEach(function (input) {
            task[input.name] = input.value;
            input.value = null;
        });
        taskManager.create(task.category, task.title, task.priority, task.estimate);
    }

    form2 && form2.addEventListener('submit', editTask);

    function editTask(e) {
        e.preventDefault();
        var task = {};
        e.target.querySelectorAll('input:not([type="submit"]').forEach(function (input) {
            task[input.name] = input.value;
            input.value = null;
        });
        var tasks = JSON.parse(scope.localStorage.getItem('tasks'));
        for (var i = 0; i < tasks.length; i++) {
            if (task.category === tasks[i].category) {
                tasks[i].category = task.category;
                tasks[i].title = task.title;
                tasks[i].priority = task.priority;
                tasks[i].estimate = task.estimate;
                break;
            }
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
        location.reload();
    }

    document.getElementById('btnModify').addEventListener('click', function () {
        for (var i = 0, len = elements.length; i < len; ++i) {
            elements[i].readOnly = false;
        }
        document.getElementById('btnDisabled').disabled = false;
    });

    function update(tasks) {
        while (tasksContainer.hasChildNodes()) {
            tasksContainer.removeChild(tasksContainer.lastChild);
        }

        tasks.forEach(function (task) {
            tasksContainer.appendChild(createTaskRow(task));
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function createTaskRow(task) {
        var tr = document.createElement('tr');
        tr.appendChild(createTableCell(task.category));
        tr.appendChild(createTableCell(task.title));
        tr.appendChild(createTableCell(task.priority));
        tr.appendChild(createTableCell(task.estimate));
        tr.appendChild(createTableCell(task.spent));
        tr.appendChild(createTableCell(task.remaining));
        tr.appendChild(createTableCell(task.done() && '&#10004;'));
        var d = createTableCell('Delete');
        d.addEventListener('click', function () { taskManager.remove(task) });
        tr.appendChild(d);
        return tr;
    }

    function createTableCell(text) {
        var td = document.createElement('td');
        if (text) {
            var text = document.createTextNode(text);
            td.appendChild(text);
        }
        return td;
    }
    function loadTasks() {
        if (typeof scope.localStorage !== 'undefined') {
            var tasks = JSON.parse(scope.localStorage.getItem('tasks'));
            tasks && tasks.forEach(function (task) {
                taskManager.create(task.category, task.title, task.priority, task.estimate);
            });
        }
    }
    function rowEvent() {
        var task = {};
        var row = table.querySelectorAll('tbody tr');
        for (var i = 0; i < row.length; i++) {
            row[i].addEventListener('click', function () {
                task['category'] = this.querySelectorAll("tbody tr td")[0].innerHTML;
                task['title'] = this.querySelectorAll("tbody tr td")[1].innerHTML;
                task['priority'] = this.querySelectorAll("tbody tr td")[2].innerHTML;
                task['estimate'] = this.querySelectorAll("tbody tr td")[3].innerHTML;
                form2.querySelectorAll('input:not([type="submit"]').forEach(function (input) {
                    input.value = task[input.name];
                });
            });
        }
    }
    scope.onload = function () {
        table.addEventListener('click', rowEvent, false);
    }
})(window);