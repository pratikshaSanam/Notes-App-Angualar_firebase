
import { signalStore, withState, withMethods } from '@ngrx/signals';//NgRx Signals helpers its  bunndle of bundles reactive state and methods into one exported object.
import { inject, WritableSignal } from '@angular/core';//inject() is Angular’s function-style DI utility; WritableSignal is the mutable signal interface (so we can call .set() and .update()).
import { NotesService } from '../core/services/notes.service';// this  was  doing the  functinality  of  the actuality  releted  to the  firebase store
import { Note } from '../core/models/note.model';// it  will  store  the  types


//• signalStore – factory that bundles reactive state and methods into one exported object.
//• withState – declares initial state.
//• withMethods – attaches functions that read / write that state.
export const NotesStore = signalStore(
  withState(() => ({
    notes: [] as Note[],//Signal that will hold all notes. Starts as an empty array
    selectedNote: null as Note | null,//Holds the note currently being edited null 
  })),

  withMethods((state) => {
    const service = inject(NotesService);

    const notesSignal = state.notes as WritableSignal<Note[]>;//nject NotesService Firestore  without a constructor.
    const selectedSignal = state.selectedNote as WritableSignal<Note | null>;//Cast the notes signal so we can mutate it (.set(), .update()).

    return {
      loadNotes: async () => {
        service.getNotes().subscribe((notes: Note[]) => {
          console.log('✅ Fetched Notes from Firestore:', notes);
          notesSignal.set(notes);
        });
      },

      addNote: async (title: string, content: string) => {
        const note: Note = {
          id: crypto.randomUUID(),
          title,
          content,
          updatedAt: Date.now(),
          version: 1,
        };
        await service.saveNote(note);
        notesSignal.set([...notesSignal(), note]);
      },

      updateNote: async (note: Note) => {
        const updatedNote = {
          ...note,
          updatedAt: Date.now(),
          version: note.version + 1,
        };
        await service.saveNote(updatedNote);
        notesSignal.set(
          notesSignal().map(n => n.id === updatedNote.id ? updatedNote : n)
        );
        selectedSignal.set(null);
      },

      deleteNote: async (id: string) => {
        await service.deleteNote(id);
        notesSignal.set(notesSignal().filter(n => n.id !== id));
      },

      selectNote: (note: Note) => selectedSignal.set(note),
      clearSelection: () => selectedSignal.set(null),

      notes: () => notesSignal(),
      notesSignal: () => notesSignal,
      selectedNote: () => selectedSignal(),
      selectedNoteSignal: () => selectedSignal,
    };
  })
);
