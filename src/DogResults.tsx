import { useContext } from "react";
import FormStateContext from "./FormStateContext";
import Recommendation from "./Recommendation";
import dog from "./dog.json";

function DogResults() {
  const { form } = useContext(FormStateContext);

  const breedIndex = dog.findIndex(
    (specs) => specs.breed === form.steps.specs.value.breed
  );
  const breedProducts = dog[breedIndex];

  const addHipAndJoint =
    form.steps.specs.value.age === "senior" &&
    breedProducts.prop1 !== "Hip & Joint" &&
    breedProducts.prop2 !== "Hip & Joint" &&
    breedProducts.prop3 !== "Hip & Joint";

  // const ageIndex =

  return (
    <>
      <Recommendation
        productId={addHipAndJoint ? "Hip & Joint" : breedProducts.prop1}
      />
      <Recommendation
        productId={addHipAndJoint ? breedProducts.prop1 : breedProducts.prop2}
      />
      <Recommendation
        productId={addHipAndJoint ? breedProducts.prop2 : breedProducts.prop3}
      />
    </>
  );
}

export default DogResults;
