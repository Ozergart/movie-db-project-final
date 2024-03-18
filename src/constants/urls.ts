const baseURL = 'https://api.themoviedb.org/3'
const search = '/search'
const discover = '/discover'
const movie = '/movie'
const genres = '/genre'
const user = '/account'

const urls = {
    'movies': {
        'base': discover + movie,
        'byId': (id: number) => `${movie}/${id}`,
        'search': search + movie
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