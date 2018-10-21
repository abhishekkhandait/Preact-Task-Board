import { h, Component } from "preact";

import { Card } from "./card";
import { TaskModal } from "../modal/task-modal";

interface CategoryProps {
    categorytype: string,
    tasks: TaskModal[],
    onTaskMove: (event: DragEvent) => void
}

interface CategoryState {
    tasks: TaskModal[]
}

export class Category extends Component<CategoryProps, CategoryState> {

    constructor(props: CategoryProps, state: CategoryState = {tasks: []}) {
        super(props);
        this.setState({
            tasks: this.props.tasks
        });

    }

    componentDidUpdate() {
    }

    onTaskDragOver(event: DragEvent) {
        event.preventDefault();
        event.defaultPrevented;
    }

    render() {
        return (
            <div class="container mdl-shadow--1dp" onDragOver={(e) => this.onTaskDragOver(e)} onDrop={this.props.onTaskMove}>
                <div class={"header " + this.props.categorytype.toLocaleLowerCase()}>
                    <span>{this.props.categorytype}</span>
                    <div>
                        <button class="mdl-button mdl-js-button mdl-button--icon" id={"sorting-" + this.props.categorytype}>
                            <i class="material-icons">sort</i>
                        </button>
                        <ul class="mdl-menu mdl-js-menu mdl-js-ripple-effect" for={"sorting-" + this.props.categorytype}>
                            <li class="mdl-menu__item">Due Date</li>
                            <li class="mdl-menu__item">Priority</li>
                        </ul>
                    </div>
                    {
                        this.props.categorytype !== 'Done' &&
                        (<button class="mdl-button mdl-js-button mdl-button--icon">
                            <i class="material-icons">add</i>
                        </button>)
                    }
                </div>
                <div class="content">
                    <div class="card-holder">
                        {this.props.tasks.map((task) => <Card task={task}></Card>)}
                    </div>
                </div>
            </div>
        )
    }
}