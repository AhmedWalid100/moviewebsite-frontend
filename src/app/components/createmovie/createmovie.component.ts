import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImagesService } from '../../services/images.service';
import { MoviesService } from '../../services/movies.service';
import { IMovieCommand } from '../../IMovieCommand';
import { IMovie } from '../../IMovie';
import { ICreateResponse } from '../../ICreateResponse';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-createmovie',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './createmovie.component.html',
  styleUrl: './createmovie.component.css'
})
export class CreatemovieComponent implements OnInit {
  createMovieForm!: FormGroup;
  selectedFile!: File;
  imagePath!: string;
  postedMovie!: IMovieCommand;
  returnedDataFromDB!:ICreateResponse<IMovie>;
  constructor(private _imageService: ImagesService, private _movieService: MoviesService, private _router:Router) {

  }
  ngOnInit(): void {
    this.createMovieForm = new FormGroup({
      "title": new FormControl(null, Validators.required),
      "releaseDate": new FormControl(null, Validators.required),
      "description": new FormControl(null, Validators.required),
      "length": new FormControl(null, Validators.required),
      "genre": new FormControl(null, Validators.required),
      "language": new FormControl(null, Validators.required),
    })
  }
  OnImageChange(event: any) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }
  CreateMovie() {
    if (!this.selectedFile) {
      alert("Please enter an Image");
      return;
    }
    if (this.createMovieForm.valid == true) {
      const sentImage = new FormData();
      sentImage.append('formFile', this.selectedFile, this.selectedFile.name);
      this._imageService.UploadImage(sentImage).subscribe((data) => {
        this.imagePath = data;
        this.postedMovie = {
          title: this.createMovieForm.value.title,
          releaseDate: this.createMovieForm.value.releaseDate.toString(),
          description: this.createMovieForm.value.description,
          length: this.createMovieForm.value.length.toString(),
          posterURL: this.imagePath,
          languageDTO: {
            originalLanguage: this.createMovieForm.value.language,
            spokenLanguages: "N/A"
          },
          genreDTO: {
            primaryGenre: this.createMovieForm.value.genre,
            subGenres: "N/A"
          }
        };
        this._movieService.PostMovie(this.postedMovie).subscribe((data)=>{
          this.returnedDataFromDB=data;
          console.log(this.returnedDataFromDB);
          if(this.returnedDataFromDB.isSuccess){
            this._router.navigate(['/movies',this.returnedDataFromDB.data.id]);
          }
          else{
            alert(""+this.returnedDataFromDB.message); //to be changed to a redirection after component creation
          }
        });
      });
    }
    else {
      alert("Please complete the form");
    }
  }
}
