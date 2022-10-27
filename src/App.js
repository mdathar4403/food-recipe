import './App.css';
import Axios from "axios";
import { useState } from 'react';
import RecipeTile from './RecipeTile';

function App() {

  const [query, setquery] = useState("");
  const [recipes, setrecipes] = useState([]);
  const [healthLabels, sethealthLabels] = useState("vegan");

  const YOUR_APP_ID = `68479164`;
  const YOUR_APP_KEY = "07caf307aea73794549a2edd9ec09388";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabels}`;

   async function getRecipes(){
    var result = await Axios.get(url);
    setrecipes(result.data.hits);
    console.log(result.data);
  }
  const onSubmit=(e)=>{
    e.preventDefault();
    getRecipes();
  }

  return (
    <div className='app'>
      <h1 onClick={getRecipes}>Food Recipe Plaza 😋</h1>

      <form className="app__searchForm" onSubmit={onSubmit}>
        <input 
        type="text" 
        className='app__input'
        placeholder='enter ingridient'
        value={query}
        onChange={(e)=>setquery(e.target.value)}
        />
        <input 
        className='app__submit'
        type="submit" 
        value="Search"
        />
       <select className='app_healthLabels'>
        <option onClick={() => sethealthLabels("vegan")}>Vegan</option>
        <option onClick={() => sethealthLabels("paleo")}>Paleo</option>
        <option onClick={() => sethealthLabels("vegetarian")}>Vegetarian</option>
        <option onClick={() => sethealthLabels("low-sugar")}>low-sugar</option>
        <option onClick={() => sethealthLabels("egg-free")}>Egg-Free</option>
        <option onClick={() => sethealthLabels("wheat-free")}>Wheat-Free</option>
        <option onClick={() => sethealthLabels("daily-free")}>Daily-Free</option>
        <option onClick={() => sethealthLabels("peanut-free")}>Peanut-Free</option>
        <option onClick={() => sethealthLabels("tree-nut-free")}>Tree-nut-free</option>
       </select>
      </form>

      <div className='app__recipes'>
        {recipes.map(recipe => {
           return <RecipeTile recipe={recipe} />
        })}
      </div>
    </div>
  );
}

export default App;
