/*
*Se consulta la query a la función GQLQuery
*Obtiene los datos de la query para mostrar al usuario
*/

//Añadiendo librerias
import gql from 'graphql-tag';
import { GQLQuery } from './GQLQuery';
import styles from './style.css';
import { Tab, TabPanel, Tabs, TabList } from "react-web-tabs";
import "react-web-tabs/dist/react-web-tabs.css";
import React from "react";

//Añadir los iconos
import * as FaIcons from "react-icons/fa";

//Declarando la query
const GET_PEOPLE = gql`
  {
  allPeople{
  people{
    id
    name
    eyeColor
    hairColor
    skinColor
    birthYear
    homeworld{
      name
     
    }
    species{
      name
    }
    vehicleConnection{
      vehicles{
        name
        id
      }
    }
  }
  }
}
`;


const App = () => {
  // Fetch data from custom hook that uses React-Query
  const { data, isLoading, error } = GQLQuery('countries', GET_PEOPLE, {
    code: 'SE'
  });

  if (isLoading) return <div className="loading"> <FaIcons.FaSpinner />  Loading</div>;
  if (error) return <div className="loading" >Failed to Load Data</div>;
  const content= data.allPeople.people.map((tupla)=><li>{tupla.name}</li> );
  
  return (
  <>
  
    <div className="bar-black" > <a className="title"> Ravn Star Wars Registry </a> </div>


      <div data-rwt-vertical="true" className="rwt_tabs vertical-tabs">

    <Tabs defaultTab="vertical-tab-cGVvcGxlOjE" vertical orientation="vertical" className="vertical-tabs"  >
      <div role="tablist" aria-orientation="vertical" className="rwt_tablist navbar-class"> 
      {data.allPeople.people.map((personaje) => <TabList>
          <Tab  tabFor={personaje.id} > <b className="personas"> {personaje.name} </b> <br/>
            { personaje.species==null ? <span className="span-entrelineas">Human from {personaje.homeworld.name} </span> : <span className="span-entrelineas"> {personaje.species.name} from {personaje.homeworld.name}</span>}
             <div className="faIcon" > <FaIcons.FaAngleRight /> 
              </div>  </Tab>
                                                    
        </TabList>
      )} 
      </div>

      
      
      <br/>
      
      {data.allPeople.people.map((personaje) =>  <TabPanel tabId={personaje.id} >
        <div className="showinformation">
          <h3> <b> General Information </b></h3>
        
           <table className="table" key={personaje.id}>
           <tbody >
            <tr className="fila">
            <th className="features"> Eye Color</th>
            <th> {personaje.eyeColor}</th>
            </tr>
            <tr className="fila">
            <th className="features"> Hair Color</th>
            <th> {personaje.hairColor}</th>
            </tr>
            <tr className="fila">
            <th className="features"> Skin Color</th>
            <th> {personaje.skinColor}</th>
            </tr>
            <tr>
            <th className="features"> Birth Year</th>
            <th> {personaje.birthYear}</th>
            </tr>
            </tbody>
            </table>
      

      <h3> <b>  Vehicles </b></h3>
      {personaje.vehicleConnection.vehicles.map((vehicles) =>  <table key={vehicles.id}>
      <tbody>
            <tr>
            <th className="features"> {vehicles.name}</th>
            </tr>

      </tbody>
      </table>
      )}
     
      </div>

      </TabPanel>
      )}
    
        
    </Tabs> 
    </div>
    
  </>
   );  
};

export default App;