import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setTrainer } from '../store/slices/trainer.slice'
import { useNavigate } from 'react-router-dom'
import './styles/HomePage.css'

const HomePage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setTrainer(textInput.current.value.trim()));
    textInput.current.value = '';
    navigate('/pokedex');
  }

  return (
    <>
    <section className='homePage__container'>
      <img className='homePage__img' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" alt="" />
      <div className='homePage__decorar'>
        <h1 className='homePage__titulo'>!Hola entrenador!</h1>
        <h2 className='homePage__text'>¿Como te llamas?</h2>
      </div>
      <form className='homePage__form' onSubmit={handleSubmit}>
        <input className='homePage__input' ref={textInput} type="text" placeholder='Colaca tu nombre' />
        <button className='homePage__button'>Start</button>
      </form>
    </section>
      </>
  )
}
export default HomePage