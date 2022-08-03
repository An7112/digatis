import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import images from './images'
function DetailPage() {
    const [myData, setMyData] = useState([])
    const { id } = useParams();
    const getData = async () => {
        const response = await fetch("http://localhost:4000/data/" + id);
        response
            .json()
            .then(response => setMyData(response))
            .catch(error => console.log(error));
    }
    useEffect(() => {
        getData();
    }, []);
    console.log(myData)
    return (
        <div className='Home_page'>
            <div className='Header'>
                <div className='Logo_here'>
                    <img src={images.Logo} alt="" />
                    <h3>Ditagis Rent</h3>
                </div>

                <div className='Love_page'>
                    <i class='bx bxs-heart'></i>
                    <h3>Ưa thích</h3>
                </div>

            </div>
            <div className='Product_Page'>
                <div className='box-img'>
                            <img src={images.Logo}/>
                            <span>{myData.title}</span>
                </div>
                <h5>{myData.address}</h5>
            </div >
        </div >
    )
}

export default DetailPage