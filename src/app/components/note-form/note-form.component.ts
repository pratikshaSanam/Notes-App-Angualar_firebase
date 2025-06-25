

// }
import { Component, inject, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NotesStore } from 'src/app/stores/notes.store';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements DoCheck {
  title = '';
  content = '';

  private store = inject(NotesStore);
  selectedNote = this.store.selectedNoteSignal(); // signal getter

  /** Keep form fields in sync if user selects a different note to edit */
  ngDoCheck(): void {
    const note = this.selectedNote();
    if (note && (this.title !== note.title || this.content !== note.content)) {
      this.title = note.title;
      this.content = note.content;
    }
  }

  async submit(): Promise<void> {
    const note = this.selectedNote();

    if (note) {
      await this.store.updateNote({ ...note, title: this.title, content: this.content });
    } else {
      await this.store.addNote(this.title, this.content);
    }

    this.clearForm();
    this.store.loadNotes();
  }

  cancelEdit(): void {
    this.clearForm();
    this.store.clearSelection();
  }

  private clearForm(): void {
    this.title = '';
    this.content = '';
  }
}
