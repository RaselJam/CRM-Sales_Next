import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";


const GET_CLIENTS_OF_USER = gql`
  query GetClientsOfSalesMan {
    getClientsOfSalesMan {
      id
      name
      lastName
      company
      email
      tel
      salesMan
      createdAt
    }
  }
`;
export default function Home() {
  const { data, loading, error } = useQuery(GET_CLIENTS_OF_USER);
  const router = useRouter();

  console.log(data);
  if (loading) return "Loading ...";
  //if (!data.getClientsOfSalesMan) router.push("/error", "/login");
  //  window.location.href = 'login';

  return (
    <>
      <div>
        <h1 className="text-2xl text-gray-800 fon-light"> Customers</h1>
        <Link href="/newClient">
          <a 
          className="bg-blue-800 py-2 px-5 mt-3 mb-3 uppercase font-bold inline-block text-white rounded text-sm hover:bg-gray-800">
            new customer
          </a>
        </Link>
        <table className="table-auto shadow-md mt-10 w-full w-lg ">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Name</th>
              <th className="w-1/5 py-2">Company</th>
              <th className="w-1/5 py-2">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.getClientsOfSalesMan?.map((elm) => (
              <tr key={elm.id}>
                <td className="border px-4 py-2">{`${elm.name} ${elm.lastName}`}</td>
                <td className="border px-4 py-2">{elm.company}</td>
                <td className="border px-4 py-2">{elm.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
