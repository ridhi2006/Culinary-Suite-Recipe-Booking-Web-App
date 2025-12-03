import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "../styles/Pricing.css";

const Pricing = () => {
  const [showModal, setShowModal] = useState(false);
  const [plan, setPlan] = useState("");
  const [amount, setAmount] = useState("");
  const [qrURL, setQrURL] = useState("");
  const [paymentDone, setPaymentDone] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Your UPI and EmailJS details
  const UPI_ID = "ridhikav29@oksbi";
  const SERVICE_ID = "service_wjyqfmd";
  const TEMPLATE_ID = "template_r9yvh5k";
  const PUBLIC_KEY = "x9IP8qXwli9rWAZfh";

  // Start payment process
  const startPayment = (planName, price) => {
    setPlan(planName);
    setAmount(price);

    const upi = `upi://pay?pa=${encodeURIComponent(
      UPI_ID
    )}&pn=${encodeURIComponent(
      "Culinary Suite"
    )}&am=${encodeURIComponent(price)}&cu=INR&tn=${encodeURIComponent(
      planName + " Plan"
    )}`;

    setQrURL(
      `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
        upi
      )}`
    );
    setShowModal(true);
    setPaymentDone(false);
    setEmailSent(false);

    // Optional: Auto open UPI app on mobile
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      setTimeout(() => {
        window.location.href = upi;
      }, 400);
    }
  };

  // Simulate payment done
  const confirmPayment = () => {
    setPaymentDone(true);
    sendEmail();
  };

  // Send Email after payment
  const sendEmail = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user?.email;

    if (!userEmail) {
      alert("User email not found. Please login first.");
      return;
    }

    const templateParams = {
      user_name: user.username,
      user_email: userEmail,
      plan_name: plan,
      amount: amount,
      payment_method: "UPI Payment",
      payment_date: new Date().toLocaleDateString(),
    };

    emailjs
      .send("service_wjyqfmd", "template_r9yvh5k", templateParams, "x9IP8qXwli9rWAZfh")
      .then(() => {
        setEmailSent(true);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to send confirmation email.");
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="pricing-page">
      <h1 className="pricing-title">Choose a Plan — Culinary Suite</h1>

      <div className="plans">
        {[
          { name: "Basic", price: "99", desc: "Good for beginners" },
          { name: "Pro", price: "199", desc: "Personalized menu & more" },
          { name: "Premium", price: "299", desc: "Chef-curated + ad-free" },
        ].map((p) => (
          <div className="plan-card" key={p.name}>
            <h2>{p.name}</h2>
            <div className="price">₹{p.price} / month</div>
            <p className="desc">{p.desc}</p>
            <button className="btn" onClick={() => startPayment(p.name, p.price)}>
              Select & Pay
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-card">
            <button className="close" onClick={closeModal}>✕</button>
            <h3 style={{ color: "#ff6600" }}>You selected: {plan} Plan</h3>
            <p>Amount: ₹{amount}</p>

            {!paymentDone ? (
              <>
                <p>
                  Scan the QR or use your UPI app to complete payment.
                  <br />
                  Once done, payment will be auto-verified.
                </p>
                <img src={qrURL} alt="UPI QR" width="200" height="200" />
                <button className="btn" onClick={confirmPayment}>
                  ✅ I Have Paid
                </button>
              </>
            ) : (
              <>
                <p>💰 Payment Successful!</p>
                {emailSent ? (
                  <p>📩 Confirmation email sent to your registered email.</p>
                ) : (
                  <p>Sending confirmation email...</p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;
