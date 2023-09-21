import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

function PetNameForm(
  props: React.PropsWithChildren<{
    onNext: () => void;
  }>
) {
  const { form, setForm } = useContext(FormStateContext);

  const { register, handleSubmit, control } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: {
      name: form.steps.details.value.name,
    },
  });

  const { isDirty } = useFormState({
    control,
  });

  const nameControl = register("name", { required: true });

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.details.dirty = isDirty;
      })
    );
  }, [isDirty, setForm]);

  return (
    <form
      onSubmit={handleSubmit((value) => {
        console.log(value);
        setForm(
          produce((formState) => {
            formState.steps.details = {
              value,
              valid: true,
              dirty: false,
            };
          })
        );
        props.onNext();
      })}
    >
      <div className={"flex flex-col space-y-4"}>
        <label>
          Pet Name
          <input {...nameControl} />
        </label>

        <input type="submit" value="Next" />
      </div>
    </form>
  );
}

export default PetNameForm;
