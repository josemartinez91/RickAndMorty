import axios from 'axios'
import { useEffect, useState } from 'react';


const ResidentInfo = ({ character }) => {

    const [characterInfo, setCharacterInfo] = useState({})

    useEffect(() => {
        axios.get(`${character}`)
            .then(res => setCharacterInfo(res.data))
    }, [])

    // console.log(characterInfo)
    const aliveStyle = {
        color: 'green'
    }
    const deadStyle ={
        color: 'red'
    }

    const statusCharacter= ()=>{
        if(characterInfo.status === "Alive"){
            return(<span><b >Status:</b>  <span style={aliveStyle}>{characterInfo.status}</span></span>)
        } else{
            return(<span><b >Status:</b> <span style={deadStyle}>{characterInfo.status}</span></span>)
        }
    }

    return (
        <li className='resident-container-info'>
            <div className='resident-info'>
                <img src={characterInfo.image} alt="" />
                <b ></b><span className='card-name'>{characterInfo?.name}</span>  <br />
                <>{statusCharacter()}</>
                <span><b>Origin Name:</b> {characterInfo.origin?.name}</span>
                <span><b>Episodes:</b> {characterInfo.episode?.length}</span>
                
            </div>
        </li>
    );
};

export default ResidentInfo;