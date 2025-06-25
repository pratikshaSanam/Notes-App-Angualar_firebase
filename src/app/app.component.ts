
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { NoteListComponent } from './components/note-list/note-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NoteFormComponent, NoteListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showForm = false;

  toggleForm(): void {
    this.showForm = !this.showForm;
  }
}
