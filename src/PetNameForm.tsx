import { useContext } from "react";
import { Button, Form, Input } from "antd";

import FormStateContext from "./FormStateContext";
import { produce } from "immer";

function PetNameForm(
  props: React.PropsWithChildren<{
    onNext: () => void;
  }>
) {
  const { form, setForm } = useContext(FormStateContext);

  const onFinish = (value: any) => {
    setForm(
      produce((formState) => {
        formState.steps.petName = {
          value,
        };
      })
    );
    props.onNext();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    username?: string;
    name?: string;
  };

  return (
    <>
      <p className="form_title">Queremos conocer a tu amigo peludo</p>
      <Form
        name="petNameForm"
        layout="vertical"
        className="inner_form"
        initialValues={{ remember: true, name: form.steps.petName.value.name }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        requiredMark={false}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="¿Cómo se llama tu mascota?"
          name="name"
          rules={[
            {
              required: true,
              message: "Por favor ingresa el nombre de tu mascota",
            },
          ]}
        >
          <Input
            placeholder="Nombre de tu mascota"
            size="large"
            type="string"
          />
        </Form.Item>

        <Form.Item>
          <Button
            block
            type="primary"
            size="large"
            shape="round"
            htmlType="submit"
          >
            Siguiente
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default PetNameForm;
