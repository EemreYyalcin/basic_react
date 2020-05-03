import React from "react";
import ReactPlayer from "react-player";
import {CarService} from "../../service/CarService";
import {Button} from "primereact/button";
import {Carousel} from "primereact/carousel";
import YoutubeV3 from "./YoutubeV3";
import YoutubePlayListV1 from "./YoutubePlayListV1";
import SelectPlaylistV1 from "./SelectPlaylistV1";

export const YoutubeV2 = () => {
    return (
        <div style={{height: "900px", width: "100%"}}>
            <div className="p-grid" style={{height: "100%", width: "100%"}}>
                <div className="p-col-6"  style={{padding:"0em"}}><YoutubeV3 index={0}/></div>
                <div className="p-col-6"  style={{padding:"0em"}}><YoutubeV3 index={1}/></div>
                <div className="p-col-6"  style={{padding:"0em"}}><YoutubeV3 index={2}/></div>
                <div className="p-col-6"  style={{padding:"0em"}}><YoutubeV3 index={3}/></div>
            </div>
        </div>

        // <div>
        //     <SelectPlaylistV1/>
        // </div>

    );
};


const carTemplate = (car)=>{
    return (
        <div className="car-details">
            <div className="p-grid p-nogutter">
                <div className="p-col-12">
                    <img src={`assets/demo/images/car/${car.brand}.png`} alt={car.brand}/>
                </div>
                <div className="p-col-12 car-data">
                    <div className="car-title">{car.brand}</div>
                    <div className="car-subtitle">{car.year} | {car.color}</div>

                    <div className="car-buttons">
                        <Button icon="pi pi-search" className="p-button-secondary"/>
                        <Button icon="pi pi-star" className="p-button-secondary"/>
                        <Button icon="pi pi-cog" className="p-button-secondary"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

const getVideoDetail = (url) => {

    let carservice = new CarService();
    const customHeader = <h2>Circular, AutoPlay, 3 Items per Page and Scroll by 1</h2>
    let responsiveSettings = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    let cars = [];
    cars = carservice.getCarsSmall();
    console.log(cars);
    return (<div style={{height: "100%"}}>
            <div className="p-grid" style={{height: "100%", width: "100%"}}>
                <div className="p-col-12">
                    <ReactPlayer
                        className='react-player'
                        width='100%'
                        height='100%'
                        url={url}
                        playing={true}
                        controls={false}
                        light={false}
                        loop={false}
                        muted={true}
                        onReady={() => console.log('onReady')}
                        onStart={() => console.log('onStart')}
                    />
                </div>
                <div className="p-col-12">
                    <div className="carousel-demo">
                        <div className="content-section introduction">
                            <div className="feature-intro">
                                <h1>Carousel</h1>
                                <p>Carousel is a content slider featuring various customization options.</p>
                            </div>
                        </div>

                        <div className="content-section implementation">
                            <Carousel value={cars} itemTemplate={carTemplate} numVisible={3} numScroll={1} className="custom-carousel"
                                      responsive={responsiveSettings} header={customHeader} circular={true} autoplayInterval={3000} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};