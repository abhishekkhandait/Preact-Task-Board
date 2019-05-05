import { h, Component } from "preact";
import { Category } from "./category";
import { TaskModal } from "../modal/task-modal";

interface BoardProps {
	tasks: TaskModal[];
}

interface BoardState {
	tasks: TaskModal[];
}

export class Board extends Component<BoardProps, BoardState> {
	constructor(props: BoardState, state: {}) {
		super(props);
		this.onTaskDrop = this.onTaskDrop.bind(this);
		this.setState({
			tasks: this.props.tasks
		});
	}

	filterTaskForCategory(tasks: TaskModal[], category: string) {
		return tasks.filter(task => task.list == category);
	}

	onTaskDrop(event: DragEvent) {
		if (event.dataTransfer.types.indexOf("draggedtask") > -1) {
			const data = JSON.parse(event.dataTransfer.getData("draggedTask")) as TaskModal;
			const task = this.state.tasks.find(task => task.id == data.id);
			const newCategory = (event.target as HTMLElement).closest(".category").getAttribute("data-category");
			if (task.list !== newCategory) {
				this.setState({
					tasks: this.state.tasks.map(t => {
						if (t.id === task.id) {
							t.list = newCategory;
						}
						return t;
					})
				});
			}
		}
	}

	render() {
		return (
			<div class="board">
				<div class="mdl-grid">
					<div class="mdl-cell mdl-cell--4-col">
						<div class="board-title">Things to get Done</div>
					</div>
					<div class="mdl-cell mdl-cell--6-col" />
					<div class="mdl-cell mdl-cell--2-col mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
						<label class="mdl-button mdl-js-button mdl-button--icon" for="fixed-header-drawer-exp">
							<i class="material-icons">search</i>
						</label>
						<div class="mdl-textfield__expandable-holder">
							<input class="mdl-textfield__input" placeholder="Search task" type="search" name="sample" id="fixed-header-drawer-exp" />
						</div>
					</div>
				</div>
				<div class="mdl-grid boardarea">
					<div class="mdl-cell mdl-cell--3-col category" data-category="New">
						<Category categorytype="New" tasks={this.filterTaskForCategory(this.state.tasks, "New")} onTaskMove={this.onTaskDrop} />
					</div>
					<div class="mdl-cell mdl-cell--3-col category" data-category="On-Hold">
						<Category categorytype="On-Hold" tasks={this.filterTaskForCategory(this.state.tasks, "On-Hold")} onTaskMove={this.onTaskDrop} />
					</div>
					<div class="mdl-cell mdl-cell--3-col category" data-category="In-Progress">
						<Category categorytype="In-Progress" tasks={this.filterTaskForCategory(this.state.tasks, "In-Progress")} onTaskMove={this.onTaskDrop} />
					</div>
					<div class="mdl-cell mdl-cell--3-col category" data-category="Done">
						<Category categorytype="Done" tasks={this.filterTaskForCategory(this.state.tasks, "Done")} onTaskMove={this.onTaskDrop} />
					</div>
				</div>
			</div>
		);
	}
}
