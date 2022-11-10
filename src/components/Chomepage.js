import React, { useState, setState } from 'react'
import './Chomepage.css'
import CCard from './ChomepageCard.js'
import Products from '../sampleJSON/products.json'
import { useNavigate } from "react-router-dom";
import {Pagination,Navigation} from 'swiper';
import SwiperCore, { Keyboard, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import {logout,db} from '../firebase';
import { getAuth} from "firebase/auth";
import { doc, deleteDoc} from "firebase/firestore";
const seedrandom = require('seedrandom');
SwiperCore.use([Keyboard, Mousewheel]);
export default function Chomepage() {
    let navigate = useNavigate(); 
    let fruits = Products['fruits_and_vegetables'];
    console.log(fruits)
    let dairy = Products['dairy_products'];
    let sweets = Products['Chocolates_and_sweets'];
    let munchies = Products['Munchies'];
    /* const [query, setQuery] = useState("");
    function handleInputChange(e) {
        setQuery(e.target.value)
    } */
    function ClickLogo() {
        let path = `/`;
        navigate(path);
      }
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
    return (
        <>
            <div className='b1-upper'>
                <h1 className="b1-logo" onClick={ClickLogo}>Wave Delivery</h1>
                <button className='logout1' onClick={handleLogout}>Logout</button>
                <button className='Gtc'>Go to cart</button>
            </div>
            <p className="vi-p1">Fruits and vegetables</p>
            <div className="vi-rp">
                  <Swiper
                    modules={[Mousewheel,Keyboard,Pagination,Navigation]}
                    spaceBetween={10}
                    slidesPerView={6}
                    pagination={{ clickable: true }}
                    Mousewheel={{eventTarget:'.vi-rp'}}
                    Keyboard
                    direction='horizontal'
                    Navigation={true}
                    className='vi-rp2'
                    breakpoints={{
                        300: {
                          slidesPerView: 2,
                          spaceBetween: 20,
                        },
                        650: {
                          slidesPerView: 3,
                          spaceBetween: 40,
                        },
                        1024: {
                          slidesPerView: 5,
                          spaceBetween: 20,
                        },
                    }}>
                    {
                        fruits.map((element) => {
                            return <div className="vi-card" key={element.id}>
                                <SwiperSlide>
                                <CCard name={element.Name} qty={element.minQTY}  img={element.imgURL} price={element.price}/>
                                </SwiperSlide>
                            </div>
                        })
                    }
                  </Swiper>
        </div>
        <p className="vi-p2">Dairy products</p>
            <div className="vi-rpdp">
                  <Swiper
                    modules={[Mousewheel,Keyboard,Pagination,Navigation]}
                    spaceBetween={10}
                    slidesPerView={6}
                    pagination={{ clickable: true }}
                    Mousewheel={{eventTarget:'.vi-rpdp'}}
                    Keyboard
                    direction='horizontal'
                    Navigation={true}
                    className='vi-rp2dp'
                    breakpoints={{
                        300: {
                          slidesPerView: 2,
                          spaceBetween: 20,
                        },
                        650: {
                          slidesPerView: 3,
                          spaceBetween: 40,
                        },
                        1024: {
                          slidesPerView: 5,
                          spaceBetween: 20,
                        },
                    }}>
                    {
                        dairy.map((element) => {
                            return <div className="vi-card" key={element.id}>
                                <SwiperSlide>
                                <CCard name={element.Name} qty={element.minQTY}  img={element.imgURL} price={element.price}/>
                                </SwiperSlide>
                            </div>
                        })
                    }
                  </Swiper>
        </div>
        <p className="vi-p3">Chocolates and sweets</p>
            <div className="vi-rpcs">
                  <Swiper
                    modules={[Mousewheel,Keyboard,Pagination,Navigation]}
                    spaceBetween={10}
                    slidesPerView={6}
                    pagination={{ clickable: true }}
                    Mousewheel={{eventTarget:'.vi-rpcs'}}
                    Keyboard
                    direction='horizontal'
                    Navigation={true}
                    className='vi-rp2cs'
                    breakpoints={{
                        300: {
                          slidesPerView: 2,
                          spaceBetween: 20,
                        },
                        650: {
                          slidesPerView: 3,
                          spaceBetween: 40,
                        },
                        1024: {
                          slidesPerView: 5,
                          spaceBetween: 20,
                        },
                    }}>
                    {
                        sweets.map((element) => {
                            return <div className="vi-card" key={element.id}>
                                <SwiperSlide>
                                <CCard name={element.Name} qty={element.minQTY}  img={element.imgURL} price={element.price}/>
                                </SwiperSlide>
                            </div>
                        })
                    }
                  </Swiper>
        </div>
        <p className="vi-p4">Munchies</p>
            <div className="vi-rpm">
                  <Swiper
                    modules={[Mousewheel,Keyboard,Pagination,Navigation]}
                    spaceBetween={10}
                    slidesPerView={6}
                    pagination={{ clickable: true }}
                    Mousewheel={{eventTarget:'.vi-rpm'}}
                    Keyboard
                    direction='horizontal'
                    Navigation={true}
                    className='vi-rp2m'
                    breakpoints={{
                        300: {
                          slidesPerView: 2,
                          spaceBetween: 20,
                        },
                        650: {
                          slidesPerView: 3,
                          spaceBetween: 40,
                        },
                        1024: {
                          slidesPerView: 5,
                          spaceBetween: 20,
                        },
                    }}>
                    {
                        munchies.map((element) => {
                            return <div className="vi-card" key={element.id}>
                                <SwiperSlide>
                                <CCard name={element.Name} qty={element.minQTY}  img={element.imgURL} price={element.price}/>
                                </SwiperSlide>
                            </div>
                        })
                    }
                  </Swiper>
        </div>
        </>
    )
}