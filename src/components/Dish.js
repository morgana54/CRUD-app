import styled from 'styled-components'
import {useState, useRef} from 'react'
import Modal from 'react-modal'

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
  /* transition: 'height' 3s ease-in-out; */
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
// ustawić stan active, i jeśli jest active to ustaw DishName na   font-weight: bold;

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
// jak jest clicked to ooutline wyjeb!!

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
// tutaj na mobilkę dać na sam koniec media query żeby było dłuższe czy coś
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

const Dish = ({dish, dishes, setDishes, i, editDish}) => {
  const [isRecipeOpen, setIsRecipeOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentDishName, setCurrentDishName] = useState('')
  const [currentIngridients, setCurrentIngridients] = useState('')
  const dishNameInput = useRef()
  const ingridientsInput = useRef()

  // Map ingridients to paragraphs
  const ingridients = dish.ingridients.split(',').map(
    (ingridient => (<Ingridient key={ingridient + new Date().getTime()}>{ingridient}</Ingridient>)))

  function handleDishEdit(e) {
    // Set temp values, so you can access changed current values before rendering
    let tempCurrentDishName = currentDishName
    let tempCurrentIngridients = currentIngridients
    // If currentDishName and currentIngridients are empty strings (so are falsy) set them to defaultValues of input and textarea
    if(!currentDishName) {
      // defaultValue is saved in value property
      tempCurrentDishName = dishNameInput.current.value
    }
    if(!currentIngridients) {
      // defaultValue is saved in innerHTML property
      tempCurrentIngridients = ingridientsInput.current.innerHTML
    }

    // Do not permit empty values
    if(!tempCurrentDishName || !tempCurrentIngridients) {
        alert('Fill in empty fields!')
        return
    }
    // Change object values to temp ones
    dish.name = tempCurrentDishName
    dish.ingridients = tempCurrentIngridients
    // handleDishEdit does NOT actually change the state, so it has to be done (probably?) manually
    // localStorage.setItem('dishes', JSON.stringify(dishes))
    editDish(dish);
    

    setIsEditModalOpen(false)
  }

  function handleDishNameChange(e) {
    setCurrentDishName(e.target.value)
  }

  function handleIngridientsChange(e) {
    setCurrentIngridients(e.target.value)
  }

  function deleteDish() {
    const tempDishes = [...dishes]
    tempDishes.splice(i, 1)
    setDishes(tempDishes)
    setCurrentDishName('')
    setCurrentIngridients('')
  }

  return (
    <>
      <DishName isDishActive={isRecipeOpen} onClick={() => setIsRecipeOpen(!isRecipeOpen)}>
        <span>{dish.name}</span>
      </DishName>
      {isRecipeOpen 
        &&
      <IngridientsWrapper>
        <h4>Ingridients</h4>
        <hr/>
        {ingridients}
        <ButtonsWrapper>
          <EditBtn onClick={() => setIsEditModalOpen(true)}>Edit</EditBtn>
          <DeleteBtn onClick={deleteDish}>Delete</DeleteBtn>
        </ButtonsWrapper>
      </IngridientsWrapper>
      }
      <Modal 
      style={modalStyle}
      isOpen={isEditModalOpen}
      onRequestClose={() => setIsEditModalOpen(false)}
      ariaHideApp={false}
      >
        <EditRecipeHeader>Edit Recipe</EditRecipeHeader>
        <h4>Recipe</h4>
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
          <ModalEditBtn type="submit" onClick={handleDishEdit}>Edit recipe</ModalEditBtn>
          <ModalCloseBtn onClick={() => {
            setIsEditModalOpen(false)
            }}>Close</ModalCloseBtn>
        </ModalButtonsWrapper>
      </Modal>
    </>
  )
}
 
export default Dish;