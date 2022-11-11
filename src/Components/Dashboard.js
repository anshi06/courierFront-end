import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState([]);
  function getData() {
    axios.get("http://localhost:8080/getdata").then((res) => {
      setData(res.data);
    });
  }
  useEffect(() => {
    getData();
  }, []);
  const deleteHandler = (id) => {
    axios.delete(`http://localhost:8080/deleteclient/${id}`).then(() => {
      getData();
    });
  };
  const setToLocalStorage = (
    clientId,
    name,
    email,
    phone,
    address,
    source,
    destination,
    distance,
    weight,
    dispatchTime,
    arrivalTime
  ) => {
    localStorage.setItem("id", clientId);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("address", address);
    localStorage.setItem("source", source);
    localStorage.setItem("destination", destination);
    localStorage.setItem("distance", distance);
    localStorage.setItem("weight", weight);
    localStorage.setItem("dispatchTime", dispatchTime);
    localStorage.setItem("arrivalTime", arrivalTime);
   
    
  };
  const sortDateAsc = () => {}
  const sortDateDesc = () =>{}

  return (
    <>
      <div className="d-flex justify-content-between m-2">
        <Link to="/form">
          <button className="btn btn-secondary">Add new Client</button>
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">clientId</th>
            <th scope="col">Name</th>
            <th scope="col">Source</th>
            <th scope="col">Destination</th>
            <th scope="col">Weight</th>
            <th scope="col">
              <i className="fa-solid fa-sort-up" onClick={sortDateDesc}></i>
              DispatchDate
              <i className="fa-solid fa-sort-down" onClick={sortDateAsc}></i>
            </th>
            <th scope="col">Distance</th>
          </tr>
        </thead>
        {data.map((eachData) => {
          return (
            <>
              <tbody>
                <tr>
                  <th scope="row">{eachData.clientId}</th>
                  <td>{eachData.name}</td>
                  <td>{eachData.source}</td>
                  <td>{eachData.destination}</td>
                  <td>{eachData.weight}</td>
                  <td>{eachData.dispatchTime}</td>
                  <td>{eachData.distance}</td>
                  <td>
                    <Link to="/update">
                      <button
                        className="btn-success"
                        onClick={() =>
                          setToLocalStorage(
                            eachData.clientId,
                            eachData.name,
                            eachData.email, 
                            eachData.phone,
                            eachData.address,
                            eachData.source,
                            eachData.destination,
                            eachData.distance,
                            eachData.weight,
                            eachData.dispatchTime,
                            eachData.arrivalTime,
                          
                          )
                        }
                      >
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn-danger"
                      onClick={() => deleteHandler(eachData.clientId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </>
          );
        })}
      </table>
    </>
  );
};
export default Dashboard;
