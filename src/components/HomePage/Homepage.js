
import React, { useEffect, useMemo, useState } from 'react'
import '../styles/Main.css'
import images from '../../images'
import AllProduct from '../AllProduct/AllProduct'
import ChungCu from '../AllProduct/ChungCu'
import BietThu from '../AllProduct/BietThu'
import Shophouse from '../AllProduct/Shophouse'
import Condotel from '../AllProduct/Condotel'
import axios from 'axios'
export default function Homepage() {
    const [ClickBut, SetClickBut] = useState("All")
    const [Cfil, setCfil] = useState("")
    const [Sfil, setSfil] = useState("")
    const [search, setSearch] = useState("")
    const handleChange = event => {
        setCfil(event.target.value);
    };
    const handleChangeST = event => {
        setSfil(event.target.value);
    };
    const [DataFil, setDataFil] = useState([]);
    let DataFill;
    const [myData, setMyData] = useState([])
    const getData = async () => {
        const response = await fetch("http://localhost:3333/data");
        response
            .json()
            .then(response => setMyData(response))
            .catch(error => console.log(error));
    }
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        setDataFil(myData)
    }, [])
    if (!Cfil && !Sfil) {
        DataFill = myData.filter((ele) => {
            return ele
        })
    } else if (Cfil && !Sfil) {
        DataFill = myData.filter((ele) => {
            return ele.city === Cfil
        })
    } else if (!Cfil && Sfil === "1") {
        DataFill = myData.filter((ele) => {
            return ele.area < 30
        })
    } else if (Cfil && Sfil === "1") {
        DataFill = myData.filter((ele) => {
            return ele.area < 30 && ele.city === Cfil
        })
    } else if (Cfil && Sfil === "2") {
        DataFill = myData.filter((ele) => {
            return ele.area >= 30 && ele.area <= 45 && ele.city === Cfil
        })
    } else if (Cfil && Sfil === "3") {
        DataFill = myData.filter((ele) => {
            return ele.area >= 45 && ele.area <= 60 && ele.city === Cfil
        })
    } else if (Cfil && Sfil === "4") {
        DataFill = myData.filter((ele) => {
            return ele.area > 60 && ele.city === Cfil
        })
    } else if (!Cfil && Sfil === "2") {
        DataFill = myData.filter((ele) => {
            return ele.area >= 30 && ele.area <= 45
        })
    } else if (!Cfil && Sfil === "3") {
        DataFill = myData.filter((ele) => {
            return ele.area >= 45 && ele.area <= 60
        })
    } else if (!Cfil && Sfil === "4") {
        DataFill = myData.filter((ele) => {
            return ele.area > 60
        })
    }
    const [none, setNone] = useState("none")
    const [check, setCheck] = useState(false)
    const [activeSearch, setactiveSearch] = useState(false)
    const [cartItems, setCartItems] = useState([]);
    const onAdd = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x.id === product.id ? { ...exist, qty: exist.qty } : x
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
    };
    const onRemove = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist.qty !== 0) {
            setCartItems(cartItems.filter((x) => x.id !== product.id));
        }
    };
    console.log(activeSearch)
    return (
        <div className='Home_page'>
            <div className='Header'>
                <div className='Logo_here'>
                    <img src={images.Logo} alt="" />
                    <h3>Ditagis Rent</h3>
                </div>

                <div className='Love_page' onClick={() => setNone("")}>
                    <i class='bx bxs-heart'></i>
                    <h3>Ưa thích</h3>
                </div>
            </div>
            <div id='overlay' style={{ display: none }}>
                <div id='cart__modal'>
                    <div className='cart'>
                        <div className='cart__head'>
                            <p className='cart__head-title'>Liked</p>
                            <h5 className='close__btn' onClick={() => setNone("none")}>
                                X
                            </h5>
                        </div>
                        <div className='cart__list'>
                            <div class="row">
                                {cartItems.map((element, index) => (
                                    <div className='column'>
                                        <div className='item_cart' key={element.id}>
                                            <img src={element.avatar} alt="" />
                                            <h5>{element.title}</h5>
                                            <h5>{element.area}</h5>
                                            <button onClick={() => onRemove(element)}>delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='Page_Poster'>
                <img src={images.BgHero} />
                <h3>Sàn giao dịch bất động sản</h3>
                <div className='Box_Filter'>
                    <div className='City'>
                        <h5>Tỉnh</h5>
                        <select class="form-select" aria-label="Default select example" onChange={handleChange}>
                            <option selected value="">Chọn tỉnh</option>
                            <option value="danang" >Đà Nẵng</option>
                            <option value="hanoi" >Hà Nội</option>
                            <option value="hochiminh" >Hồ Chí Minh</option>
                        </select>
                    </div>
                    <div className='City'>
                        <h5>Diện tích</h5>
                        <select class="form-select" aria-label="Default select example" onChange={handleChangeST}>
                            <option className='selected' value="" selected>Chọn diện tích</option>
                            <option value="1">{"< 30 m2"}</option>
                            <option value="2">{"30 - 45 m2"}</option>
                            <option value="3">{"45 - 60 m2"}</option>
                            <option value="4">{"> 60 m2"}</option>
                        </select>
                    </div>
                    <div className={activeSearch === true ? "City search active" : "City search"}>
                        <i class='bx bx-search-alt-2' onClick={() => setactiveSearch(!activeSearch)}></i>
                        <input placeholder='Search ...' onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className='Product_Page'>
                <div className='Header_Product_Page'>
                    <h1>Sản Phẩm</h1>
                    <div className='Box_fill'>
                        <div className={ClickBut === "All" ? "Fill_Product active" : "Fill_Product"} onClick={() => SetClickBut("All")}>
                            <h5>Tất cả</h5>
                        </div>
                        <div className={ClickBut === "CC" ? "Fil_Product active" : "Fil_Product"} onClick={() => SetClickBut("CC")}>
                            <h5> Chung cư</h5>
                        </div>
                        <div className={ClickBut === "BT" ? "Fil_Product active" : "Fil_Product"} onClick={() => SetClickBut("BT")}>
                            <h5>Biệt thự</h5>
                        </div>
                        <div className={ClickBut === "SH" ? "Fil_Product active" : "Fil_Product"} onClick={() => SetClickBut("SH")}>
                            <h5>Shophouse</h5>
                        </div>
                        <div className={ClickBut === "CD" ? "Fil_Product active" : "Fil_Product"} onClick={() => SetClickBut("CD")}>
                            <h5>Condotel</h5>
                        </div>
                    </div>
                </div>
                <div className='Products'>
                    {ClickBut === "All" && <AllProduct DataFil={DataFill} search={search} onAdd={onAdd} cartItems={cartItems}/>}
                    {ClickBut === "CC" && <ChungCu DataFil={DataFill} search={search} onAdd={onAdd} />}
                    {ClickBut === "BT" && <BietThu DataFil={DataFill} search={search} onAdd={onAdd} />}
                    {ClickBut === "SH" && <Shophouse DataFil={DataFill} search={search} onAdd={onAdd}/>}
                    {ClickBut === "CD" && <Condotel DataFil={DataFill} search={search} onAdd={onAdd}/>}
                </div>
            </div>
        </div>
    )
}
