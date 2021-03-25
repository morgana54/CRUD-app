import styled from 'styled-components'
import {useState, useRef, useEffect} from 'react'
import Modal from 'react-modal'

// dodać potem media query, ale najpierw zapytać Marka czy responsywność na komórkę będzie miała być jakaś mega duża itp., ale może też po prostu będzie wystarczeć to co zrobiłeś

const DishName = styled.div`
  min-height: 30px;
  width: 60vw;
  max-width: 800px;
  background-color: lightgreen;
  border-radius: 10px;
  margin-top: 10px;
  padding: 5px;
  padding-left: 15px;
  display: flex;
  align-items: center;
  color: darkgreen;
`

const EditBtn = styled.button`
    width: 50px;
    padding: 10px;
    background-color: white;
    border-radius: 3px;
    border: 0;
    margin-top: 15px;
`

const DeleteBtn = styled.button`
    width: 50px;
    padding: 10px;
    background-color: darkred;
    border-radius: 3px;
    border: 0;
    margin-top: 15px;
`

const Dish = ({dish, dishes, setDishes, i}) => {
  const [isRecipeOpen, setIsRecipeOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentDishName, setCurrentDishName] = useState('')
  const [currentIngridients, setCurrentIngridients] = useState('')
  const dishNameInput = useRef()
  const ingridientsInput = useRef()

  // Map ingridients to paragraphs
  const ingridients = dish.ingridients.split(',').map(
    (ingridient => (<p key={ingridient + new Date().getTime()}>{ingridient}</p>)))

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
    if(!currentDishName || !currentIngridients) {
        alert('Fill in empty fields!')
        return
    }
    // Change object values to temp ones
    dish.dishName = tempCurrentDishName
    dish.ingridients = tempCurrentIngridients
    // handleDishEdit does NOT actually change the state, so it has to be done (probably?) manually
    localStorage.setItem('dishes', JSON.stringify(dishes))
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
      <DishName onClick={() => setIsRecipeOpen(!isRecipeOpen)}>
        <span>{dish.dishName}</span>
      </DishName>
      {isRecipeOpen 
        &&
      <>
        <h4>Ingridients</h4>
        {ingridients}
            {/* EDIT BUTTON NIE DAWAĆ ZAGNIEDŻANIA */}
        <EditBtn onClick={() => setIsEditModalOpen(true)}>Edit</EditBtn>
        <DeleteBtn onClick={() => deleteDish()}>Delete</DeleteBtn>
      </>
      }
      <Modal 
      isOpen={isEditModalOpen}
      ariaHideApp={false}
      >
        <h2>Recipe</h2>
        <input 
        type="text" 
        placeholder="Recipe Name" 
        ref={dishNameInput}
        defaultValue={dish.dishName}
        onChange={handleDishNameChange} />
        <h2>Ingridients</h2>
        <textarea 
        type="text" 
        placeholder="Ingridients' Names (comma separated)" 
        ref={ingridientsInput}
        defaultValue={dish.ingridients}
        onChange={handleIngridientsChange} />
        <button type="submit" onClick={handleDishEdit}>Edit recipe</button>
        <button onClick={() => {
          setIsEditModalOpen(false)
          }}>Close</button>
      </Modal>
    </>
  )
}
 
export default Dish;