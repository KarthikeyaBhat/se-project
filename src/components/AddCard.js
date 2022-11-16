import React,{useState,setState,useEffect,useRef} from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc,deleteDoc, updateDoc } from "firebase/firestore"; 
import {db,logout} from "../firebase";
import { toast } from 'react-toastify';
import { useNavigate,useParams,Link, Navigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddCardIcon from '@mui/icons-material/AddCard';
export default function AddCard() {
  let navigate = useNavigate(); 
  const [cardno,setCardno] = useState(0);
  const [cardname,setCardname] = useState("")
  const [exp,setExp] = useState("");
  const [cvv,setCvv] = useState(0);
  const {id} = useParams()
  const handleClick = async ()=>{
      const auth = getAuth();
      const user = auth.currentUser;
      if(user!==null){
      const uid = user.uid;
      const docRef = doc(db, "PaymentDetails", id.toString());
      const docSnap = await getDoc(docRef);
      if (docSnap) {
        setDoc(doc(db, "PaymentDetails", id.toString()), {
          orderID: id,
          cardno: cardno,
          cardname: cardname,
          exp: exp,
          cvv: cvv,
          uid: uid
        });
      }
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
    navigate('/chomepage')
    }
  }
  return (
  <div class="container my-5 py-5 bg-white">
    <div class="row d-flex justify-content-center py-5">
      <div class="col-md-7 col-lg-5 col-xl-5">
        <div class="card" style={{borderRadius: "15px"}}>
          <div class="card-body p-4">
            <form>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="form-outline">
                  <input type="text" id="typeText" class="form-control form-control-lg" size="12"
                    placeholder="Card Number" pattern='[1-9]{1}[0-9]{11}' value={cardno} onChange={(e)=>setCardno(e.target.value)} required/>
                </div>
                <AddCardIcon fontSize="large"/>
              </div>

              <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="form-outline">
                  <input type="text" id="typeName" class="form-control form-control-lg" size="20"
                    placeholder="Cardholder's Name" value={cardname} onChange={(e)=>setCardname(e.target.value)} required />
                </div>
              </div>

              <div class="d-flex justify-content-between align-items-center pb-2">
                <div class="form-outline">
                  <input type="text" id="typeExp" class="form-control form-control-lg" placeholder="MM/YYYY"
                    pattern='^((0[1-9])|(1[0-2]))\/(\d{4})$' value={exp} onChange={(e)=>setExp(e.target.value)} />
                  <label class="form-label" for="typeExp">Expiration</label>
                </div>
                <div class="form-outline">
                  <input type="password" id="typeText2" class="form-control form-control-lg"
                    placeholder="CVV;" pattern='[0-9]{3}' value={cvv} onChange={(e)=>setCvv(e.target.value)} required/>
                  <label class="form-label" for="typeText2">Cvv</label>
                </div>
                <button type="button" class="btn btn-info btn-sm btn-rounded" onClick={handleClick}>
                  <ArrowForwardIcon />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
