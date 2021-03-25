import styled from 'styled-components'
import {useState, useContext} from 'react'
import Modal from 'react-modal'
import { RecipeContext } from '../App'

const EditBtn = styled.button`
    width: 50px;
    padding: 10px;
    background-color: white;
    border-radius: 3px;
    border: 0;
    margin-top: 15px;
`


    // const dishData = useContext(RecipeContext)

    function handleEdit(e) {
        recipesNames[i] = currentDishName
        ingridients[i] = currentIngridients
        // console.log('recipesNames: ' + recipesNames)
        // console.log('ingridients: ' + ingridients)
        setRecipesNames(recipesNames)
        setIngridients(ingridients)
        setShouldEditModalOpen(false)
    }

    function handleRecipeChange(e) {
        setCurrentDishName(e.target.value)
    }

    function handleIngridientsChange(e) {
        setCurrentIngridients(e.target.value)
    }

    return (
        // tutaj dasz ten warunek jeśli jest clicked dish or not
    <>




    {/* można też może stworzyć osobny EditRecipeModal, ale to na koniec jak będziesz robił refaktor maybe */}
    <Modal 
    style={{}} 
    isOpen={shouldEditModalOpen}
    ariaHideApp={false}
    >

        <h2>Recipe</h2>
        <input type="text" placeholder="Recipe Name" defaultValue={dishData.recipesNames[i]} onChange={handleRecipeChange}/>
        <h2>Ingridients</h2>
        <textarea type="text" placeholder="Ingridients' Names (comma separated)" defaultValue={dishData.ingridients[i]} onChange={handleIngridientsChange}/>
        <button type="submit" onClick={handleEdit}>Edit recipe</button>
        <button onClick={() => setShouldEditModalOpen(false)}>Close</button>
    </Modal>
    </>
    );
}
 
export default Ingridients;

