import { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
} from "firebase/database";
import "./App.css";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#c36868",
  },
};
function App() {
  const db = getDatabase();

  // all state
  const [todoInput, settodoInput] = useState("");
  const [todoAlldata, settodoAlldata] = useState([]);
  const [realtime, setrealtime] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalInputValue, setmodalInputValue] = useState("");
  const [editItemId, seteditItemId] = useState("");
  const [editTodoText, seteditTodoText] = useState("");

  /**
   *  todo : modal all functionatlity
   */

  function closeModal() {
    setIsOpen(false);
  }

  /**
   *  todo : modal all functionatlity
   */

  //GET data from database
  useEffect(() => {
    const todoDBRef = ref(db, "todo/");
    onValue(todoDBRef, (snapshot) => {
      const allDataArr = [];
      snapshot.forEach((item) => {
        allDataArr.push({
          todoId: item.key,
          todoItem: item.val(),
        });
      });
      settodoAlldata(allDataArr);
    });
  }, [realtime]);

  // HandleAdd function
  const HandleAdd = (e) => {
    e.preventDefault();
    if (todoInput !== "") {
      const dbinfo = ref(db, "todo/");
      set(push(dbinfo), {
        todoItem: todoInput,
      })
        .then(() => {
          setrealtime(!realtime);
          settodoInput("");
          console.log("upload sucessfully");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("input faka");
    }
  };

  // HandleDelete funciton

  const HandleDelete = (deletdid) => {
    remove(ref(db, "todo/" + deletdid))
      .then(() => {
        console.log("sucessfully delete");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * edit functionality
   */

  const HandleEdit = (editId, editTodo) => {
    seteditItemId(editId);
    seteditTodoText(editTodo);
    setIsOpen(true);
  };

  // HandleUpdate function

  const HandleUpdate = (e) => {
    e.preventDefault();
    set(ref(db, "todo/" + editItemId), {
      todoItem: modalInputValue,
    })
      .then(() => {
        console.log("update sucessfully done");
        setIsOpen(false);
        setmodalInputValue("");
      })
      .catch((err) => {
        console.log("update failed", err);
      });
  };

  return (
    <>
      <div className="todoBody">
        <form>
          <input
            type="text"
            className="inputField"
            value={todoInput}
            onChange={(e) => settodoInput(e.target.value)}
          />
          <button className="Addbtn" onClick={HandleAdd}>
            Add
          </button>
        </form>

        <div className="todoitmebox">
          <ul className="itemParent">
            {todoAlldata.map((item) => (
              <li className="todoItemforcss" key={item.todoId}>
                <div className="todoAllItem">
                  <button
                    className="edit"
                    onClick={() =>
                      HandleEdit(item.todoId, item.todoItem.todoItem)
                    }
                  >
                    Edit
                  </button>
                  <span className="todospan">{item.todoItem.todoItem}</span>
                  <button
                    className="delete"
                    onClick={() => HandleDelete(item.todoId)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <button className="closeBtn" onClick={closeModal}>
              X
            </button>
            <form>
              <input
                className="modalInput"
                placeholder={editTodoText}
                value={modalInputValue}
                onChange={(e) => setmodalInputValue(e.target.value)}
              />
              <br />
              <button className="modalbtn" onClick={HandleUpdate}>
                Update
              </button>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default App;
