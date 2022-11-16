import React, { useState, setState,useEffect } from 'react';
import "./Login.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link,useNavigate,useParams } from 'react-router-dom';
import { deleteDoc, doc, getDoc,updateDoc } from "firebase/firestore"; 
import {db,logout} from "../firebase";
import { toast } from 'react-toastify';

export default function Payments() {
    const navigate = useNavigate();
    const [totalp,setTotalp] = useState(0);
    const [byCash,setByCash] = useState(false)
    const [byCard,setByCard] = useState(true)
    const {id} = useParams();
    function ClickLogo() {
        let path = `/`;
        navigate(path);
      }
    useEffect(()=>{
      const totali = window.localStorage.getItem("totalp");
      setTotalp(totali);
    },[])
    useEffect(()=>{
      const getTotal = async ()=>{
      const auth = await getAuth();
      const user = auth.currentUser
      if(user!==null){
      const docRef = doc(db, "orderDetails", id.toString());
      const docSnap = await getDoc(docRef);
      if (docSnap &&docSnap.exists()) {
          let docData = docSnap.data();
          let total = docData["total"];
          window.localStorage.setItem("totalp",JSON.stringify(total))
      }
    }
  }
    getTotal();
    },[id])
  const handleClick = ()=>{
    if(byCash){
      setByCard(false)
      updateDoc(doc(db, "orderDetails", id.toString()), {
        paymentMethod: "Cash"
      });
      toast.success('Order Placed Successfully ', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
      deleteDoc(doc(db, "orderDetails", id.toString()))
      navigate("/chomepage");
    }
    else{
      updateDoc(doc(db, "orderDetails", id.toString()), {
        paymentMethod: "Card"
      });
      navigate(`/add-card/${id}`);
    }
  }
  return (
    <>
    <div className='b1-upper'>
        <h1 className="b1-logo" onClick={ClickLogo}>Wave Delivery</h1>
    </div>
    <section style={{position:"absolute",top:"12%",left:"15%",right:"15%"}}>
  <div className="container py-5">
    <div className="card">
      <div className="card-body">
        <div className="row d-flex justify-content-center pb-5">
          <div className="col-md-7 col-xl-5 mb-4 mb-md-0">
            <div className="py-4 d-flex flex-row">
              <h5><b>OGDS</b> |</h5>
              <span className="ps-2">Pay</span>
            </div>
            <h4 className="text-success">Rs. {totalp}</h4>
              <form className="pb-3">
                <div className="d-flex flex-row pb-3">
                  <div className="rounded border d-flex w-100 p-3 align-items-center">
                    <p className="mb-0">
                      <i className="fa-lg text-primary pe-2"></i>Visa Debit
                      Card
                    </p>
                    <div className="ms-auto">************3456</div>
                  </div>
                </div>
                <div className="d-flex flex-row">
                  <div className="rounded border d-flex w-100 p-3 align-items-center">
                    <p className="mb-0">
                      <i className="fa-lg text-dark pe-2"></i>Mastercard
                      Office
                    </p>
                    <div className="ms-auto">************1038</div>
                  </div>
                </div>
                <div className="d-flex flex-row pt-3">
                  <div className="d-flex align-items-center pe-2">
                    <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel2"
                      value="" aria-label="..." onClick={(e)=>setByCash(~byCash)}/>
                  </div>
                  <div className="rounded border d-flex w-100 p-3 align-items-center">
                    <p className="mb-0">
                      <i className="fa-lg text-dark pe-2"></i>Pay by cash
                    </p>
                    <div className="ms-auto"></div>
                  </div>
                </div>
              </form>
              <input type="button" value="Proceed to payment" className="btn btn-primary btn-block btn-lg" onClick={handleClick} />
            </div>
          </div>

          <div className="col-md-5 col-xl-4 offset-xl-1">
            <div className="py-4 d-flex justify-content-end">
              <h6><a href="/chomepage">Cancel and return to website</a></h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</>
  )
}
