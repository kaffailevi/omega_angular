import { Component } from '@angular/core';
import { Borrows } from './borrows';
import { BorrowsService } from './borrows.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-borrows',
  templateUrl: './borrows.component.html',
  styleUrls: ['./borrows.component.css']
})
export class BorrowsComponent {
public borrows: Borrows[] | undefined;
public deleteBorrows: Borrows | undefined;

constructor(private borrowsService: BorrowsService) { }

ngOnInit() {
  this.getBorrows();
}

public getBorrows(): void {
  this.borrowsService.getBorrows().subscribe({
    next: (value: Borrows[]) => {
       this.borrows = value;
      console.log(this.borrows);
    },
    error: (error: any) => {
      alert(error.message);
    }
  });
  
}

public onDeleteBorrows(BorrwowId: number): void {
  this.borrowsService.deleteBorrow(BorrowId).subscribe({
    next: () => {
      console.log("Deletion successful");
      this.getBorrows();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    }
  });
}

 // Idk how to continue from here
}
