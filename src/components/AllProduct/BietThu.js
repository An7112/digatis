import { CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/Main.css'
import { Link } from 'react-router-dom'
export default function BietThu(props) {
    const { onAdd } = props;
    let DataFil = props.DataFil.filter((ele) => {
        return ele.title.toLowerCase().includes(props.search.toLowerCase()) && ele.type.value === "bietthu"
    })
    return (
        <div class="row">
            {DataFil.map((ele, index) => (
                <div class="column" key={index}>
                    <CCard >
                        <CCardImage orientation="top" src={ele.avatar} />
                        <div className='typeItem'>
                            <h5>{ele.type.name}</h5>
                        </div>
                        <i class='bx bx-heart' onClick={() => onAdd(ele)}></i>
                            <CCardBody>
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
        </div>
    )
}
