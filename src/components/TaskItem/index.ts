import { removeTask, toggleTask } from "../../store/actions";
import { addObserver, dispatch } from "../../store/store";

export enum TaskItemProps {
	'uid' = 'uid',
	'tasktitle' = 'tasktitle',
	'state' = 'state',
}

class TaskItem extends HTMLElement {
	uid?: number;
	tasktitle?: string;
	state?: boolean;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this)

	}

	static get observedAttributes() {
		const attrs: Record<TaskItemProps, null> = {
			uid: null,
			tasktitle: null,
			state: null,
		}
		return Object.keys(attrs)
	}

	connectedCallback() {
		this.render();

	}

	attributeChangedCallback(propName: TaskItemProps, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case TaskItemProps.uid:
				this.uid = newValue ? Number(newValue) : undefined;
				break;

			case TaskItemProps.state:
				this.state = newValue ? newValue === 'true' : undefined;
				break;


			default:
				this[propName] = newValue;
				break;
		}
		this.render();
	}

	render() {
		if (this.shadowRoot) this.shadowRoot.innerHTML = `
			<article>
				<h3>${this.tasktitle}</h3>
				<button class="delete-task">Delete</button>
				<input type="checkbox" ${this.state ? 'checked' : ''} class="check-task">
			</article>
		`;

		const deleteButton = this.shadowRoot?.querySelector('.delete-task')
		const checkButton = this.shadowRoot?.querySelector('.check-task')
		deleteButton?.addEventListener('click', () => {
			console.log("click", this.uid);

			dispatch(removeTask(this.uid!))
		})

		checkButton?.addEventListener('change', () => {
			dispatch(toggleTask(this.uid!))
		})

	}

}

customElements.define('task-item', TaskItem);
export default TaskItem;
