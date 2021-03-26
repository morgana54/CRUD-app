import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Dish from './components/Dish'
import AddRecipeBtn from './components/AddRecipeBtn';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: white;
`
const RecipesContainer = styled.div`
  height: 700px;
  width: 75vw;
  max-width: 1100px;
  background-color: rgb(220, 220, 220);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 5px;
  border: 1px solid rgb(200, 200, 200);
  overflow: auto;
`

function App() {
  // If there are some dishes locally set them as initial value for dishes
  const [dishes, setDishes] = useState(() => {
    const localDishes = localStorage.getItem('dishes')
    return localDishes ? JSON.parse(localDishes) : []
  })

  // Update local dishes everytime it changes
  useEffect(() => {
    localStorage.setItem('dishes', JSON.stringify(dishes))
  }, [dishes])

  const editDish = (dish) => {
    // Replace the passed dish with the one with same id
    setDishes(dishes.map(d => {
      return d.id === dish.id ? dish : d 
    }))
  }

  const deleteDish = (dish) => {
    setDishes(dishes.filter(d => {
      // Filter the passed dish out of the dishes
      return d.id !== dish.id 
    }))
  }

  return (
      <Wrapper>
        <RecipesContainer>
          {dishes.map((dish) => (
            <>
              <Dish  
              key={dish.id}
              dish={dish}
              editDish={editDish}
              deleteDish={deleteDish}
              />
            </>
          ))}
        </RecipesContainer>
        <AddRecipeBtn 
        dishes={dishes}
        setDishes={setDishes}
        />
      </Wrapper>
  );
}

export default App;
