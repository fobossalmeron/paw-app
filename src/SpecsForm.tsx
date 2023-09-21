import { useContext } from "react";
import { Button, Form, Select } from "antd";

import FormStateContext from "./FormStateContext";
import { produce } from "immer";

const breeds = [
  {
    value: "pug",
    label: "Pug",
  },
  {
    value: "golden",
    label: "Golden",
  },
  {
    value: "chihuahua",
    label: "Chihuahua",
  },
];

const age_ranges = [
  {
    value: "puppy",
    label: "Puppy (0 - 1 año)",
  },
  {
    value: "adult",
    label: "Adult (1 - 7 años)",
  },
  {
    value: "senior",
    label: "Senior (+7 años)",
  },
];

const weight_ranges = [
  {
    value: "toy",
    label: "Toy (5kg o menos)",
  },
  {
    value: "pequeno",
    label: "Pequeño (5 - 15kg)",
  },
  {
    value: "mediano",
    label: "Mediano (14 - 25kg)",
  },
  {
    value: "grande",
    label: "Mediano (25 - 50kg)",
  },
  {
    value: "gigante",
    label: "Gigante (+50kg)",
  },
];

function SpecsForm(
  props: React.PropsWithChildren<{
    onNext: () => void;
    onPrev: () => void;
  }>
) {
  const { form, setForm } = useContext(FormStateContext);

  const onFinish = (value: any) => {
    setForm(
      produce((formState) => {
        formState.steps.specs = {
          value,
          valid: true,
          dirty: false,
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
            options={breeds}
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
            options={age_ranges}
          />
        </Form.Item>

        <Form.Item
          label="Peso"
          name="weight"
          rules={[
            {
              required: true,
              message: "Por favor selecciona el peso",
            },
          ]}
        >
          <Select
            size="large"
            placeholder="Selecciona el peso"
            options={weight_ranges}
          />
        </Form.Item>

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
    </>
  );
}

export default SpecsForm;
