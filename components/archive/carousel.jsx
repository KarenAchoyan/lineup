"use client";
import React, {useContext, useEffect, useRef, useState} from "react";
import {Carousel, Card} from "antd";
import "antd/dist/reset.css";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import {ArchiveContext} from "@/providers/ArchiveProvider";

const contentStyle = {
    height: "65px",
    color: "black",
    lineHeight: "100px",
    textAlign: "center",
    background: "#bbb",
    borderRadius: "20px",
    fontSize: "18px",
    fontWeight: "lighter",
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
};

const carouselContainerStyle = {
    padding: "10px",
    borderRadius: "15px",
    maxWidth: "400px",
    margin: "auto",
};

const CarouselComponent = ({changeYears}) => {
    const {years} = useContext(ArchiveContext);
    const carouselRef = useRef(null);
    const [year, setYear] = useState(years[0]);
    const nextSlide = () => {
        carouselRef.current.next();
    };

    useEffect(() => {
        changeYears(years[0])
    }, []);

    const prevSlide = () => {
        carouselRef.current.prev();
    };

    function handleSlideChange(currentSlide) {
        const data = years[currentSlide];
        setYear(data)
        changeYears(data)
    }

    return (
        <div >
            <div>
               <div className='py-[10px] '>
                  <div className='h-[320px] flex items-center overflow-hidden'>
                      <div className="h-[250px] flex items-center w-[500px]  m-auto ">
                          <div style={carouselContainerStyle}>
                              <Carousel ref={carouselRef} arrows={false} initialSlide={1} dotPosition="left" dots={false} infinite={false}
                                        afterChange={handleSlideChange}>
                                  {years.map((year, i) => (
                                      <div>
                                          <Card style={contentStyle} key={i}>{year.year}</Card>
                                      </div>
                                  ))}

                              </Carousel>
                          </div>
                          <div className='h-full flex flex-col justify-between w-[70px] items-center '>
                              <button
                                  onClick={prevSlide}
                                  className="bg-[#C7C7C7] text-white px-4 py-2  mx-2 w-[60px] h-[60px] rounded-full"
                              >
                                  <UpOutlined />
                              </button>
                              <button
                                  onClick={nextSlide}
                                  className="bg-[#C7C7C7] text-white px-4 py-2  mx-2 w-[60px] h-[60px] rounded-full"
                              >
                                  <DownOutlined />
                              </button>
                          </div>
                      </div>
                  </div>
               </div>
            </div>
        </div>
    );
};

export default CarouselComponent;
