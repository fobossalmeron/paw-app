import { useContext } from "react";
import { Button, Form, Select } from "antd";
import { Fade } from "react-awesome-reveal";
import dog from "./dog.json";

import FormStateContext from "./FormStateContext";
import { produce } from "immer";

import SpecieToggle from "./SpecieToggle";

const dogBreeds = dog.map(({ breed }) => ({ value: breed, label: breed }));

const age_ranges_dog = [
  {
    value: "Puppy",
    label: "Puppy (0 - 1 año)",
  },
  {
    value: "Adult",
    label: "Adult (1 - 7 años)",
  },
  {
    value: "Senior",
    label: "Senior (+7 años)",
  },
];

const age_ranges_cat = [
  {
    value: "Puppy",
    label: "Kitten (0 - 1 año)",
  },
  {
    value: "Adult",
    label: "Adult (1 - 7 años)",
  },
  {
    value: "Senior",
    label: "Senior (+7 años)",
  },
];

function SpecsForm(
  props: React.PropsWithChildren<{
    onNext: () => void;
    onPrev: () => void;
    setSpecie: (specie: string) => void;
  }>
) {
  const { form, setForm } = useContext(FormStateContext);

  const onFinish = (value: any) => {
    setForm(
      produce((formState) => {
        formState.steps.specs = {
          value,
        };
      })
    );
    props.onNext();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // Estás haciendo trampa con option:any, pero truena
  const filterOption = (input: string, option: any) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <p className="form_title">
        Cuéntanos un poco más sobre{" "}
        {form.steps.petName.value.name !== undefined
          ? form.steps.petName.value.name
          : "tu amigo peludo"}
      </p>
      <div style={{ width: "100%" }}>
        <SpecieToggle setSpecie={props.setSpecie} />

        <Form
          name="specsForm"
          layout="vertical"
          className="inner_form"
          requiredMark={false}
          initialValues={{
            remember: true,
            breed: form.steps.specs.value.breed,
            age: form.steps.specs.value.age,
            weight: form.steps.specs.value.weight,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {form.specie === "dog" && (
            <Fade triggerOnce>
              <Form.Item
                label="Raza"
                name="breed"
                rules={[
                  {
                    required: true,
                    message: "Por favor busca la raza de tu mascota",
                  },
                ]}
              >
                <Select
                  showSearch
                  size="large"
                  placeholder="¿Cuál es su raza?"
                  optionFilterProp="label"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={dogBreeds}
                />
              </Form.Item>
              <Form.Item
                label="Edad"
                name="age"
                rules={[
                  {
                    required: true,
                    message: "Por favor selecciona la edad",
                  },
                ]}
              >
                <Select
                  placeholder="Selecciona la edad"
                  size="large"
                  options={age_ranges_dog}
                />
              </Form.Item>
            </Fade>
          )}
          {form.specie === "cat" && (
            <Fade triggerOnce>
              <Form.Item
                label="Edad"
                name="age"
                rules={[
                  {
                    required: true,
                    message: "Por favor selecciona la edad",
                  },
                ]}
              >
                <Select
                  placeholder="Selecciona la edad"
                  size="large"
                  options={age_ranges_cat}
                />
              </Form.Item>
            </Fade>
          )}

          <div className="form_navigation">
            <Form.Item>
              <Button
                type="primary"
                block
                size="large"
                shape="round"
                htmlType="submit"
              >
                Siguiente
              </Button>
            </Form.Item>
            <Button
              type="link"
              block
              size="large"
              shape="round"
              onClick={props.onPrev}
            >
              ← Atrás
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default SpecsForm;
