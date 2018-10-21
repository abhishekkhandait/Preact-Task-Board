export class TaskModal {
    constructor(
        public id: number,
        public name: string,
        public list: string,
        public dueDate: Date,
        public priority: number,
        public boardId: string
    ){}
}