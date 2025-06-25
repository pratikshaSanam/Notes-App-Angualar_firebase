// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-note-item',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './note-item.component.html',
//   styleUrls: ['./note-item.component.scss']
// })
// export class NoteItemComponent {

// }



// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { CommonModule } from '@angular/common'; // ⬅️ Import this
// import { Note } from 'src/app/core/models/note.model';

// @Component({
//   selector: 'app-note-item',
//   standalone: true,
//   imports: [CommonModule], // ⬅️ Add this
//   template: `
//     <div class="note">
//       <h3>{{ note.title }}</h3>
//       <p>{{ note.content }}</p>
//       <small>{{ note.updatedAt.toDate() | date:'short' }}</small>
//       <button (click)="edit.emit(note)">✏️ Edit</button>
//       <button (click)="remove.emit(note.id)">🗑 Delete</button>
//     </div>
//   `,
//   styles: [`
//     .note { border: 1px solid #ccc; padding: 1rem; margin: 0.5rem 0; border-radius: 8px; }
//     button { margin-right: 0.5rem; }
//   `]
// })
// export class NoteItemComponent {
//   @Input() note!: Note;
//   @Output() edit = new EventEmitter<Note>();
//   @Output() remove = new EventEmitter<string>();


// }

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Note } from 'src/app/core/models/note.model';

@Component({
  selector: 'app-note-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss']
})
export class NoteItemComponent {
  @Input() note!: Note;
  @Output() edit   = new EventEmitter<Note>();
  @Output() remove = new EventEmitter<string>();
}
