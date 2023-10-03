import { useContext, useState, useEffect } from "react";
import FormStateContext from "./FormStateContext";
import { Button } from "antd";
import { Fade } from "react-awesome-reveal";
import DogResults from "./DogResults";
import CatResults from "./CatResults";
import { Player } from "@lottiefiles/react-lottie-player";
import loadingAnim from "./loading.json";

function Results() {
  const { form } = useContext(FormStateContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  return (
    <div className="results">
      {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
      {loading ? (
        <Fade triggerOnce>
          <p className="welcome final">
            Buscando los productos para{" "}
            {form.steps.petName.value.name !== undefined
              ? form.steps.petName.value.name
              : "tu amigo peludo"}
          </p>
          <Player
            autoplay
            loop
            src={loadingAnim}
            style={{ height: "300px", width: "300px" }}
          ></Player>
        </Fade>
      ) : (
        <Fade delay={2000} triggerOnce>
          <p className="welcome final">
            Productos que{" "}
            {form.steps.petName.value.name !== undefined
              ? form.steps.petName.value.name
              : "tu amigo peludo"}
            <br />
            debería probar
          </p>
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
      )}
    </div>
  );
}

export default Results;
