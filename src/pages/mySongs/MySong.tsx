import React from 'react';
import Header from '../../components/header/Header';
import './index.css';
import { Carousel } from 'react-bootstrap';
import image2 from '../../images/01.png';
import image3 from '../../images/02.png';
import image4 from '../../images/Captura de tela 2023-05-15 201212.png';

function MySong() {
    return (
        <>
            <Header />
            <div className="container-mysong">
                <div className="images">
                    <Carousel interval={null}>
                        <Carousel.Item>
                            <img
                                src={image2}
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                
                                src={image3}
                                alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                
                                src={image4}
                                alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </>
    );
}

export default MySong;
