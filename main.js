const addtaskbtn = document.getElementById("addtask");
const wrapper = document.querySelector(".container .wrapper");
const resetbtn = document.getElementById("resetbtn");
const list = document.querySelector(".list");
const task = document.getElementById("task");

function CreateNewTask() {
  addtaskbtn.style.opacity = 0;
  const div = document.createElement("div");
  if (!task.value) {
    return alert("Task must be valid");
  }
  div.className = "note";
  list.appendChild(div);
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const p = document.createElement("p");
  p.innerHTML = task.value;
  div.appendChild(checkbox);
  div.appendChild(p);
  task.value = "";
  task.focus();
  saveData();
  addCloseBtn();
}

function ResetAllTask() {
  list.innerHTML = "";
  saveData();
}

function addCloseBtn() {
  const button = document.createElement("button");
  button.innerHTML = "x";
  button.id = "btnclose";
  const note = document.querySelectorAll(".note");
  for (let i = 0; i < note.length; i++) {
    note[i].appendChild(button);
  }
  saveData();
}

function saveData() {
  localStorage.setItem("data", list.innerHTML);
}

function loadData() {
  list.innerHTML = localStorage.getItem("data");
}

addtaskbtn.addEventListener("click", CreateNewTask);
resetbtn.addEventListener("click", ResetAllTask);

wrapper.addEventListener("click", (e) => {
  if (e.target.tagName === "INPUT") {
    const note = document.querySelectorAll(".note");
    const checkbox = document.querySelectorAll("input[type='checkbox']");
    for (let i = 0; i < note.length; i++) {
      note[i].addEventListener("change", (e) => {
        const titletask = note[i].getElementsByTagName("p");
        if (e.target.checked) {
          titletask[0].classList.add("line");
          checkbox[i].setAttribute("checked", true);
          saveData();
        } else {
          titletask[0].classList.remove("line");
          checkbox[i].removeAttribute("checked");
          saveData();
        }
      });
    }
  }
});

list.addEventListener("click", (e) => {
  if (e.target.id === "btnclose") {
    e.target.parentElement.remove();
    saveData();
  }
});

task.addEventListener("input", (e) => {
  if (!e.target.value) {
    return (addtaskbtn.style.opacity = 0);
  }
  addtaskbtn.style.opacity = 1;
});

loadData();
