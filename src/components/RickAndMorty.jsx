import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ResidentInfo from './ResidentInfo';
import image from './img/3307.jpg'


const RickAndMorty = () => {

    const [characters, setCharaters] = useState({});
    const random = Math.floor(Math.random() * 126) + 1;
    const [textIndex, setTextIndex] = useState("");
    const [searchResults, setSearchResults] = useState([])


    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/location/${random}`)
            .then(res => setCharaters(res.data))
    }, [])

    const toggleLocation = () => {
        axios.get(`https://rickandmortyapi.com/api/location/${textIndex}`)
            .then(res => setCharaters(res.data))
    }

    useEffect(()=>{
        if(textIndex !== ""){
            axios.get(`https://rickandmortyapi.com/api/location/?name=${textIndex}`)
            .then(res=>setSearchResults(res.data.results))
        }else{
            setSearchResults([])
        }
        
    },[textIndex])

    const [page, setPage] = useState(1)
    const lastIndex = page * 5
    const firstIndex = lastIndex - 5
    const charactersPagination = characters.residents?.splice(firstIndex, lastIndex)
    const lastPage = Math.ceil(characters.residents?.length / 10)
    console.log(lastPage)

    const numbers = [];
    for (let i = 1; i <= lastPage; i++) {
        numbers.push(i)

    }

    return (
        <div>
            <section className='image-container'>
                <h1>Rick and Morty Wiki</h1>
                <img src={image} alt="" />
            </section>

            <input type="text" value={textIndex} onChange={e => setTextIndex(e.target.value)} placeholder="Type a location" />
            <button className='header-button' onClick={toggleLocation}>Search location</button><br />
            {searchResults.map(location=>(
                <div className='div-search' key={location.id} onClick={()=>setCharaters(location)}>{location.name}</div>
            ))}
            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className='header-button'
            >Prev-Page </button>
            {numbers.map(number => (
                <button
                    className='button-page'
                    key={number}
                    onClick={() => setPage(number)}
                >
                    {number}
                </button>
            ))}
            <button
                onClick={() => setPage(page + 1)}
                disabled={page === lastPage}
                className='header-button'
            >Next Page</button>
            <h2>{characters.name}</h2>
            <ul className='card-container'>
                <li>
                    <span><b>type:</b> {characters.type} </span>
                    <span><b> dimension:</b> {characters.dimension}</span>
                    <span><b> population:</b> {characters.residents?.length}</span>
                </li>
            </ul>
            <ul className='resident-container'>
                {charactersPagination?.map(character => (
                    <ResidentInfo character={character} key={character} />

                ))}

            </ul>
        </div>
    );
};

export default RickAndMorty;