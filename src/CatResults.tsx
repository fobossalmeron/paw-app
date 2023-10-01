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
  console.log(ageProducts);
  return (
    <>
      <Recommendation productId={ageProducts.prop1} />
      <Recommendation productId={ageProducts.prop2} />
      <Recommendation productId={ageProducts.prop3} />
    </>
  );
}

export default DogResults;
