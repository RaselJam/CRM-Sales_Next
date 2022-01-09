import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";

const NEW_USER = gql`
  mutation NewUser($input: UserInput!) {
    newUser(input: $input) {
      id
      name
      lastName
      email
      createdAt
    }
  }
`;

function signup() {
  const [message, setMessage] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [newUser] = useMutation(NEW_USER);
  const router = useRouter();
  ///Effects :
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (isSuccess) {
        router.push("/login");
      }
    }, 3500);
    return () => {
      clearTimeout(timerId);
    };
  }, [isSuccess]);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setMessage((msg) =>
        msg?.includes("successfully")
          ? "Redirecting to Login Page ..."
          : ""
      );
    }, 2000);
    return () => {
      clearTimeout(timerId);
    };
  }, [message]);
  ///
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is Required"),
      lastName: Yup.string().required(
        "Last Name is Required"
      ),
      email: Yup.string()
        .required("Email is Required")
        .email("not a valid Email"),
      password: Yup.string().required(
        "password is Required"
      ),
      // .min(6, "at least 6 char"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await newUser({
          variables: {
            input: {
              ...values,
            },
          },
        });
        setMessage(
          `successfully created. wellcome aboard ${data.newUser.name}`
        );
        setIsSuccess(true);
      } catch (error) {
        setMessage(error.message);
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
        Sign Up
      </h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm ">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name">
                Name
              </label>
              <input
                id="name"
                placeholder="Enter Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.name}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                placeholder="Enter Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {formik.touched.lastName &&
            formik.errors.lastName ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p>{formik.errors.lastName}</p>
              </div>
            ) : null}
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
                placeholder="Enter Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
              value="Sigup"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default signup;
