// --- FAQ Accordion ---
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
   const question = item.querySelector('.faq-question');
   const answer = item.querySelector('.faq-answer');

   question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(i => {
         i.classList.remove('active');
         i.querySelector('.faq-answer').style.maxHeight = null;
         i.querySelector('.faq-answer').style.paddingTop = 0;
         i.querySelector('.faq-answer').style.paddingBottom = 0;
      });

      if (!isActive) {
         item.classList.add('active');
         answer.style.maxHeight = answer.scrollHeight + "px";
         answer.style.paddingTop = "15px";
         answer.style.paddingBottom = "15px";
      }
   });
});

// --- Logo click ---
const logoElement = document.querySelector('.logo');
if (logoElement) logoElement.addEventListener('click', () => window.location.href = 'index.html');

const footerLogoElement = document.querySelector('.logo-footer .logo');
if (footerLogoElement) footerLogoElement.addEventListener('click', () => window.location.href = 'index.html');

// --- Subscribe & Payment ---
const subscribeBtns = document.querySelectorAll('.subscribe-btn');
const paymentModal = document.getElementById('payment-modal');
const closePayment = paymentModal?.querySelector('.close');
const paymentForm = document.getElementById('payment-form');
const confirmationPopup = document.getElementById('confirmation-popup');
const cancelPopup = document.getElementById('cancel-popup');
const closePopups = document.querySelectorAll('.close-popup');
const confirmationInfo = document.getElementById('confirmation-info');
const cancelInfo = document.getElementById('cancel-info');

let currentButton = null;

// --- Input formatiranje ---
// Broj kartice
const cardNumberInput = document.getElementById("card-number");
if (cardNumberInput) {
   cardNumberInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "").substring(0, 16);
      e.target.value = value.match(/.{1,4}/g)?.join(" ") || "";
   });
}

// Datum isteka MM/YY
const expiryDateInput = document.getElementById("expiry-date");
if (expiryDateInput) {
   expiryDateInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "").substring(0, 4);
      if (value.length >= 3) value = value.substring(0, 2) + "/" + value.substring(2);
      e.target.value = value;
   });
}

// CVV max 3 broja
const cvvInput = document.getElementById("cvv");
if (cvvInput) {
   cvvInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\D/g, "").substring(0, 3);
   });
}

// --- Payment validation ---
function validatePaymentForm() {
   const cardNumber = cardNumberInput.value.replace(/\s/g, "");
   const expiry = expiryDateInput.value.trim();
   const cvv = cvvInput.value.trim();

   const cardNumberValid = /^\d{16}$/.test(cardNumber);
   const expiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry);
   const cvvValid = /^\d{3}$/.test(cvv);

   if (!cardNumberValid || !expiryValid || !cvvValid) {
      alert('Please enter valid payment details!');
      return false;
   }
   return true;
}

// --- Subscribe mark / reset ---
function markSubscribed(plan) {
   subscribeBtns.forEach(btn => {
      const btnPlan = btn.getAttribute('data-plan');
      let cancelBtn = btn.nextElementSibling;

      if (cancelBtn && cancelBtn.classList.contains("cancel-btn")) cancelBtn.remove();

      if (btnPlan === plan) {
         btn.textContent = "Subscribed";
         btn.disabled = true;
         btn.style.background = "#999";
         btn.style.cursor = "default";

         // Cancel dugme sa "Are you sure?" funkcionalnošću
         const newCancelBtn = document.createElement("button");
         newCancelBtn.textContent = "Cancel Subscription";
         newCancelBtn.classList.add("cancel-btn");

         newCancelBtn.addEventListener("click", () => {
            // Kreiraj confirmation container ispod dugmeta
            let confirmDiv = document.createElement("div");
            confirmDiv.style.marginTop = "10px";
            confirmDiv.style.display = "flex";
            confirmDiv.style.justifyContent = "center";
            confirmDiv.style.gap = "10px";

            let yesBtn = document.createElement("button");
            yesBtn.textContent = "Yes";
            yesBtn.classList.add("cancel-btn");
            yesBtn.style.background = "#e63946";

            let noBtn = document.createElement("button");
            noBtn.textContent = "No";
            noBtn.classList.add("cancel-btn");
            noBtn.style.background = "#999";

            confirmDiv.appendChild(yesBtn);
            confirmDiv.appendChild(noBtn);
            newCancelBtn.insertAdjacentElement("afterend", confirmDiv);

            // Disable original cancel button while confirming
            newCancelBtn.disabled = true;

            yesBtn.addEventListener("click", () => {
               localStorage.removeItem("purchasedPlan");
               resetButtons();
               confirmDiv.remove();
               cancelPopup.style.display = "flex";
               cancelInfo.textContent = `Your ${plan} subscription has been cancelled.`;
            });

            noBtn.addEventListener("click", () => {
               confirmDiv.remove();
               newCancelBtn.disabled = false;
            });
         });

         btn.insertAdjacentElement("afterend", newCancelBtn);
      } else {
         btn.textContent = "Subscribe Now";
         btn.disabled = false;
         btn.style.background = "";
         btn.style.cursor = "pointer";
      }
   });

   // Update League Pass link text to the purchased plan name
   const leaguePassLink = document.querySelector('.auth-link.league-pass');
   if (leaguePassLink) {
      // Assuming plan is in kebab-case or similar; adjust capitalization if needed
      const displayName = plan.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      leaguePassLink.textContent = displayName;
   }
}

function resetButtons() {
   subscribeBtns.forEach(btn => {
      btn.textContent = "Subscribe Now";
      btn.disabled = false;
      btn.style.background = "";
      btn.style.cursor = "pointer";

      let cancelBtn = btn.nextElementSibling;
      if (cancelBtn && cancelBtn.classList.contains("cancel-btn")) cancelBtn.remove();
   });

   // Reset League Pass link text back to original
   const leaguePassLink = document.querySelector('.auth-link.league-pass');
   if (leaguePassLink) {
      leaguePassLink.textContent = "League Pass";
   }
}

function generateOrderNumber() {
   return "ORD-" + Math.floor(Math.random() * 900000 + 100000);
}

// --- Subscribe buttons ---
subscribeBtns.forEach(btn => {
   btn.addEventListener("click", () => {
      const purchasedPlan = localStorage.getItem("purchasedPlan");
      if (purchasedPlan) {
         alert("You must cancel your current subscription before purchasing a new one.");
         return;
      }
      currentButton = btn;
      paymentModal.style.display = "flex";
   });
});

// --- Close modals ---
closePayment?.addEventListener("click", () => {
   paymentModal.style.display = "none";
});
closePopups.forEach(closeBtn => {
   closeBtn.addEventListener("click", () => {
      confirmationPopup.style.display = "none";
      cancelPopup.style.display = "none";
   });
});

window.addEventListener("click", (e) => {
   if (e.target === paymentModal) paymentModal.style.display = "none";
   if (e.target === confirmationPopup) confirmationPopup.style.display = "none";
   if (e.target === cancelPopup) cancelPopup.style.display = "none";
});

// --- Submit payment ---
paymentForm.addEventListener("submit", (e) => {
   e.preventDefault();
   if (!validatePaymentForm()) return;

   paymentModal.style.display = "none";
   const email = document.getElementById("email").value || "JohnDoe@example.com";

   if (currentButton) {
      const plan = currentButton.getAttribute("data-plan");
      localStorage.setItem("purchasedPlan", plan);
      markSubscribed(plan);

      const orderNumber = generateOrderNumber();
      confirmationPopup.style.display = "flex";
      confirmationInfo.textContent = `Plan: ${plan}\nEmail: ${email}\nOrder #: ${orderNumber}`;
   }

   paymentForm.reset();
});

// --- Check active plan on load ---
document.addEventListener('DOMContentLoaded', () => {
   const purchasedPlan = localStorage.getItem('purchasedPlan');
   if (purchasedPlan) markSubscribed(purchasedPlan);
});

document.addEventListener("DOMContentLoaded", () => {
   const authLink = document.querySelector(".auth-link.sign-in");

   if (localStorage.getItem("isLoggedIn") === "true") {
      authLink.href = "profile.html";
      authLink.classList.remove("sign-in");
      authLink.classList.add("profile");
      authLink.textContent = ""; // Clear existing text

      const profileContainer = document.createElement("div");
      profileContainer.className = "profile-container"; // Class for CSS styling

      const profilePic = document.createElement("img");
      profilePic.src = localStorage.getItem("profilePic") || "https://via.placeholder.com/30?text=User";
      profilePic.alt = "Profile picture";
      profilePic.className = "profile-pic"; // Class for CSS styling

      const usernameSpan = document.createElement("span");
      usernameSpan.textContent = localStorage.getItem("username") || "User";
      usernameSpan.className = "username"; // Class for CSS styling

      profileContainer.appendChild(profilePic);
      profileContainer.appendChild(usernameSpan);
      authLink.appendChild(profileContainer);
   } else {
      authLink.textContent = "Sign In";
   }
});

// Separate script to update League Pass link on other pages based on localStorage

function updateLeaguePassLink() {
   const purchasedPlan = localStorage.getItem('purchasedPlan');
   const leaguePassLink = document.querySelector('.auth-link.league-pass');

   if (leaguePassLink) {
      if (purchasedPlan) {
         // Convert plan name to display format, e.g., "premium-plan" -> "Premium Plan"
         const displayName = purchasedPlan.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
         leaguePassLink.textContent = displayName;
      } else {
         leaguePassLink.textContent = "League Pass";
      }
   }
}

// Run on page load
document.addEventListener('DOMContentLoaded', updateLeaguePassLink);

// Optional: Listen for storage changes if needed (e.g., if subscription changes from another tab)
window.addEventListener('storage', (event) => {
   if (event.key === 'purchasedPlan') {
      updateLeaguePassLink();
   }
});

// Hamburger meni funkcionalnost
document.addEventListener("DOMContentLoaded", () => {
   const hamburger = document.querySelector(".hamburger");
   const navMenu = document.querySelector("#main-nav");

   if (hamburger && navMenu) {
      hamburger.addEventListener("click", () => {
         navMenu.classList.toggle("active");
         hamburger.classList.toggle("active"); // Za animaciju hamburger ikone
         console.log("Hamburger meni kliknut, active stanje:", navMenu.classList.contains("active")); // Debugging
      });

      // Zatvori meni ako se klikne na link unutar menija
      const navLinks = document.querySelectorAll("#main-nav .navigation, #main-nav .auth-link");
      navLinks.forEach(link => {
         link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            hamburger.classList.remove("active");
            console.log("Nav link kliknut, meni zatvoren"); // Debugging
         });
      });
   } else {
      console.error("Hamburger ili main-nav elementi nisu pronađeni.");
   }
});

// Definiramo kratke policy tekstove za svaki link
const policyTexts = {
   'privacy-policy': {
      title: 'NBA Privacy Policy',
      text: 'This Privacy Policy explains how the NBA Family collects, uses, and shares personal data through our Services, including websites, apps, and events. We collect contact, demographic, payment, device, location, and interest data to provide and improve our Services, personalize experiences, and deliver targeted ads. You can manage your preferences, opt out of targeted advertising, or request data access/deletion at privacy.nba.com.'
   },
   'eea-uk': {
      title: 'EEA/UK Privacy Statement',
      text: 'For EEA/UK residents, we process personal data in compliance with GDPR. We collect contact, device, and usage data to provide Services, personalize content, and deliver ads. You have rights to access, correct, or delete your data, and opt out of targeted advertising via privacy.nba.com or Global Privacy Control (GPC). Contact us at DataPrivacy@nba.com.'
   },
   'brazil': {
      title: 'Brazil Privacy Statement',
      text: 'For Brazil residents, we comply with LGPD to process personal data for providing Services, marketing, and analytics. We collect contact, location, and interest data to enhance fan experiences. You can request access, correction, or deletion of your data or opt out of targeted ads at privacy.nba.com. Email DataPrivacy@nba.com for inquiries.'
   },
   'colorado': {
      title: 'Colorado Consumer Privacy Statement',
      text: 'For Colorado residents, we collect personal data like contact, device, and usage information to deliver Services and targeted ads. You can opt out of data sales or targeted advertising via privacy.nba.com or Global Privacy Control. Request access, correction, or deletion of your data at privacy.nba.com or by emailing DataPrivacy@nba.com.'
   },
   'california': {
      title: 'California Consumer Privacy Statement',
      text: 'For California residents, under CCPA, we collect contact, demographic, and device data to provide Services and ads. You have rights to know, delete, or opt out of data sales/targeted advertising. Manage preferences or submit requests at privacy.nba.com or email DataPrivacy@nba.com. Opt out using Global Privacy Control if supported.'
   },
   'terms': {
      title: 'Terms of Use',
      text: 'Our Terms of Use govern your use of NBA Family Services, including websites, apps, and events. By using our Services, you agree to comply with these terms, which cover account creation, content usage, and dispute resolution. Review the full terms at nba.com for details or contact us at DataPrivacy@nba.com.'
   },
   'cookie': {
      title: 'Cookie Policy',
      text: 'We use cookies and tracking technologies to enhance your experience, personalize ads, and analyze usage on our Services. Cookies collect device, location, and browsing data. You can manage cookie preferences or opt out via privacy.nba.com or your browser settings. See our Cookie Policy for more details.'
   },
   'accessibility': {
      title: 'Accessibility and Closed Captions',
      text: 'The NBA Family is committed to accessibility, ensuring our Services, including websites and apps, are usable for all fans. We provide closed captions and other accessibility features. For assistance or to report issues, contact us at DataPrivacy@nba.com or visit privacy.nba.com for more information.'
   },
   'support': {
      title: 'Customer Support',
      text: 'Our Customer Support team is here to help with account issues, ticketing, or Service-related inquiries. Contact us at DataPrivacy@nba.com, call (212) 407-8000, or visit privacy.nba.com for support. We aim to respond promptly to enhance your NBA experience.'
   },
   'preferences': {
      title: 'Manage Preferences',
      text: 'You can manage your communication and privacy preferences for NBA Family Services via your NBA ID account at privacy.nba.com. Adjust settings for promotional messages, targeted ads, or data sharing. For assistance, email DataPrivacy@nba.com or call (212) 407-8000.'
   }
};

// Selektori za popup
const policyPopup = document.getElementById('policy-popup');
const popupTitle = document.getElementById('popup-title');
const popupText = document.getElementById('popup-text');
const closePopupX = document.getElementById('close-popup-x');

// Dodavanje event listenera za svaki footer link
document.querySelectorAll('.footer-links a').forEach(link => {
   link.addEventListener('click', (e) => {
      e.preventDefault(); // Sprječava default ponašanje linka
      const policyKey = link.getAttribute('data-policy');
      const policy = policyTexts[policyKey];

      if (policy) {
         popupTitle.textContent = policy.title;
         popupText.textContent = policy.text;
         policyPopup.style.display = 'flex'; // Prikazuje popup
      }
   });
});

// Zatvaranje popup-a klikom na X
closePopupX.addEventListener('click', () => {
   policyPopup.style.display = 'none';
});

// Zatvaranje popup-a klikom izvan sadržaja
policyPopup.addEventListener('click', (e) => {
   if (e.target === policyPopup) {
      policyPopup.style.display = 'none';
   }
});