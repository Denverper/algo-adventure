// App.js
import React, { useState } from "react";
import Confetti from 'react-confetti-boom';

import "./App.css";

function App() {
  const taskLists = {
    long: { tasks: ["Find Denver and tell him a joke.", "Write numbers 1 - 50 at the white board of the fourth floor kitchen", "Sort by suit and number deck of cards at the fifth floor - take a picture and shuffle after.", "Solve a maze at 2nd floor bulletin board", "Where is waldo at the 4th floor stairwell near kitchen", "Spot the difference at the 3rd floor stairwell near kitchen", "Origami at the second floor kitchen", "Solve math problem  in the third floor kitchen"], count: 3 },
    short: { tasks: ["Spin the gear at the lobby of second floor.", "Record what the temperature it is at the lobby", "Fill out questionnaire in front of Dr. Roszelle’s office", "Find the raccoon plushie within the third floor - take a picture and hide it again of floor 3!", "Hopscotch at 4th floor", "Open / close windows at the third floor kitchen", "Simplify math problem at the second floor kitchen", "Draw a picture of a raccoon in second floor kitchen", "Color a picture in the third floor tables", "Correctly place three jigsaw puzzle pieces at the thrid floor kitchen"], count: 3 },
    common: { tasks: ["Scan DU ID at 379", "Write name on paper at the printer outside of the Innovation Labs on the first floor", "Scan DU ID 279 "], count: 2 }
  }

  const groupTasks = [
    { room: 'ECS 257', task: 'Pentominos & Parentheses' },
    { room: 'ECS 300', task: 'Coloring and Coding Task!' },
    { room: 'ECS 400', task: 'Parking Spots & Prefixes' },
    { room: 'ECS 401', task: 'Build a Slingshot!' },
  ];

  const [showConfetti, setShowConfetti] = useState(false);

  const handleCompletion = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 10000);
  };

  const [selectedTasks, setSelectedTasks] = useState({});

  const getRandomTasks = () => {
    const checkboxes = document.querySelectorAll('.task-checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });

    const newSelectedTasks = {};
    for (const category in taskLists) {
      const numTasksNeeded = taskLists[category].count;
      const tasks = taskLists[category].tasks;
      newSelectedTasks[category] = [];
      let randomTasks = [];
      while (randomTasks.length < numTasksNeeded) {
        const randomIndex = Math.floor(Math.random() * tasks.length);
        const randomTask = tasks[randomIndex];
        if (!randomTasks.includes(randomTask)) {
          randomTasks.push(randomTask);
        }
      }
      newSelectedTasks[category] = randomTasks;
    }
    console.log(newSelectedTasks);
    setSelectedTasks(newSelectedTasks);
  };

  React.useEffect(() => {
    const checkboxes = document.querySelectorAll('.task-checkbox');
    const completionMessage = document.getElementById('completionMessage');

    const handleCheckboxChange = () => {
      const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
      if (allChecked) {
        completionMessage.classList.remove('hidden');
        handleCompletion();
      } else {
        completionMessage.classList.add('hidden');
      }
    };

    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', handleCheckboxChange);
    });

    return () => {
      checkboxes.forEach(checkbox => {
        checkbox.removeEventListener('change', handleCheckboxChange);
      });
    };
  }, [selectedTasks, showConfetti]);
 
  return (
    <div className="min-h-screen px-2 py-20 flex flex-col flex-auto items-center justify-center bg-gray-100">
      { showConfetti &&
          <Confetti mode="fall" effectInterval={10000} particleCount={500} colors={['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']}/>
      }
      <h1 className="text-3xl font-bold text-gray-800 text-center">Algo. Adventures Task Checklist</h1>
      {Object.keys(selectedTasks).length === 0 && (
      <button
        onClick={getRandomTasks}
        className="px-4 py-2 mt-4 bg-purple-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300"
      >
        {"Generate Tasks"} 
      </button> )}

      <div id="groupTasksContainer" className="mt-6 mr-4 ml-4 bg-white p-4 rounded-lg shadow-md shadow-green-300 items-center justify-center">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 capitalize">Meeting Room: ECS 357</h2>
      </div>

      <div id="taskContainer" className="mt-6 mr-4 ml-4 bg-white p-4 rounded-lg shadow-md shadow-purple-300 items-center justify-center">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 capitalize">Individual Tasks:</h2>

        {Object.keys(selectedTasks).length > 0 ? (
          <>
            {Object.entries(selectedTasks).map(([category, tasks]) => (
              <div key={category}>
                {tasks.map((task, index) => (
                  <div key={index} className="task-item flex items-center mb-3">
                    <input type="checkbox" id={`${category}-${index}`} className="mr-2 task-checkbox "/>
                    <label htmlFor={`${category}-${index}`} className="text-gray-700">
                      {task}
                    </label>
                  </div>
                ))}
              </div>
            ))}
            <p id="completionMessage" className="text-green-500 font-bold mt-4 hidden">Good job! Find an officer to verify!</p>
          </>
        ) : (
          <p className="text-gray-500">Click "Generate Tasks" to see your individual checklist!</p>
        )}
      </div>
      <div id="groupTasksContainer" className="mt-6 mr-4 ml-4 bg-white p-4 rounded-lg shadow-md shadow-purple-300 items-center justify-center">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 capitalize">Group Tasks:</h2>
        {groupTasks.map((task, index) => (
          <div key={index} className="task-item flex items-center mb-2">
            <span className="mr-2 text-gray-700">{task.room}:</span>
            <span className="text-gray-700">{task.task}</span>
          </div>
        ))}
      </div>
      <div>
        <p className="text-gray-500 mt-4 text-center">Please complete all tasks to help crewmates win! 🎉📮</p>
      </div>
    </div>
  );
};

export default App;
