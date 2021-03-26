import Modal from 'react-modal'
import React, {useState} from 'react'
import styled from 'styled-components'

const AddRecipeHeader = styled.h3 `
    text-align: center;
    margin-bottom: 30px;
    text-decoration: underline;
`

const AddBtn = styled.button `
    padding: 10px 10px;
    background-color: rgb(52, 129, 231);
    color: white;
    border-radius: 3px;
    border: 0;
    margin-top: 15px;
    font-size: 0.9rem;
    font-weight: bold;

    &:hover {
    cursor: pointer;
    opacity: 0.85;
  }
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
const ModalAddBtn = styled(ModalBtn) `
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

const ButtonsWrapper = styled.div`
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

const AddRecipeBtn = ({dishes, setDishes}) => {

    const [currentDishName, setCurrentDishName] = useState('')
    const [currentIngridients, setCurrentIngridients] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    function handleAdd(e) {
        // Do not permit empty values
        if(!currentDishName || !currentIngridients) {
            alert('Fill in empty fields!')
            return
        }
        
        const newDish = {
            name: currentDishName,
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
    onRequestClose={() => setIsModalOpen(false)}
    ariaHideApp={false}
    >
        <AddRecipeHeader>Add Recipe</AddRecipeHeader>
        <h4>Recipe Name</h4>
        <ModalInput type="text" placeholder="Recipe Name" onChange={handleRecipeChange}/>
        <h4>Ingridients</h4>
        <ModalTextArea type="text" placeholder="Ingridients' Names (comma separated)" onChange={handleIngridientsChange}/>
        <ButtonsWrapper>
            <ModalAddBtn type="submit" onClick={handleAdd}>Add recipe</ModalAddBtn>
            <ModalCloseBtn onClick={() => setIsModalOpen(false)}>Close</ModalCloseBtn>
        </ButtonsWrapper>
    </Modal>
    </>
    );
}
 
export default AddRecipeBtn;