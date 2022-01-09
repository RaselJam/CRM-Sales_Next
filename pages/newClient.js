import React from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_NEW_CUSTOMER = gql`
  mutation NewClient($input: ClientInput!) {
    newClient(input: $input) {
      id
      name
      lastName
      email
      company
      tel
      salesMan
      createdAt
    }
  }
`;
function newClient() {
  // const [data] = useMutation(CREATE_NEW_CUSTOMER)
  return (
    <div>
      <h1 className="text-2xl text-gray-800 fon-light">New Customer</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-alg">


        </div>
      </div>
    </div>
  );
}

export default newClient;
