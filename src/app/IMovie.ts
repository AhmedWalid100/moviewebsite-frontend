
export interface IMovie{
    id:number,
    title:string,
    releaseDate:string,
    description:string,
    length:string,
    posterURL:string,
    languageDTO:{
        originalLanguage:string,
        spokenLanguages:string
    }
    genreDTO:{
        primaryGenre:string,
        subGenres:string
    },

}