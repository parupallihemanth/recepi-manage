import React, { useEffect } from "react";
import { Carousel, Button, CarouselItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import $ from "jquery";
import HeaderIcon from "../Images/headerIcon1.png";

const Home = () => {
  const carouselImages = [
    {
      photo:
        "https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      alt: "First slide",
    },
    {
      photo:
        "https://images.unsplash.com/photo-1601315379734-425a469078de?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80",
      alt: "Second slide",
    },
    {
      photo:
        "https://images.unsplash.com/photo-1518310532637-f5225f94f3c3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      alt: "Third slide",
    },
  ];

  useEffect(() => {
    $("Button").click(function () {
      $("h1").toggleClass("red");
    });
  }, []);
  return (
    <>
      <h4
        className='my-4'
        style={{ fontFamily: "fantasy", fontWeight: "bold" }}
      >
        Feel free to check our documentation{" "}
        <a href='https://documenter.getpostman.com/view/3837404/TVmQdvdC'>
          Here
        </a>
      </h4>
      <Carousel>
        {carouselImages.map((carouselImage, index) => (
          <Carousel.Item key={index}>
            <img
              src={carouselImage.photo}
              alt={carouselImage.alt}
              width='70%'
              height='70%'
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default Home;
