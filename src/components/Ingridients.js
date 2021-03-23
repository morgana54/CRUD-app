import styled from 'styled-components'

// const Item = styled.div`
//   min-height: 30px;
//   width: 60vw;
//   max-width: 800px;
//   background-color: lightgreen;
//   border-radius: 10px;
//   margin-top: 10px;
//   padding: 5px;
//   padding-left: 15px;
//   display: flex;
//   align-items: center;
//   color: darkgreen;
// `

const Ingridients = ({ingridients, isDishClicked, }) => {
    // ingridients is a string!
    let ingridientsArr = ingridients.split(',')

    return (
        // tutaj dasz ten warunek jeśli jest clicked dish or not
    <>
    {isDishClicked 
        &&
        ingridientsArr.map((ingridient => (
            <p key={ingridient}>{ingridient}</p>
        )))
    }
    </>
    );
}
 
export default Ingridients;