// 初始化行事曆
document.addEventListener("DOMContentLoaded", () => {
  getTodoObjFromStorage();
  renderCalendar();
});

//設定
const create_todo_modal = new bootstrap.Modal(
  document.getElementById("create_todo_modal")
);
const newTodo_modal = new bootstrap.Modal(
  document.getElementById("newTodo_modal")
);

let todo_Obj = {};
let dateKeyfor;
console.log(dateKeyfor);
const add_btn = document.getElementById("title_add_btn");
add_btn.addEventListener("click", function () {
  addTodo(dateKeyfor);
});

//取得當前日期
let currentDate = new Date();

// 切換月份按鈕
document.getElementById("prevMonthBtn").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

document.getElementById("nextMonthBtn").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// 回到今天按鈕
document.getElementById("todayBtn").addEventListener("click", () => {
  currentDate = new Date();
  renderCalendar();
});

function renderCalendar() {
  //update title
  const currentYear = document.getElementById("currentYear");
  const currentMonth = document.getElementById("currentMonth");
  const currentMonthByEnglish = document.getElementById(
    "currentMonthByEnglish"
  );
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("en-US", { month: "long" }); // 獲取完整的月份名稱
  currentMonth.textContent = month + 1;
  currentYear.textContent = `民國${year - 1911}年`;
  currentMonthByEnglish.textContent = monthName;

  //update dateArea
  const dateArea = document.getElementById("calendar-days");
  dateArea.innerHTML = ""; // 清空現有的日期格子

  //找出起始日
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0).getDate();

  // 產生空白格子（補齊前面的星期幾）
  for (let i = firstDate.getDay(); i > 0; i--) {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("day");
    dateArea.appendChild(emptyDiv);
  }

  // 產生日期格子並把Todo放進去
  for (let day = 1; day <= lastDate; day++) {
    const currDay = new Date(year, month, day);
    const dateDom = document.createElement("div");
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    dateDom.classList.add("day", "dayListener");
    dateDom.setAttribute("data-date", dateKey);
    if (currDay.getDay() == 6 || currDay.getDay() == 0) {
      dateDom.style.color = "red";
    }
    dateDom.innerHTML = day;
    dateArea.appendChild(dateDom);

    //渲染storage in calendar
    haveStorageItem = todo_Obj[dateKey];
    if (haveStorageItem) {
      const ul = document.createElement("ul");
      todo_Obj[dateKey].forEach((item, idx) => {
        if (idx < 3) {
          const li = document.createElement("li");
          li.classList.add("listStyle");
          li.textContent = item.content;
          ul.appendChild(li);
          console.log(item.content);
        }
      });
      dateDom.appendChild(ul);
    }

    //加入點擊顯示Modal事件
    dateDom.addEventListener("click", () => {
      //點擊時改變全域變數dateKeyfor
      dateKeyfor = dateKey;
      renderModal(dateKey);
    });
  }
}

//storage存取
const storageKey = "my-todo";

function getTodoObjFromStorage() {
  const localStorageItem = JSON.parse(localStorage.getItem(storageKey));
  if (localStorageItem) {
    todo_Obj = localStorageItem;
  }
}
function saveTodoObjToStorage() {
  const todo_Obj_json = JSON.stringify(todo_Obj);
  localStorage.setItem(storageKey, todo_Obj_json);
  renderCalendar();
}
// function test(dateKey) {
//   const modal = new bootstrap.Modal(
//     document.getElementById("create_todo_modal")
//   );
//   console.log(dateKey);
//   modal.show();
// }
//
function renderModal(dateKey) {
  //修改Modal Title修改Modal Title
  const exampleModalLabel = document.getElementById("exampleModalLabel");
  exampleModalLabel.innerHTML = `${dateKey} 待辦事項`;

  //修改Modal裡顯示的待辦事項
  const todoListGroup = document.getElementById("todo_list_group");
  todoListGroup.innerHTML = "";
  console.log(todo_Obj[dateKey]);
  haveStorageItem = todo_Obj[dateKey];
  console.log(haveStorageItem);
  if (haveStorageItem) {
    todo_Obj[dateKey].forEach((item, idx) => {
      //創建li listItem
      const listItem = document.createElement("li");
      listItem.className = "list-group-item";

      //創建輸入區 inputGroup
      const inputGroup = document.createElement("div");
      inputGroup.className = "input-group";

      //--------------------------------
      //創建時間輸入區 inputGroupText
      const inputGroupText = document.createElement("div");
      inputGroupText.className = "input-group-text";

      //--------------------------------
      // 創建 label, For屬性
      const label = document.createElement("label");
      label.htmlFor = "todo_time";
      // 創建時間輸入 inputTime
      const inputTime = document.createElement("input");
      inputTime.type = "time";
      inputTime.id = "todo_time";
      inputTime.name = "todo_time";
      inputTime.value = item.time;
      inputTime.disabled = true;
      //append(label,inputTime)
      inputGroupText.appendChild(label);
      inputGroupText.appendChild(inputTime);

      //--------------------------------
      // 創建資料輸入 textInput
      const textInput = document.createElement("input");
      textInput.type = "text";
      textInput.className = "form-control todo-content";
      textInput.value = item.content;
      textInput.disabled = true;

      //--------------------------------
      // 創建編輯按鈕 editButton
      const editButton = document.createElement("button");
      editButton.className = "btn btn-warning edit-btn";
      editButton.type = "button";
      editButton.textContent = "編輯";
      editButton.onclick = function () {
        edit(this);
      };

      //--------------------------------
      // 創建儲存按鈕 saveButton
      const saveButton = document.createElement("button");
      saveButton.className = "btn btn-success save-btn d-none";
      saveButton.type = "button";
      saveButton.onclick = function () {
        save(this, idx, dateKey);
      };
      saveButton.id = "saveEventBtn";
      saveButton.textContent = "儲存";

      //--------------------------------
      // 創建刪除按鈕 deleteButton
      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-danger";
      deleteButton.type = "button";
      deleteButton.onclick = function () {
        remove(dateKey, idx);
      };
      deleteButton.textContent = "刪除";

      //append All--------------------------------
      inputGroup.appendChild(inputGroupText);
      inputGroup.appendChild(textInput);
      inputGroup.appendChild(editButton);
      inputGroup.appendChild(saveButton);
      inputGroup.appendChild(deleteButton);
      listItem.appendChild(inputGroup);
      todoListGroup.appendChild(listItem);

      //-----------------------------
    });
  }
  create_todo_modal.show();
}
//create_todo_modal 按鈕功能 --------------------
//新增鍵
function addTodo(dateKey) {
  const todo_time = document.getElementById("todo_time");
  const todo_input = document.getElementById("todo_input");
  if (!todo_Obj[dateKey]) {
    todo_Obj[dateKey] = []; // 初始化為空陣列
  }
  // if (!Array.isArray(todo_Obj[dateKey])) {
  //   todo_Obj[dateKey] = [];
  // }
  const content = todo_input.value.trim();
  if (content === "") {
    return;
  }
  const newTodo = {
    time: todo_time.value,
    content: content,
  };
  todo_Obj[dateKey].push(newTodo);
  todo_Obj[dateKey].sort((a, b) => {
    const timeA = new Date(`1970/01/01 ${a.time}`);
    const timeB = new Date(`1970/01/01 ${b.time}`);
    return timeA - timeB; // 升序排序
  });
  todo_input.value = "";
  saveTodoObjToStorage();
  renderModal(dateKey);
}

//編輯,儲存,刪除
function edit(el) {
  const todoContent = el.parentElement.querySelector(".todo-content");
  const todoTime = el.parentElement.querySelector("#todo_time");
  todoTime.disabled = false;
  todoContent.disabled = false;
  const saveBtn = el.parentElement.querySelector(".save-btn");
  //顯示儲存按鈕
  saveBtn.classList.remove("d-none");
  //隱藏編輯按鈕
  el.classList.add("d-none");
}

function save(el, idx, dateKey) {
  const todo_input = el.parentElement.querySelector(".todo-content");
  const todo_time = el.parentElement.querySelector("#todo_time");

  //儲存內容
  const content = todo_input.value.trim();
  if (content === "") {
    return;
  }
  const todoItem = {
    time: todo_time.value,
    content: content,
  };
  console.log(todoItem);
  todo_Obj[dateKey][idx] = todoItem;
  todo_Item_OrderBy(dateKey);

  todo_input.disabled = true;
  todo_time.disabled = true;
  //顯示編輯按鈕
  const editBtn = el.parentElement.querySelector(".edit-btn");
  editBtn.classList.remove("d-none");
  //隱藏儲存按鈕
  el.classList.add("d-none");
  saveTodoObjToStorage();
  renderModal(dateKey);
}

function remove(dateKey, idx) {
  todo_Obj[dateKey].splice(idx, 1);
  saveTodoObjToStorage();
  renderModal(dateKey);
}

//清單照時間排列---------------------------------
function todo_Item_OrderBy(dateKey) {
  todo_Obj[dateKey].sort((a, b) => {
    const timeA = new Date(`1970/01/01 ${a.time}`);
    const timeB = new Date(`1970/01/01 ${b.time}`);
    return timeA - timeB; // 升序排序
  });
}

//New_Todo_Modal 功能----------------------------
const NewTodo_date_input = document.getElementById("NewTodo_date_input");
const NewTodo_time_input = document.getElementById("NewTodo_time_input");
const newTodo_input = document.getElementById("newTodo_input");
const create_NewTodo_Btn = document.getElementById("create_NewTodo_Btn");
create_NewTodo_Btn.addEventListener("click", () => { 
  if (
    NewTodo_date_input.value === "" ||
    NewTodo_time_input.value === "" ||
    newTodo_input.value === ""
  ) {
    return;
  }
  //-----------------------------------
  dateKey = NewTodo_date_input.value;
  if (!todo_Obj[dateKey]) {
    todo_Obj[dateKey] = []; // 初始化為空陣列
  }
  const content = newTodo_input.value.trim();
  if (content === "") {
    return;
  }
  const newTodo = {
    time: NewTodo_time_input.value,
    content: content,
  };
  todo_Obj[dateKey].push(newTodo);
  todo_Obj[dateKey].sort((a, b) => {
    const timeA = new Date(`1970/01/01 ${a.time}`);
    const timeB = new Date(`1970/01/01 ${b.time}`);
    return timeA - timeB; // 升序排序
  });
  todo_input.value = "";
  saveTodoObjToStorage();
  //-----------------------------------

  currentDate = new Date(
    `${NewTodo_date_input.value} ${NewTodo_time_input.value}`
  );
  renderCalendar();
  newTodo_modal.hide();
  renderModal(NewTodo_date_input.value);
  // console.log(NewTodo_date_input.value)
});
