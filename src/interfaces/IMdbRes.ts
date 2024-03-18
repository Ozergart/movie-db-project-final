export interface IMdbRes {
    Title: string,
    Year: string,
    Rated: string,
    Released: string,
    Runtime: string,
    Director: string,
    Writer: string,
    Actors: string
    Awards: string,
    Poster: string,
    Ratings: { Source: string, Value: string }[],
    imdbRating: string

}