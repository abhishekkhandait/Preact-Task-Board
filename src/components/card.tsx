import { h, Component } from "preact";
import { TaskModal } from "../modal/task-modal";

export interface CardProps {
    task: TaskModal
}

interface CardState {
    task: TaskModal;
}

export class Card extends Component<CardProps, CardState> {
    constructor(props: CardProps, state: CardState) {
        super(props);
        this.setState({
            task: this.props.task
        })
    }

    dragStart(event: DragEvent, task: TaskModal) {
        event.dataTransfer.setData("draggedTask", JSON.stringify(task));
    }

    render() {
        return (
            <div class="mdl-card card mdl-shadow--4dp" id={this.props.task.id.toString()} draggable onDragStart={(e) => this.dragStart(e, this.props.task)}>
                <div class="mdl-card__action">
                    <div class="priority">Priority: {this.props.task.priority}</div>
                    <div class="due-date">Due Date: {this.props.task.dueDate}</div>
                    <div class="description">{this.props.task.name}</div>
                </div>
            </div>
        );
    }
}