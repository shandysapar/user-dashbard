document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoLane = document.getElementById('todo-lane');
    const inProgressLane = document.getElementById('in-progress-lane');
    const doneLane = document.getElementById('done-lane');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history');

    let taskId = 5; // Starting ID for tasks

    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskContent = todoInput.value.trim();
        if (taskContent === '') return;

        const taskElement = createTaskElement(taskContent);
        todoLane.appendChild(taskElement);

        // Log creation in history
        logToHistory('Created task: ' + taskContent);

        // Clear input
        todoInput.value = '';
    });

    function createTaskElement(content) {
        const taskElement = document.createElement('p');
        taskElement.textContent = content;
        taskElement.classList.add('task');
        taskElement.setAttribute('draggable', 'true');

        taskElement.addEventListener('dragstart', function(event) {
            event.dataTransfer.setData('text/plain', content);
            event.target.classList.add('is-dragging');
        });

        taskElement.addEventListener('dragend', function(event) {
            event.target.classList.remove('is-dragging');
        });

        // Add delete functionality
        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = '🗑️';
        trashBtn.classList.add('trash-bin');
        trashBtn.addEventListener('click', function() {
            taskElement.remove();
            logToHistory('Deleted task: ' + content);
        });
        taskElement.appendChild(trashBtn);

        return taskElement;
    }

    function logToHistory(action) {
        const timestamp = new Date().toLocaleString();
        const historyItem = document.createElement('li');
        historyItem.classList.add('history-item');
        historyItem.innerHTML = `
            <span>${action}</span>
            <span>${timestamp}</span>
        `;
        historyList.appendChild(historyItem);
    }

    clearHistoryBtn.addEventListener('click', function() {
        historyList.innerHTML = ''; // Clear history list
    });

    // Allow drop behavior for tasks in swim-lanes
    const swimLanes = document.querySelectorAll('.swim-lane');

    swimLanes.forEach(lane => {
        lane.addEventListener('dragover', function(event) {
            event.preventDefault();
        });

        lane.addEventListener('drop', function(event) {
            event.preventDefault();
            const taskContent = event.dataTransfer.getData('text/plain');
            const taskElement = document.createElement('p');
            taskElement.textContent = taskContent;
            taskElement.classList.add('task');
            taskElement.setAttribute('draggable', 'true');

            taskElement.addEventListener('dragstart', function(event) {
                event.dataTransfer.setData('text/plain', taskContent);
                event.target.classList.add('is-dragging');
            });

            taskElement.addEventListener('dragend', function(event) {
                event.target.classList.remove('is-dragging');
            });

            const trashBtn = document.createElement('button');
            trashBtn.innerHTML = '🗑️';
            trashBtn.classList.add('trash-bin');
            trashBtn.addEventListener('click', function() {
                taskElement.remove();
                logToHistory('Deleted task: ' + taskContent);
            });
            taskElement.appendChild(trashBtn);

            lane.appendChild(taskElement);

            // Log movement in history
            const action = `Moved task '${taskContent}' to '${lane.querySelector('.heading').textContent}'`;
            logToHistory(action);
        });
    });
});
