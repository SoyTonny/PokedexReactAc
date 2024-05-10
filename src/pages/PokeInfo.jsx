import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFectch from '../hooks/useFectch';
import './styles/pokeInfo.css'

const PokeInfo = () => {

  const params = useParams();
  const [pokemon, getPokemon] = useFectch();

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${params.id}`
    getPokemon(url)
  }, [])


  console.log(pokemon);

  return (
    <section className={`pokeInfo__conteiner pokeInfo--${pokemon?.types[0].type.name}`}>
      <div className={`pokeInfo__back pokeInfo__back--${pokemon?.types[0].type.name}`}></div>

      <figure className='pokeInfo__img'>
        <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="Pokemon image" />
      </figure>
      <span className='pokeinfo__num'># {pokemon?.id}</span>
      <h2 className='pokeInfo__name'>{pokemon?.name}</h2>
      <ul className='pokeInfo__cualidad'>
        <li><span>Peso: </span><span>{pokemon?.weight}kg</span></li>
        <li><span>Altura: </span><span>{pokemon?.height}m</span></li>
      </ul>
      <div className='pokeInfo__tipoyskill'>
        <article className='pokeInfo__tipo'>
          <h3>Tipo</h3>
          <ul>
            {
              pokemon?.types.map((type, index) => (
                <li className={`tipo__color--${pokemon?.types[index].type.name}`} key={type.type.url}>
                  {type.type.name}
                </li>
              ))
            }
          </ul>
        </article>
        <article className='pokeInfo__skill'>
          <h3>Habilidades</h3>
          <ul>
            {
              pokemon?.abilities.map(skill => (
                <li key={skill.ability.url}>{skill.ability.name}</li>

              ))
            }
          </ul>
        </article>
      </div>

        <h2>Estadisticas</h2>
        <article className='pokeInfo__stats'>
          <ul>
            {
              pokemon?.stats.map(stat => (
                <li key={stat.stat.url}>{stat.stat.name}: <span>{stat.base_stat}/150</span>
                  <div className='pokeInfo__bar'><div className='bar--progres'></div></div>
                </li>
              ))
            }
          </ul>
        </article>
        <h2>Movimientos</h2>
          <article className='pokeInfo__movientos'>
            <ul>
              {
                pokemon?.moves.map(move => (
                  <li key={move.move.url}>{move.move.name}</li>
                ))
              }
            </ul>
          </article>
    </section>
  )
}
export default PokeInfo