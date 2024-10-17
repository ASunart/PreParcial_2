import { addObserver, appState } from "../../store/store";
import TaskItem, { TaskItemProps } from "../TaskItem/index";
import "../TaskItem/index";

class TaskList extends HTMLElement {
	taskItems: TaskItem[] = []
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this)

		appState.tasks.forEach((task) => {
			const { id, title, state } = task
			const taskItem = this.ownerDocument.createElement('task-item') as TaskItem;
			taskItem.setAttribute(TaskItemProps.uid, id);
			taskItem.setAttribute(TaskItemProps.tasktitle, title);
			taskItem.setAttribute(TaskItemProps.state, state);
			this.taskItems.push(taskItem);
		})
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.taskItems.forEach((taskItem) => {
				this.shadowRoot?.appendChild(taskItem)
			})
		}



	}

}

customElements.define('task-list', TaskList);
export default TaskList;
