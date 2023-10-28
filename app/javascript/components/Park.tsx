import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Parks() {
  const [parks, setParks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url = "/api/v1/parks/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setParks(res))
      .catch(() => navigate("/"));
  }, []);

  const allParks = parks.map((park, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{park.full_name}</h5>
          <Link to={`/park/${park.park_code}`} className="btn custom-button">
            View Park
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">ze wonderful parks</h1>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="row">{parks.length > 0 ? allParks : ""}</div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    </>
  );
}

export default Parks;
