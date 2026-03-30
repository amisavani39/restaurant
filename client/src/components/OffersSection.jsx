import React from "react";

const OffersSection = () => {
  return (
    <section className="offers-section">
      <div className="container">
        <div className="offers-wrapper">
          <div className="offer-card">
            <div className="offer-img">
              <img src="/image/o1.jpg" alt="Thursday Offer" />
            </div>
            <div className="offer-detail">
              <h5>Tasty Thursdays</h5>
              <h3>20% <span>off</span></h3>
              <a href="#" className="btn-yellow">
                Order Now <i className="fa fa-shopping-cart"></i>
              </a>
            </div>
          </div>

          <div className="offer-card">
            <div className="offer-img">
              <img src="/image/o2.jpg" alt="Pizza Days" />
            </div>
            <div className="offer-detail">
              <h5>Pizza Days</h5>
              <h3>15% <span>off</span></h3>
              <a href="#" className="btn-yellow">
                Order Now <i className="fa fa-shopping-cart"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
