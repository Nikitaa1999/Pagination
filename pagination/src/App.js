import React, {useState, useEffect} from 'react'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'; 
import Pagination from 'react-bootstrap/Pagination'; 
  


function App() {

  
  


  const[user, setUser]=useState([]);
  const[currentPage,setCurrentPage]=useState(1);
  const recordPerPage=10;
  const lastIndex = currentPage*recordPerPage;
  const firstIndex=lastIndex-recordPerPage;

  const records= user.slice(firstIndex,lastIndex);
  const npage=Math.ceil(user.length / recordPerPage);
  const numbers=[...Array(npage+1).keys()].slice(1);

  const API_URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  useEffect(() => {
    const fetchData = async () => {
      try {
      const response = await axios.get(API_URL);
      setUser(response.data);
      } catch (err) {
        console.log(err);
        alert("Failed to fetch data")
      }
     // console.log("User=>",user)
    };
    fetchData();
  }, []);

  const prePage =() =>{
      if(currentPage!== 1){
        setCurrentPage(currentPage-1)
      }
  }

  const changeCPage=(id)=>{
    setCurrentPage(id)
  }

  const nextPage=()=>{
    if(currentPage !== npage){
      setCurrentPage(currentPage+1);
    }
  }
  return (
    <div className="App">
   
      <div>
        <table>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>

        <tbody>
          {records.map((u)=>(
            <tr id={u.id}>
            <td>{u.id}</td>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
            </tr>
        )
        )}
        </tbody>
        </table>
        {/* <nav>
          <ul className='pagination'>
            <li className='pageItem'>
              <a href='#' className='page-link'
              onClick={prePage}>Prev</a>
            </li>

            {
              numbers.map((n,i)=>(
                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                  <a href='#' className='page-link' onClick={()=>changeCPage(n)}>{n}</a>
                </li>
              ))
            }

            <li className='pageItem'>
              <a href='#' className='page-link'
              onClick={nextPage}>Next</a>
            </li>

          </ul>
        </nav> */}

        <nav>
          <button onClick={prePage}>Previous</button>
          <button>{currentPage}</button>
          <button onClick={nextPage}>Next</button>
        </nav>
      </div>
   
      
    
    </div>
  );
}

export default App;
