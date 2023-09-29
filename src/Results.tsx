import { useContext } from "react";
import FormStateContext from "./FormStateContext";
import { Button } from "antd";
import { Fade } from "react-awesome-reveal";
import quiz from "./quiz.json";

function Recommendation({ product }: { product: string }) {
  return <p>{product}</p>;
}

function Results() {
  const { form } = useContext(FormStateContext);

  const breedIndex = quiz.findIndex(
    (specs) => specs.breed === form.steps.specs.value.breed
  );
  const breedProducts = quiz[breedIndex];

  const addHipAndJoint =
    form.steps.specs.value.age === "senior" &&
    breedProducts.prop1 !== "Hip & Joint" &&
    breedProducts.prop2 !== "Hip & Joint" &&
    breedProducts.prop3 !== "Hip & Joint";

  return (
    <div className="results">
      <Fade>
        <p className="welcome final">
          Elección perfecta para las necesidades de{" "}
          {form.steps.petName.value.name !== undefined
            ? form.steps.petName.value.name
            : "tu amigo peludo"}
        </p>
        <pre>{JSON.stringify(form, null, 2)}</pre>
        <Recommendation
          product={addHipAndJoint ? "Hip & Joint" : breedProducts.prop1}
        />
        <Recommendation
          product={addHipAndJoint ? breedProducts.prop1 : breedProducts.prop2}
        />
        <Recommendation
          product={addHipAndJoint ? breedProducts.prop2 : breedProducts.prop3}
        />

        <div className="products"></div>
        <div className="form_navigation">
          <Button type="primary" size="large" shape="round" htmlType="submit">
            Continuar con la recomendación
          </Button>

          <Button type="link" size="large" shape="round">
            Ver más productos
          </Button>
        </div>
      </Fade>
    </div>
  );
}

export default Results;
