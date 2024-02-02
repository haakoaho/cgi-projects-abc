import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [DatePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input()task!: Task;
  @Output() deleteTask: EventEmitter<void> = new EventEmitter<void>();
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    console.log(this.task);
    this.taskForm = this.fb.group({
      description: this.task.description,
      dueDate: this.task.dueDate.toString(),
      isCompleted: this.task.isCompleted,
    });
    this.taskForm.valueChanges.subscribe((t: Task) => this.saveTaskToLocalStorage(t, this.task.id));
  }

  onDeleteTask() {
    this.deleteTask.emit();
  }

  private saveTaskToLocalStorage(task : Task, id : number) {
    const storedTasks = localStorage.getItem('tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    task.id = id;

    const index : number = tasks.findIndex((t: Task) => t.id === id);
    console.log(id);
    tasks[index] = task
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

export interface Task{
  description : string;
  dueDate : string;
  isCompleted : boolean;
  id : number;
}
