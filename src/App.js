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
    // If there are some dishes locally set them as initial value for dishes
  const [dishes, setDishes] = useState(() => {
    const localDishes = localStorage.getItem('dishes')
    return localDishes ? JSON.parse(localDishes) : []
  })
  // Update local dishes everytime it changes
  useEffect(() => {
    localStorage.setItem('dishes', JSON.stringify(dishes))
  }, [dishes])
let x = 2;
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

// - POTEM: ogarnij debugowanie i testowanie czy nie ma jakichś błędów niepotrzebnych
//    - tutaj ogarnij też UNIT TEST i WALIDACJE

// - POTEM: dopracuj styl i UX, jak corsor pointer, zmiana dishName po kliknięciu itp.
// - POTEM: porób duuuuuuużo komentarzy, żeby łatwiej było opowiadać co się w danym miejscu dzieje
// - POTEM: dodać też taki sam guzik krzyżykowy z funkcją zamknięcia
// - POTEM: ogarnij responsywność!
// - POTEM: REFAKTOROWANIE
// - POTEM: zapytaj trochę Kacpra i sam też wykmiń fajne unit testy!! (extra score!!)
// - POTEM: rady z dołu
// - POTEM BONUSOWO: i to spytać Kacpra czy się da - ZROBIĆ HOOKA NA useRecipeModal czy coś żeby nie powtarzać bardzo podobnej logiki AddRecipeModal i EditRecipeModal w Ingridients

// także problem unique keys, bo np. jak dasz name i ingridients takie samo no to będą miały takie samo key


// - obejrzyj tutoriale tak czy siak żeby się nauczyć i ewentualnie coś u siebie zmienić


// fajne efekty hoverowe: https://www.youtube.com/watch?v=Fp4PlygdV5E&ab_channel=CodingWithChaim 2:43 maybe worth na koniec żeby rozwinąć apke!!
// memo do wykorzystania!!! gou 17:20 w filmiku wyżej
// gou to jako zrozumienie: https://www.youtube.com/watch?v=uojLJFt9SzY&ab_channel=CodingWithChaim

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

// Unit tests will be extra scored :)