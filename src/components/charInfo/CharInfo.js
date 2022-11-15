import {useEffect, useState} from 'react'; 
import Spinner from '../spinner/Spinner';

import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';

const CharInfo = (props) => {
    const {getCharacter, loading} = useMarvelService();

    const [char, setChar] = useState({comics:[]});

    const updChar = () => {
        getCharacter(props.charInfoAbout).then( char => {
            setChar(char)
        })
    }

    useEffect(updChar, [props.charInfoAbout]);


    return (
        <>
            {loading ? <Spinner/> : <View char={char}/>}
        </>
    )

}

const View = (props) => {
    const{description, homepage, name, thumbnail, wiki, comics} = props.char;
    const elemsComics = comics.map((item, i) => {
        return (
            <li key={i} className="char__comics-item">
                {item.name}
            </li>
        )
        })
    
        return (
            <div className="char__info">
                <div className="char__basics">
                    <img src={thumbnail} alt="img"/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {elemsComics} 
                </ul>
            </div>
        )
}


export default CharInfo;