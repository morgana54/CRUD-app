import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Dish from './components/Dish'
import AddRecipeModal from './components/AddRecipeModal';

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
    // tutaj był ten problem referencji, że bez spread operatora nie działało, bo editedDishes dostawało taką samą referencję!!!
    // const editedDishIndex = dishes.findIndex(d => d.id === dish.id);
    // let editedDishes = [...dishes];
    // editedDishes[editedDishIndex] = dish;
    // setDishes(editedDishes);

    // dokładnie to zrozmieć zanim zaimplementujesz w delete itp (W STASHU JEST JAK COŚ)
    setDishes(dishes.map(d => {
      return d.id === dish.id ? dish : d 
    }))
  }

  // USUNĄĆ TEŻ TO 'i' i zamiast tego używać id!!

  return (
      <Wrapper>
        <RecipesContainer>
          {dishes.map((dish, i) => (
            <>
              <Dish  
              key={dish.id}
              i={i}
              dish={dish}
              dishes={dishes}
              setDishes={setDishes}
              editDish={editDish}
              />
            </>
          ))}
        </RecipesContainer>
        <AddRecipeModal 
        dishes={dishes}
        setDishes={setDishes}
        />
      </Wrapper>
  );
}

export default App;

// PO SKOŃCZENIU LOGIKI: 
 
// - POTEM: dać animację transition na rozwijające ingridients!!
// - ZREFAKTORUJ STYLED COMPONENTS ŻEBY PRZY MODALACH SIĘ TAK CAŁKOWICIE NIE POWTARZAŁO

// - MAYBE BONUSOWO: i to spytać Kacpra czy się da - ZROBIĆ HOOKA NA useRecipeModal czy coś żeby nie powtarzać bardzo podobnej logiki AddRecipeModal i EditRecipeModal w Ingridients
//   - na koniec do ulepszenia: STWÓRZ WŁASNY HOOK! np. useHover czy coś w tym stylu

// - POTEM: porób duuuuuuużo komentarzy, żeby łatwiej było opowiadać co się w danym miejscu dzieje
// INFO PRZED SPOTKANIEM: musisz przejść przez cały kod i umieć o nim świetnie opowiedzieć --> zrobić to z Kacprem i Dziobakiem rehersal!!!!!! żeby pokazać że ci pomagali, ale tego się nauczyłeś i to rozumiesz!!

// memo do wykorzystania!!! gou 17:20 w filmiku wyżej
// gou to jako zrozumienie: https://www.youtube.com/watch?v=uojLJFt9SzY&ab_channel=CodingWithChaim
// - na koniec spójrz czy nie możesz gdzieś dać useMemo lub useCallback!! albo zapytać Kacpra jak to dać --> żeby pokazać, że umiesz i przy okazji sobie powtórzyć
