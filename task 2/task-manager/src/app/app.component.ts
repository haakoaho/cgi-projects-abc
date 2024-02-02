import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task, TaskComponent } from './task/task.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-manager';
  taskId = this.loadTaskPointerFromLocalStorage();

  newEmptyTask() : Task {
    return {
    description: '',
    dueDate: Date.now.toString(),
    isCompleted: false,
    id: this.taskId
  }
}

  tasks : Task[] = this.loadTasksFromLocalStorageOrDefault().sort((a, b) => a.id - b.id);
   
  addTask() {
    this.tasks.push(this.newEmptyTask());
    this.saveTasksToLocalStorage();
  }
  onDeleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasksToLocalStorage();
  }

  private loadTasksFromLocalStorageOrDefault() : Task[] {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      return JSON.parse(storedTasks);
    }
    return [];
  }

  private loadTaskPointerFromLocalStorage() : number {
    const storedPointer = localStorage.getItem('taskId');
    if(storedPointer){
      return Number(storedPointer);
    }
    return 0;
  }

  private saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.taskId ++;
    localStorage.setItem('taskId', this.taskId.toString());
  }

}


