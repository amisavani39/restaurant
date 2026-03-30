import React, { useRef } from "react";
import Slider from "react-slick";

const TestimonialSection = () => {
  const sliderRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      name: "Mike Hamell",
      role: "magna aliqua",
      img: "https://i.pravatar.cc/100?img=12"
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      name: "Moana Michell",
      role: "magna aliqua",
      img: "https://i.pravatar.cc/100?img=32"
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      name: "John Doe",
      role: "magna aliqua",
      img: "https://i.pravatar.cc/100?img=5"
    },
    {
      id: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      name: "Jane Smith",
      role: "magna aliqua",
      img: "https://i.pravatar.cc/100?img=15"
    }
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section className="testimonial-section">
      <div className="container">
        <h2 className="testimonial-title">What Says Our Customers</h2>

        <div className="testimonial-slider-wrapper">
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-slide">
                <div className="testimonial-card">
                  <div className="testimonial-detail-box">
                    <p>{testimonial.text}</p>
                    <h3>{testimonial.name}</h3>
                    <span>{testimonial.role}</span>
                  </div>
                  <div className="testimonial-img-box">
                    <div className="testimonial-img-wrapper">
                      <img src={testimonial.img} alt={testimonial.name} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Slider Controls */}
        <div className="testimonial-arrows">
          <button 
            aria-label="Previous Testimonial" 
            onClick={() => sliderRef.current.slickPrev()}
          >
            <i className="fa fa-angle-left"></i>
          </button>
          <button 
            aria-label="Next Testimonial" 
            onClick={() => sliderRef.current.slickNext()}
          >
            <i className="fa fa-angle-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
