import {FC, PropsWithChildren} from 'react';

interface IProps extends PropsWithChildren {

}

const Movie: FC<IProps> = () => {
    return (
        <div>
            Movie
        </div>
    );
};

export {Movie}