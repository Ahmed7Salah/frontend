import { useFormik } from "formik"
import { passwordSchema } from "../../schemas/AccountFormValidationSchema"
import FormOutlines from "../../components/AccountForm/FormOutlines"
import { Button } from "@chakra-ui/react"
import PasswordAndConfirmPass from "../../components/AccountForm/SmallParts/PasswordAndConfirmPass"
import { useParams } from "react-router-dom"
import MessageAlert from "../../components/AccountForm/SmallParts/MessageAlert"
import { useState } from "react"


const ResetPassword = () => {

  const [response, setResponse] = useState<{ fetched: boolean; success: boolean; message: string }>({
    fetched: false,
    success: false,
    message: "",
  })

  const { userId, token } = useParams();
    const onSubmit = async (values: any) => {
        const res = await fetch(`http://localhost:5000/user/reset-password/${userId}/${token}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: values.password,
            confirmPassword: values.confirmPassword,
          }),
        })
          .then((res) => res.json())
          .catch((err) => console.log(err))

        setResponse({message: res.message, success: res.success, fetched: true})
      }

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
          password: "",
          confirmPassword: "",
        },
        validationSchema: passwordSchema,
        onSubmit,
      })

      return (
        <FormOutlines
            header="Reset Password" 
            headerContent="Enter your new password.">
                <form autoComplete='off' onSubmit={handleSubmit} style={{ width: '70%', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: '1rem'}}>
                    {response.fetched && <MessageAlert success={response.success} message={response.message} />}
                    <PasswordAndConfirmPass
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    <Button mt="2" colorScheme="teal" size="lg" w="60%" h="14" fontSize="xl" type="submit">Change Password</Button>
                </form>
        </FormOutlines>
      )
}

export default ResetPassword
