import React,{useState,setState,useEffect,useRef} from 'react';
import './Cart.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc,deleteDoc } from "firebase/firestore"; 
import {db,logout} from "../firebase";
import { useNavigate } from "react-router-dom";
const seedrandom = require('seedrandom');

export default function Cart() {
    let navigate = useNavigate(); 
    const [orderDetails,setOrderDetails] = useState([])
    const [total,setTotal] = useState(0)
    const userid = useRef(0)
    useEffect(()=>{
        const getData = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if(user!==null){
            const uid = user.uid;
            userid.current = uid;
            const generator = seedrandom(`${uid}`);
            const orderId = Math.abs(generator.int32());
            const docRef = doc(db, "orderDetails", orderId.toString());
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                let docData = docSnap.data();
                setOrderDetails(docData.orders);
            }
            console.log(orderDetails);
        for (let i = 0; i < orderDetails.length; i++) {
            setTotal(total+orderDetails[i].amount);
      }
      return setTotal(total)
        }
        
    }
    getData();
    }, [])
    
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
            }
            logout1();
            navigate('/');
        }
        function ClickLogo() {
            let path = `/`;
            navigate(path);
          }
  return (
    <>
            <div className='b1-upper'>
                <h1 className="b1-logo" onClick={ClickLogo}>Wave Delivery</h1>
                <button className='logout1' onClick={handleLogout}>Logout</button>
                <button className='Gtc'>Go to cart</button>
            </div>
        <div className="d-flex justify-content-center ctable">
<table className="table table-striped w-75">
    <thead>
      <tr>
        <th>Order Id: {Math.abs(seedrandom(userid).int32())}</th>
      </tr>
      <tr>
        <th scope="col" colSpan={3}>Name</th>
        <th scope="col" colSpan={3}>Quantity</th>
        <th scope="col" colSpan={3}>Amount</th>
      </tr>
    </thead>
    <tbody>
        {orderDetails.map(task => {
            return (
              <tr>
                <td colSpan={3}>{task.product}</td>
                <td colSpan={3}>{task.quantity}</td>
                <td colSpan={3}>{task.amount}</td>
              </tr>
            );
          })}
        <tr>
        <td colSpan={3}>{total}</td>
        </tr>
    </tbody>
  </table>
    </div>
    </>
  )
}
