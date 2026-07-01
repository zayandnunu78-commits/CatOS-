function openWindow(id) {
  let win = document.getElementById(id);
  if (win) win.style.display = "block";
}

function closeWindow(id) {
  let win = document.getElementById(id);
  if (win) win.style.display = "none";
}

/* 🎮 DUAL SCREEN SIMULATOR LAUNCHER */
function triggerMiniDisplayApp() {
  alert("🎨 Launching SketchPad on Extended Monitor Space! (Running natively inside catConnect Canvas boundaries)");
}

/* 📲 SYSTEM UPDATE CORE ENGINE */
function startSystemUpdate() {
  document.getElementById('update-action-area').style.display = 'none';
  document.getElementById('progress-container').style.display = 'block';

  let progress = 0;
  let progressBar = document.getElementById('update-progress-bar');
  let progressText = document.getElementById('progress-text');

  let downloadInterval = setInterval(function() {
    progress += 2;
    progressBar.style.width = progress + '%';
    progressText.innerText = `Updating components... ${progress}%`;

    if (progress >= 100) {
      clearInterval(downloadInterval);
      progressText.innerText = "Finalizing build rewrite...";
      setTimeout(finishSystemUpdate, 1200);
    }
  }, 50);
}

function finishSystemUpdate() {
  document.getElementById('os-version-tag').innerText = "catOS v9.1";
  document.getElementById('current-version-text').innerText = "v9.1 (Latest)";
  
  let badge = document.getElementById('update-status-badge');
  badge.innerText = "Up to Date";
  badge.style.background = "#1dd1a1";

  document.getElementById('progress-container').style.display = 'none';
  
  let shortcutGrid = document.getElementById('desktop-shortcuts');
  let newIconHtml = `
    <div class="desktop-icon" id="shortcut-widget" onclick="alert('🎮 Widget Utility Ready under build patch v9.1!')">
      <div class="icon-img widget-bg">🎮</div>
      <span>Widget 9.1</span>
    </div>`;
  shortcutGrid.insertAdjacentHTML('beforeend', newIconHtml);

  alert("🎆 catOS successfully upgraded to Build v9.1! Your layout has loaded the new Widget tool.");
}

/* 📁 FILE DIRECTORY SYSTEM FOR FINDER */
let fileSystem = {
  "Root": [
    { name: "Documents", type: "folder", target: "Documents" },
    { name: "Pictures", type: "folder", target: "Pictures" },
    { name: "SystemNote.txt", type: "file", content: "Welcome to catOS v9! Built with Spck Editor." }
  ],
  "Documents": [
    { name: "Homework", type: "folder", target: "Homework" },
    { name: "Todo.txt", type: "file", content: "1. Finish catOS v9\n2. Run custom update module." }
  ],
  "Pictures": [
    { name: "CatWallpaper.png", type: "file", content: "🖼️ Image Data: BlurPurpleCat_v9_Final.png" }
  ],
  "Homework": [
    { name: "Math_Essay.txt", type: "file", content: "Code trees inside vector matrix parameters." }
  ]
};

let currentDirectory = "Root";
let directoryHistory = [];

function renderFinder() {
  let grid = document.getElementById("finder-view-grid");
  let title = document.getElementById("finder-title");
  let backBtn = document.getElementById("back-btn");
  if(!grid) return;
  grid.innerHTML = "";
  title.innerText = `📁 Finder - ${currentDirectory}`;
  backBtn.disabled = directoryHistory.length === 0;
  let items = fileSystem[currentDirectory] || [];
  items.forEach(item => {
    let emoji = item.type === "folder" ? "📁" : "📄";
    let clickAction = item.type === "folder" ? `changeFolder('${item.target}')` : `openFileText('${item.name}', \`${item.content}\`)`;
    grid.insertAdjacentHTML("beforeend", `<div class="finder-item" onclick="${clickAction}"><div class="finder-icon">${emoji}</div><span>${item.name}</span></div>`);
  });
}

function changeFolder(nextDir) { directoryHistory.push(currentDirectory); currentDirectory = nextDir; renderFinder(); }
function goBackFolder() { if (directoryHistory.length > 0) { currentDirectory = directoryHistory.pop(); renderFinder(); } }
function openFileText(filename, textContent) { alert(`📄 File: ${filename}\n\n${textContent}`); }

function createNewFolderPrompt() {
  let folderName = prompt("Enter folder name:");
  if (!folderName) return;
  folderName = folderName.replace(/[^a-zA-Z0-9 ]/g, ""); 
  let targetKey = folderName + "_" + Math.floor(Math.random() * 100);
  fileSystem[currentDirectory].push({ name: folderName, type: "folder", target: targetKey });
  fileSystem[targetKey] = [];
  renderFinder();
  document.getElementById("desktop-shortcuts").insertAdjacentHTML("beforeend", `<div class="desktop-icon" onclick="openWindow('FinderWin'); changeFolder('${targetKey}')"><div class="icon-img folder-bg">📁</div><span>${folderName}</span></div>`);
}

/* 🕒 CLOCK ENGINE */
function syncSystemClock() {
  let now = new Date();
  let hours = now.getHours() % 12 || 12; 
  let minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
  let cleanTime = `${hours}:${minutes} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
  let cleanDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  if (document.getElementById('dock-time')) document.getElementById('dock-time').innerText = cleanTime;
  if (document.getElementById('dock-date')) document.getElementById('dock-date').innerText = cleanDate;
  if (document.getElementById('top-bar-clock')) document.getElementById('top-bar-clock').innerText = `${now.toLocaleDateString('en-US', { weekday: 'short' })}, ${cleanDate} ${cleanTime}`;
}

setInterval(syncSystemClock, 1000);
syncSystemClock();
renderFinder();
