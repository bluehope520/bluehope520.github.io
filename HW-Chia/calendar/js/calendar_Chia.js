// 初始化當前日期與行事曆狀態
let currentDate = new Date();
let selectedDate = null;
console.log(currentDate);

function updateCalendar() {
  const calendarDays = document.getElementById("calendar-days");
  calendarDays.innerHTML = ""; // 清空現有的日期格子

  const currentMonth = document.getElementById("currentMonth");
  const currentMonthByEnglish = document.getElementById(
    "currentMonthByEnglish"
  );
  const currentYear = document.getElementById("currentYear");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  console.log(year, month);

  const monthName = currentDate.toLocaleString("en-US", { month: "long" }); // 獲取完整的月份名稱
  currentMonth.textContent = month + 1;
  currentYear.textContent = `民國${year - 1911}年`;
  currentMonthByEnglish.textContent = monthName;

  // 計算當月的第一天與天數
  const firstDate = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  console.log(firstDate, daysInMonth);

  // 產生空白格子（補齊前面的星期幾）
  for (let i = firstDate.getDay(); i > 0; i--) {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("day");
    calendarDays.appendChild(emptyDiv);
  }

  // 產生日期格子
  for (let day = 1; day <= daysInMonth; day++) {
    const dateDiv = document.createElement("div");
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    dateDiv.classList.add("day");
    dateDiv.setAttribute("data-date", dateKey);
    dateDiv.innerHTML = day;

    //讀取storage事件
    const storageKey = dateKey;
    console.log(storageKey);
    const todoDiv = document.createElement("div");
    todoDiv.style="text-align:start"
    //將todoDiv添加到dateDiv
    dateDiv.appendChild(todoDiv);
    const todoListInCalendar = getTodoListFromStorage();

    function getTodoListFromStorage() {
      const localStorageItem = localStorage.getItem(storageKey);
      return localStorageItem ? JSON.parse(localStorageItem) : [];
    }
    function renderingTodoList() {
        todoDiv.innerHTML += "";
        todoListInCalendar.forEach((item, idx) => { 
            if(idx<3)           
            {todoDiv.innerHTML+=`．${item.content}<br>`}
        })}
        renderingTodoList();
    

    // 新增點擊顯示 Modal事件
    dateDiv.addEventListener("click", () => {
      const modal = new bootstrap.Modal(
        document.getElementById("create_todo_model")
      );
      const exampleModalLabel = document.getElementById("exampleModalLabel");
      exampleModalLabel.innerHTML = `${dateKey} 待辦事項`;

      //儲存事件
      const storageKey = dateKey;
      console.log(storageKey);
      const todoList = getTodoListFromStorage();

      function getTodoListFromStorage() {
        const localStorageItem = localStorage.getItem(storageKey);
        return localStorageItem ? JSON.parse(localStorageItem) : [];
      }

      function saveTodoListToStorage(todoList) {
        const json = JSON.stringify(todoList);
        localStorage.setItem(storageKey, json);
      }

      //新增行事曆
      const todo_list_group = document.getElementById("todo_list_group");
      const todo_time = document.getElementById("todo_time");
      const todo_input = document.getElementById("todo_input");
      const add_btn = document.getElementById("add_btn");
      add_btn.addEventListener("click", () => {
        const todoItem = {
          time: todo_time.value,
          content: todo_input.value,
        };

        saveTodoItem(todoItem);
        renderingTodoList();
      });

      function saveTodoItem(todoItem) {
        todoList.push(todoItem);
        saveTodoListToStorage(todoList);
      }

      function remove(idx) {
        todoList.splice(idx, 1);
        saveTodoListToStorage(todoList);
        renderingTodoList();
      }

      //渲染todo_list
      function renderingTodoList() {
        todo_list_group.innerHTML = "";
        // todoList.forEach((item, idx) => {
        //   todo_list_group.innerHTML += `<li class="list-group-item">
        //           <div class="input-group">
        //             <div class="input-group-text">
        //               <label for="todo_time"></label>
        //               <input
        //                 type="time"
        //                 id="todo_time"
        //                 name="todo_time"
        //                 value="${item.time}"
        //                 disabled = "true"
        //               />
        //             </div>
        //             <input
        //               type="text"
        //               class="form-control todo-content"
        //               aria-label="Text input with checkbox"
        //               value="${item.content}"
        //               disabled="true"
        //             />
        //             <button
        //               class="btn btn-warning edit-btn"
        //               type="button"
        //               onclick="edit(this)"
        //             >
        //               編輯
        //             </button>
        //             <button
        //               class="btn btn-success save-btn d-none"
        //               type="button"
        //               onclick="save(this, ${idx})"
        //               id="saveEventBtn"
        //             >
        //               儲存
        //             </button>
        //             <button
        //               class="btn btn-danger"
        //               type="button"
        //               onclick="remove(${idx})"
        //             >
        //               刪除
        //             </button>
        //           </div>
        //         </li>`;
        // });

        //---------------------------
        todoList.forEach((item, idx) => {
          // 假設 item 和 idx 已經定義
          const todoListGroup = document.getElementById("todo_list_group"); // 獲取待辦事項列表的容器

          // 創建列表項
          const listItem = document.createElement("li");
          listItem.className = "list-group-item";

          // 創建輸入組
          const inputGroup = document.createElement("div");
          inputGroup.className = "input-group";

          // 創建輸入組文本
          
          const inputGroupText = document.createElement("div");
          inputGroupText.className = "input-group-text";

          // 創建時間輸入
          const timeInput = document.createElement("input");
          timeInput.type = "time";
          timeInput.id = "todo_time";
          timeInput.name = "todo_time";
          timeInput.value = item.time; // 假設 item.time 是一個有效的時間字符串
          timeInput.disabled = true;

          // 創建標籤
          const label = document.createElement("label");
          label.htmlFor = "todo_time"; // 設置 for 屬性
          inputGroupText.appendChild(label); // 將標籤添加到輸入組文本中
          inputGroupText.appendChild(timeInput); // 將時間輸入添加到輸入組文本中

          // 創建文本輸入
          const textInput = document.createElement("input");
          textInput.type = "text";
          textInput.className = "form-control todo-content";
          textInput.setAttribute("aria-label", "Text input with checkbox");
          textInput.value = item.content; // 假設 item.content 是待辦事項的內容
          textInput.disabled = true;

          // 創建編輯按鈕
          const editButton = document.createElement("button");
          editButton.className = "btn btn-warning edit-btn";
          editButton.type = "button";
          editButton.onclick = function () {
            edit(this);
          }; // 設置 onclick 事件
          editButton.textContent = "編輯";

          // 創建儲存按鈕
          const saveButton = document.createElement("button");
          saveButton.className = "btn btn-success save-btn d-none";
          saveButton.type = "button";
          saveButton.onclick = function () {
            save(this, idx);
          }; // 設置 onclick 事件
          saveButton.id = "saveEventBtn";
          saveButton.textContent = "儲存";

          // 創建刪除按鈕
          const deleteButton = document.createElement("button");
          deleteButton.className = "btn btn-danger";
          deleteButton.type = "button";
          deleteButton.onclick = function () {
            remove(idx);
          }; // 設置 onclick 事件
          deleteButton.textContent = "刪除";

          // 將所有元素添加到輸入組中
          inputGroup.appendChild(inputGroupText);
          inputGroup.appendChild(textInput);
          inputGroup.appendChild(editButton);
          inputGroup.appendChild(saveButton);
          inputGroup.appendChild(deleteButton);

          // 將輸入組添加到列表項中
          listItem.appendChild(inputGroup);

          // 將列表項添加到待辦事項列表中
          todoListGroup.appendChild(listItem);
        });

        //---------------------------

        //新增,編輯,刪除
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

        function save(el, idx) {
          const todoContent = el.parentElement.querySelector(".todo-content");
          const todoTime = el.parentElement.querySelector("#todo_time");
          todoContent.disabled = true;
          todoTime.disabled = true;
          //儲存內容
          const todoItem = todoList[idx];
          todoItem.time = todoTime.value;
          todoItem.content = todoContent.value;

          console.log(todoItem);
          saveTodoListToStorage(todoList);
          //顯示編輯按鈕
          const editBtn = el.parentElement.querySelector(".edit-btn");
          editBtn.classList.remove("d-none");
          //隱藏編輯按鈕
          el.classList.add("d-none");
        }
      }
      modal.show();
      renderingTodoList();
    });

    calendarDays.appendChild(dateDiv);
  }
}
// 儲存事件邏輯
document.getElementById("saveEventBtn").addEventListener("click", () => {
  const eventInput = document.getElementById("eventInput");
  const eventContent = eventInput.value.trim();

  if (eventContent && selectedDate) {
    const events = JSON.parse(localStorage.getItem("calendarEvents")) || {};
    events[selectedDate] = eventContent;
    localStorage.setItem("calendarEvents", JSON.stringify(events));
    updateCalendar();

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("eventModal")
    );
    modal.hide();
    eventInput.value = "";
  }
});

// 切換月份按鈕
document.getElementById("prevMonthBtn").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
});

document.getElementById("nextMonthBtn").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
});

// 回到今天按鈕
document.getElementById("todayBtn").addEventListener("click", () => {
  currentDate = new Date();
  updateCalendar();
});

// 初始化行事曆
document.addEventListener("DOMContentLoaded", updateCalendar);
