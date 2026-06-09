"use client";
import React, { useEffect, useState } from "react";
import "./banner.css";
import Modal, { ModalMenu, ModalToggle } from "../modal/modal";

function Banner() {
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [banner, setBanner] = useState(null);
  const [uploadType, setUploadType] = useState(null);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/user/me", {
          credentials: "include",
        });
        const data = await res.json();
        setUserId(data._id);
        if (data.avatar) setAvatar(data.avatar);
        if (data.banner) setBanner(data.banner);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:4000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!data.success) return alert("Upload failed!");

      const newFileUrl = `http://localhost:4000/uploads/${data.fileName}`;

      const field = uploadType === "banner" ? "banner" : "avatar";
      await fetch(`http://localhost:4000/api/user/${userId}/${field}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: newFileUrl }),
      });

      if (uploadType === "banner") setBanner(newFileUrl);
      else setAvatar(newFileUrl);

      alert(`✅ ${uploadType} uploaded & saved successfully!`);
      setFile(null);
      setUploadType(null);
    } catch (err) {
      console.error("Upload error:", err);
      alert("❌ Failed to upload image");
    }
  };

  return (
    <div className="banner">
      <div className="banner-bg">
        <img src={banner || "./img/banner-3.jpg"} alt="banner" />

        {/* Action Buttons (Top Right) */}
        <div className="banner-actions">
          <button className="action-btn notification-btn">
            <i className="bx bx-bell bx-sm"></i>
            <span className="badge">20</span>
          </button>

          <Modal>
            <ModalToggle>
              <button
                className="action-btn"
                onClick={() => setUploadType("banner")}
              >
                <i className="bx bx-dots-horizontal-rounded bx-sm"></i>
              </button>
            </ModalToggle>
            <ModalMenu>
              <div className="upload-img">
                <form onSubmit={handleUpload}>
                  <div className="title">Upload Your Banner</div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <button type="submit">Upload</button>
                </form>
              </div>
            </ModalMenu>
          </Modal>
        </div>

        {/* Profile Section (Avatar + Info) */}
        <div className="profile-wrapper">
          <Modal>
            <ModalToggle>
              <div
                className="banner-logo"
                onClick={() => setUploadType("avatar")}
              >
                <img src={avatar || "./img/banner-logo.jpg"} alt="avatar" />
                <div className="select-img">
                  <i className="bx bx-camera bx-sm"></i>
                </div>
              </div>
            </ModalToggle>
            <ModalMenu>
              <div className="upload-img">
                <form onSubmit={handleUpload}>
                  <div className="title">Upload Your Avatar</div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <button type="submit">Upload</button>
                </form>
              </div>
            </ModalMenu>
          </Modal>

          <div className="profile-info">
            <span className="welcome-text">Welcome back,</span>
            <div className="name-wrapper">
              <h1 className="user-name">Malek</h1>
              <span className="pro-badge">Pro</span>
            </div>
            <div className="user-motto">
              Focus <span className="diamond">♦</span> Discipline{" "}
              <span className="diamond">♦</span> Freedom
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
