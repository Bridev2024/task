document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const taskPriority = document.getElementById('taskPriority');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const filterButtons = document.querySelectorAll('.filter-button');
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    function renderTasks(filter = 'all') {
      taskList.innerHTML = '';
      tasks
        .filter(task => filter === 'all' || task.status === filter)
        .forEach((task, index) => {
          const li = document.createElement('li');
          li.className = `task-item ${task.status === 'completed' ? 'completed' : ''}`;
          
          const taskSpan = document.createElement('span');
          taskSpan.textContent = `${task.priority.toUpperCase()}: ${task.text}`;
          li.appendChild(taskSpan);
  
          const completeButton = document.createElement('button');
          completeButton.className = 'complete';
          completeButton.textContent = task.status === 'completed' ? 'Undo' : 'Complete';
          completeButton.addEventListener('click', () => toggleTaskStatus(index));
          li.appendChild(completeButton);
  
          const deleteButton = document.createElement('button');
          deleteButton.className = 'delete';
          deleteButton.textContent = 'Delete';
          deleteButton.addEventListener('click', () => deleteTask(index));
          li.appendChild(deleteButton);
  
          taskList.appendChild(li);
        });
    }
  
    function addTask() {
      const taskText = taskInput.value.trim();
      const priority = taskPriority.value;
  
      if (taskText) {
        tasks.push({ text: taskText, priority, status: 'pending' });
        taskInput.value = '';
        saveTasks();
        renderTasks();
      }
    }
  
    function toggleTaskStatus(index) {
      tasks[index].status = tasks[index].status === 'completed' ? 'pending' : 'completed';
      saveTasks();
      renderTasks();
    }
  
    function deleteTask(index) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }
  
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    filterButtons.forEach(button =>
      button.addEventListener('click', () => {
        document.querySelector('.filter-button.active').classList.remove('active');
        button.classList.add('active');
        renderTasks(button.id.replace('filter', '').toLowerCase());
      })
    );
  
    addTaskButton.addEventListener('click', addTask);
  
    renderTasks();
  });
  