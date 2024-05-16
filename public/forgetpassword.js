// Function to toggle password visibility
function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  input.type = input.type === "password" ? "text" : "password";
}

// Function to handle form submission
document
  .getElementById("forget-password-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const formData = new FormData(this);

    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    if (
      newPassword.length < 5 ||
      !/[A-Z]/.test(newPassword) ||
      !/[a-z]/.test(newPassword) ||
      !/\d/.test(newPassword) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
    ) {
      document.getElementById("message").textContent =
        "Password must be at least 5 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one number.";
      return;
    }

    if (newPassword !== confirmPassword) {
      document.getElementById("message").textContent =
        "Passwords do not match!";
      return;
    }

    // Send a POST request to the server with form data
    fetch("/forgetpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Display message based on server response
        document.getElementById("message").textContent = data.message;
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error.message === "Network response was not ok") {
          document.getElementById("message").textContent =
            "The email does not exist";
        } else {
          error.json().then((data) => {
            document.getElementById("message").textContent = data.error;
          });
        }
      });
  });

// Function to navigate back to index.html

async function getOtp() {
  var result = await fetch("/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function verifyOtp() {
  var arr = [5111, 2451, 6589, 1002, 7412];
  console.log(arr);
  var userOtp = parseInt(document.getElementById("otp").value);
  console.log(userOtp);

  arr.forEach((item) => {
    if (item === userOtp) {
        document.getElementById('Otpmessage').style.display = 'none';
        document.getElementById('showPasswordFields').style.display = 'inline-block';
        document.getElementById('otpEmailField').style.display = 'none';
        document.getElementById('submitButton').style.display = 'inline-block';
        document.getElementById('getOtpId').style.display = 'none';
        document.getElementById('verifyOtpId').style.display = 'none';
    }
    else {
        document.getElementById('Otpmessage').innerHTML = 'Invalid OTP';
    }
  });
}

function goToIndexPage() {
  window.location.href = "/index.html";
}
