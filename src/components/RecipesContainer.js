import styled from 'styled-components'

// dodać potem media query, ale najpierw zapytać Marka czy responsywność na komórkę będzie miała być jakaś mega duża itp., ale może też po prostu będzie wystarczeć to co zrobiłeś

const Container = styled.div`
  height: 500px;
  width: 65vw;
  max-width: 920px;
  background-color: lightgray;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
// na koniec musisz ogarnąć overflow scroll czy coś, albo żeby po prostu cały recipies container się wydłu

const RecipesContainer = ({children}) => {
    return (
    <Container >
      {children}
    </Container>
    );
}
 
export default RecipesContainer;