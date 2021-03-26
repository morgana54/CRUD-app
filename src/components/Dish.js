import styled from 'styled-components'
import { useState, useRef } from 'react'
import Modal from 'react-modal'
import { Transition } from 'react-transition-group';

// Set up transition
const duration = 300;
const defaultStyle = {
  transition: `height ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
  opacity: 0,
  overflow: 'auto'
}
const transitionStyles = {
  entering: { height: '250px',  opacity: '1'},
  entered:  { height: '250px', opacity: '1'},
  exiting:  { height: '0px', opacity: '0'},
  exited:  { height: '0px', opacity: '0' },
};

/**
 * @TODO
 * Modal logic (styled components included) could (should!) be shared by one component! (passing props to one, and no props to the other)
 * But you're just not going to do it given the time you've already dedicated to this project
 */
const DishName = styled.div`
  min-height: 30px;
  width: 70vw;
  max-width: 1000px;
  background-color: lightgreen;
  border-radius: 7px;
  margin-top: 10px;
  padding: 5px;
  padding-left: 15px;
  display: flex;
  align-items: center;
  color: darkgreen;
  border: 1px solid rgb(200, 200, 200);
  text-decoration: ${(props) => props.isDishActive ? 'underline' : 'none'};
  font-weight: ${(props) => props.isDishActive ? 'bold' : '400'};
 
  &:hover {
    cursor: pointer;
    filter: brightness(95%);
  }
`
const IngridientsWrapper = styled.div`
  background-color: rgb(250, 250, 250);
  width: 70vw;
  max-width: 1000px;
  margin-top: 10px;
  border-radius: 3px;
`

const ButtonsWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
`

const Ingridient = styled.p`
  margin: 0 auto;
  margin-top: 4px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 3px;
  width: 85%;
  border-collapse: collapse;
  font-size: 0.9em;
`
const Button = styled.button`
  min-width: 60px;
  padding: 10px;
  border-radius: 3px;
  border: none;
  margin: 15px 10px;
  font-size: 0.9em;
  color: white;
  font-weight: 600;
  
  &:hover {
    cursor: pointer;
    opacity: 0.85;
  }
`

const EditBtn = styled(Button)`
  background-color: green;
`

const DeleteBtn = styled(Button)`
  background-color: rgb(223, 50, 50);
`

const EditRecipeHeader = styled.h3 `
    text-align: center;
    margin-bottom: 30px;
    text-decoration: underline;
`

const ModalBtn = styled.button `
    padding: 10px 10px;
    border-radius: 3px;
    font-size: 0.85rem;
    font-weight: bold;
    border: 0;
    color: white;
    margin: 5px;

    &:hover {
    cursor: pointer;
    opacity: 0.85;
  }
`
const ModalEditBtn = styled(ModalBtn) `
    background-color: rgb(52, 129, 231);
`

const ModalCloseBtn = styled(ModalBtn) `
    background-color:rgb(255, 153, 0);
`

const ModalInput = styled.input`
    width: 90%;
    height: 24px;
    display: block;
    margin: 0 auto;
    border: 1px solid black;
    border-radius: 3px;
    padding: 5px;

    &:focus {
        outline: none;
    }
`

const ModalTextArea = styled.textarea`
    width: 90%;
    max-width: 90%;
    min-width: 90%;
    min-height: 60px;
    max-height: 100px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid black;
    border-radius: 3px;
    padding: 5px;

    &:focus {
        outline: none;
    }
`

const ModalButtonsWrapper = styled.div`
  margin: 30px auto 0px auto;
  text-align: center;
`

const modalStyle = {
  content: {
      width: '40vw', 
      minHeight: '340px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '8px',
  }
}

const Dish = ({dish, editDish, deleteDish}) => {
  const [isDishActive, setIsDishActive] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  // Initialize with current value
  const [currentDishName, setCurrentDishName] = useState(dish.name)
  const [currentIngridients, setCurrentIngridients] = useState(dish.ingridients)
  const dishNameInput = useRef()
  const ingridientsInput = useRef()
  const [inProp, setInProp] = useState(false);

  // Map ingridients to paragraphs
  const ingridients = dish.ingridients.split(',').map(
    (ingridient => (<Ingridient key={ingridient + new Date().getTime()}>{ingridient}</Ingridient>)))

  function handleEditClick(e) {
    // Do not permit empty values
    if(!currentDishName || !currentIngridients) {
        alert('Fill in empty fields!')
        return
    }
    // Replace dish values with new ones
    dish.name = currentDishName
    dish.ingridients = currentIngridients
    editDish(dish)
    setIsEditModalOpen(false)
  }

  function handleDishNameChange(e) {
    setCurrentDishName(e.target.value)
  }

  function handleIngridientsChange(e) {
    setCurrentIngridients(e.target.value)
  }

  function callDeleteDish() {
    deleteDish(dish)
  }

  return (
    <>
      <DishName isDishActive={isDishActive} onClick={() => {
        setInProp(!inProp)
        setIsDishActive(!isDishActive)
        }}>
        <span>{dish.name}</span>
      </DishName>
      <Transition in={inProp} timeout={duration}>
        {state => (<IngridientsWrapper style={{
            ...defaultStyle, 
            ...transitionStyles[state]
          }}>
          <h4>Ingridients</h4>
          <hr/>
          {ingridients}
          <ButtonsWrapper>
            <EditBtn onClick={() => setIsEditModalOpen(true)}>Edit</EditBtn>
            <DeleteBtn onClick={callDeleteDish}>Delete</DeleteBtn>
          </ButtonsWrapper>
        </IngridientsWrapper>)}
      </Transition>
      <Modal 
      style={modalStyle}
      isOpen={isEditModalOpen}
      onRequestClose={() => setIsEditModalOpen(false)}
      ariaHideApp={false}
      >
        <EditRecipeHeader>Edit Recipe</EditRecipeHeader>
        <h4>Recipe Name</h4>
        <ModalInput 
        type="text" 
        placeholder="Recipe Name" 
        ref={dishNameInput}
        defaultValue={dish.name}
        onChange={handleDishNameChange} />
        <h4>Ingridients</h4>
        <ModalTextArea 
        type="text" 
        placeholder="Ingridients' Names (comma separated)" 
        ref={ingridientsInput}
        defaultValue={dish.ingridients}
        onChange={handleIngridientsChange} />
        <ModalButtonsWrapper>
          <ModalEditBtn type="submit" onClick={handleEditClick}>Edit recipe</ModalEditBtn>
          <ModalCloseBtn onClick={() => {
            setIsEditModalOpen(false)
            }}>Close</ModalCloseBtn>
        </ModalButtonsWrapper>
      </Modal>
    </>
  )
}
 
export default Dish;