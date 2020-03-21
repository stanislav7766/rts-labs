import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';

const Form = ({data, errors, onSubmit, onChange}) => (
  <form onSubmit={onSubmit}>
    <TextFieldGroup
      placeholder="Введіть граничну частоту W"
      name="W"
      value={data.W}
      onChange={onChange}
      error={errors.W}
    />
    <TextFieldGroup
      placeholder="Введіть кількість гармонік n"
      name="n"
      value={data.n}
      onChange={onChange}
      error={errors.n}
    />
    <TextFieldGroup
      placeholder="Введіть кількість проміжків N"
      name="N"
      value={data.N}
      onChange={onChange}
      error={errors.N}
    />

    <input type="submit" value="Обчислити і побудувати графіки" className="btn btn-info btn-block mt-4" />
  </form>
);
export default Form;
