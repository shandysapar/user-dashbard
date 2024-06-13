const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-lane");

draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

droppables.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();

    const bottomTask = insertAboveTask(zone, e.clientY);
    const curTask = document.querySelector(".is-dragging");

    if (!bottomTask) {
      zone.appendChild(curTask);
    } else {
      zone.insertBefore(curTask, bottomTask);
    }
  });
});

const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};




// drag.js

document.addEventListener("DOMContentLoaded", () => {
  const tasks = document.querySelectorAll(".task");
  const lanes = document.querySelectorAll(".swim-lane");

  tasks.forEach(task => {
    task.addEventListener("dragstart", dragStart);
    task.addEventListener("dragend", dragEnd);
  });

  lanes.forEach(lane => {
    lane.addEventListener("dragover", dragOver);
    lane.addEventListener("dragenter", dragEnter);
    lane.addEventListener("dragleave", dragLeave);
    lane.addEventListener("drop", dragDrop);
  });

  function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
    setTimeout(() => e.target.classList.add("invisible"), 0);
  }

  function dragEnd(e) {
    e.target.classList.remove("invisible");
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add("drag-over");
  }

  function dragLeave(e) {
    e.target.classList.remove("drag-over");
  }

  function dragDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const draggable = document.getElementById(id);
    e.target.classList.remove("drag-over");
    if (e.target.classList.contains("swim-lane")) {
      e.target.appendChild(draggable);
    } else if (e.target.classList.contains("task")) {
      e.target.parentElement.appendChild(draggable);
    }
  }
});

