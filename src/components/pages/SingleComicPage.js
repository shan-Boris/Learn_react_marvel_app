

import './singleComic.scss';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import {useParams, Link} from 'react-router-dom'
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

const SingleComicPage = () => {
    const {loading, error, getComics} = useMarvelService();
    const [comics, setComics] = useState({});
    const {idComic} = useParams();


    useEffect(() => {
        getComics(idComic).then(comics => setComics(comics))
    }, [])

    const {title, prices, img, id, description, pages, lang} = comics
    return (
        
        <div className="single-comic">
            {error ? <Error/> : null}
            {loading ? <Spinner/> : null}
            <img src={img} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages} pages</p>
                <p className="single-comic__descr">Language: {lang}</p>
                <div className="single-comic__price">{prices}$</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;