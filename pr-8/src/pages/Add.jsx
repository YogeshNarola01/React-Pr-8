
import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

const Add = () => {
  let location = useLocation();
  let naviget = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [scourse, setScourse] = useState([]);
   const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  let data = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [];
  const [record, setRecord] = useState(data);

  let courses = [
    "Html",
    "CSS",
    "Bootstrap",
    "JS",
    "React js",
    "Node js",
    "python",
  ];

  const handleCourses = (course, checked) => {
    let all = [...scourse];
    if (checked) {
      all.push(course);
    } else {
      all = all.filter((val) => val != course);
    }
    setScourse(all);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !password || !email || !date || !scourse || !status) {
      alert("Please fill all the fields");
      return false;
    }

    let obj = {
      id: Date.now(),
      name,
      email,
      password,
      scourse,
      date,
      status
    };

    let newobj = [...record, obj];
    localStorage.setItem("users", JSON.stringify(newobj));
    setRecord(newobj);
    alert("Data added successfully");
    naviget('/View')
    setName("");
    setEmail("");
    setPassword("");
    setScourse([]);
    setDate("");
    setStatus("");
  };

  return (
    <div className="py-5">
      <div className="container">
        <button className="btn btn-info text-white">
          <Link className="text-decoration-none text-dark" to={"/View"}>
            View
          </Link>
        </button>
        <form
          className="bg-light col-9 mx-auto border rounded p-5"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-dark">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Full Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label text-dark">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-dark">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label d-block text-dark">
              Courses
            </label>
            {courses.map((course) => {
              return (
                <div class="form-check d-inline-block me-3" key={course.id}>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    onChange={(e) => handleCourses(course, e.target.checked)}

                  />
                  <label class="form-check-label text-dark" for="flexCheckDefault">
                    {course}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label text-dark">
              Date
            </label>
            <input
              type="date"
              className="form-control"
              aria-describedby="emailHelp"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label text-dark">
              Status
            </label>
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option>---select-Status---</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
