import React, { useEffect, useRef } from "react";
import "./AutoScrollingOffers.css"; // custom styles for animation

const offers = [
  {
    category: "Home Decor",
    details:
      "Shop for <span class='highlight'>2500/-</span> above & Get <span class='highlight'>500 OFF</span>",
  },
  {
    category: "Home Utilities",
    details:
      "Shop for <span class='highlight'>5000/-</span> above & Get <span class='highlight'>1000 OFF</span>",
  },
  {
    category: "Furnishings",
    details:
      "<span class='highlight'>FLAT 10% OFF</span> ON bill value <span class='highlight'>1000 & Above</span>",
  },
  {
    category: "FURNITURE",
    details:
      "On Shopping of Above <span class='highlight'>25000/-</span> Get <span class='highlight'>FLAT 10% off</span>",
  },
  {
    category: "FURNITURE",
    details:
      "On Shopping of Above <span class='highlight'>50000/-</span> Get <span class='highlight'>3 Jar Mixer Grinder Free</span>",
  },
  {
    category: "Electronics",
    details:
      "Buy any TV & Get <span class='highlight'>Sound Bar Free</span><br>Buy any Mobiles & Get <span class='highlight'>TWS Buds Free</span><br>Buy Laptop & Get <span class='highlight'>Temperature Bottle Free</span>",
  },
  {
    category: "Appliances",
    details:
      "Shop Any Kitchen Appliances <span class='highlight'>FLAT 10%</span><br>Shop Any Home Appliances get <span class='highlight'>Water Heater Free</span>",
  },
  {
    category: "Mattresses",
    details:
      "Buy Any Mattress & Get <span class='highlight'>Double Bed sheets & Pillow, Pillow Covers Free</span>",
  },
];

const AutoScrollingOffers = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      // Duplicate offers 5 times
      for (let i = 0; i < 5; i++) {
        offers.forEach((offer) => {
          const item = document.createElement("div");
          item.className = "offer-item";
          item.innerHTML = `
            <div class="category">${offer.category}</div>
            <div class="details">${offer.details}</div>
          `;
          scrollRef.current.appendChild(item);
        });
      }
    }
  }, []);

  return (
    <div className="offers-container">
      <div className="offers-scroll" ref={scrollRef}></div>
    </div>
  );
};

export default AutoScrollingOffers;
