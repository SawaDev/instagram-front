import './stories.css'
import { CgClose } from "react-icons/cg"
import { AiFillLeftCircle, AiFillRightCircle, AiOutlineHeart } from "react-icons/ai"
import { BsFillVolumeUpFill, BsFillPlayFill, BsThreeDots } from "react-icons/bs"
import { IoIosPaperPlane } from "react-icons/io"
import { BiVolumeMute } from "react-icons/bi"
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper";
import { dummyData } from "./data"
export default function Stories() {
  const swiper = useSwiper();

  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={60}
      centeredSlides={true}
      grabCursor={true}
      navigation={true}
      autoplay={{ delay: 10000 }}
      modules={[Navigation, Autoplay]}
    >
      {dummyData.map((item) => (

        <SwiperSlide>
          {({ isActive }) => isActive ? (
            <>
              {/* <Swiper>
                <SwiperSlide> */}
              {/* <AiFillLeftCircle className="prev-el" onClick={() => swiper.slidePrev()} /> */}
              <div className="active-slide_wrapper">
                <img className="slide-cover_image" src={item.img} />
                <div className="test__header">
                  <div className="test__header-line"></div>
                  <div className="test__header-content">
                    <div className="test__header-content_left">
                      <img src={item.profilePic} />
                      <a className="test__header-content_left-username" href="#">
                        {item.username}
                      </a>
                      <span className="test__header-content_left-time">10h</span>
                    </div>
                    <div className="test__header-content_right">
                      <BsFillPlayFill className="test__header-content_icon" />
                      <BsFillVolumeUpFill className="test__header-content_icon" />
                      <BsThreeDots className="test__header-content_icon" />
                    </div>
                  </div>
                </div>
                <div className="test__footer">
                  <div className="test__footer-wrapper">
                    <div className="test__footer-input_box">
                      <textarea placeholder="Reply to username" spellCheck="false" />
                    </div>
                    <AiOutlineHeart className="test__footer-icon" />
                    <IoIosPaperPlane className="test__footer-icon" />
                  </div>
                </div>
              </div>
              {/* <AiFillRightCircle className="next-el" /> */}
              {/* </SwiperSlide>
              </Swiper> */}
            </>
          ) : (
            <>
              <img className="slide-cover_image" src={item.img} />
              <div className="test__card-mini_content">
                <img className="test__card-mini_img" src={item.profilePic} />
                <span className="test__card-mini_username">{item.username}</span>
                <span className="test__card-mini_time">{item.timeago}</span>
              </div>
            </>
          )}

        </SwiperSlide>
      ))}

    </Swiper>
  )
}
