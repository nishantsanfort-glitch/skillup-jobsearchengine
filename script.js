// Skill data
const skillsData = {
  coding: {
    roles: ["Software Developer", "Web Developer", "Data Analyst"],
    tip: "Start with one language like JavaScript or Python and build small projects."
  },
  design: {
    roles: ["UI/UX Designer", "Graphic Designer", "Visual Designer"],
    tip: "Create a portfolio and practice using Figma or Adobe XD."
  },
  marketing: {
    roles: ["Digital Marketer", "SEO Specialist", "Social Media Manager"],
    tip: "Learn SEO basics and run small campaigns on social platforms."
  }
};

// DOM elements
const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const resultBox = document.querySelector(".result p");
const skillCards = document.querySelectorAll(".skill-card");

// Search function
function findCareer(skill) {
  const key = skill.toLowerCase().trim();

  if (!skillsData[key]) {
    resultBox.innerHTML = "No match found. Try: coding, design, marketing.";
    return;
  }

  const data = skillsData[key];
  resultBox.innerHTML =
    `<strong>${data.roles.join(", ")}</strong><br>Tip: ${data.tip}`;
}

// Button click
searchButton.addEventListener("click", () => {
  findCareer(searchInput.value);
});

// Enter key support
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    findCareer(searchInput.value);
  }
});

// Click on skill cards
skillCards.forEach(card => {
  card.addEventListener("click", () => {
    const skillName = card.querySelector("h3").innerText;
    searchInput.value = skillName;
    findCareer(skillName);
  });
});

// Toggle Chatbox Open / Close
function toggleChat() {
  const chatbox = document.getElementById("chatbox");

  if (chatbox.style.display === "flex") {
    chatbox.style.display = "none";
  } else {
    chatbox.style.display = "flex";
  }
}

// Send User Message
function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBody = document.getElementById("chatBody");

  const userText = input.value.trim();
  if (userText === "") return;

  // User Message
  const userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.innerText = userText;
  chatBody.appendChild(userMsg);

  // Bot Response Logic
  let botReply = "Please enter skills like coding, design, or marketing.";

  const text = userText.toLowerCase();

  if (text.includes("coding") || text.includes("programming")) {
    botReply = "💻 Suggested Jobs: Software Developer, Web Developer, Data Analyst";
  } 
  else if (text.includes("design")) {
    botReply = "🎨 Suggested Jobs: UI/UX Designer, Graphic Designer";
  } 
  else if (text.includes("marketing")) {
    botReply = "📢 Suggested Jobs: Digital Marketer, SEO Specialist, Content Creator";
  }
  else if (text.includes("hello") || text.includes("hi")) {
    botReply = "👋 Hi! Tell me your skills to find matching careers.";
  }

  // Bot Message (Delayed)
  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.className = "bot-msg";
    botMsg.innerText = botReply;
    chatBody.appendChild(botMsg);

    chatBody.scrollTop = chatBody.scrollHeight;
  }, 500);

  input.value = "";
}