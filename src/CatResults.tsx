import { useContext } from "react";
import FormStateContext from "./FormStateContext";
import Recommendation from "./Recommendation";
import cat from "./cat.json";

function DogResults() {
  const { form } = useContext(FormStateContext);

  const ageIndex = cat.findIndex(
    (specs) => specs.age === form.steps.specs.value.age
  );
  const ageProducts = cat[ageIndex];

  return (
    <>
      <Recommendation product={ageProducts.prop1} />
      <Recommendation product={ageProducts.prop2} />
      <Recommendation product={ageProducts.prop3} />
    </>
  );
}

export default DogResults;
