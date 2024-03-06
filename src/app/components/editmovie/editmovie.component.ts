import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImagesService } from '../../services/images.service';
import { MoviesService } from '../../services/movies.service';
import { IMovieCommand } from '../../IMovieCommand';
import { IMovie } from '../../IMovie';
import { ICreateResponse } from '../../ICreateResponse';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-editmovie',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editmovie.component.html',
  styleUrl: './editmovie.component.css'
})
export class EditmovieComponent implements OnInit{
  id!:number;
  updateMovieForm!:FormGroup;
  existingMovie!:IMovie;
  moviePoster!:string;
  selectedFile!:File;
  formData!:FormData;
  newMovie!:IMovieCommand;
  response!:ICreateResponse<number>;
  constructor(private _activatedRoute:ActivatedRoute, private _movieService:MoviesService, private _imageService:ImagesService
    , private _router:Router){

  }
  ngOnInit(): void {
   this.id= parseInt(this._activatedRoute.snapshot.paramMap.get('id')!);
   this._movieService.GetMovieByID(this.id).subscribe((data)=>{
    this.existingMovie=data;
    this.updateMovieForm = new FormGroup({
      "title": new FormControl(this.existingMovie.title, Validators.required),
      "releaseDate": new FormControl(parseInt(this.existingMovie.releaseDate), Validators.required),
      "description": new FormControl(this.existingMovie.description, Validators.required),
      "length": new FormControl(parseInt(this.existingMovie.length), Validators.required),
      "genre": new FormControl(this.existingMovie.genreDTO.primaryGenre, Validators.required),
      "language": new FormControl(this.existingMovie.languageDTO.originalLanguage, Validators.required),
    })
    this.moviePoster=this.existingMovie.posterURL;
    console.log(this.moviePoster);
   });
  }
  OnImageChange(event:any){
    this.selectedFile=<File> event.target.files[0];
  }
   UpdateMovieImageCheck(){
    if(this.selectedFile){
      this.formData=new FormData();
      this.formData.append('formFile',this.selectedFile,this.selectedFile.name);
       this._imageService.UploadImage(this.formData).subscribe((data)=>{
        this.moviePoster=data;
        this.UpdateMovie();
      });
    }
    else{
      this.UpdateMovie();
    }
    
  }
  UpdateMovie(){
    this.newMovie = {
      title: this.updateMovieForm.value.title,
      releaseDate: this.updateMovieForm.value.releaseDate.toString(),
      description: this.updateMovieForm.value.description,
      length: this.updateMovieForm.value.length.toString(),
      posterURL: this.moviePoster,
      languageDTO: {
        originalLanguage: this.updateMovieForm.value.language,
        spokenLanguages: "N/A"
      },
      genreDTO: {
        primaryGenre: this.updateMovieForm.value.genre,
        subGenres: "N/A"
      }
    };
    this._movieService.UpdateMovie(this.id, this.newMovie).subscribe((data)=>{
      this.response=data;
      if (this.response.isSuccess){
        this._router.navigate(['/movies',this.response.data]);
      }
      else{
        alert("Error has occurred");
      }
    })
  }
}
