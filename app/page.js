'use client'
import Image from 'next/image';
import {useEffect, useState} from "react";


export default function Home() {

  const [task, setTask] = useState({});
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('')



  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false
    }
    setTasks([...tasks, newTask])
  };


  const handleCompleteTask = (task) => {
    setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
  };

  const handleToggleTask = (filter) => {
    setFilter(filter);
  };

  const handleDeleteTask = (task) => {
    setTasks(tasks.filter(t => t.id !== task.id));

  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'active') {
      return !task.completed;
    } else {
      return true;
    }
  });

  const uncompletedCount = tasks.filter(task => !task.completed).length;

  useEffect(() => setTasks(tasks), []);
  return (
      <div className="container mx-auto p-4">

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">TODO</h1>
        </div>

        <div className="mb-4 flex items-center">
          <input
              type="text"
              className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
              placeholder="What to do ?"
              onChange={e => setTask(e.target.value)}
          />
          <button
              onClick={handleAddTask}
              className="bg-blue-500 text-white p-4 rounded ml-4"
          >
            Add Task
          </button>
        </div>

        <div className="bg-gray-800 rounded p-4">
          {/* Medium level: extract todo's listing to TaskList component */}
          {/* Basic level: map through tasks state by using this code: */}
          <ul>

            {filteredTasks.map((task, index) =>
                <li className="flex justify-between items-center p-2 bg-gray-900 rounded mb-2">
                  <div className="flex items-center">
                    <button
                        className="w-6 h-6 my-auto mr-6"
                        onClick={()=> handleCompleteTask(task)}
                    >
                      <Image
                          src={task.completed ? "/images/circle-cheked.svg" : "/images/circle.svg"}
                          alt="Task status"
                          width={30}
                          height={30}
                      />
                    </button>
                    <span className={`ml-2 ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>{task.text}</span>
                  </div>
                  <button onClick={() => handleDeleteTask(task)} className="text-gray-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>)}
          </ul>
          <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
            <span> 'n' items left</span>  {/* show how many uncompleted items left */}
            <div>
              <button onClick={() => handleToggleTask("all")} className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>All</button>
              <button onClick={() => handleToggleTask("active")} className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}>Active</button>
              <button onClick={() => handleToggleTask("completed")} className={`${filter === 'completed' ? 'text-white' : ''}`}>Completed</button>
            </div>
            <button
                onClick={() => setTasks([])}
                className="text-gray-400 hover:text-white"
            >
              Clear Completed
            </button>
          </div>
        </div>

      </div>
  );
}
