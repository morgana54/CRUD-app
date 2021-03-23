import styled from 'styled-components'

// dodać potem media query, ale najpierw zapytać Marka czy responsywność na komórkę będzie miała być jakaś mega duża itp., ale może też po prostu będzie wystarczeć to co zrobiłeś

const Item = styled.div`
  min-height: 30px;
  width: 60vw;
  max-width: 800px;
  background-color: lightgreen;
  border-radius: 10px;
  margin-top: 10px;
  padding: 5px;
  padding-left: 15px;
  display: flex;
  align-items: center;
  color: darkgreen;
`

const Dish = ({recipe, onClick}) => {
  return (
    <>
    {recipe 
      && 
      <Item onClick={onClick}>
        <span>{recipe}</span>
      </Item>
    }
    </>
    );
}
 
export default Dish;