import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mytask',
  templateUrl: './mytask.component.html',
  styleUrls: ['./mytask.component.scss'],
  providers: [MessageService],
})
export class MytaskComponent implements OnInit {
  public type = '';
  public draggedTask: any;
  displayImageDialog: boolean = false;
  selectedImage: string|null=null;

  public todos = [
    {
      status: 'To Do',
      tasks: [
        { id: 1, name: 'Task 1', descripition: 'Description 1', assignee: 'John Doe', createdOn: new Date(), status: 'TODO' },
        { id: 2, name: 'Task 2', descripition: 'Description 2', assignee: 'Will Smith', createdOn: new Date(), status: 'TODO' ,  imageUrl: 'assets/img/avatars/vasim.jpg' },
      ],
    },
    {
      status: 'In Progress',
      tasks: [
        { id: 3, name: 'Task 3', descripition: 'Description 3', assignee: 'James Aninston', createdOn: new Date(), status: 'IN_PROGRESS', imageUrl: 'assets/img/avatars/vasim.jpg'  },
        { id: 1, name: 'Task 1', descripition: 'Description 1', assignee: 'John Doe', createdOn: new Date(), status: 'TODO' },
      
      ],
    },
    {
      status: 'Completed',
      tasks: [
        { id: 1, name: 'Task 1', descripition: 'Description 1', assignee: 'John Doe', createdOn: new Date(), status: 'TODO' },
        { id: 4, name: 'Task 4', descripition: 'Description 4', assignee: 'John Doe', createdOn: new Date(), status: 'COMPLETED', imageUrl: 'assets/img/avatars/vasim.jpg' },
      ],
    },
    {
      status: 'Pending',
      tasks: [
        { id: 5, name: 'Task 5', descripition: 'Description 5', assignee: 'Will Smith', createdOn: new Date(), status: 'PENDING', imageUrl: 'assets/img/avatars/vasim.jpg' },
        { id: 8, name: 'Task 1', descripition: 'Description 1', assignee: 'John Doe', createdOn: new Date(), status: 'TODO' },
      
      ],
    },
    {
      status: 'Testing',
      tasks: [
        { id: 1, name: 'Task 1', descripition: 'Description 1', assignee: 'John Doe', createdOn: new Date(), status: 'TODO' },
        { id: 7, name: 'Task 5', descripition: 'Description 5', assignee: 'Will Smith', createdOn: new Date(), status: 'PENDING', imageUrl: 'assets/img/avatars/vasim.jpg' },
      ],
    },
    
  ];

  getTasksByStatus(status: string) {
    return this.todos.find(todo => todo.status === status)?.tasks || [];
  }

  dragStart(task: any) {
    this.draggedTask = { ...task }; // Create a copy of the task
  }

  drop(targetStatus: string) {
    if (this.draggedTask) {
      // Remove task from its current status
      this.todos.forEach(todo => {
        if (todo.tasks.find(t => t.id === this.draggedTask.id)) {
          todo.tasks = todo.tasks.filter(t => t.id !== this.draggedTask.id);
        }
      });

    
      this.draggedTask.status = targetStatus;

      const targetTodo = this.todos.find(todo => todo.status === targetStatus);
      if (targetTodo) {
        targetTodo.tasks.push(this.draggedTask);
      }

      this.draggedTask = null; 
    }
  }

  dragEnd() {
    
    if (this.draggedTask) {
      console.log(`Task "${this.draggedTask.name}" has been moved.`);
     
    }
  }
  showImageDialog(image: string): void {
    this.selectedImage = image;
    this.displayImageDialog=true;
}

  constructor() {}

  ngOnInit(): void {}
}
