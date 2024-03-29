import React, { useEffect, useState } from "react";

import "./Products.css";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Pagination from "./Pagination";
import { AxiosConfig } from "../axiosConfig";

import delicon from "../images/delicon.svg";
import editicon from "../images/edit.png";

const Users = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  async function fetchData() {
    try {
      const res = await AxiosConfig.get("/users/getAll");
      console.log(res.data);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  //pagination code
  const [currentPage, setCurrentPage] = useState(1);

  const [recordsPerPage] = useState(10);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const nPages = Math.ceil(users.length / recordsPerPage);

  const deleteUser = (user) => {
    // e.preventDefault();
    // console.log(user);

    AxiosConfig.delete(`/users/${user._id}`)
      .then((res) => {
        // console.log(res.data);
        fetchData();
      })
      .catch((err) => {
        // console.log(err);
        alert("Not Deleted");
        err = new Error();
      });
  };

  const [block, setBlock] = useState(false);

  useEffect(() => {
    fetchData();
  }, [block, users]);

  const blockUser = (user) => {
    AxiosConfig.patch(`/users/block/${user._id}`, {
      block: !block,
    })
      .then((res) => {
        // console.log(res.data);
        setBlock(!block);
        // alert("User Updated");
      })
      .catch((err) => {
        console.log(err);
        // alert("User not Updated");
        err = new Error();
      });
  };
  return (
    <div
      className="fontsato "
      style={{
        width: "100%",
        padding: "3rem",
      }}
    >
      <table style={{ marginLeft: "12rem" }} className="mb-3">
        <thead>
          <tr>
            {/* <th>Product-ID</th> */}
            <th>Fullname</th>
            <th>User Emails</th>
            <th></th>
            <th></th>
            <th>Block/Unblock</th>
          </tr>
        </thead>
        <tbody>
          {users?.slice(indexOfFirstRecord, indexOfLastRecord).map((user) => {
            return (
              <tr>
                {/* <td>{user._id}</td> */}

                <td>{user.fullName}</td>
                <td>{user.email}</td>

                <td>
                  <img
                    className="icon"
                    src={editicon}
                    alt="editicon"
                    onClick={() => {
                      navigate("/updateuseremail", { state: user });
                    }}
                  />
                  {/* <Button
                    variant="success"
                    type="submit"
                    onClick={() => {
                      navigate("/updateuseremail", { state: user });
                    }}
                  >
                    Update User Email
                  </Button> */}
                </td>
                <td>
                  <img
                    className="icon"
                    src={delicon}
                    alt="delicon"
                    onClick={(e) => deleteUser(user)}
                  />
                  {/* <Button
                    variant="danger"
                    type="submit"
                    onClick={(e) => deleteUser(user)}
                  >
                    Delete user
                  </Button> */}
                </td>
                <td style={{ textAlign: "center" }}>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => blockUser(user)}
                  >
                    {user.block ? "Unblock" : "Block"} User
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Users;

//using react table library

// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

// import React, { useEffect, useState } from "react";

// import "./Products.css";
// import Button from "react-bootstrap/esm/Button";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import Pagination from "./Pagination";
// import { AxiosConfig } from "../axiosConfig";

// import delicon from "../images/delicon.svg";
// import editicon from "../images/edit.png";

// const Users = () => {
//   const [users, setUsers] = useState([]);

//   const navigate = useNavigate();

//   async function fetchData() {
//     try {
//       const res = await AxiosConfig.get("/users/getAll");
//       console.log(res.data);
//       setUsers(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   }
//   const rows = users;
//   const deleteUser = (user) => {
//     // e.preventDefault();
//     // console.log(user);

//     AxiosConfig.delete(`/users/${user._id}`)
//       .then((res) => {
//         // console.log(res.data);
//         fetchData();
//       })
//       .catch((err) => {
//         // console.log(err);
//         alert("Not Deleted");
//         err = new Error();
//       });
//   };

//   const [block, setBlock] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, [block, users]);

//   const blockUser = (user) => {
//     AxiosConfig.patch(`/users/block/${user._id}`, {
//       block: !block,
//     })
//       .then((res) => {
//         // console.log(res.data);
//         setBlock(!block);
//         // alert("User Updated");
//       })
//       .catch((err) => {
//         console.log(err);
//         // alert("User not Updated");
//         err = new Error();
//       });
//   };
//   return (
//     <div className="raj ">
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Fullname</TableCell>
//               <TableCell align="center">Email</TableCell>
//               <TableCell align="center">Edit</TableCell>
//               <TableCell align="center">Delete</TableCell>
//               <TableCell align="center">Block/Unblock</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <TableRow
//                 key={row.name}
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 <TableCell component="th" scope="row">
//                   {row.fullName}
//                 </TableCell>
//                 <TableCell align="center">{row.email}</TableCell>
//                 <TableCell align="center">
//                   <img
//                     className="icon"
//                     src={editicon}
//                     alt="editicon"
//                     onClick={() => {
//                       navigate("/updateuseremail", { state: row });
//                     }}
//                   />
//                 </TableCell>
//                 <TableCell align="center">
//                   <img
//                     className="icon"
//                     src={delicon}
//                     alt="delicon"
//                     // onClick={(e) => deleteUser(user)}
//                   />
//                 </TableCell>
//                 <TableCell align="center">
//                   <Button
//                     variant="primary"
//                     type="submit"
//                     onClick={(e) => blockUser(row)}
//                   >
//                     {row.block ? "Unblock" : "Block"} User
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default Users;
