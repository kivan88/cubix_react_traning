import './App.css';
import Recipe from "./Recipe";
import RecipeAnchor from "./RecipeAnchor";

function App() {
  const recipes = [
    {
      id: 1,
      name: "Rántotta",
      ingredients: [
        "2 tojás", 
        "egy csipet só"
      ],
      instructions: "Feltörjük, megsütjük, finom lesz.",
      difficulty: 3
    },
    {
      id: 2,
      name: "Műzli",
      ingredients: [
        "gabonapehely", 
        "tej"
      ],
      instructions: "Beleöntjük a gabonapelyhet egy tálba és felöntjük tejjel.",
      difficulty: 1
    },
    {
      id: 3,
      name: "Paprikás krumpli",
      ingredients: [
        "2 fej hagyma", 
        "olaj",
        "20 dkg kolbász",
        "2 evőkanál pirospaprika",
        "1 kg krumpli",
        "só",
        "1 evőkanál paradicsompüré",
      ],
      instructions: "A hagyományos paprikás krumpli elkészítéséhez a hagymát megtisztítjuk, apró kockára vágjuk. Tűzálló tálban egy kevés olajat forrósítunk, beletesszük a felaprított hagymát, és üvegesre pirítjuk, majd hozzáadjuk a felkarikázott kolbászt, és megpirítjuk. Lehúzzuk a lábast a tűzhelyről, megszórjuk a kolbászos pirított hagymát a pirospaprikával. Átkeverjük, majd hozzáadjuk az alaposan megmosott, megtisztított, kockákra vágott burgonyát. Felöntjük annyi vízzel, ami majdnem ellepi. Megsózzuk, hozzáadjuk a paradicsompürét, és addig főzzük, amíg a burgonya megpuhul. Friss kenyérrel, savanyú uborkával tálaljuk.",
      difficulty: 6
    }
  ]

  return (
    <div id="top">
      <RecipeAnchor recipes={recipes}/>
      <br/>
      {recipes.map(item => {
          return <Recipe key={item.id} id={item.id} name={item.name} ingredients={item.ingredients} instructions={item.instructions} difficulty={item.difficulty}/>;
        }
      )}
    </div>
  );
}

export default App;