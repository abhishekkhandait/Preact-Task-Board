import { ActionCreator, Action, Dispatch, bindActionCreators } from "redux";
import { TaskModal } from "../modal/task-modal";

export enum ActionType {
    UPDATE_TASK = 'UPDATE_TASK',
    GET_TASKS = 'GET_TASKS',
    ADD_TASK = 'ADD_TASK'
}

interface UpdateTaskAction extends Action {
    readonly type: ActionType.UPDATE_TASK,
    readonly payload: {
        task: TaskModal,
        list: string
    }
}

interface AddTaskAction extends Action {
    readonly type: ActionType.ADD_TASK,
    readonly payload: {
        task: TaskModal
    }
}

export type BoardAction = UpdateTaskAction | AddTaskAction

export const updateTask: ActionCreator<UpdateTaskAction> = (task: TaskModal, list: string) => ({
    type: ActionType.UPDATE_TASK,
    payload: {
        task,
        list
    }
});

export const addTask: ActionCreator<AddTaskAction> = (task: TaskModal) => ({
    type: ActionType.ADD_TASK,
    payload: {
        task
    }
});

export const bindActions = (actions: any) => {
    return (dispatch: Dispatch) => ({
        ...bindActionCreators(actions, dispatch)
    });
}