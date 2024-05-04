import { createSlice } from "@reduxjs/toolkit";

// Load the initial state from localStorage (if available)
const initialState = JSON.parse(localStorage.getItem("todoState")) || [];

const customReducer = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
    //   state.unshift(action.payload);   but it will increase the complexity that's i did not use
      state=[action.payload,...state];
      saveState(state); // Save state to localStorage after adding a task
      return state;
    },
    deleteTask: (state, action) => {
        const idToDelete = action.payload.id;
        const newState = state.filter(task => task.id != idToDelete);  
        saveState(newState); // Save state to localStorage after deleting a task
        return newState; // Return the new state after deletion
      },
    taskCompleted:(state,action)=>{
        const { id, completed } = action.payload;
        const index = state.findIndex(task => task.id === id);
        if (index !== -1) {
            state[index] = { ...state[index], isCompleted:completed };
            saveState(state);
            return state;
          }     
         }
  }
});

// Define saveState function to save state and store it in localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("todoState", serializedState);
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};


// Export action creators
export const { addTask, deleteTask,taskCompleted } = customReducer.actions;

const Reducer = customReducer.reducer;
export default Reducer;
