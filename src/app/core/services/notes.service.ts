


import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { Note } from '../models/note.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private firestore = inject(Firestore);//immediately grabs the singleton Firestore instance and stores it in a private field.
  private notesRef = collection(this.firestore, 'notes');

  getNotes(): Observable<Note[]> {
    return collectionData(this.notesRef, { idField: 'id' }) as Observable<Note[]>;
  }

  saveNote(note: Note): Promise<void> {
    const noteDoc = doc(this.firestore, `notes/${note.id}`);
    return setDoc(noteDoc, note);
  }

  deleteNote(id: string): Promise<void> {
    const noteDoc = doc(this.firestore, `notes/${id}`);
    return deleteDoc(noteDoc);
  }
}
