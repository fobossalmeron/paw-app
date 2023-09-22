import { useContext } from "react";
import FormStateContext from "./FormStateContext";

function SpecieToggle(
  props: React.PropsWithChildren<{
    setSpecie: (specie: string) => void;
  }>
) {
  const { form } = useContext(FormStateContext);

  return (
    <div className="specie_setter">
      <span
        onClick={() => props.setSpecie("dog")}
        className={form.specie === "dog" ? "selected" : ""}
      >
        Perro
      </span>
      <span
        onClick={() => props.setSpecie("cat")}
        className={form.specie === "cat" ? "selected" : ""}
      >
        Gato
      </span>
    </div>
  );
}

export default SpecieToggle;
