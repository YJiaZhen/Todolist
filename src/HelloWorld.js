import React, { useState, useEffect } from "react";
import "./HelloWorld.css";
import TodoItem from "./TodoItem";

const HelloWorld = () => {
  // 初始化我們input輸入框為空字串
  const [inputToDo, setInputToDo] = useState("");
  // 初始化我們待辦清單的所有內容為空陣列
  const [toDoList, setToDoList] = useState([]);
  // 確認我們待辦事項的編輯狀態，初始Id為0
  const [updateId, setUpdateId] = useState(0);
  
  useEffect(() => {
    console.log('here',Date.now)
    // 從localStorage中讀取待辦事項列表
    const savedToDoList = JSON.parse(localStorage.getItem("toDoList"));
    if (savedToDoList) {
      setToDoList(savedToDoList);
    }
  }, []);

  // useEffect(() => {
  //   // 將待辦事項列表存入localStorage
  //   localStorage.setItem("toDoList", JSON.stringify(toDoList));
  // }, [toDoList]);

  // 新增待辦事項的按鈕函數
  const handleSubmit = (e) => {
    // 當我們點選Add按紐時handleSubmit會被觸發
    // 我們不希望它刷新頁面
    e.preventDefault();
    let newItems
    if (updateId) {
      console.log('@')
      // 要用找到的id內的值回傳到輸入框並來編輯它
      // 先確認跟我們要尋找的Id是否相符
      // 它會詢問我們正在嘗試更新的待辦事項
      // 如果"是"已更新的，我們提供原始的Id並執行Input寫入的任何內容
      // 如果"不是"，我們就提供它的默認值
      const updateToDo = toDoList.find((i) => i.id === updateId);
      newItems = toDoList.map((todo) =>
        todo.id === updateToDo.id
          ? (todo = { id: todo.id, inputToDo })
          : { id: todo.id, inputToDo: todo.inputToDo }
      );

      setUpdateId(0);
      setInputToDo("");
    }
    // 只要inputToDo裡面不是空字串
    // 就會創建新的To-Do List
    if (inputToDo !== "") {
      console.log('#')
      newItems = [
        { id: `${inputToDo}-${Date.now()}`, inputToDo },
        ...toDoList,
      ]
      console.log('newItems',newItems);
      // setToDoList(newItems);
      
      // localStorage.setItem("toDoList", JSON.stringify(newItems));
 

      // 輸入框新增按鈕送出後輸入框內的文字為空，記得下方input要寫value={inputToDo}
      setInputToDo("");
    }
    setToDoList(newItems);
    localStorage.setItem("toDoList", JSON.stringify(newItems));
  };
  // 控制delete按鈕的函式
  // 將delete裡面的所有東西都做變量
  // 設置filter過濾器去抓清單的獨特id
  // 它將比較所有內容，如果與這個id匹配
  // 那麼它就會被刪除
  // 否則，如果不匹配這邊給不等於!==
  // 它將不會被刪除
  const handleDelete = (id) => {
    const deleteToDo = toDoList.filter((to) => to.id !== id);
    // 最後狀態需要更新回傳，將刪除傳遞給array
    // ...為擴展運算符號
    setToDoList([...deleteToDo]);
    localStorage.setItem("toDoList", JSON.stringify(deleteToDo));
  };
  // 控制update按鈕的函式
  // 需求為按下update按鈕後
  // 更新前的文字會出現在輸入框內
  // 我們做修改後送出會更新我們原本的To-Do List

  // 用find找到我們單一的To-Do
  // 讓它透過id去尋找我們要修改相同id的元素
  // 它將回傳具有相同id的整個對象和To-Do內容在輸入框內
  // 透過find尋找所有的To-Do list的array中的特定id相等就會回傳

  // 接下來就是我們要修改的內容為setInputToDo
  // updateTodo是一個object裡面包含一個id和一個To-Do
  const handleUpdate = (id) => {
    const updateToDo = toDoList.find((i) => i.id === id);
    setInputToDo(updateToDo.inputToDo);
    setUpdateId(id);
  };


console.log('toDoList',toDoList)
  return (
    <div className="App">
      <div className="container">
        {/* 標題 */}
        <h1>To-Do List!</h1>
        {/* 待辦事項的輸入表單，提交按鈕觸發handleSubmit函式 */}
        <form className="toDoForm" onSubmit={handleSubmit}>
          {/* 新增待辦事項的輸入框，onChange每當輸入框改變時調用，value讓它等於{inputToDo}，輸入新增按鈕後就會輸入框就會變成空 */}
          <input
            type="text"
            value={inputToDo}
            onChange={(e) => setInputToDo(e.target.value)}
          />
          {/* 新增Add按鈕和修改Update的輸入框共用，UpdateId如果"有"返回"Update，否則返回Add*/}
          <button type="sumbit">{updateId ? "Update" : "Add"}</button>
        </form>
        {/* 待辦清單顯示內容，t代表整個對象為輸入框內的inputToDo值 */}
        <ul className="allToDoList">
          {toDoList.map((todo) => (
            <li className="singleTodoTask" key={todo.id}>
              <TodoItem 
                todo={todo} 
                onUpdate={handleUpdate} 
                onDelete={handleDelete} 
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HelloWorld;

//<span className='toDoText' key={t.id}>{t.inputToDo}</span>
//             {/* 創建更新按鈕要傳入的函式 */}
//            <button type="button" onClick={() => handleUpdate(t.id)}>Update</button>
//             {/* 創建刪除按鈕要傳入的函式 */}
//             <button type="button" onClick={() => handleDelete(t.id)}>Delete</button>
