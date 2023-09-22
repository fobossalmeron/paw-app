import { useContext } from "react";
import FormStateContext from "./FormStateContext";
import { Button } from "antd";
import { Fade } from "react-awesome-reveal";

function Results() {
  const { form } = useContext(FormStateContext);

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
