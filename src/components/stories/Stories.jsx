import "./stories.css"
import cover from "../../img/cover 1.png"
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

export default function Stories() {
  return (
    <div
      className="stories-wrapper"
    >
      <div className="stories-card">
        <div className="profile-pic">
          <img src={cover} alt="" />
        </div>
        <p className="username">username 1</p>
      </div><div className="stories-card">
        <div className="profile-pic">
          <img src={cover} alt="" />
        </div>
        <p className="username">username 1</p>
      </div><div className="stories-card">
        <div className="profile-pic">
          <img src={cover} alt="" />
        </div>
        <p className="username">username 1</p>
      </div><div className="stories-card">
        <div className="profile-pic">
          <img src={cover} alt="" />
        </div>
        <p className="username">username 1</p>
      </div><div className="stories-card">
        <div className="profile-pic">
          <img src={cover} alt="" />
        </div>
        <p className="username">username 1</p>
      </div><div className="stories-card">
        <div className="profile-pic">
          <img src={cover} alt="" />
        </div>
        <p className="username">username 6</p>
      </div><div className="stories-card">
        <div className="profile-pic">
          <img src={cover} alt="" />
        </div>
        <p className="username">username 1</p>
      </div><div className="stories-card">
        <div className="profile-pic">
          <img src={cover} alt="" />
        </div>
        <p className="username">username 1</p>
      </div><div className="stories-card">
        <div className="profile-pic">
          <img src={cover} alt="" />
        </div>
        <p className="username">username 9</p>
      </div><div className="stories-card">
        <div className="profile-pic">
          <img src={cover} alt="" />
        </div>
        <p className="username">username 1</p>
      </div><div className="stories-card">
        <div className="profile-pic">
          <img src={cover} alt="" />
        </div>
        <p className="username">username 1</p>
      </div><div className="stories-card">
        <div className="profile-pic">
          <img src={cover} alt="" />
        </div>
        <p className="username">username 12</p>
      </div><div className="stories-card">
        <div className="profile-pic">
          <img src={cover} alt="" />
        </div>
        <p className="username">username 1</p>
      </div><div className="stories-card">
        <div className="profile-pic">
          <img src={cover} alt="" />
        </div>
        <p className="username">username 1</p>
      </div><div className="stories-card">
        <div className="profile-pic">
          <img src={cover} alt="" />
        </div>
        <p className="username">username 1</p>
      </div><div className="stories-card">
        <div className="profile-pic">
          <img src={cover} alt="" />
        </div>
        <p className="username">username 1</p>
      </div><div className="stories-card">
        <div className="profile-pic">
          <img src={cover} alt="" />
        </div>
        <p className="username">username 1</p>
      </div>
      <div className="stories-card">
        <div className="profile-pic">
          <img src={cover} alt="" />
        </div>
        <p className="username">username 2</p>
      </div>

    </div>
  )
}