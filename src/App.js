import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components'
import RecipesContainer from './components/RecipesContainer'
import Dish from './components/Dish'
import AddRecipeModal from './components/AddRecipeModal';
import Ingridients from './components/Ingridients';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: black;
`

// color: ${false ? 'blue'  : 'red'}

function App() {
  const [addIsOpen, setAddIsOpen] = useState(false)
  const [currentDishName, setCurrentDishName] = useState(null)
  const [currentIngridients, setCurrentIngridients] = useState(null)
  // potem zmienić to niżem na names, bo to nie są całe recipes, bo całe recipes, to są recipes names + ingridients
  const [recipes, setRecipes] = useState([])
  const [ingridients, setIngridients] = useState([])
  const [isDishClicked, setIsDishClicked] = useState(false)


  return (
    <Wrapper>
      <RecipesContainer>
        {/* potem to będziesz mapował dynamicznie Dish-Ingridients(one na początku display none będą miały) */}
        {/* tutaj będą wchodizły recipies poszczególne z indexów kolejnych */}
        {recipes.map((recipe, index) => (
          <>
            <Dish 
            onClick={() => setIsDishClicked(!isDishClicked)}
            key={recipe} 
            recipe={recipe}
            setIsDishClicked={setIsDishClicked}
            />
            {/* display it only when dish is clicked (USE STATE BOOLEAN!) */}
            <Ingridients 
            key={ingridients[index]} 
            ingridients={ingridients[index]}
            isDishClicked={isDishClicked}/>
          </>
        ))}
      </RecipesContainer>
      <AddRecipeModal 
      isOpen={addIsOpen} 
      setIsOpen={setAddIsOpen} 
      currentDishName={currentDishName}
      setCurrentDishName={setCurrentDishName} 
      setRecipes={setRecipes} 
      recipes={recipes}
      ingridients={ingridients}
      setIngridients={setIngridients}
      currentIngridients={currentIngridients}
      setCurrentIngridients={setCurrentIngridients}
      />
    </Wrapper>
  );
}

export default App;

// CURRENT TASK: rozwiązać problem chowania się ingridients!


// osobne komponenty: (DRAFT)
// - RecipesContainer (#1 zdjęcie) [INDEX VIEW]
// - Dish
// - Ingridients (#2) --> byłby generowany od razu pod recipe (które będzie divem) ????
// - EditRecipeModal (tutaj będziesz mógł spojrzeć jak zrobić modale z takim tłem właśnie w reakcie)
// - AddRecipeModal

// filter method to delete item from state?
// fajne efekty hoverowe: https://www.youtube.com/watch?v=Fp4PlygdV5E&ab_channel=CodingWithChaim 2:43 maybe worth na koniec żeby rozwinąć apke!!
// memo do wykorzystania!!! gou 17:20 w filmiku wyżej
// gou to jako zrozumienie: https://www.youtube.com/watch?v=uojLJFt9SzY&ab_channel=CodingWithChaim

// - NA KONIEC MVP: zrób LocalStorage (last story)
// - POTEM: ogarnij debugowanie i testowanie czy nie ma jakichś błędów niepotrzebnych
// - POTEM: ogarnij responsywność!
// - POTEM: REFAKTOROWANIE
// - POTEM: zapytaj trochę Kacpra i sam też wykmiń fajne unit testy!! (extra score!!)
// - POTEM: rady z dołu


// - obejrzyj tutoriale tak czy siak żeby się nauczyć i ewentualnie coś u siebie zmienić


// rady:
// - REFAKTOROWANIE PO MVP GOU: przede wszystkim minimalizowanie użycia useState! + ulepszenia nazw funkcji itp.!
//        - także: optymalizacja pod względem renderów (to możesz obejrzeć playliste na yt + potem zapytać Kacpra i na koniec ulepszyć)
// - pamiętaj o możliwości użycia (i najlepiej użyj!) useContext!! łatwe, a fajne
// - na koniec do ulepszenia: STWÓRZ WŁASNY HOOK! np. useHover czy coś w tym stylu
// - na koniec spójrz czy nie możesz gdzieś dać useMemo lub useCallback!! albo zapytać Kacpra jak to dać --> żeby pokazać, że umiesz i przy okazji sobie powtórzyć
// - zmień ikonę w title na jakąś fajną
// - przenieś potem te komentarze do ggle keep

// User Stories:

// - I can create recipes that have names and ingredients.
// - I can see an index view where the names of all the recipes are visible. DONE
// - I can click into any of those recipes to view it.
// - I can edit these recipes.
// - I can delete these recipes.
// - All new recipes I add are saved in my browser's local storage. If I refresh the page, these recipes will still be there

// Unit tests will be extra scored :)



