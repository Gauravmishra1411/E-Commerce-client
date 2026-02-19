import { useEffect } from "react";
import { gsap } from "gsap";
import "../App.css";

const services = [
  {
    title: "Fast Delivery",
    desc: "Get your products delivered within 24 hours anywhere in India.",
    img: "https://picsum.photos/400/300?random=1",
  },
  {
    title: "Secure Payments",
    desc: "100% secure payments with SSL encryption.",
    img: "https://picsum.photos/400/300?random=2",
  },
  {
    title: "Easy Returns",
    desc: "Hassle-free returns within 7 days.",
    img: "https://picsum.photos/400/300?random=3",
  },
  {
    title: "24/7 Support",
    desc: "Our support team is available anytime.",
    img: "https://picsum.photos/400/300?random=4",
  },
];

const Service = () => {
  useEffect(() => {
    // Heading animation
    gsap.from(".service-title", {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Paragraph animation
    gsap.from(".service-subtitle", {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.3,
    });

    // Cards stagger animation
    gsap.from(".service-card", {
      opacity: 0,
      y: 60,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.6,
    });
  }, []);

  return (
    <div className="service-page">
      {/* Header */}
      <div className="service-header">
        <h1 className="service-title">Our Services</h1>
        <p className="service-subtitle">
          We provide the best services to make your shopping experience amazing.
        </p>
      </div>

      {/* Services Grid */}
      <div className="service-grid">
        {services.map((item, index) => (
          <div className="service-card" key={index}>
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
