const baseURL = 'https://api.themoviedb.org/3'
const search = '/search'
const discover = '/discover'
const movie = '/movie'
const movies = '/movies'
const genres = '/genre'
const user = '/account'
const videos = '/videos'
const similar = '/similar'
const watchlist = '/watchlist'
const favorite = '/favorite'
const account_states = '/account_states'

const urls = {
    'movies': {
        'base': discover + movie,
        'byId': (id: number):string => `${movie}/${id}`,
        'search': search + movie,
        'videoByIds':(id:number):string=>`${movie}/${id}${videos}`,
        "similarById":(id:number):string=>`${movie}/${id}${similar}`,
        'watchList':(userId:number):string=>`${user}/${userId}${watchlist}`,
        'watchListGet':(userId:number):string=>`${user}/${userId}${watchlist}${movies}`,
        'favorite':(userId:number):string=>`${user}/${userId}${favorite}`,
        'favoriteGet':(userId:number):string=>`${user}/${userId}${favorite}${movies}`,
        'accStateById':(movieId:number):string=>`${movie}/${movieId}${account_states}`
    },
    'user': {
        'base': user
    },
    'genres': {
        'uk': `${genres}${movie}/list?language=uk`
    },
    "omdbById": (omDB_Id: string): string => `https://www.omdbapi.com/?i=${omDB_Id}&apikey=d1defe3b`
}

export {
    baseURL,
    urls
}