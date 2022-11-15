import useMarvelService from '../../services/MarvelService';
import {useState, useEffect, useRef} from 'react';
import Spinner from '../spinner/Spinner';
import {Link} from 'react-router-dom'

import './comicsList.scss';


const ComicsList = () => {

    const {getAllComics, loading} = useMarvelService()
    const [comics, setComics] = useState([]);
    
    let _maxOffset = useRef(0)
    useEffect(() => {
        updComics()
    }, [])

    const updComics = () => {
        getAllComics(8, _maxOffset.current).then(res => setComics([...comics, ...res]));
        _maxOffset.current += 8;
    }



    const arrComicsItem = comics.map(item => {
        const {title, prices, img, id} = item
        return (
            <li key={id} className="comics__item">
                <Link to={`./${id}`} >
                    <img src={img} alt="ultimate war" className="comics__item-img"/>
                    <div className="comics__item-name">{title}</div>
                    <div className="comics__item-price">{prices + "$"}</div>
                </Link>
            </li>
        )
    })
    
    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {arrComicsItem}
            </ul>
                {loading ? <Spinner/> : null}
            <button onClick={updComics} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;