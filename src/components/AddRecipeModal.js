import Modal from 'react-modal'
import React from 'react'
import styled from 'styled-components'


// stylowanie na koniec!!
// DODAĆ ŻEBY OD RAZU FOCUS BYŁ NA PRZEPISIE!!! gdzies na yt to było

console.log(Modal.defaultStyles)

// potem też postylować żeby ładnie dynamicznie sie zmieniał
// ogarnąć potem jak tu nałożyć hover effect itp., przy active nie było outline itp.
const AddBtn = styled.button `
    width: 80px;
    padding: 15px 0 15px 0;
    background-color: gray;
    color: white;
    border-radius: 3px;
    border: 0;
    margin-top: 15px;
    float: left;
    font-size: 1.1em;
`

const modalStyle = {
    content: {
        width: '400px', 
        height: '400px'
    }
}

const AddRecipeModal = ({
    isOpen, 
    setIsOpen, 
    setCurrentDishName, 
    currentDishName,
    recipes, 
    setRecipes,
    currentIngridients,
    setCurrentIngridients,
    ingridients,
    setIngridients, }) => {
    // BĘDZIESZ MUSIAŁ DAĆ WALIDACJĘ RECIPE, bo np. jak naciśniesz Add recipe kiedy nie ma nic w polach to wyślą się ostatnie currentDishName i currentIngridients
    
    function handleAdd(e) {
        let tempRecipies = [...recipes]
        let tempIngridients = [...ingridients]
        setRecipes(tempRecipies.concat(currentDishName))
        setIngridients(tempIngridients.concat(currentIngridients))
        setIsOpen(false)
    }

    function handleRecipeChange(e) {
        setCurrentDishName(e.target.value)
    }

    function handleIngridientsChange(e) {
        setCurrentIngridients(e.target.value)
    }

    return (
    <>
    <AddBtn onClick={() => setIsOpen(true)}>Add</AddBtn>
    <Modal 
    style={modalStyle} 
    isOpen={isOpen}
    ariaHideApp={false}
    >
        <h2>Recipe</h2>
        <input type="text" placeholder="Recipe Name" onChange={handleRecipeChange}/>

        <h2>Ingridients</h2>
        <input type="text" placeholder="Ingridients' Names (comma separated)" onChange={handleIngridientsChange}/>

        <button type="submit" onClick={handleAdd}>Add recipe</button>
        <button onClick={() => setIsOpen(false)}>Close</button>
    </Modal>
    </>
    );
}

// POTEM: dodać też taki sam guzik krzyżykowy z funkcją zamknięcia
 
export default AddRecipeModal;