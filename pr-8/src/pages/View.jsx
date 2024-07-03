
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const View = () => {
  let navigate = useNavigate();
  let data = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [];
  const [record, setRecord] = useState(data);
  const [mdelete, setMdelete] = useState([]);
  const [mstatus, setMstatus] = useState([]);
  const [sort, setSort] = useState("")
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("");
  const [filter, setFilter] = useState([]);
  //delet single  record
  const RecordDel = (d) => {
    let del = record.filter((val) => val.id != d);
    setRecord(del);
    localStorage.setItem("users", JSON.stringify(del))
    alert("Record Deleted Successfully...");
  };
  //multiple delete
  const handlemuldel = (id, checked) => {
    let Mdel = [...mdelete]
    if (checked) {
      Mdel.push(id)
    } else {
      Mdel = Mdel.filter(val => val !== id)
    }
    setMdelete(Mdel);

  }

  //delet All

  const DeletAll = () => {
    if (mdelete.length > 0) {
      let del = record.filter((val) => !mdelete.includes(val.id));
      setRecord(del);
      localStorage.setItem("users", JSON.stringify(del))
      setMdelete([])

    } else {
      alert("Please Select Record to Delete");
    }
  }

  //mul status
  const handlemulstatus = (id, checked) => {
    let Multistatus = [...mstatus]
    if (checked) {
      Multistatus.push(id)
    } else {
      Multistatus = Multistatus.filter(val => val !== id)
    }
    setMstatus(Multistatus);


  }

  // UpdateAllStatus
  const UpdateAllStatus = () => {
    if (mstatus.length > 0) {
      let update = record.map((val) => {
        if (mstatus.includes(val.id)) {
          if (val.status === "Active") {
            val.status = "Inactive"
          } else {
            val.status = "Active"
          }
        }
        return val
      })
      setRecord(update);
      localStorage.setItem("users", JSON.stringify(update))
      setMstatus([])

    } else {
      alert("Please Select Record to Update Status");
    }
  }
//  selction status , sort , search
  useEffect(() => {
    let FilterData = [...record];
    if (status) {
      if (status === 'all') {
        setFilter(record);
      } else {

        FilterData = FilterData.filter((val) => val.status === status)
      }
    }

    if (sort) {
      if (sort === "asc") {
        FilterData.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sort === "dec") {
        FilterData.sort((a, b) => b.name.localeCompare(a.name));
      }
    }

    if (search) {
      FilterData = FilterData.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    setFilter(FilterData);

  }, [status, sort, search])

  return (
    <div className=" p-5">
      <button className="btn btn-info text-white mb-3">
        <Link className="text-dark text-decoration-none" to={"/"}>
          ADD
        </Link>
      </button>
      <div className="option w-100  d-flex mb-3">
        <div className="col-4 px-3">
          <select className='form-control border shadow' onChange={(e) => setStatus(e.target.value)} value={status}>
            <option value="">---select-status---</option>
            <option value="all">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="col-4 px-2">
          <select className='form-control border shadow' onChange={(e) => setSort(e.target.value)} value={sort}>
            <option value="">---Sorting---</option>
            <option value="aec">A-Z</option>
            <option value="dec">Z-A</option>
          </select>
        </div>
        <div className="col-4 px-2">
          <form>
            <input type="text" onChange={(e) => setSearch(e.target.value)} className='form-control border shadow' placeholder='search here' />
          </form>
        </div>
      </div>
      <table className="table shadow table-info text-center w-100 my-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Course</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
            <th scope="col">
              <button
                className="btn btn-danger text-dark btn-small"
                onClick={() => DeletAll()}>M Delet</button>
            </th>
            <th scope="col">
              <button
                className="btn btn-info text-dark btn-small"
                onClick={() => UpdateAllStatus()}
              >
                M Status Update
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            filter.map((val,i) => {
              const { id, name, email, password, scourse, date, status } = val;
              return (
                <tr key={id} >
                  <th scope="row">{++i}</th>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{password}</td>
                  <td>{scourse.join(" , ")}</td>
                  <td>{date}</td>
                  <td>{status}</td>
                  <td>
                    <button
                      className="bg-danger btn text-dark me-1"
                      onClick={() => RecordDel(id)}>Delete</button>
                    <button className="bg-success btn  text-dark" onClick={()=>navigate('/edit',{state : val})}  >Edit</button>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={mdelete.includes(id)}
                      onChange={(e) => handlemuldel(id, e.target.checked)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={mstatus.includes(id)}
                      onChange={(e) => handlemulstatus(id, e.target.checked)}
                    />
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  );
};

export default View;
