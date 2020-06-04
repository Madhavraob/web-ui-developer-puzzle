import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  removeFromReadingList
} from '@tmo/books/data-access';
import { Actions } from '@ngrx/effects';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
  constructor(
    private readonly store: Store,
    private action$: Actions,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  undo() {
    if (this.data.action === 'Removed') {
      this.store.dispatch(addToReadingList({ book: this.data.book }))
    } else {
      const item = { ...this.data.book, bookId: this.data.book.id };
      this.store.dispatch(removeFromReadingList({ item }));
    }
  }
}
