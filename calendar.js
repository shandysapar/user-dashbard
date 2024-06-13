document.addEventListener('DOMContentLoaded', function() {
    const daysContainer = document.querySelector('.calendar-days');
    const historyList = document.createElement('ul');
    historyList.classList.add('history-log');
    const editButton = document.getElementById('editButton');
  
    // Number of days in the month (example: June)
    const daysInMonth = 30;
    let descriptions = new Array(daysInMonth + 1).fill(null); // Array to store descriptions for each day
  
    // Function to log actions to history
    function logAction(actionText) {
      const actionItem = document.createElement('li');
      actionItem.textContent = actionText;
      historyList.appendChild(actionItem);
    }
  
    // Function to update UI based on descriptions array
    function updateCalendarUI() {
      const calendarDays = document.querySelectorAll('.calendar-day');
      calendarDays.forEach((dayElement, index) => {
        if (descriptions[index]) {
          dayElement.classList.add('has-event');
        } else {
          dayElement.classList.remove('has-event');
        }
      });
    }
  
    // Generate days dynamically
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.textContent = day;
      dayElement.classList.add('calendar-day');
      dayElement.addEventListener('click', function() {
        if (descriptions[day]) {
          // Edit existing description
          let newDescription = prompt('Edit description:', descriptions[day]);
          if (newDescription !== null) {
            logAction(`Edited description for day ${day}: ${descriptions[day]} -> ${newDescription}`);
            descriptions[day] = newDescription.trim() || null;
            updateCalendarUI();
          }
        } else {
          // Add new description
          let description = prompt('Enter description for this day:');
          if (description !== null) {
            descriptions[day] = description.trim() || null;
            logAction(`Added description for day ${day}: ${description}`);
            updateCalendarUI();
          }
        }
      });
      daysContainer.appendChild(dayElement);
    }
  
    // Delete button functionality
    editButton.addEventListener('click', function() {
      const selectedDay = prompt('Enter day to delete or edit description (1-30):');
      const day = parseInt(selectedDay, 10);
      if (day >= 1 && day <= daysInMonth) {
        if (descriptions[day]) {
          // Prompt for delete or edit
          const action = prompt(`Do you want to edit or delete description for day ${day}? (edit/delete)`);
          if (action === 'edit') {
            let newDescription = prompt('Edit description:', descriptions[day]);
            if (newDescription !== null) {
              logAction(`Edited description for day ${day}: ${descriptions[day]} -> ${newDescription}`);
              descriptions[day] = newDescription.trim() || null;
              updateCalendarUI();
            }
          } else if (action === 'delete') {
            logAction(`Deleted description for day ${day}: ${descriptions[day]}`);
            descriptions[day] = null;
            updateCalendarUI();
          } else {
            alert('Invalid action. Please enter "edit" or "delete".');
          }
        } else {
          alert(`No description found for day ${day}.`);
        }
      } else {
        alert('Invalid day. Please enter a number between 1 and 30.');
      }
    });
  
    // Append history list to the history section
    document.querySelector('.history').appendChild(historyList);
  
    // Initialize calendar UI based on initial descriptions array
    updateCalendarUI();
  });
  