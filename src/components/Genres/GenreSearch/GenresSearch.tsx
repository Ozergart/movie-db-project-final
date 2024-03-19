// // import React, {FC, PropsWithChildren, useState} from 'react';
// // import {useNavigate} from "react-router-dom";
// //
// // import {useAppContext} from "../../../hooks";
// // import css from "./AllGenres.module.css";
// // import {GenreSearch} from "./GenreSearch";
// // import {stateType} from "../../../types";
// //
// interface IProps extends PropsWithChildren {
//     // setGenreSearchTrigger: stateType<boolean>
// }
//
// const GenresSearch: FC<IProps> = ({setGenreSearchTrigger}) => {
// //     const {allGenres, genresWithout, genresWith, setGenresWithout, setGenresWith, darkTheme} = useAppContext();
// //     const [reset, setReset] = useState(false);
// //     const resetAllGenres = () => {
// //         setReset(true);
// //     };
// //     const navigate = useNavigate();
// //     const apply = () => {
// //         navigate(`/movies/?page=1&idsWith=${genresWith}&idsWithout=${genresWithout}`)
// //         setGenreSearchTrigger(false)
// //         setGenresWithout([]);
// //         setGenresWith([]);
// //     }
// //     const close = () => {
// //         setGenresWithout([]);
// //         setGenresWith([]);
// //         setGenreSearchTrigger(false);
// //     }
//     return (
// //         <div className={darkTheme ? css.bigContDark : css.bigCont}>
// //             <div className={darkTheme ? css.genresSearchDark : css.genresSearch}>
// //                 <div className={css.smallCont}>{allGenres.map(genre => <GenreSearch key={genre.name} genre={genre}
// //                                                                                     reset={reset}
// //                                                                                     setReset={setReset}/>)}</div>
// //                 <div className={css.buttonsCont}>
// //                     <button onClick={apply}>Шукати</button>
// //                     <button onClick={resetAllGenres}>Скинути</button>
// //                     <button onClick={close}>Закрити</button>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }
export {}