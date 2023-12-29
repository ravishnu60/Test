import React, { useState } from 'react';
import '../Style/style.css';
import axios from 'axios';

function MainPage() {
  const [name, setName] = useState();
  const [show, setShow] = useState();
  const [data, setData] = useState({ name: '', age: 0, work: '' })

  const getData = () => {
    let query = `SELECT * WHERE {
          <http://factory/${name}> ?key ?value .
      }`;
    let url = `http://localhost:7400/repositories/Sample?query=${encodeURI(query)}`;
    axios({
      method: 'GET',
      url: url
    }).then((response) => {
      console.log(response.data);
      setShow(response.data);
    }).catch((err) => { console.log(err) });

  }
  const postData = () => {
    if (!data.name || !data.age || !data.work){
      return;
    }
    let query = `PREFIX%20factory%3A%20%3Chttp%3A%2F%2Ffactory%2F%3E%20PREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%20INSERT%20DATA%20%7B%20%20%20%20%20factory%3A1%20rdf%3Atype%20factory%3AFactory%20.%20%20%20%20%20factory%3A${data.name}%20%3Chttp%3A%2F%2Ffactory%2FhasAge%3E%20${data.age}%20%3B%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Chttp%3A%2F%2Ffactory%2FworksIn%3E%20'${data.work}'%20.%20%7D`;
      console.log(query);
    let url = `http://localhost:7400/repositories/Sample/statements?update=${query}`;
    axios({
      method: 'POST',
      url: url
    }).then((response) => {
      console.log(response.data)
      alert("Added")
    }).catch((err) => { console.log(err) });

  }
  return (
    <div>
      <div className='container-fluid p-2 fixed-top' style={{ backgroundColor: '#00b4d8' }}>
        <h4 className='text-center'>GraphDB</h4>
      </div>
      <div className='container-fluid'>
        <div className='mt-5'>
          <label className='mt-2 font-weight-bold'>Enter Name to get data</label>
          <div className='input-group w-25 '>
            <input className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
            <button className='btn btn-success' onClick={getData}>Get Data</button>
          </div>
          {
            show?.results?.bindings?.map((data) => (
              <div>
                <div><span className='font-weight-bold'>{data?.key?.value} : </span> {data?.value?.value} </div>
              </div>
            ))
          }

          <div className='mt-5'>
            <label className='font-weight-bold'>Add new Entry</label>
            <div className='w-25'>
              <label>Name</label>
              <input className='form-control' value={data.name} onChange={(e) => setData(pre=>({...pre,name:e.target.value}))} />

              <label>Age</label>
              <input className='form-control' value={data.age} onChange={(e) => setData(pre=>({...pre,age:e.target.value}))} />

              <label>Work</label>
              <input className='form-control' value={data.work} onChange={(e) => setData(pre=>({...pre,work:e.target.value}))} />

            </div>
            <button className='btn btn-primary mt-2' onClick={postData}>Post Data</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default MainPage