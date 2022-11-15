import {useState, useEffect, useRef} from 'react'; 
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

import './charList.scss';

const CharList = (props) => {

    const [arrChar, setArrChar] = useState([]);
    const [select, setSelect] = useState(null);

    const {loading, getAllCharacters} = useMarvelService();
    const maxOffset = useRef(0)

    async function getChars(offset) {
        const limit = 9;
        const arrChar = await getAllCharacters(limit, offset);
        maxOffset.current += limit
        
        updChars(arrChar)
          
    }

    const updChars = (newArrChar) => {
        setArrChar(arrChar => [...arrChar, ...newArrChar])
    } 

    useEffect(() => getChars(0), [])

    const onLoadMore = () => {
        getChars(maxOffset.current)
    }

    const onSelectItem = (id) => {
        props.onSelectChar(id);
        setSelect(id)
    }

    const charItems = arrChar.map((char, i) => {
        let clazz = 'char__item'
        if(select === char.id ) clazz += ' char__item_selected'
        return (
        <li key={char.id} 
            className={clazz}
            onClick={() => onSelectItem(char.id)}>
            <img src={char.thumbnail} alt="char"/>
            <div className="char__name">{char.name}</div>
        </li>
        )
    })
    return (
        <div className="char__list">
            <ul className="char__grid">               
                {charItems}
            </ul>
            {loading ? <Spinner/> : null}
            <button onClick={onLoadMore} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;