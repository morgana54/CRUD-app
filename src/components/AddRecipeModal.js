import Modal from 'react-modal'
import React, {useState} from 'react'
import styled from 'styled-components'

// stylowanie na koniec!!
// DODAĆ ŻEBY OD RAZU FOCUS BYŁ NA PRZEPISIE!!! gdzies na yt to było
// const onButtonClick = () => {
//     // `current` wskazuje na zamontowany element kontrolki formularza
//     inputEl.current.focus();
//   };

// potem też postylować żeby ładnie dynamicznie sie zmieniał
// ogarnąć potem jak tu nałożyć hover effect itp., przy active nie było outline itp.
const AddBtn = styled.button `
    width: 120px;
    padding: 15px 0 15px 0;
    background-color: gray;
    color: white;
    border-radius: 3px;
    border: 0;
    margin-top: 15px;
    font-size: 1.1em;
`

const modalStyle = {
    content: {
        width: '400px', 
        height: '400px'
    }
}

const AddRecipeModal = ({dishes, setDishes}) => {

    const [currentDishName, setCurrentDishName] = useState('')
    const [currentIngridients, setCurrentIngridients] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    // BĘDZIESZ MUSIAŁ DAĆ WALIDACJĘ RECIPE, bo np. jak naciśniesz Add recipe kiedy nie ma nic w polach to wyślą się ostatnie currentDishName i currentIngridients
    function handleAdd(e) {
        // Do not permit empty values
        if(!currentDishName || !currentIngridients) {
            alert('Fill in empty fields!')
            return
        }
        
        const newDish = {
            dishName: currentDishName,
            ingridients: currentIngridients,
            // Create (most probably) unique id
            id: currentDishName + new Date().getTime()
        }
        const updatedDishes = dishes.concat(newDish)
        setDishes(updatedDishes)
        setCurrentDishName('')
        setCurrentIngridients('')
        setIsModalOpen(false)
    }

    function handleRecipeChange(e) {
        setCurrentDishName(e.target.value)
    }

    function handleIngridientsChange(e) {
        setCurrentIngridients(e.target.value)
    }

    return (
    <>
    <AddBtn onClick={() => setIsModalOpen(true)}>Add Recipe</AddBtn>
    <Modal 
    style={modalStyle} 
    isOpen={isModalOpen}
    ariaHideApp={false}
    >
        <h2>Recipe</h2>
        <input type="text" placeholder="Recipe Name" onChange={handleRecipeChange}/>

        <h2>Ingridients</h2>
        <textarea type="text" placeholder="Ingridients' Names (comma separated)" onChange={handleIngridientsChange}/>

        <button type="submit" onClick={handleAdd}>Add recipe</button>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
    </Modal>
    </>
    );
}
 
export default AddRecipeModal;