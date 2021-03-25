import React, { useState } from 'react';
import styled from 'styled-components'
import Dish from './components/Dish'
import AddRecipeModal from './components/AddRecipeModal';

// export const RecipeContext = React.createContext()

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: black;
`
// dodać potem media query, ale najpierw zapytać Marka czy responsywność na komórkę będzie miała być jakaś mega duża itp., ale może też po prostu będzie wystarczeć to co zrobiłeś
// na koniec musisz ogarnąć overflow scroll czy coś, albo żeby po prostu cały recipies container się wydłu
const RecipesContainer = styled.div`
  height: 500px;
  width: 65vw;
  max-width: 920px;
  background-color: lightgray;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
// color: ${false ? 'blue'  : 'red'}

function App() {
  const [dishes, setDishes] = useState([])

  return (
    // <RecipeContext.Provider value={{recipesNames, ingridients}}>
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
              />
            </>
          ))}
        </RecipesContainer>
        <AddRecipeModal 
        dishes={dishes}
        setDishes={setDishes}
        />
      </Wrapper>
    // </RecipeContext.Provider>
  );
}

export default App;

// CURRENT TASK: naprawić buga, gdzie po usunięciu jednego elementu i potem editowaniu dodają się puste nazwy! (pologuj prawie wszystko, może to jest index, moze to jest current dishName, chuj wie, pogrzeb w tym!) + jak się usunie wszystko i potem doda pust
//  --> MOŻE DO TEGO UŻYJESZ useEffecta!!!!! ale sam nie wiesz, najpierw wszystko ładnie po loguj z nazwami 

// fajne efekty hoverowe: https://www.youtube.com/watch?v=Fp4PlygdV5E&ab_channel=CodingWithChaim 2:43 maybe worth na koniec żeby rozwinąć apke!!
// memo do wykorzystania!!! gou 17:20 w filmiku wyżej
// gou to jako zrozumienie: https://www.youtube.com/watch?v=uojLJFt9SzY&ab_channel=CodingWithChaim

// - NA KONIEC MVP: zrób LocalStorage (last story)
// - POTEM: ogarnij debugowanie i testowanie czy nie ma jakichś błędów niepotrzebnych
//    - tutaj ogarnij też unit testy i nie pozwolenie na dodanie pustych stringów itp. itd.
// - POTEM: dopracuj styl i UX, jak corsor pointer, zmiana dishName po kliknięciu itp.
// - POTEM: ogarnij responsywność!
// - POTEM: REFAKTOROWANIE
// - POTEM: zapytaj trochę Kacpra i sam też wykmiń fajne unit testy!! (extra score!!)
// - POTEM: rady z dołu
// - POTEM BONUSOWO: i to spytać Kacpra czy się da - ZROBIĆ HOOKA NA useRecipeModal czy coś żeby nie powtarzać bardzo podobnej logiki AddRecipeModal i EditRecipeModal w Ingridients

// także problem unique keys, bo np. jak dasz name i ingridients takie samo no to będą miały takie samo key


// - obejrzyj tutoriale tak czy siak żeby się nauczyć i ewentualnie coś u siebie zmienić


// rady:
// - REFAKTOROWANIE PO MVP GOU: przede wszystkim minimalizowanie użycia useState! + ulepszenia nazw funkcji itp.!
//        - także: optymalizacja pod względem renderów (to możesz obejrzeć playliste na yt + potem zapytać Kacpra i na koniec ulepszyć) 
        // np. ZRÓB TAK ŻEBY RENDER PONOWNY BYŁ DOPIERO PO ZAMKNIĘCIU MODALA, A NIE ZA KAŻDĄ WPISANĄ LITERĄ!!!
// - pamiętaj o możliwości użycia (i najlepiej użyj!) useContext!! łatwe, a fajne JEŚLI GDZIEŚ PODAJESZ PROPSY PRZEZ KILKA KOMPONENTÓW!
// - na koniec do ulepszenia: STWÓRZ WŁASNY HOOK! np. useHover czy coś w tym stylu
// - na koniec spójrz czy nie możesz gdzieś dać useMemo lub useCallback!! albo zapytać Kacpra jak to dać --> żeby pokazać, że umiesz i przy okazji sobie powtórzyć
// - zmień ikonę w title na jakąś fajną
// - przenieś potem te komentarze do ggle keep

// User Stories:

// - I can create recipes that have names and ingredients. DONE
// - I can see an index view where the names of all the recipes are visible. DONE
// - I can click into any of those recipes to view it. DONE
// - I can edit these recipes. DONE
// - I can delete these recipes. DONE
// - All new recipes I add are saved in my browser's local storage. If I refresh the page, these recipes will still be there

// Unit tests will be extra scored :)