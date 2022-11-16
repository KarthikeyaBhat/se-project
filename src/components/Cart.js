import React,{useState,setState,useEffect,useRef} from 'react';
import './Cart.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc,deleteDoc } from "firebase/firestore"; 
import {db,logout} from "../firebase";
import { useNavigate,useParams,Link } from "react-router-dom";
const seedrandom = require('seedrandom');

export default function Cart() {
    let navigate = useNavigate(); 
    const [orderDetails,setOrderDetails] = useState([])
    const [name,setName] = useState(' ')
    const {id} = useParams()

    useEffect(()=>{
      const docData2 = window.localStorage.getItem("docData");
      setOrderDetails(JSON.parse(docData2))
    },[])

    useEffect(()=>{
      const getData = async ()=>{
      const auth = await getAuth();
    const user = auth.currentUser
        if(user!==null){
            const docRef = doc(db, "orderDetails", id.toString());
            const docSnap = await getDoc(docRef);
            if (docSnap &&docSnap.exists()) {
                let docData = docSnap.data();
                window.localStorage.setItem("docData",JSON.stringify(docData))
            }
        }
      }
      getData();
    }, [orderDetails,id])
    
    const handleLogout = async () =>{
      let logout1 = logout;
      const auth = getAuth();
      const user = auth.currentUser;
      if(user!==null){
          const uid = user.uid;
          const generator = seedrandom(`${uid}`);
          const orderId = Math.abs(generator.int32());
          console.log(orderId);
          await deleteDoc(doc(db, "orderDetails", orderId.toString()));
          window.localStorage.removeItem("docData");

      }
      logout1();
      navigate('/');
  }
        function ClickLogo() {
            let path = `/`;
            navigate(path);
          }
    const handlePayment = ()=>{
      window.localStorage.removeItem("docData");
      navigate(`/payments/${id}`)
    }
  return (
    <>
            <div className='b1-upper'>
                <h1 className="b1-logo" onClick={ClickLogo}>Wave Delivery</h1>
                <button className='logout1' onClick={handleLogout}>Logout</button>
            </div>
        <div className="d-flex justify-content-center ctable">
<table className="table table-striped w-75 table-bordered">
    <thead>
      <tr style={{backgroundColor: "darkorange"}}>
        <th colSpan={9}>Order Id: {id}</th>
      </tr>
      <tr>
        <th scope="col" colSpan={3}>Name</th>
        <th scope="col" colSpan={3}>Quantity</th>
        <th scope="col" colSpan={3}>Amount</th>
      </tr>
    </thead>
    <tbody>
        {orderDetails["orders"] && orderDetails["orders"].map(task => {
            return (
              <tr>
                <td colSpan={3}>{task.product}</td>
                <td colSpan={3}>{task.quantity}</td>
                <td colSpan={3}>Rs. {task.amount}</td>
              </tr>
            );
          })}
        <tr className="bg-dark text-white">
        <td colSpan={6}>Total</td>
        <td colSpan={3}>Rs. {orderDetails["total"]}</td>
        </tr>
        
    </tbody>
  </table>
  <Link to={`/chomepage`}>
  <button className='ca-Gtc'>Add more items</button>
  </Link>
  <button className='ca-Gtp bg-success' onClick={handlePayment}>Make payment</button>
  
    </div>
    </>
  )
}
