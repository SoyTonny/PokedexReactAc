import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import './styles/pokedex.css'
import useFectch from '../hooks/useFectch'
import PokeCard from '../components/pokedex/PokeCard'
import PokeSelect from '../components/pokedex/PokeSelect'
import Pagination from '../components/pokedex/Pagination'

const Pokedex = () => {

  const [selectValue, setSelectValue] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [pokemons, getPokemons, getType] = useFectch()
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 12

  const trainer = useSelector(store => store.trainer)

  useEffect(() => {
    if (selectValue) {
      getType(selectValue)
    } else {
      const url = 'https://pokeapi.co/api/v2/pokemon/?limit=1400'
      getPokemons(url)
    }
  }, [selectValue])

  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputValue(textInput.current.value.toLowerCase().trim());
    textInput.current.value = '';
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  //console.log(pokemons);

  const pokeFilter = (poke) => {
    const perName = poke.name.includes(inputValue)
    return perName
  }

  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = pokemons?.results?.filter(pokeFilter).slice(indexOfFirstCard, indexOfLastCard)


  //Hay que hacer la paginacion, se cambia pagination, por el contenido dinamico que hay ants del map() O sea, del div, pokedex_container
  // const pagination = () => {
  //   pokemons?.results.filter(pokeSearch).slice()
  //   return 
  // }

  return (
    <>
      <header>
        <img src="..\assets\logo de pokedex.png"/>
      </header>
      <section className='pokedex'>
        <div className='pokedex__decoration'>
        <h2>Bienvenido <span className='pokedex__title'>{trainer}</span>, aqui puedes buscar tu pokemon favorito</h2>
        <div className='pokedex__form'>
            <form onSubmit={handleSubmit}>
                <input className='pokedex__input' ref={textInput} type="text" placeholder='Nombre del pokemon'/>
                <button className='pokedex__button'>Buscar</button>
            </form>
            <PokeSelect
              setSelectValue={setSelectValue}
            />
          </div>
        </div>
        
        <Pagination
                  cardsPerPage={cardsPerPage}
                  totalCards={pokemons?.results?.filter(pokeFilter).length}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
        />

        <div className='pokedex_container'>
          {
            currentCards?.map((poke) => (
              <PokeCard
                key={poke.url}
                url={poke.url}
              />
            ))
          }
        </div>

        <Pagination
                  cardsPerPage={cardsPerPage}
                  totalCards={pokemons?.results?.filter(pokeFilter).length}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
        />

      </section>
    </>
  )
}
export default Pokedex