import React, { useState } from 'react'
import { useForm } from "react-hook-form";



function Navbar() {
      const [page, setPage] = useState("home");
  const [formType, setFormType] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted", data);
    reset();
  };
  return (
         <nav
        style={{
          width: "100%",
          height: "80px",
          position: "fixed",
          top: 0,
          left: 0,
          background: " linear-gradient(800deg, rgb(161, 161, 24),rgb(117, 45, 14))",
          padding: "18px 25px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          alignItems: "center",
          boxSizing: "border-box",
          zIndex: 1000,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <h2 style={{ margin: 0, fontSize: "36px" }}>GEetaVerse</h2>

          {/* Menu (Home, About, Contact) */}
          <div
            style={{
              display: "flex",
              gap: "25px",
              fontSize: "22px",
              cursor: "pointer",
            }}
          >
            <p
              style={{
                cursor: "pointer",
                marginLeft: "120px",
                fontSize: "28px",
              }}
              onClick={() => {
                setPage("home");
                setFormType(null);
              }}
            >
              Home
            </p>
            <p
              style={{
                cursor: "pointer",
                marginLeft: "140px",
                fontSize: "28px",
              }}
              onClick={() => {
                setPage("about");
                setFormType(null);
              }}
            >
              About
            </p>
            <p
              style={{
                cursor: "pointer",
                marginLeft: "140px",
                fontSize: "28px",
              }}
              onClick={() => {
                setPage("contact");
                setFormType(null);
              }}
            >
              Contact
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "15px" }}>
          <button
            onClick={() => {setFormType("login"); setPage("form"); }}
            style={{
              border: "2px solid black",
              padding: "10px 20px",
              fontSize: "20px",
              cursor: "pointer",
              marginRight: "90px",
            }}
          >
            Login
          </button>

          <button
            onClick={() => {setFormType("registration"); setPage("form"); }}
            style={{
              border: "2px solid black",
              padding: "10px 20px",
              fontSize: "20px",
              cursor: "pointer",
              marginRight: "60px",
            }}
          >
            Registration
          </button>
        </div>
      </nav>
  )
}

export default Navbar

