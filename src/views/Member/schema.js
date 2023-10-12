import * as yup from 'yup'

export const schema = () => {
  yup.object().shape({
    username: yup
      .string()
      .required()
      .min(4, 'User name cannot be less than 4 characters'),
    password: yup
      .string()
      .required()
      .min(6, 'Password cannot be less than 6 characters'),
    email: yup.string().required().email(),
    name: yup
      .string()
      .required()
      .min(4, 'Name cannot be less than 4 characters'),
    phone: yup
      .string()
      .required()
      .matches(/^(([0-9]{1,1})[ \\-]*)*?[0-9]{1,1}?[ \\-]*[0-9]{1,1}?$/, '123')
  })
}
