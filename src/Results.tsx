import { useContext } from "react";
import FormStateContext from "./FormStateContext";
import { Button } from "antd";

function Results() {
  const { form } = useContext(FormStateContext);

  return (
    <>
      <pre>{JSON.stringify(form, null, 2)}</pre>

      <div className="form_navigation">
        <Button
          type="primary"
          block
          size="large"
          shape="round"
          htmlType="submit"
        >
          Continuar con la recomendación
        </Button>

        <Button type="default" block size="large" shape="round">
          Ver más productos
        </Button>
      </div>
    </>
  );
}

export default Results;
