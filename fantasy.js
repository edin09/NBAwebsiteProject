const logoElement = document.querySelector('.logo');
if (logoElement) {
   logoElement.addEventListener('click', () => {
      window.location.href = 'index.html';
   });
} else {
   console.error("Element s klasom 'logo' nije pronađen.");
}

// Target the footer logo specifically
const footerLogoElement = document.querySelector('.logo-footer .logo');
if (footerLogoElement) {
   footerLogoElement.addEventListener('click', () => {
      window.location.href = 'index.html';
   });
} else {
   console.error("Element s klasom 'logo' unutar '.logo-footer' nije pronađen.");
}

let slideIndex = 0;
let slideTimeout; // Store the timeout ID

function showSlides() {
   let slides = document.getElementsByClassName("hero-img");
   let dots = document.getElementsByClassName("dot");

   // Hide all slides and remove active dot
   for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
      dots[i].classList.remove("active");
   }

   // Increment index and reset if needed
   slideIndex++;
   if (slideIndex > slides.length) {
      slideIndex = 1;
   }

   // Show current slide and active dot
   slides[slideIndex - 1].classList.add("active");
   dots[slideIndex - 1].classList.add("active");

   // Clear any existing timeout and set new one
   clearTimeout(slideTimeout);
   slideTimeout = setTimeout(showSlides, 5000); // 5-second delay
}

function currentSlide(n) {
   clearTimeout(slideTimeout); // Clear existing timeout
   slideIndex = n - 1; // Set new index
   showSlides(); // Show the selected slide
}

// Start the slideshow
showSlides();


const budget = 100000000;
let spent = 0;
let totalPoints = 0;
let team = [];
let savedTeams = []; // Niz za spremljene timove

const positionLimits = {
   PG: 1,
   SG: 1,
   SF: 1,
   PF: 1,
   C: 1
};
const positionOrder = ['PG', 'SG', 'SF', 'PF', 'C'];

function calculatePoints(stats) {
   return (
      stats.pts * 1 +
      stats.reb * 1.5 +
      stats.ast * 1.2 +
      stats.stl * 3 +
      stats.blk * 3 +
      stats.miss * -1
   );
}

const players = [{
      name: "LeBron James",
      pos: "SF",
      price: 20000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/2544.png",
      stats: {
         pts: 27,
         reb: 7,
         ast: 7,
         stl: 1,
         blk: 0,
         miss: 8
      }
   },
   {
      name: "Stephen Curry",
      pos: "PG",
      price: 18000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/201939.png",
      stats: {
         pts: 29,
         reb: 5,
         ast: 6,
         stl: 1,
         blk: 0,
         miss: 10
      }
   },
   {
      name: "Kevin Durant",
      pos: "SF",
      price: 17500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/201142.png",
      stats: {
         pts: 28,
         reb: 6,
         ast: 5,
         stl: 1,
         blk: 1,
         miss: 9
      }
   },
   {
      name: "Giannis Antetokounmpo",
      pos: "PF",
      price: 19000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/203507.png",
      stats: {
         pts: 30,
         reb: 11,
         ast: 6,
         stl: 1,
         blk: 1,
         miss: 12
      }
   },
   {
      name: "Nikola Jokic",
      pos: "C",
      price: 19500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/203999.png",
      stats: {
         pts: 25,
         reb: 12,
         ast: 9,
         stl: 1,
         blk: 0,
         miss: 7
      }
   },
   {
      name: "Luka Doncic",
      pos: "PG",
      price: 18500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1629029.png",
      stats: {
         pts: 32,
         reb: 8,
         ast: 8,
         stl: 1,
         blk: 0,
         miss: 13
      }
   },
   {
      name: "Jayson Tatum",
      pos: "SF",
      price: 17000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1628369.png",
      stats: {
         pts: 26,
         reb: 8,
         ast: 4,
         stl: 1,
         blk: 1,
         miss: 11
      }
   },
   {
      name: "Joel Embiid",
      pos: "C",
      price: 18000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/203954.png",
      stats: {
         pts: 31,
         reb: 10,
         ast: 4,
         stl: 1,
         blk: 1,
         miss: 14
      }
   },
   {
      name: "Jimmy Butler",
      pos: "SG",
      price: 16500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/202710.png",
      stats: {
         pts: 22,
         reb: 6,
         ast: 5,
         stl: 2,
         blk: 0,
         miss: 9
      }
   },
   {
      name: "Devin Booker",
      pos: "SG",
      price: 17000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1626164.png",
      stats: {
         pts: 27,
         reb: 4,
         ast: 6,
         stl: 1,
         blk: 0,
         miss: 11
      }
   },
   {
      name: "Damian Lillard",
      pos: "PG",
      price: 17500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/203081.png",
      stats: {
         pts: 27,
         reb: 4,
         ast: 7,
         stl: 1,
         blk: 0,
         miss: 10
      }
   },
   {
      name: "Kawhi Leonard",
      pos: "SF",
      price: 18000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/202695.png",
      stats: {
         pts: 24,
         reb: 6,
         ast: 4,
         stl: 2,
         blk: 1,
         miss: 8
      }
   },
   {
      name: "Anthony Davis",
      pos: "C",
      price: 18500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/203076.png",
      stats: {
         pts: 25,
         reb: 11,
         ast: 3,
         stl: 1,
         blk: 2,
         miss: 9
      }
   },
   {
      name: "Shai Gilgeous-Alexander",
      pos: "PG",
      price: 17000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1628983.png",
      stats: {
         pts: 30,
         reb: 5,
         ast: 6,
         stl: 2,
         blk: 0,
         miss: 11
      }
   },
   {
      name: "Donovan Mitchell",
      pos: "SG",
      price: 16500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1628378.png",
      stats: {
         pts: 28,
         reb: 4,
         ast: 5,
         stl: 1,
         blk: 0,
         miss: 10
      }
   },
   {
      name: "Ja Morant",
      pos: "PG",
      price: 16500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1629630.png",
      stats: {
         pts: 26,
         reb: 5,
         ast: 7,
         stl: 1,
         blk: 0,
         miss: 12
      }
   },
   {
      name: "Kyrie Irving",
      pos: "PG",
      price: 17000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/202681.png",
      stats: {
         pts: 25,
         reb: 4,
         ast: 6,
         stl: 1,
         blk: 0,
         miss: 9
      }
   },
   {
      name: "De’Aaron Fox",
      pos: "PG",
      price: 16000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1628368.png",
      stats: {
         pts: 26,
         reb: 4,
         ast: 6,
         stl: 2,
         blk: 0,
         miss: 10
      }
   },
   {
      name: "Paul George",
      pos: "SF",
      price: 17000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/202331.png",
      stats: {
         pts: 23,
         reb: 6,
         ast: 4,
         stl: 1,
         blk: 0,
         miss: 8
      }
   },
   {
      name: "Trae Young",
      pos: "PG",
      price: 16500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1629027.png",
      stats: {
         pts: 26,
         reb: 3,
         ast: 10,
         stl: 1,
         blk: 0,
         miss: 12
      }
   },
   {
      name: "Zion Williamson",
      pos: "PF",
      price: 16500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1629627.png",
      stats: {
         pts: 25,
         reb: 7,
         ast: 4,
         stl: 1,
         blk: 1,
         miss: 10
      }
   },
   {
      name: "Jaylen Brown",
      pos: "SG",
      price: 16500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1627759.png",
      stats: {
         pts: 24,
         reb: 6,
         ast: 3,
         stl: 1,
         blk: 0,
         miss: 9
      }
   },
   {
      name: "DeMar DeRozan",
      pos: "SF",
      price: 16000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/201942.png",
      stats: {
         pts: 24,
         reb: 5,
         ast: 5,
         stl: 1,
         blk: 0,
         miss: 8
      }
   },
   {
      name: "Khris Middleton",
      pos: "SF",
      price: 15500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/203114.png",
      stats: {
         pts: 20,
         reb: 5,
         ast: 5,
         stl: 1,
         blk: 0,
         miss: 8
      }
   },
   {
      name: "Pascal Siakam",
      pos: "PF",
      price: 16000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1627783.png",
      stats: {
         pts: 22,
         reb: 7,
         ast: 4,
         stl: 1,
         blk: 0,
         miss: 9
      }
   },
   {
      name: "Domantas Sabonis",
      pos: "C",
      price: 16500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1627734.png",
      stats: {
         pts: 20,
         reb: 12,
         ast: 7,
         stl: 1,
         blk: 0,
         miss: 7
      }
   },
   {
      name: "Julius Randle",
      pos: "PF",
      price: 16000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/203944.png",
      stats: {
         pts: 22,
         reb: 9,
         ast: 4,
         stl: 1,
         blk: 0,
         miss: 10
      }
   },
   {
      name: "Brandon Ingram",
      pos: "SF",
      price: 16000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1627742.png",
      stats: {
         pts: 23,
         reb: 5,
         ast: 5,
         stl: 1,
         blk: 0,
         miss: 9
      }
   },
   {
      name: "Tyrese Haliburton",
      pos: "PG",
      price: 16000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1630169.png",
      stats: {
         pts: 20,
         reb: 4,
         ast: 10,
         stl: 1,
         blk: 0,
         miss: 8
      }
   },
   {
      name: "Lauri Markkanen",
      pos: "PF",
      price: 15500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1628374.png",
      stats: {
         pts: 23,
         reb: 8,
         ast: 2,
         stl: 1,
         blk: 0,
         miss: 9
      }
   },
   {
      name: "Deandre Ayton",
      pos: "C",
      price: 15500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1629028.png",
      stats: {
         pts: 18,
         reb: 10,
         ast: 2,
         stl: 1,
         blk: 1,
         miss: 7
      }
   },
   {
      name: "Fred VanVleet",
      pos: "PG",
      price: 15000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1627832.png",
      stats: {
         pts: 19,
         reb: 4,
         ast: 7,
         stl: 1,
         blk: 0,
         miss: 8
      }
   },
   {
      name: "Jrue Holiday",
      pos: "PG",
      price: 15500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/201950.png",
      stats: {
         pts: 18,
         reb: 4,
         ast: 6,
         stl: 2,
         blk: 0,
         miss: 7
      }
   },
   {
      name: "Darius Garland",
      pos: "PG",
      price: 15000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1629636.png",
      stats: {
         pts: 20,
         reb: 3,
         ast: 7,
         stl: 1,
         blk: 0,
         miss: 8
      }
   },
   {
      name: "Myles Turner",
      pos: "C",
      price: 15000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1626167.png",
      stats: {
         pts: 17,
         reb: 7,
         ast: 1,
         stl: 1,
         blk: 2,
         miss: 7
      }
   },
   {
      name: "Bam Adebayo",
      pos: "C",
      price: 16000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1628389.png",
      stats: {
         pts: 19,
         reb: 10,
         ast: 4,
         stl: 1,
         blk: 1,
         miss: 8
      }
   },
   {
      name: "Desmond Bane",
      pos: "SG",
      price: 15500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1630217.png",
      stats: {
         pts: 22,
         reb: 5,
         ast: 4,
         stl: 1,
         blk: 0,
         miss: 9
      }
   },
   {
      name: "Jaren Jackson Jr.",
      pos: "PF",
      price: 15500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1628991.png",
      stats: {
         pts: 21,
         reb: 6,
         ast: 2,
         stl: 1,
         blk: 2,
         miss: 9
      }
   },
   {
      name: "C.J. McCollum",
      pos: "SG",
      price: 15000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/203468.png",
      stats: {
         pts: 20,
         reb: 4,
         ast: 5,
         stl: 1,
         blk: 0,
         miss: 8
      }
   },
   {
      name: "Zach LaVine",
      pos: "SG",
      price: 15500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/203897.png",
      stats: {
         pts: 22,
         reb: 4,
         ast: 4,
         stl: 1,
         blk: 0,
         miss: 9
      }
   },
   {
      name: "Aaron Gordon",
      pos: "PF",
      price: 15000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/203932.png",
      stats: {
         pts: 16,
         reb: 7,
         ast: 3,
         stl: 1,
         blk: 1,
         miss: 6
      }
   },
   {
      name: "Mikal Bridges",
      pos: "SF",
      price: 15500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1628969.png",
      stats: {
         pts: 20,
         reb: 5,
         ast: 3,
         stl: 1,
         blk: 0,
         miss: 8
      }
   },
   {
      name: "OG Anunoby",
      pos: "SF",
      price: 15000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1628384.png",
      stats: {
         pts: 17,
         reb: 5,
         ast: 2,
         stl: 1,
         blk: 1,
         miss: 7
      }
   },
   {
      name: "Rudy Gobert",
      pos: "C",
      price: 15500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/203497.png",
      stats: {
         pts: 14,
         reb: 12,
         ast: 1,
         stl: 1,
         blk: 2,
         miss: 5
      }
   },
   {
      name: "Clint Capela",
      pos: "C",
      price: 14500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/202330.png",
      stats: {
         pts: 12,
         reb: 11,
         ast: 1,
         stl: 1,
         blk: 1,
         miss: 5
      }
   },
   {
      name: "Draymond Green",
      pos: "PF",
      price: 15000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/203110.png",
      stats: {
         pts: 9,
         reb: 7,
         ast: 6,
         stl: 1,
         blk: 1,
         miss: 4
      }
   },
   {
      name: "Chris Paul",
      pos: "PG",
      price: 14500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/101108.png",
      stats: {
         pts: 12,
         reb: 4,
         ast: 8,
         stl: 1,
         blk: 0,
         miss: 5
      }
   },
   {
      name: "Klay Thompson",
      pos: "SG",
      price: 15000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/202691.png",
      stats: {
         pts: 18,
         reb: 3,
         ast: 2,
         stl: 1,
         blk: 0,
         miss: 8
      }
   },
   {
      name: "Anfernee Simons",
      pos: "SG",
      price: 14500000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1627736.png",
      stats: {
         pts: 21,
         reb: 3,
         ast: 5,
         stl: 1,
         blk: 0,
         miss: 9
      }
   },
   {
      name: "Paolo Banchero",
      pos: "PF",
      price: 15000000,
      img: "https://cdn.nba.com/headshots/nba/latest/260x190/1631094.png",
      stats: {
         pts: 22,
         reb: 7,
         ast: 4,
         stl: 1,
         blk: 0,
         miss: 10
      }
   }
];

function renderPlayers() {
   const list = document.getElementById("player-list");
   list.innerHTML = "";
   players.forEach((p, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td>
        <div class="player-info">
          <img src="${p.img}" alt="${p.name}" class="player-img">
          <span>${p.name}</span>
        </div>
      </td>
      <td>${p.pos}</td>
      <td>$${p.price.toLocaleString()}</td>
      <td>${calculatePoints(p.stats).toFixed(1)}</td>
      <td><button onclick="addPlayer(${index}, this)">Add</button></td>
    `;
      list.appendChild(tr);
   });
}

function addPlayer(index, btn) {
   const player = players[index];

   if (spent + player.price > budget) {
      alert("Not enough budget!");
      return;
   }

   if (team.length >= 5) { // Promijenjeno na 5 jer je svaka pozicija ograničena na 1
      alert("Max 5 players!");
      return;
   }

   const posCount = team.filter(p => p.pos === player.pos).length;
   if (posCount >= positionLimits[player.pos]) {
      alert(`Pozicija ${player.pos} je već zauzeta!`);
      return;
   }

   team.push(player);
   spent += player.price;
   totalPoints += calculatePoints(player.stats);

   updateStats();
   renderTeam();
   btn.disabled = true;

   // Onemogući sva dugmad za istu poziciju
   const playerButtons = document.querySelectorAll(".players button");
   players.forEach((p, i) => {
      if (p.pos === player.pos) {
         playerButtons[i].disabled = true;
      }
   });

   if (team.length === 5) {
      document.getElementById("save-team-section").style.display = "block";
   } else {
      document.getElementById("save-team-section").style.display = "none";
   }
}

function removePlayer(name, pos, price, points, btn) {
   team = team.filter(p => p.name !== name);
   spent -= price;
   totalPoints -= points;
   updateStats();
   renderTeam();

   // Omogući sva dugmad za tu poziciju
   const playerButtons = document.querySelectorAll(".players button");
   players.forEach((p, i) => {
      if (p.pos === pos && !team.some(tp => tp.name === p.name)) {
         playerButtons[i].disabled = false;
      }
   });

   if (team.length < 5) {
      document.getElementById("save-team-section").style.display = "none";
   }
}

function renderTeam() {
   const teamList = document.getElementById("team-list");
   teamList.innerHTML = "";

   const sortedTeam = positionOrder.map(pos => team.find(p => p.pos === pos)).filter(p => p);

   sortedTeam.forEach(player => {
      const card = document.createElement("div");
      card.classList.add("team-card");
      card.innerHTML = `
      <button class="remove-btn" onclick="removePlayer('${player.name}', '${player.pos}', ${player.price}, ${calculatePoints(player.stats)}, this)">X</button>
      <img src="${player.img}" alt="${player.name}">
      <strong>${player.name}</strong>
      <p>${player.pos}</p>
      <p>$${player.price.toLocaleString()}</p>
      <p>FP: ${calculatePoints(player.stats).toFixed(1)}</p>
    `;
      teamList.appendChild(card);
   });
}

function updateStats() {
   document.getElementById("spent").innerText = `$${spent.toLocaleString()}`;
   document.getElementById("budget").innerText = `$${(budget - spent).toLocaleString()}`;
   document.getElementById("points").innerText = totalPoints.toFixed(1);
}

function saveTeam() {
   const teamName = document.getElementById("team-name").value.trim();
   if (!teamName) {
      alert("Please enter a team name!");
      return;
   }

   if (team.length !== 5) {
      alert("You must have exactly 5 players to save the team!");
      return;
   }

   const savedTeam = {
      name: teamName,
      players: [...team],
      totalPoints: totalPoints,
      totalSpent: spent
   };

   savedTeams.push(savedTeam);
   renderSavedTeams();

   team = [];
   spent = 0;
   totalPoints = 0;
   updateStats();
   document.getElementById("team-list").innerHTML = "";
   document.getElementById("team-name").value = "";
   document.getElementById("save-team-section").style.display = "none";

   const playerButtons = document.querySelectorAll(".players button");
   playerButtons.forEach(btn => btn.disabled = false);
}

function deleteTeam(index) {
   savedTeams.splice(index, 1);
   renderSavedTeams();
}

function renderSavedTeams() {
   const savedTeamList = document.getElementById("saved-team-list");
   const noSavedTeams = document.getElementById("no-saved-teams");
   savedTeamList.innerHTML = "";

   if (savedTeams.length === 0) {
      noSavedTeams.style.display = "block";
   } else {
      noSavedTeams.style.display = "none";
      savedTeams.forEach((savedTeam, index) => {
         const teamDiv = document.createElement("div");
         teamDiv.classList.add("saved-team");

         // Sortiraj igrače po pozicijama prema positionOrder
         const sortedPlayers = positionOrder.map(pos => savedTeam.players.find(p => p.pos === pos)).filter(p => p);

         teamDiv.innerHTML = `
        <h4>${savedTeam.name}</h4>
        <p>Total Points: ${savedTeam.totalPoints.toFixed(1)}</p>
        <p>Total Spent: $${savedTeam.totalSpent.toLocaleString()}</p>
        <div class="saved-team-grid">
          ${sortedPlayers.map(player => `
            <div class="team-card">
              <img src="${player.img}" alt="${player.name}">
              <strong>${player.name}</strong>
              <p>${player.pos}</p>
              <p>$${player.price.toLocaleString()}</p>
              <p>FP: ${calculatePoints(player.stats).toFixed(1)}</p>
            </div>
          `).join("")}
        </div>
        <button class="delete-team-btn" onclick="deleteTeam(${index})">Delete Team</button>
      `;
         savedTeamList.appendChild(teamDiv);
      });
   }
}

function openTab(tabId) {
   document.querySelectorAll(".tab-content").forEach(tab => {
      tab.classList.remove("active");
   });
   document.querySelectorAll(".tab-button").forEach(button => {
      button.classList.remove("active");
   });
   document.getElementById(tabId).classList.add("active");
   document.querySelector(`.tab-button[onclick="openTab('${tabId}')"]`).classList.add("active");
}

renderPlayers();

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