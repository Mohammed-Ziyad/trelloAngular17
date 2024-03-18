import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup , Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Task } from '../../Models/task';
import {MatButtonModule} from '@angular/material/button';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { NgClass } from '@angular/common';
import { ScrumboardBoardAddCardComponent } from "../add-card/add-card.component";
@Component({
    selector: 'app-trello',
    standalone: true,
    templateUrl: './trello.component.html',
    styleUrl: './trello.component.scss',
    imports: [
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        CdkDropList,
        CdkDrag, MatButtonModule, NgClass, FormsModule, ReactiveFormsModule, TextFieldModule,
        ScrumboardBoardAddCardComponent
    ]
})
export class TrelloComponent implements OnInit {
  todoForm! : FormGroup;
  tasks: Task[] = [];
  inprogress:Task[] = [];
  done:Task[] = [];
  @ViewChild('titleInput') titleInput!: ElementRef ;
  @ViewChild('titleAutosize') titleAutosize!: CdkTextareaAutosize ;
  @Input() buttonTitle: string = 'Add a card';
  @Output() readonly saved: EventEmitter<string> = new EventEmitter<string>();

  form!: UntypedFormGroup ;
  formVisible: boolean = false;

  isadd: boolean = false;
  isEditEnabled: boolean = false;
  updatedIndex!:any;
  constructor(private fb:FormBuilder ,
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: UntypedFormBuilder,


    ){}
    ngOnInit(): void {
      this.todoForm = this.fb.group({
        item : ['', [Validators.required]]
      });
      // Initialize the new list form
      this.form = this._formBuilder.group({
        title: [''],
    });
    }

    addTask()
    {
      this.tasks.push({
        Title : this.todoForm.value.item,
        Completed:false
      });
      this.todoForm.reset();
    }
    addTaskformCard()
    {
      if(this.isadd==true)
      {

         this.addTask()
         this.isadd=!this.isadd
         return
        }
        this.isadd=!this.isadd

    }
    updateTask()
    {
      this.tasks[this.updatedIndex].Title = this.todoForm.value.item;
      this.tasks[this.updatedIndex].Completed = false;
      this.todoForm.reset();
      this.updatedIndex = undefined;
      this.isEditEnabled = false;
    }
    deleteTask(taskId:number){
      this.tasks.splice(taskId,1);
    }
    deleteInprogressTask(taskId:number){
      this.inprogress.splice(taskId,1);
    }
    deleteDoneTask(taskId:number){
      this.done.splice(taskId,1);
    }

    onEditTask(task:Task,TaskId:number)
    {
      this.todoForm.controls['item'].setValue(task.Title);
      this.updatedIndex = TaskId;
      this.isEditEnabled = true;
    }

    drop(event: CdkDragDrop<Task[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    }

    /**
     * Save
     */
    save(): void
    {
        // Get the new list title
        const title = this.form.get('title')?.value;

        // Return, if the title is empty
        if ( !title || title.trim() === '' )
        {
            return;
        }

        // Execute the observable
        this.saved.next(title.trim());

        // Clear the new list title and hide the form
        this.formVisible = false;
        this.form.get('title')?.setValue('');

        // Reset the size of the textarea
        setTimeout(() =>
        {
            this.titleInput.nativeElement.value = '';
            this.titleAutosize.reset();
        });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle the visibility of the form
     */
    toggleFormVisibility(): void
    {
        // Toggle the visibility
        this.formVisible = !this.formVisible;

        // If the form becomes visible, focus on the title field
        if ( this.formVisible )
        {
            this.titleInput.nativeElement.focus();
        }
    }

    addCard(list: Task, title: string): void
    {
        // Create a new card model

        this.tasks.push({
          Title : this.todoForm.value.item,
          Completed:false
        });
        // Save the card
        // this._scrumboardService.createCard(card).subscribe();
    }


}
