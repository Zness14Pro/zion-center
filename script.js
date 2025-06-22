document.addEventListener("DOMContentLoaded", function () {
  // Generate QR Code
  const qrcode = new QRCode(document.getElementById("qrcode"), {
    text: "https://www.sberbank.com/sms/pbpn?requisiteNumber=79853567495",
    width: 180,
    height: 180,
    colorDark: "#2c3e50",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  // Create floating elements for decoration
  createFloatingElements();

  // Form submission
  const form = document.getElementById("registrationForm");
  const statusMessage = document.getElementById("statusMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const lastname = document.getElementById("lastname").value;
    const firstname = document.getElementById("firstname").value;
    const city = document.getElementById("city").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    // Format the message for Telegram
    const telegramMessage = `
                    *Nouvelle inscription* 🎉
                    -------------------------
                    *Nom:* ${lastname}
                    *Prénom:* ${firstname}
                    *Ville:* ${city}
                    *Genre:* ${gender}
                    *Téléphone:* ${phone}
                    *Message:*
                    ${message}
                    -------------------------
                    Date: ${new Date().toLocaleString()}
                `;

    // Replace with your actual Telegram bot token and chat ID
    const botToken = "7711040633:AAHpLvoScbkMHimS0cQBrJY1NEP11aH0-3E";
    const chatId = "-4811362627";

    // Send to Telegram
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: "Markdown",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          statusMessage.textContent = "Inscription envoyée avec succès!";
          statusMessage.className = "status-message success";
          form.reset();
        } else {
          throw new Error("Erreur lors de l'envoi");
        }
      })
      .catch((error) => {
        statusMessage.textContent =
          "Erreur lors de l'envoi du formulaire. Veuillez réessayer.";
        statusMessage.className = "status-message error";
        console.error("Error:", error);
      });
  });

  // Create floating decorative elements
  function createFloatingElements() {
    const colors = [
      "rgba(52, 152, 219, 0.3)",
      "rgba(155, 89, 182, 0.3)",
      "rgba(46, 204, 113, 0.3)",
      "rgba(241, 196, 15, 0.3)",
      "rgba(231, 76, 60, 0.3)",
    ];

    for (let i = 0; i < 10; i++) {
      const floating = document.createElement("div");
      floating.className = "floating";

      // Random size between 20 and 100px
      const size = Math.random() * 80 + 20;
      floating.style.width = `${size}px`;
      floating.style.height = `${size}px`;

      // Random position
      floating.style.left = `${Math.random() * 100}%`;
      floating.style.top = `${Math.random() * 100}%`;

      // Random color
      floating.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

      // Random animation
      const duration = Math.random() * 20 + 10;
      floating.style.animation = `float ${duration}s infinite ease-in-out`;

      document.body.appendChild(floating);
    }
  }
});

// Add floating animation
const style = document.createElement("style");
style.textContent = `
            @keyframes float {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0.8;
                }
                25% {
                    transform: translate(10px, 10px) rotate(5deg);
                    opacity: 0.6;
                }
                50% {
                    transform: translate(20px, 0) rotate(0deg);
                    opacity: 0.8;
                }
                75% {
                    transform: translate(10px, -10px) rotate(-5deg);
                    opacity: 0.6;
                }
                100% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0.8;
                }
            }
        `;
document.head.appendChild(style);
