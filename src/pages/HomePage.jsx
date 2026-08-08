import { useEffect } from "react";
import "./Home.css";

export default function Home() {
  useEffect(() => {
    const theme = document.getElementById("theme");
    const social_icons = document.querySelectorAll(".social");
    const logs = document.querySelectorAll(".icon");
    const certificates = document.querySelectorAll(".cert");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    if (!theme || !lightbox || !lightboxImg) {
      return;
    }

    function toggleTheme() {
      document.body.classList.toggle("light-mode");
      document.getElementById("name")?.classList.toggle("light-mode");
      document.getElementById("description")?.classList.toggle("light-mode");
      document.getElementById("cert_heading")?.classList.toggle("light-mode");
      document.getElementById("pfp")?.classList.toggle("light-mode");
      document.getElementById("bannerDark")?.classList.toggle("light-mode");
      document.getElementById("bannerLight")?.classList.toggle("light-mode");

      logs.forEach((tag) => tag.classList.toggle("light-mode"));
      social_icons.forEach((icon) => icon.classList.toggle("light-mode"));
      document.querySelectorAll(".cert-card").forEach((item) => item.classList.toggle("light-mode"));

      if (this.classList.contains("fa-moon")) {
        this.classList.replace("fa-moon", "fa-sun");
      } else {
        this.classList.replace("fa-sun", "fa-moon");
      }
    }

    theme.onclick = toggleTheme;

    const closeLightbox = () => {
      lightbox.classList.remove("show");
    };

    const stopPropagation = (event) => event.stopPropagation();

    lightbox.addEventListener("click", closeLightbox);
    lightboxImg.addEventListener("click", stopPropagation);

    certificates.forEach((certificate) => {
      certificate.addEventListener("click", () => {
        lightboxImg.src = certificate.src;
        lightbox.classList.add("show");
      });
    });

    return () => {
      theme.onclick = null;
      lightbox.removeEventListener("click", closeLightbox);
      lightboxImg.removeEventListener("click", stopPropagation);
    };
  }, []);

  return (
    <>
      <div id="lightbox">
        <img id="lightbox-img" alt="Lightbox preview" />
        <p className="close-help">Click anywhere to close</p>
      </div>

      <div className="flex-container">
        <img id="pfp" src="/public/my%20pfp.png" alt="Rajveer PFP" />

        <div className="text-content">
          <h1 id="name">Rajveer Singh Kaler</h1>
          <h3 id="description">
            A passionate and continuously learning student who does not back down
            from hard work
          </h3>
        </div>
      </div>

      <h1 id="cert_heading">Projects, Certifications and Accomplishments:</h1>
      <div className="certificates" id="certificates">
        <div className="cert-card">
          <i className="fa-solid fa-address-card icon"></i>
          <h4>Python</h4>
          <img className="cert" src="public/fccPython.png" alt="Python cert" />
          <p>Earned Python certification from FreeCodeCamp.org</p>
        </div>
        <div className="cert-card">
          <i className="fa-solid fa-graduation-cap icon"></i>
          <h4>Tutoring</h4>
          <img className="cert" src="public/peerTutoring.jpg" alt="Tutoring" />
          <p>Participated in Peer tutoring program at Chitkara University</p>
        </div>
        <div className="cert-card">
          <i className="fa-solid fa-terminal icon"></i>
          <h4>Hackathon</h4>
          <img className="cert" src="public/VaultHeist.jpg" alt="Hackathon" />
          <p>Participated in VaultHeist Hackathon</p>
        </div>
        <div className="cert-card">
          <i className="fa-solid fa-shield icon"></i>
          <h4>RedHat</h4>
          <img className="cert" src="public/redhatPython.jpg" alt="RedHat" />
          <p>Completed introduction to Python by RedHat</p>
        </div>
        <div className="cert-card">
          <i className="fa-solid fa-shield-halved icon"></i>
          <h4>Redhat</h4>
          <img
            className="cert"
            src="public/red-hat-openshift-applications.jpg"
            alt="Red Hat OpenShift"
          />
          <p>Completed Introduction to Redhat Open Shift Applications</p>
        </div>
        <div className="cert-card">
          <i className="fa-solid fa-certificate icon"></i>
          <h4>Cisco OSS</h4>
          <img className="cert" src="public/cisco.jpg" alt="Cisco" />
          <p>Completed Cisco Operating System Support</p>
        </div>
        <div className="cert-card">
          <i className="fa-solid fa-microchip icon"></i>
          <h4>DeepLearning.AI</h4>
          <img className="cert" src="public/disaster.jpg" alt="DeepLearning.AI" />
          <p>Completed DeepLearning.AI's AI and Disaster Management</p>
        </div>
        <div className="cert-card">
          <i className="fa-solid fa-award icon"></i>
          <h4>BID NDCCRA</h4>
          <img className="cert" src="public/disaster2.jpg" alt="BID NDCCRA" />
          <p>Completed BID's Natural Disaster and Climate Change Risk Assesment</p>
        </div>
        <div className="cert-card">
          <i className="fa-solid fa-envelope icon"></i>
          <h4>Networking</h4>
          <img className="cert" src="public/F2F-4.jpg" alt="Networking" />
          <p>Attended an extra course for Computer Networking in Chitkara University</p>
        </div>
        <div className="cert-card">
          <i className="fa-solid fa-laptop-code icon"></i>
          <h4>Database Management System</h4>
          <img className="cert" src="public/dbms.jpg" alt="DBMS" />
          <p>Attended an extra course for Database Management System in Chitkara University</p>
        </div>
      </div>
    </>
  );
}
