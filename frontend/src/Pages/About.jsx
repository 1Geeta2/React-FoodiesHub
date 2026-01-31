// ===== ABOUT.JSX - COMPLETE CODE WITH BOOTSTRAP ICONS =====
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const famousDishes = [
    {
      name: "Butter Chicken Bonanza",
      image: "/assets/img/chick.jpg",
      rating: "4.9",
      orders: "10K+",
      price: "₹349",
      description: "Our signature creamy butter chicken with secret spices",
      icon: "bi-egg-fried"
    },
    {
      name: "Margherita Supreme",
      image: "/assets/img/pizza.jpg",
      rating: "4.8",
      orders: "15K+",
      price: "₹299",
      description: "Wood-fired pizza with fresh mozzarella and basil",
      icon: "bi-circle-fill"
    },
    {
      name: "Biryani Delight",
      image: "/assets/img/Chicken Biryani.jpg",
      rating: "4.9",
      orders: "6K+",
      price: "₹399",
      description: "Authentic Hyderabadi biryani with tender meat",
      icon: "bi-bowl-hot-fill"
    },
    {
      name: "Chocolate Fudge Cake",
      image: "/frontend/assets/img/chocolate fudge cake.jpg",
      rating: "4.7",
      orders: "90K+",
      price: "₹249",
      description: "Rich, decadent chocolate cake with fudge frosting",
      icon: "bi-cake2-fill"
    }
  ];

  const locations = [
    {
      area: "Mumbai Central",
      restaurants: "50",
      icon: "bi-buildings-fill",
      specialty: "Street Food & Fine Dining"
    },
    {
      area: "Andheri West",
      restaurants: "15",
      icon: "bi-building",
      specialty: "Multi-Cuisine Hub"
    },
    {
      area: "Bandra",
      restaurants: "30",
      icon: "bi-shop",
      specialty: "Trendy Cafes & Restaurants"
    },
    {
      area: "Thane",
      restaurants: "50",
      icon: "bi-houses-fill",
      specialty: "Local Favorites"
    }
  ];

  const uniquePoints = [
    {
      title: "15-Minute Guarantee",
      desc: "Late? Get 100% refund. We value your time.",
      icon: "bi-lightning-charge-fill",
      color: "#ffd700"
    },
    {
      title: "Live Kitchen Tracking",
      desc: "Watch your food being prepared in real-time",
      icon: "bi-camera-video-fill",
      color: "#ff6b35"
    },
    {
      title: "Zero Contact Delivery",
      desc: "100% safe & hygienic delivery protocol",
      icon: "bi-shield-fill-check",
      color: "#4caf50"
    },
    {
      title: "Food Quality Score",
      desc: "Every dish rated by health experts",
      icon: "bi-star-fill",
      color: "#2196f3"
    }
  ];

  const testimonials = [
    {
      stars: 5,
      text: "The 15-minute guarantee is a game changer! Never had such fast delivery with such amazing food quality.",
      author: "Priya Sharma",
      location: "Mumbai, Andheri",
      icon: "bi-person-circle"
    },
    {
      stars: 5,
      text: "Love the live kitchen tracking feature! I can see my biryani being prepared. This is the future of food delivery!",
      author: "Rahul Mehta",
      location: "Mumbai, Bandra",
      icon: "bi-person-circle"
    },
    {
      stars: 5,
      text: "Their butter chicken is legendary! Been ordering for 2 years and the quality has never dropped. Highly recommended!",
      author: "Anjali Kapoor",
      location: "Mumbai, Thane",
      icon: "bi-person-circle"
    }
  ];

  return (
    <div className="premium-about-container">
      {/* Hero Video Section */}
      <section className="premium-hero">
        <div className="premium-hero-overlay">
          <div className="premium-hero-content">
            <span className="premium-badge">
              <i className="bi-trophy-fill"></i> Mumbai's #1 Food Delivery
            </span>
            <h1 className="premium-hero-title">
              Welcome to <span className="gradient-text">FoodiesHub</span>
            </h1>
            <p className="premium-hero-subtitle">
              <i className="bi-heart-fill"></i> Where Every Bite Tells a Story
            </p>
            <div className="premium-hero-stats">
              <div className="hero-stat">
                <i className="bi-box-seam-fill"></i>
                <h3>10K+</h3>
                <p>Daily Orders</p>
              </div>
              <div className="hero-stat">
                <i className="bi-shop-window"></i>
                <h3>1500+</h3>
                <p>Restaurant Partners</p>
              </div>
              <div className="hero-stat">
                <i className="bi-clock-fill"></i>
                <h3>15 Min</h3>
                <p>Avg Delivery</p>
              </div>
            </div>
            <button className="premium-cta-btn" onClick={() => navigate("/")}>
              <i className="bi-cart-fill"></i> Start Ordering
            </button>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="premium-story-section">
        <div className="premium-container">
          <div className="story-content">
            <div className="story-image">
              <div className="story-image-card">
                <div className="story-emoji">
                  <i className="bi-egg-fried" style={{ fontSize: '4rem' }}></i>
                </div>
                <div className="story-badge">
                  <i className="bi-calendar-event"></i> Est. 2020
                </div>
              </div>
            </div>
            <div className="story-text">
              <h2 className="section-title">
                <i className="bi-book-fill"></i> Our Story
              </h2>
              <p className="story-para">
                FoodiesHub started in a small kitchen in Mumbai with a simple dream: 
                <strong> bringing restaurant-quality food to your doorstep</strong>. 
                What began as a passion project by three food lovers has now grown into 
                Mumbai's most trusted food delivery platform.
              </p>
              <p className="story-para">
                We believe food is more than just sustenance—it's an experience, a memory, 
                a celebration. That's why we partner only with restaurants that share our 
                commitment to <strong>quality, hygiene, and authentic flavors</strong>.
              </p>
              <div className="story-highlights">
                <div className="highlight-item">
                  <span className="highlight-icon">
                    <i className="bi-check-circle-fill"></i>
                  </span>
                  <span>ISO 22000 Certified Kitchens</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">
                    <i className="bi-check-circle-fill"></i>
                  </span>
                  <span>100% Quality Guarantee</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">
                    <i className="bi-check-circle-fill"></i>
                  </span>
                  <span>24/7 Customer Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Famous Dishes Section */}
      <section className="premium-dishes-section">
        <div className="premium-container">
          <h2 className="section-title center">
            <i className="bi-award-fill"></i> Our <span className="gradient-text">Signature Dishes</span>
          </h2>
          <p className="section-subtitle">
            <i className="bi-heart-fill"></i> These crowd favorites have won hearts across Mumbai
          </p>
          <div className="dishes-grid">
            {famousDishes.map((dish, index) => (
              <div key={index} className="dish-card">
                <img 
                  src={dish.image} 
                  alt={dish.name} 
                  className="dish-image-actual"
                />
                <div className="dish-badge">
                  <span className="rating">
                    <i className="bi-star-fill"></i> {dish.rating}
                  </span>
                  <span className="orders">
                    <i className="bi-bag-check-fill"></i> {dish.orders} orders
                  </span>
                </div>
                <h3 className="dish-name">
                  <i className={dish.icon}></i> {dish.name}
                </h3>
                <p className="dish-desc">{dish.description}</p>
                <div className="dish-footer">
                  <span className="dish-price">
                    <i className="bi-currency-rupee"></i>{dish.price.replace('₹', '')}
                  </span>
                  <button className="dish-btn" onClick={() => navigate("/")}>
                    <i className="bi-cart-plus-fill"></i> Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="premium-locations-section">
        <div className="premium-container">
          <h2 className="section-title center">
            <i className="bi-geo-alt-fill"></i> We Deliver Across Mumbai
          </h2>
          <p className="section-subtitle">
            <i className="bi-bicycle"></i> Serving delicious food in these vibrant neighborhoods
          </p>
          <div className="locations-grid">
            {locations.map((location, index) => (
              <div key={index} className="location-card">
                <div className="location-icon">
                  <i className={location.icon}></i>
                </div>
                <h3 className="location-area">{location.area}</h3>
                <p className="location-restaurants">
                  <i className="bi-shop"></i> {location.restaurants} Restaurants
                </p>
                <p className="location-specialty">
                  <i className="bi-star"></i> {location.specialty}
                </p>
                <div className="location-status">
                  <span className="status-dot"></span>
                  <i className="bi-check-circle-fill"></i> Available Now
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Special */}
      <section className="premium-unique-section">
        <div className="premium-container">
          <h2 className="section-title center">
            <i className="bi-gem"></i> What Makes FoodiesHub <span className="gradient-text">Special</span>
          </h2>
          <div className="unique-grid">
            {uniquePoints.map((point, index) => (
              <div key={index} className="unique-card">
                <div 
                  className="unique-icon"
                  style={{ background: point.color }}
                >
                  <i className={point.icon}></i>
                </div>
                <h3 className="unique-title">{point.title}</h3>
                <p className="unique-desc">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="premium-testimonials-section">
        <div className="premium-container">
          <h2 className="section-title center">
            <i className="bi-chat-quote-fill"></i> What Our Foodies Say
          </h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <i key={i} className="bi-star-fill"></i>
                  ))}
                </div>
                <p className="testimonial-text">
                  <i className="bi-quote"></i> {testimonial.text}
                </p>
                <div className="testimonial-author">
                  <i className={testimonial.icon}></i>
                  <div>
                    <strong>{testimonial.author}</strong>
                    <span>
                      <i className="bi-geo-alt"></i> {testimonial.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="premium-final-cta">
        <div className="final-cta-content">
          <h2 className="final-cta-title">
            <i className="bi-emoji-heart-eyes-fill"></i> Hungry Yet?
          </h2>
          <p className="final-cta-desc">
            <i className="bi-people-fill"></i> Join 50,000+ happy foodies who trust FoodiesHub every day
          </p>
          <button 
            className="final-cta-btn"
            onClick={() => navigate("/")}
          >
            <i className="bi-bag-heart-fill"></i> Order Your Favorite Food Now
          </button>
          <p className="final-cta-note">
            <i className="bi-lightning-charge-fill"></i> First order? Get 50% OFF with code: WELCOME50
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;