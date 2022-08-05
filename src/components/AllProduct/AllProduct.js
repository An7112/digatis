import { CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle } from '@coreui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../styles/Main.css'
import cn from "classnames";
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
export default function AllProduct(props) {
    const { DataFil, cartItems, onAdd, search} = props;
    let DataFill = DataFil.filter((ele) => {
        return ele.title.toLowerCase().includes(search.toLowerCase())
    })

    const [StateId, setStateId] = useState("")
    const Data = DataFil.filter((ele) => {
        return ele.id === StateId
    })
    const [NoneCheck, setNoneCheck] = useState("none")
    const [StateBan, setStateBan] = useState(false)
    setTimeout(() => {
        setStateBan(!StateBan);
    }, 5000)
    const [AddUn, setAddUn] = useState()
    const callbackFunction = (childData) => {
        setAddUn(childData)
      }
    return (
        <div class="row">
            {DataFill && DataFill.map((ele, index) => (
                <div class="column" key={ele.id} onClick={(e) => setStateId(ele.id)}>
                    <CCard>
                        <CCardImage orientation="top" src={ele.avatar} />
                        <div className='typeItem'>
                            <h5>{ele.type.name}</h5>
                        </div>
                        <div className='iconlike' onClick={() => {if(AddUn === false) {
                            return onAdd(ele)
                        }}} ><LikeButton parentCallback={callbackFunction}/></div>
                        <CCardBody onClick={() => setNoneCheck("")}  >
                            <CCardTitle>{ele.title}</CCardTitle>
                            <CCardText>
                                {ele.address}
                            </CCardText>
                            <CCardText>
                                <p>Giá từ:</p> <span>{ele.price.from} - {ele.price.to} tỷ</span>
                            </CCardText>
                        </CCardBody>
                    </CCard>
                </div>
            ))}
            {Data.map((ele) => (
                <div id='overlay2' style={{ display: NoneCheck }}>
                    <div id='cart__modal2'>
                        <div className='cart'>
                            <div className='cart__head'>
                                <p className='cart__head-title'>Detail</p>
                                <p className='cart__head-title'>{ele.title}</p>
                                <h5 className='close__btn' onClick={() => setNoneCheck("none")}>
                                    X
                                </h5>
                            </div>
                            <div className='cart__list'>
                                <div className='box_image_detail'>
                                    <img src={StateBan === true ? ele.images[0] : ele.images[1]} alt="" />
                                    <div className='box_content'>
                                        <h5>{ele.description}</h5>
                                    </div>
                                    <div className='box_content address'>
                                        <i class='bx bx-map-alt'></i>
                                        <h5>{ele.address}</h5>
                                    </div>
                                    <div className='box_content area'>
                                        <i class='bx bx-cube'></i>
                                        <h5>{ele.area} m2</h5>
                                    </div>
                                    <div className='box_content price'>
                                        <i class='bx bx-dollar-circle' ></i>
                                        <h5>{ele.price.from} tỷ - {ele.price.to} tỷ</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
