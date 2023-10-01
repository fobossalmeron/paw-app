import { useContext } from "react";
import FormStateContext from "./FormStateContext";
import { Button } from "antd";
import { Fade } from "react-awesome-reveal";
import DogResults from "./DogResults";
import CatResults from "./CatResults";

function Results() {
  const { form } = useContext(FormStateContext);

  return (
    <div className="results">
      <Fade triggerOnce>
        <p className="welcome final">
          Elección perfecta para las necesidades de{" "}
          {form.steps.petName.value.name !== undefined
            ? form.steps.petName.value.name
            : "tu amigo peludo"}
        </p>
        {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
        <div className="products">
          {form.steps.petName.value.name && form.specie === "dog" && (
            <DogResults />
          )}
          {form.steps.petName.value.name && form.specie === "cat" && (
            <CatResults />
          )}
        </div>
        <div className="last_button">
          <Button type="link" size="large" shape="round">
            Ver más productos
          </Button>
        </div>
      </Fade>
    </div>
  );
}

export default Results;
