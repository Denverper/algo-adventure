// App.js
import React, { useState } from "react";

import "./App.css";

function App() {
  const taskLists = {
    long: { tasks: ["Find Denver and fill his water bottle.", "Write numbers 1 - 50 at the white board of the fourth floor kitchen", "Sort by suit and number deck of cards at the fifth floor - take a picture and shuffle after.", "Solve a maze at 2nd floor bulletin board", "Where is waldo at the 4th floor stairwell near kitchen", "Spot the difference at the 3rd floor stairwell near kitchen", "Origami at the second floor kitchen", "Solve math problem  in the third floor kitchen - multiplication"], count: 3 },
    short: { tasks: ["Spin the gear at the lobby of second floor.", "Record what the temperature it is at the lobby", "Fill out questionnaire in front of Dr. Roszelle’s office", "Clean the table at the third floor kitchen", "Hopscotch at 4th floor", "Open / close windows at the third floor kitchen", "Simplify math problem at the second floor kitchen", "Draw a picture of a raccoon in second floor kitchen", "Color a picture in the third floor tables", "Correctly place on jigsaw puzzle piece at the fourth floor kitchen"], count: 3 },
    common: { tasks: ["Scan card at 379", "Write name on paper at the printer outside of the Innovation Labs on floor 1", "Scan card at 279 "], count: 2 }
  }

  const [selectedTasks, setSelectedTasks] = useState({});

  const getRandomTasks = () => {
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
  }, [selectedTasks]);
 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Algo. Adventures Task Checklist</h1>
      <button
        onClick={getRandomTasks}
        className="px-4 py-2 bg-purple-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300"
      >
        {Object.keys(selectedTasks).length === 0 ? "Generate Tasks" : "Get New Tasks! (Restart 💀)"} 
      </button>

      <div id="taskContainer" className="mt-6 mr-12 ml-12 bg-white p-4 rounded shadow-md">
        {Object.keys(selectedTasks).length > 0 ? (
          <>
            {Object.entries(selectedTasks).map(([category, tasks]) => (
              <div key={category} className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 capitalize">{category}</h2>
                {tasks.map((task, index) => (
                  <div key={index} className="task-item flex items-center mb-2">
                    <input type="checkbox" id={`${category}-${index}`} className="mr-2 task-checkbox"/>
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
          <p className="text-gray-500">Click "Generate Tasks" to see your checklist!</p>
        )}
      </div>
    </div>
  );
};

export default App;
