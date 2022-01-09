import React,{useEffect} from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const GET_USER = gql`
  query GetUser {
    getUser {
      id
      name
      email
      lastName
      createdAt
    }
  }
`;

function Header() {
  const router = useRouter();
 
  const { data, loading, error } = useQuery(GET_USER);
  console.log("---data---:", data);
  console.log("---loading---:", loading);
  console.log("---error---:", error);
  if (loading) return "Loading ...";
  if(!data.getUser) router.push( '/login');
  
  //handlers :
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
 
  return (
    <>
          <div className="flex justify-between mb-6">
          <p className="mr-2">
            Hi {data?.getUser?.name} {data?.getUser?.lastName}!
          </p>
          <button
            onClick={handleLogout}
            className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md hover:bg-gray-800"
            type="button">
            Logout
          </button>
        </div>
      
    </>
  );
}

export default Header;
