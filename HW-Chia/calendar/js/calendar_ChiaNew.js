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
const festivalForMonth = document.querySelector(".festivalForMonth");
const headRight = document.querySelector(".head-right");
const headLeft = document.querySelector(".head-left");
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
  updateCalendarTitle(month);
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

/*
1.為新年做準備,大掃除買年貨做臘肉! c3633d
2.與大自然的和諧相處,善用每一個得來不易的農產品。 9f815d
3.生津止渴又是低熱量的好水果,健康水果的好選擇。 ffeabb
4.桑樹從葉子到果實,每一個部位都對人體有好處,容易加工方便保存。 dddad5
5.從加工油品到觀賞植物,從油桐花認識臺灣經濟改變的過程。 69a464
6.艾草可趨吉避凶、遠離疾病,不只是包粽子的材料而已。c5705c
7.夏天來一顆香甜多汁的水梨,加工蒸煮之後又是另一個美味甜點。b79f87
8.蓮花又稱荷花,在表面有一層自潔層,是最愛乾淨的植物喔。c9e3b6
9.與家人團圓的好時光,中秋節烤肉、月餅、柚子! 194e6e
10.在小小的地瓜田裡挖呀挖,自己做的零食最健康。 c3d38c
11.人類飛行夢想的起點,天空中的童年好光。 e9d7c1
12.經過時光的推移和巧奪天工的手藝,呈現臺灣經濟的另一個盛況。 e5d6b5
*/

function updateCalendarTitle(Month) {
  if (Month === 0) {
    festivalForMonth.textContent = "為新年做準備,大掃除買年貨做臘肉!";
    headRight.style.backgroundImage = "url('./pic/January.png')";
    headLeft.style.backgroundColor = "#c3633d";
  } else if (Month === 1) {
    festivalForMonth.textContent =
      "與大自然的和諧相處,善用每一個得來不易的農產品。";
    headRight.style.backgroundImage = "url('./pic/February.png')";
    headLeft.style.backgroundColor = "#9f815d";
  } else if (Month === 2) {
    festivalForMonth.textContent =
      "生津止渴又是低熱量的好水果,健康水果的好選擇。";
    headRight.style.backgroundImage = "url('./pic/March.png')";
    headLeft.style.backgroundColor = "#ffeabb";
  } else if (Month === 3) {
    festivalForMonth.textContent =
      "桑樹從葉子到果實,每一個部位都對人體有好處,容易加工方便保存。";
    headRight.style.backgroundImage = "url('./pic/April.png')";
    headLeft.style.backgroundColor = "#dddad5";
  } else if (Month === 4) {
    festivalForMonth.textContent =
      "從加工油品到觀賞植物,從油桐花認識臺灣經濟改變的過程。";
    headRight.style.backgroundImage = "url('./pic/May.png')";
    headLeft.style.backgroundColor = "#69a464";
  } else if (Month === 5) {
    festivalForMonth.textContent =
      "艾草可趨吉避凶、遠離疾病,不只是包粽子的材料而已。";
    headRight.style.backgroundImage = "url('./pic/June.png')";
    headLeft.style.backgroundColor = "#c5705c";
  } else if (Month === 6) {
    festivalForMonth.textContent =
      "夏天來一顆香甜多汁的水梨,加工蒸煮之後又是另一個美味甜點。";
    headRight.style.backgroundImage = "url('./pic/July.png')";
    headLeft.style.backgroundColor = "#b79f87";
  } else if (Month === 7) {
    festivalForMonth.textContent =
      "蓮花又稱荷花,在表面有一層自潔層,是最愛乾淨的植物喔。";
    headRight.style.backgroundImage = "url('./pic/August.png')";
    headLeft.style.backgroundColor = "#c9e3b6";
  } else if (Month === 8) {
    festivalForMonth.textContent =
      "與家人團圓的好時光,中秋節烤肉、月餅、柚子! ";
    headRight.style.backgroundImage = "url('./pic/September.png')";
    headLeft.style.backgroundColor = "#194e6e";
  } else if (Month === 9) {
    festivalForMonth.textContent =
      "在小小的地瓜田裡挖呀挖,自己做的零食最健康。 ";
    headRight.style.backgroundImage = "url('./pic/October.png')";
    headLeft.style.backgroundColor = "#c3d38c";
  } else if (Month === 10) {
    festivalForMonth.textContent = "人類飛行夢想的起點,天空中的童年好光。 ";
    headRight.style.backgroundImage = "url('./pic/November.png')";
    headLeft.style.backgroundColor = "#e9d7c1";
  } else if (Month === 11) {
    festivalForMonth.textContent =
      "經過時光的推移和巧奪天工的手藝,呈現臺灣經濟的另一個盛況。 ";
    headRight.style.backgroundImage = "url('./pic/December.png')";
    headLeft.style.backgroundColor = "#e5d6b5";
  }
}
