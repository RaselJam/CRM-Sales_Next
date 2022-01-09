import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {gql, useMutation} from '@apollo/client'
import { useRouter } from "next/router";



const AUTHENTICATE = gql`
mutation NewUser($input: AuthInput!) {
  authentification(input: $input) {
    token
  }
}
`;

function login() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [authentification] = useMutation(AUTHENTICATE);
  //Effects : 
  useEffect(() => {
  const timerId = setTimeout(() => {
    setMessage('');
  }, 3000);
    return () => {
    clearTimeout(timerId)
    }
  }, [message])
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Not a valid email")
        .required("required"),
      password: Yup.string().required("required"),
    }),
    onSubmit: async (values) => {
     try {
       const {data} =  await authentification({
         variables :{
          input:{ ...values}
         }
       })
        const token =data.authentification.token
        localStorage.setItem('token', token)
        
       router.push("/")
       
     } catch (error) {
       setMessage(error.message)
     }


    },
  });
  const showMessage = () => {
    return (
      <div className="rounded shadow-md bg-white text-center py-2 px-3 w-full my-3 max-w-sm mx-auto">
        <p>{message}</p>
      </div>
    );
  };
 
  return (
    <>
     {message && showMessage()}
      <h1 className="text-center text-2xl text-white font-light">
        Login
      </h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm ">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email">
                Email
              </label>
              <input
                id="email"
                placeholder="Enter Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.email}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {formik.touched.password &&
            formik.errors.password ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.password}</p>
              </div>
            ) : null}
            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
              value="Login"
            />
            <Link href="/signup">
              <a className="bg-gray-800 w-full mt-5 p-2 text-white uppercase block text-center hover:bg-gray-900">
                SignUp
              </a>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default login;
