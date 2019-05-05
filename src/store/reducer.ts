import { TaskModal } from '../modal/task-modal';
import { ActionType, BoardAction } from './action';
import { combineReducers, Reducer } from 'redux';
import { AppState } from '../modal/appState';

export const initialAppState: AppState = {
    boards: [],
    tasks: []
}

const updateBoard: Reducer<AppState> = (state: AppState = initialAppState, action: BoardAction) => {
    switch (action.type) {
        case ActionType.UPDATE_TASK: {
            const updatedTasks = state.tasks.map((task: TaskModal) => {
                if (task.id === action.payload.task.id && task.boardId === action.payload.task.boardId) {
                    task.list = action.payload.list;
                }
                return task;
            })
            return {
                boards: state.boards,
                tasks: updatedTasks
            };
        }
        case ActionType.ADD_TASK: {
            return {
                boards: state.boards,
                tasks: [...state.tasks, action.payload.task]
            };
        }
        default: return state;
    }
}

const rootReducer = combineReducers({ updateBoard })

export default rootReducer;