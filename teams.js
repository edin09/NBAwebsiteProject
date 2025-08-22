// Funkcija za detekciju mobilnog uređaja
function isMobile() {
   const isMobileDevice = window.innerWidth <= 768; // Granica prema CSS-u
   console.log(`isMobile: ${isMobileDevice}, Window width: ${window.innerWidth}`); // Debugging
   return isMobileDevice;
}

// Funkcija za učitavanje rasporeda
function loadSchedule() {
   const jsonFile = isMobile() ? "schedule-mobile.json" : "schedule.json";
   console.log(`Učitavanje JSON fajla: ${jsonFile}`); // Debugging

   // Dodaj timestamp kako bi spriječio keširanje
   const url = `${jsonFile}?t=${new Date().getTime()}`;

   fetch(url)
      .then(res => {
         if (!res.ok) {
            throw new Error(`HTTP greška! Status: ${res.status}`);
         }
         return res.json();
      })
      .then(data => {
         console.log(`Učitani podaci iz ${jsonFile}:`, data); // Debugging
         games = data;
         displayGames();
      })
      .catch(err => {
         console.error(`Greška pri učitavanju ${jsonFile}:`, err);
      });
}

// Učitavanje JSON fajla za raspored
let games = [];
document.addEventListener("DOMContentLoaded", () => {
   console.log("DOMContentLoaded - Pokrećem loadSchedule"); // Debugging
   loadSchedule();
});

// Debounce funkcija za resize event
function debounce(func, wait) {
   let timeout;
   return function executedFunction(...args) {
      const later = () => {
         clearTimeout(timeout);
         func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
   };
}

// Ponovno učitavanje rasporeda ako se promijeni veličina prozora
window.addEventListener("resize", debounce(() => {
   console.log("Resize događaj - Pokrećem loadSchedule"); // Debugging
   loadSchedule();
}, 200));

// Funkcija za prikaz utakmica
function displayGames(filteredGames = games) {
   const container = document.getElementById("schedule");
   if (!container) {
      console.error("Element s ID-om 'schedule' nije pronađen.");
      return;
   }
   container.innerHTML = "";
   console.log(`Prikazujem ${filteredGames.length} utakmica`); // Debugging

   filteredGames.forEach(g => {
      container.innerHTML += `
      <div class="schedule-game">
        <!-- Datum -->
        <div class="date">${g.date}</div>
        
        <!-- Timovi -->
        <div class="matchup">
          <div class="team away-team">
            <img src="${g.awayLogo}" alt="${g.away}">
            <span>${g.away}</span>
          </div>

          <span class="at-symbol">@</span>

          <div class="team home-team">
            <img src="${g.homeLogo}" alt="${g.home}">
            <span>${g.home}</span>
          </div>
        </div>

        <!-- Arena -->
        <div class="arena">${g.arena}</div>
      </div>
    `;
   });
}

// Pretraga
const searchInput = document.getElementById("search");
if (searchInput) {
   searchInput.addEventListener("input", e => {
      const term = e.target.value.toLowerCase();
      const filtered = games.filter(g =>
         g.home.toLowerCase().includes(term) ||
         g.away.toLowerCase().includes(term) ||
         g.date.includes(term) ||
         g.arena.toLowerCase().includes(term)
      );
      console.log(`Filtrirano ${filtered.length} utakmica za pojam: ${term}`); // Debugging
      displayGames(filtered);
   });
} else {
   console.error("Element s ID-om 'search' nije pronađen.");
}

// Klik na logo u headeru
const logoElement = document.querySelector('.logo');
if (logoElement) {
   logoElement.addEventListener('click', () => {
      window.location.href = 'index.html';
   });
} else {
   console.error("Element s klasom 'logo' nije pronađen.");
}

// Klik na logo u footeru
const footerLogoElement = document.querySelector('.logo-footer .logo');
if (footerLogoElement) {
   footerLogoElement.addEventListener('click', () => {
      window.location.href = 'index.html';
   });
} else {
   console.error("Element s klasom 'logo' unutar '.logo-footer' nije pronađen.");
}

// Carousel za raspored
document.addEventListener("DOMContentLoaded", () => {
   let currentIndex = 0;
   const gamesPerView = 3;
   const track = document.querySelector('.carousel-track');
   const games = document.querySelectorAll('.game');
   const totalGames = games.length;

   function updateCarousel() {
      if (!track) {
         console.error("Carousel track nije pronađen.");
         return;
      }
      const gameWidth = document.querySelector('.game')?.offsetWidth || 0;
      const gap = 20; // isti kao u CSS
      const totalOffset = (gameWidth + gap) * currentIndex;
      track.style.transform = `translateX(-${totalOffset}px)`;
      console.log(`Carousel pomaknut na index ${currentIndex}, offset: ${totalOffset}`); // Debugging
   }

   const leftArrow = document.querySelector('.arrow.left');
   const rightArrow = document.querySelector('.arrow.right');

   if (leftArrow) {
      leftArrow.addEventListener('click', () => {
         if (currentIndex - gamesPerView >= 0) {
            currentIndex -= gamesPerView;
            updateCarousel();
         }
      });
   } else {
      console.error("Lijeva strelica nije pronađena.");
   }

   if (rightArrow) {
      rightArrow.addEventListener('click', () => {
         if (currentIndex + gamesPerView < totalGames) {
            currentIndex += gamesPerView;
            updateCarousel();
         }
      });
   } else {
      console.error("Desna strelica nije pronađena.");
   }

   if (totalGames > 0) {
      updateCarousel(); // Početni prikaz
   }
});

// Ažuriranje Sign In/Profile linka
document.addEventListener("DOMContentLoaded", () => {
   const authLink = document.querySelector(".auth-link.sign-in");

   if (authLink) {
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
   } else {
      console.error("Element s klasom 'auth-link sign-in' nije pronađen.");
   }
});

// Ažuriranje League Pass linka
function updateLeaguePassLink() {
   const purchasedPlan = localStorage.getItem('purchasedPlan');
   const leaguePassLink = document.querySelector('.auth-link.league-pass');

   if (leaguePassLink) {
      if (purchasedPlan) {
         const displayName = purchasedPlan.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
         leaguePassLink.textContent = displayName;
      } else {
         leaguePassLink.textContent = "League Pass";
      }
      console.log(`League Pass link ažuriran na: ${leaguePassLink.textContent}`); // Debugging
   } else {
      console.error("Element s klasom 'auth-link league-pass' nije pronađen.");
   }
}

// Pokretanje ažuriranja League Pass linka
document.addEventListener('DOMContentLoaded', updateLeaguePassLink);

// Slušanje promjena u localStorage-u
window.addEventListener('storage', (event) => {
   if (event.key === 'purchasedPlan') {
      updateLeaguePassLink();
   }
});

// Ažuriranje Get League Pass dugmeta
function updateGetLeaguePassButton() {
   const purchasedPlan = localStorage.getItem('purchasedPlan');
   const getLeaguePassButton = document.querySelector('.cta-button');

   if (getLeaguePassButton) {
      if (purchasedPlan) {
         const displayName = purchasedPlan.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
         getLeaguePassButton.textContent = displayName;
      } else {
         getLeaguePassButton.textContent = "Get League Pass";
      }
      console.log(`Get League Pass dugme ažurirano na: ${getLeaguePassButton.textContent}`); // Debugging
   } else {
      console.error("Element s klasom 'cta-button' nije pronađen.");
   }
}

// Pokretanje ažuriranja Get League Pass dugmeta
document.addEventListener('DOMContentLoaded', updateGetLeaguePassButton);

// Slušanje promjena u localStorage-u za Get League Pass dugme
window.addEventListener('storage', (event) => {
   if (event.key === 'purchasedPlan') {
      updateGetLeaguePassButton();
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