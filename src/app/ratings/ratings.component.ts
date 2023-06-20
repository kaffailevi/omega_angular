import { Component, OnInit } from '@angular/core';
import { Ratings } from './ratings';
import { RatingsService } from './ratings.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {
  public ratings: Ratings[] | undefined;
  public deleteRatings: Ratings | undefined;

  constructor(private ratingsService: RatingsService) { }
  
  ngOnInit() {
      this.getAllRatings();
  }

  public getAllRatings(): void {
    this.ratingsService.getAllRatings().subscribe({
      next: (value: Ratings[]) =>{
        this.ratings = value;
        console.log(this.ratings);
      },
      error:(error: any) =>{
        alert(error.message);
      }  
    });
  }

  public onAddRatings(addForm: NgForm): void{
    this.ratingsService.saveNewRating(addForm.value).subscribe({
      next: (response: Ratings) => {
        console.log(response);
        this.getAllRatings();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    });
  }

  // Idk how to continue from here
}
