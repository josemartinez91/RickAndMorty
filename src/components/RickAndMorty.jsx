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

    useEffect(() => {
        if (textIndex !== "") {
            axios.get(`https://rickandmortyapi.com/api/location/?name=${textIndex}`)
                .then(res => setSearchResults(res.data.results))
        } else {
            setSearchResults([])
        }

    }, [textIndex])

    const [page, setPage] = useState(1)
    const lastIndex = page * 20
    const firstIndex = lastIndex - 20
    const charactersPagination = characters.residents?.slice(firstIndex, lastIndex)
    const lastPage = Math.ceil(characters.residents?.length / 20)
    console.log(lastPage)

    const numbers = [];
    for (let i = 1; i <= lastPage; i++) {
        numbers.push(i)

    }
    const clickSearch = (location) => {
        setCharaters(location)
        setSearchResults([])
        setTextIndex("")
    }

    return (
        <div>
            <section className='image-container image-container-xs'>
                <h1>Rick and Morty Wiki</h1>
                <img className='image-xs' src={image} alt="" />
            </section>

            <div className='col-xs search-input'>
                 <input
                 className='col-xs-6'
                type="text"
                value={textIndex}
                onChange={e => setTextIndex(e.target.value)}
                placeholder="Type a location" />
            </div>
           

            {searchResults.map(location => (
                <div
                    className='div-search'
                    key={location.id}
                    onClick={() => { clickSearch(location) }}>
                    {location.name}
                </div>
            ))}
            <div className='col-xs xs-button-container'>
                <div className='col-xs-6'>
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className='header-button button-xs-header'
                    >Prev-Page </button>
                </div>

                <div className='col-xs-6'>
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === lastPage}
                        className='header-button button-xs-header'
                    >Next Page</button>
                </div>

            </div>


            {numbers.map(number => (
                <button
                    className='button-page'
                    key={number}
                    onClick={() => setPage(number)}
                >
                    {number}
                </button>
            ))}

            <div className='col-xs container-info'>
                <div className='container-info-li'>
                    <h2>{characters.name}</h2>
                </div>
                <div className='container-info-li'>
                    <ul className='card-container col-xs '>
                        <li className='ul-header'>
                            <span><b>type:</b> {characters.type} </span>
                            <span><b> dimension:</b> {characters.dimension}</span>
                            <span><b> population:</b> {characters.residents?.length}</span>
                        </li>
                    </ul>
                </div>

            </div>
            <ul className='resident-container container-info ul-principal col-xs'>
                {charactersPagination?.map(character => (
                    <ResidentInfo character={character} key={character} />

                ))}

            </ul>
        </div>
    );
};

export default RickAndMorty;