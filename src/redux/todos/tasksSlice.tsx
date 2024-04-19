import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
export type TTask = {
    id: string
    task: string
    isCompleted: boolean
}

type TInitialState = {
    tasks: TTask[]
    completedTasks: number
    totalNumberOfTasks: number
}

const tasksData: TInitialState = JSON.parse(localStorage.getItem('tasksData')!)

// Define the initial state using that type
const initialState: TInitialState = {
    tasks: tasksData?.tasks || [],
    completedTasks: tasksData?.completedTasks || 0,
    totalNumberOfTasks: tasksData?.totalNumberOfTasks || 0,
}

function setLocalStorage(data: TInitialState) {
    localStorage.setItem('tasksData', JSON.stringify(data))
}

export const tasksSlice = createSlice({
    name: 'tasksStore',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<TTask>) => {
            state.tasks.unshift(action.payload)

            state.totalNumberOfTasks += 1
            state.completedTasks = state.tasks.filter((task) => task.isCompleted).length
            setLocalStorage(state)
        },
        toggleTaskStatus: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.map((task) =>
                task.id === action.payload ? { ...task, isCompleted: !task.isCompleted } : task,
            )

            state.completedTasks = state.tasks.filter((task) => task.isCompleted).length
            setLocalStorage(state)
        },
        editTask: (state, action: PayloadAction<{ id: string; task: string }>) => {
            state.tasks = state.tasks.map((task) =>
                task.id === action.payload.id ? { ...task, task: action.payload.task } : task,
            )

            setLocalStorage(state)
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload)

            state.totalNumberOfTasks -= 1
            state.completedTasks = state.tasks.filter((task) => task.isCompleted).length
            setLocalStorage(state)
        },
    },
})

export const { addTask, toggleTaskStatus, editTask, deleteTask } = tasksSlice.actions

export default tasksSlice.reducer
