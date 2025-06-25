

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NoteItemComponent } from '../note-item/note-item.component';
import { NotesService } from 'src/app/core/services/notes.service';
import { Note } from 'src/app/core/models/note.model';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, NoteItemComponent, FormsModule],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  private service = inject(NotesService);

  notes: Note[] = [];

  selectedNote: Note | null = null;
  editedTitle = '';
  editedContent = '';

  ngOnInit(): void {
    this.service.getNotes().subscribe(fetchedNotes => {
      console.log('Direct Service Fetch:', fetchedNotes);
      this.notes = fetchedNotes;
    });
  }

  editNote(note: Note): void {
    this.selectedNote = { ...note };       
    this.editedTitle = note.title;
    this.editedContent = note.content;
  }

  async saveNote(): Promise<void> {
    if (!this.selectedNote) return;

    const updatedNote: Note = {
      ...this.selectedNote,
      title: this.editedTitle,
      content: this.editedContent,
      updatedAt: Date.now(),
      version: this.selectedNote.version + 1
    };

    await this.service.saveNote(updatedNote);

    // update local array
    this.notes = this.notes.map(n => n.id === updatedNote.id ? updatedNote : n);

    this.cancelEdit();
  }

  cancelEdit(): void {
    this.selectedNote = null;
    this.editedTitle = '';
    this.editedContent = '';
  }

  async deleteNote(id: string): Promise<void> {
    await this.service.deleteNote(id);
    this.notes = this.notes.filter(n => n.id !== id);
  }
}
