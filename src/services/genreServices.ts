import {apiService} from "./apiService";
import {urls} from "../constants";
import {IRes} from "../types";
import {IGenre, IGenresRes} from "../interfaces";

const genreService = {
    getAll: (): IRes<IGenresRes> => apiService.get(urls.genres.uk),
    idsToNames: (ids: number[], allGenres: IGenre[]): string[] => {
        let massive:string[] = []
        ids.forEach(id => {
            const genre = allGenres.find(genre => genre.id === id);
            if (genre) {
                massive.push(genre.name);
            }
        });
        return massive
    },
    objectToIds: (genres: IGenre[]): number[] => {
        return genres.map(genre => genre.id);
    },
    nameToId: (name: string, allGenres: IGenre[]): number => {
        const genre = allGenres.find((genre) => genre.name === name);
        return genre.id
    },
    stringToMassive:(str:string):string[]=>{
        return str.split(',')
    },
    IdsToString: (ids: string[]): string => {
        return ids.join(',')
    },
    paramsToString: (query: URLSearchParams, param: string): string[] => query.get(param) ? query.get(param).split(',') : [],
    genreRemoveFromURL: (id: number, query: URLSearchParams, param: string): string[] => {
        const url: string[] = genreService.paramsToString(query, param)
        const index = url.indexOf(id + '')
        url.splice(index, 1);
        return url;
    }

}

export {
    genreService
}