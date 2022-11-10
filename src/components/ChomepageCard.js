import React,{useState,setState} from 'react';
import './ChomepageCard.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc,updateDoc } from "firebase/firestore"; 
import {db} from "../firebase";
const seedrandom = require('seedrandom');
const ChomepageCard = (props)=> {
    let {name,qty,img,price} = props;
    const [qtyOrdered,setQtyOrdered] = useState(1);
    /* onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        
        handleClick(uid)
      }
    }); */

    const handleClick = async ()=>{
        const auth = getAuth();
        const user = auth.currentUser;
        if(user!==null){
            const uid = user.uid;
            const generator = seedrandom(`${uid}`);
            const orderId = Math.abs(generator.int32());
            let amount = Number(qtyOrdered)*Number(price);
            console.log(amount)
            let productArr = [];
            productArr.push({product: {name},
                quantity: qtyOrdered,
                amount: amount})
            const docRef = doc(db, "orderDetails", orderId.toString());
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                let docData = docSnap.data();
                productArr = docData.orders;
                productArr.push(
                    {product: {name},
                    quantity: qtyOrdered,
                    amount: amount});
                updateDoc(doc(db, "orderDetails", orderId.toString()), {
                    orders: productArr,
                    user: uid
                  });
              

            } else {

                setDoc(doc(db, "orderDetails", orderId.toString()), {
                    orders: productArr,
                    user: uid
                  });
                console.log('Hi');
            }
        }
        
    }

    return(
        <div className='ic-outer'>
            <div className='ic-username'>
                <b>{name}</b><br/>
                {qty}
            </div>
            <div className='chCard-qt'>
              <input type="text" className="form__inputchc" placeholder='Qty' value={qtyOrdered} onChange={(e) => setQtyOrdered(Number(e.target.value))}/>
            </div>
            <div className='ic-inner'>
                <img className='ic-post' src={img} alt=""></img>
            </div>
            <div className='ic-footer'>
                <button className='chATC' onClick={handleClick}>Add to cart</button>
                <span className='chPrice'>Rs. {price}</span>
            </div>
        </div>
    )
}

export default ChomepageCard