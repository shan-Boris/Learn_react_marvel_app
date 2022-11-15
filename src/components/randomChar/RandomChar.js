import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';



const RandomChar = () => {
    const [char, setChar] = useState({});
        
    const {loading, error, getCharacter, clearError} = useMarvelService()

    const updChar = (char) => {
        setChar(char);

    }

    useEffect(() => getRandomChar(), [])

    const getRandomChar = () => {
        const rndId = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        clearError()
        getCharacter(rndId)
            .then((res) => {
                if(res.description.length < 3) {
                    return getRandomChar()
                }
                updChar(res)})
            
    }

    const onNewChar = () => {
        getRandomChar()
    }

    const spinner = loading ? <Spinner/> : null;
    const err = error ? <Error/> : null;
    const view = (!loading && !error) ? <View char={char}/> : null; 


    return (
        <div className="randomchar">
                {spinner}
                {err}
                {view}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={onNewChar}className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
        
    )
}




const View = (char) => {
    const {name, description, thumbnail, homepage, wiki} = char?.char
    return(
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {description}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
        </div>
    )
}

export default RandomChar;