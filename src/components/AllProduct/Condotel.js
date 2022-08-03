import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle } from '@coreui/react'
import '../styles/Main.css'
import { Link } from 'react-router-dom'
export default function Condotel(props) {
    let DataFil = props.DataFil.filter((ele) => {
        return ele.title.toLowerCase().includes(props.search.toLowerCase()) && ele.type.value === "condotel"
    })
    const { onAdd } = props;
    const [StateId, setStateId] = useState("")
    const Data = props.DataFil.filter((ele) => {
        return ele.id === StateId
    })

    const [NoneCheck, setNoneCheck] = useState("none")
    const [StateBan, setStateBan] = useState(false)
    setTimeout(() => {
        setStateBan(!StateBan);
    }, 5000)
    return (
        <div class="row">
            {DataFil.map((ele, index) => (
                <div class="column" key={index} onClick={(e) => setStateId(ele.id)}>
                    <CCard >
                        <CCardImage orientation="top" src={ele.avatar} />
                        <div className='typeItem'>
                            <h5>{ele.type.name}</h5>
                        </div>
                        <i class='bx bx-heart' onClick={() => onAdd(ele)}></i>
                        <CCardBody onClick={() => setNoneCheck("")}>
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
