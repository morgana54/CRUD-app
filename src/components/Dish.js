import styled from 'styled-components'
import {useState} from 'react'
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

  // Map ingridients to paragraphs
  const ingridients = dish.ingridients.split(',').map(
    (ingridient => (<p key={ingridient + new Date().getTime()}>{ingridient}</p>)))

  function handleDishEdit(e) {
    dish.dishName = currentDishName
    dish.ingridients = currentIngridients
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
        defaultValue={dish.dishName}
        onChange={handleDishNameChange} />
        <h2>Ingridients</h2>
        <textarea 
        type="text" 
        placeholder="Ingridients' Names (comma separated)" 
        defaultValue={dish.ingridients}
        onChange={handleIngridientsChange} />
        <button type="submit" onClick={handleDishEdit}>Edit recipe</button>
        <button onClick={() => setIsEditModalOpen(false)}>Close</button>
      </Modal>
    </>
  )
}
 
export default Dish;

//  {/* tutaj możesz skorzystać z useContext!! do ingridients */}
//  {isRecipeOpen && (
//   <>
//   <Ingridients 
//   ingridients={ingridients} 
//   i={i} 
//   setCurrentDishName={setCurrentDishName} 
//   currentDishName={currentDishName}
//   recipesNames={recipesNames}
//   setRecipesNames={setRecipesNames}
//   currentIngridients={currentIngridients}
//   setCurrentIngridients={setCurrentIngridients}
//   setIngridients={setIngridients}/>
//   {/* Edit */}