import { auth, db } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  doc,
  query,
  orderBy,
  deleteDoc,
} from "firebase/firestore";

import { AnimatePresence, motion } from "framer-motion";

export default function Main() {
  const [user] = useAuthState(auth);
  const collectionRef = collection(db, `tasks/${user.uid}/task`);

  const [taskList, setTaskList] = useState([]);

  const q = query(collectionRef, orderBy("createdAt"));

  useEffect(() => {
    onSnapshot(
      q,
      (e) => {
        const data = [];
        e.docs.forEach((e) => {
          data.push({ ...e.data(), id: e.id });
        });
        setTaskList(data);
      },
      (err) => {
        if (err) {
          err = "";
        }
      }
    );
  });

  function addTask(e) {
    e.preventDefault();
    let input = e.target[0].value;
    let q = [...taskList, { task: input }];
    addDoc(collectionRef, {
      task: input,
      createdAt: serverTimestamp(),
    });
    setTaskList(q);
    e.target[0].value = "";
  }

  function onDelete(id) {
    console.log(id);
    const next = taskList.filter((task) => task.id !== id);
    const docRef = doc(db, `tasks/${user.uid}/task`, id);
    deleteDoc(docRef);
    setTaskList(next);
  }

  return (
    <>
      <AnimatePresence>
        <motion.main
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}>
          <h1>
            Welcome {user.displayName !== null ? user.displayName : user.email}
          </h1>
          <form style={{ color: "white" }} onSubmit={addTask}>
            <label htmlFor='input'> Enter Task : </label>
            <input
              type='text'
              id='input'
              style={{ width: `100px` }}
              placeholder={"Task"}
              required
            />

            <button type='submit'> Add Task </button>
          </form>
          <motion.section className='list'>
            <ul>
              {taskList.map((e, i) => {
                return (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className='card'
                    key={i}>
                    <li> {e.task} </li>
                    <button onClick={() => onDelete(e.id)}>X</button>
                  </motion.div>
                );
              })}
            </ul>
          </motion.section>
        </motion.main>
      </AnimatePresence>
    </>
  );
}
