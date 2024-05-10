import React from 'react'
import { useEffect } from 'react'
import './styles/pokecard.css'
import { useNavigate } from 'react-router-dom'
import useFectch from '../../hooks/useFectch'

const PokeCard = ({ url }) => {

     const [pokemon, getPokemons] = useFectch()

     const navigate = useNavigate()

     useEffect(() => {
          getPokemons(url)
     }, [])

     // console.log(pokemon)

     const handlePokemon = () => {
          navigate(`/pokedex/${pokemon.id}`)
     }

     return (
     <article onClick={handlePokemon} className={`pokecard pokecard--${pokemon?.types[0].type.name}`}>
          <div className={`pokecard_back ${pokemon?.types[0].type.name}`}></div>
               <figure className='pokecard_img'>
                    <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
               </figure>
          
          <h3 className={`pokecard_name--${pokemon?.types[0].type.name}`}>{pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1)}</h3>
                <span>Tipo</span>
           <ul className='pokecard_types'>
               {
               pokemon?.types.map(type => (
                    <li className={`slot${type.slot}`} key={type.type.url}>
                    {type.type.name}
                    </li>
               ))
               }
          </ul>
          <hr />
          <ul className='pokecard_stats'>
               {
                    pokemon?.stats.map(stat => (
                              !stat.stat.name.includes('-') &&
                              <li key={stat.stat.url}>
                              <span className={`pokecard_name--${pokemon?.types[0].type.name}`}>{stat.stat.name.toUpperCase()}</span>
                              <span>{stat.base_stat}</span>
                         </li>
                    ))
               }
          </ul>
     </article>
     )
}
export default PokeCard