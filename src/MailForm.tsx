import { useContext } from "react";
import { Button, Form, Input } from "antd";

import FormStateContext from "./FormStateContext";
import { produce } from "immer";

function MailForm(
  props: React.PropsWithChildren<{
    onNext: () => void;
    onPrev: () => void;
  }>
) {
  const { form, setForm } = useContext(FormStateContext);

  const onFinish = (value: any) => {
    setForm(
      produce((formState) => {
        formState.steps.email = {
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

  type FieldType = {
    email: string;
  };

  return (
    <>
      <p className="form_title">
        Último paso para descubrir los suplementos que necesita{" "}
        {form.steps.petName.value.name !== undefined
          ? form.steps.petName.value.name
          : "tu amigo peludo"}
      </p>
      <Form
        name="MailForm"
        layout="vertical"
        className="inner_form"
        requiredMark={false}
        initialValues={{ remember: true, email: form.steps.email.value.email }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Ingresa tu correo"
          name="email"
          rules={[
            {
              required: true,
              message: "Ingresa tu correo para conocer las recomendaciones",
            },
          ]}
        >
          <Input placeholder="Ingresa tu email" size="large" type="email" />
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

export default MailForm;
