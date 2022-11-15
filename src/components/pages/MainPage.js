import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import {useState} from 'react'; 

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [charInfoAbout, setcharInfoAbout] = useState(1017100);



    return (
        <>
            <RandomChar/>
            <div className="char__content">
                <CharList onSelectChar={(id) => setcharInfoAbout(id)}/>
                <CharInfo charInfoAbout={charInfoAbout}/>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/> 
        </>

    )
}
export default MainPage;