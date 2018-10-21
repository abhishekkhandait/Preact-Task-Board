import { BoardModal } from "./board-modal";
import { TaskModal } from "./task-modal";

export type AppState = {
    boards: BoardModal[],
    tasks: TaskModal[]
}