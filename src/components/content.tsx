import { h, Component } from "preact";
import { BoardModal } from "../modal/board-modal";
import { Board } from "./board";
import { TaskModal } from "../modal/task-modal";
import { taskUrl } from "../app";

export interface ContentProps {
    boards: BoardModal[]
}

interface ContentState {
    activeBoard: string;
    tasks: TaskModal[];
}

export class Content extends Component<ContentProps, ContentState> {
    constructor(props: ContentProps, state: ContentState) {
        super(props);
        this.setState({
            activeBoard: "1",
            tasks: []
        })
        this.props.boards.length > 0 && this.activateBoard(this.props.boards[0].id);
        this.fetchTasks();
    }

    activateBoard(boardid: string) {
        this.setState({ activeBoard: boardid });
    }

    fetchTasks() {
        fetch(taskUrl)
            .then((res) => res.json())
            .then((tasks) => {
                this.setState({ tasks: tasks });
            });
    }

    filterTasksForBoard(boardid: string) {
        const x = this.state.tasks.filter((task) => task.boardId.toString() === boardid.toString());
        return x;
    }

    createBoardMenuBar() {
        return this.props.boards.map((board, i) => {
            return <a href={`#board${board.id}-panel`} class={"mdl-tabs__tab " + (i == 0 ? "is-active" : "")}>{board.title}</a>
        })
    }

    createBoardContainer() {
        return this.props.boards.map((board, i) => {
            return (
                <div class={"mdl-tabs__panel " + (i == 0 ? "is-active" : "")} id={`board${board.id}-panel`}>
                    <Board tasks={this.filterTasksForBoard(board.id)}></Board>
                </div>
            )
        })
    }

    render() {
        return (
            <div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                <div class="mdl-tabs__tab-bar tab-bar">
                    {this.createBoardMenuBar()}
                </div>
                {this.createBoardContainer()}
            </div>
        )
    }
}