export function togglePasswordVisibility() {
  const inputField = document.getElementById("floatingPassword");
  const icon = document.querySelector(".eye");

  if (inputField.type === "password") {
    inputField.type = "text";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  } else {
    inputField.type = "password";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  }
}
