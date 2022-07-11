import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ResidentInfo from './ResidentInfo';
import image from './img/3307.jpg'


const RickAndMorty = () => {

    const [charactes, setCharaters] = useState({});
    const random = Math.floor(Math.random() * 126) + 1;
    const [textIndex, setTextIndex] = useState("");
  

    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/location/${random}`)
            .then(res => setCharaters(res.data))
    }, [])



    const toggleLocation = () => {
        axios.get(`https://rickandmortyapi.com/api/location/${textIndex}`)
            .then(res => setCharaters(res.data))

    }
  
    

    return (
        <div>
            <section className='image-container'>
                <h1>Rick and Morty Wiki</h1>
                <img src={image} alt="" />
            </section>

            <input type="text" value={textIndex} onChange={e => setTextIndex(e.target.value)} placeholder="Type a number 1/126" />
            <button onClick={toggleLocation}>Search location</button>
            <h2>{charactes.name}</h2>
            <ul className='card-container'>
                <li>
                    <span><b>type:</b> {charactes.type} </span>
                    <span><b> dimension:</b> {charactes.dimension}</span>
                    <span><b> population:</b> {charactes.residents?.length}</span>
                </li>
            </ul>
            <ul className='resident-container'>
                {charactes.residents?.map(character => (
                    <ResidentInfo character={character} key={character} />
                   
                ))}
                
            </ul>
        </div>
    );
};

export default RickAndMorty;