import { Formik, Form, Field } from "formik";
import type { FormikHelpers } from "formik";
import { useId } from "react";
// import * as yup from "yup";
import css from "../NoteForm/NoteForm.module.css";

interface FormValues {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

const formValues: FormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

export default function NoteForm() {
  const fieldId = useId();

  const handleSubmit = (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    console.log(values);
    formikHelpers.resetForm();
  };

  return (
    <Formik
      initialValues={formValues}
      onSubmit={handleSubmit}
      //   validationSchema={}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            type="text"
            name="title"
            className={css.input}
            id={`${fieldId}-title`}
          />
          <span name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            name="content"
            rows={8}
            className={css.textarea}
            id={`${fieldId}-content`}
          />
          <span name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            name="tag"
            className={css.select}
            id={`${fieldId}-tag`}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <span name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            //   disabled=false
          >
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
