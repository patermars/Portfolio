const internetSpeed = document.getElementById("internet-speed");
const cpuUtilization = document.getElementById("cpu-utilization");
const memoryUsage = document.getElementById("memory-usage");
const currentTime = document.getElementById("current-time");
const window_name=document.getElementById("window_name");
const uptimeElement = document.getElementById("uptime");
const powerContent = document.querySelector('.power-content');
const startTime = Date.now();
let isDialogOpen = false;

// Function to generate random values for internet speed, CPU utilization, and memory usage
function getRandomValues() {
    const download_internetSpeedValue = Math.floor(Math.random() * 1000) + 100;
    const upload_internetSpeedValue = Math.floor(Math.random() * 1000) + 100;
    const cpuUtilizationValue = Math.floor(Math.random() * 100) + 1;
    const memoryUsageValue = Math.floor(Math.random() * 1000) + 100;

    return {
        internetSpeedValue: `${download_internetSpeedValue}KB &darr;&uarr; ${upload_internetSpeedValue}KB`,
        cpuUtilizationValue: `CPU ${Math.floor(Math.random() * 5)}.${Math.floor(Math.random() * 10)}GHz ${cpuUtilizationValue}%`,
        memoryUsageValue: `${memoryUsageValue}M`,
    };
}

// Update the values every 2 seconds
setInterval(() => {
    const { internetSpeedValue, cpuUtilizationValue, memoryUsageValue } = getRandomValues();
    internetSpeed.innerHTML = internetSpeedValue;
    cpuUtilization.innerHTML = cpuUtilizationValue;
    memoryUsage.innerHTML = memoryUsageValue;
}, 2000);

// Update the current time every second
setInterval(() => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    currentTime.textContent = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}, 1000);

// Function to open the terminal
function openTerminal() {
    window_name.innerText="Terminal";
    document.getElementById("terminal").style.display = "block";
    document.getElementById('texter').focus();
    
}

// Function to close the terminal
function closeTerminal() {
    window_name.innerText="Desktop";
    document.getElementById("terminal").style.display = "none";

    
}

// Event listener for keydown to open terminal
window.addEventListener("keydown", (event) => {
    if ((event.key === "t" ) && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        openTerminal();
    }
});

// Prevent other shortcuts
window.addEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey) {
        event.preventDefault();
    }
});

document.addEventListener('mousemove', hideOverlay);
document.addEventListener('keydown', hideOverlay);

// Function to check if the click is outside the power-content element
function handleClickOutside(event) {
    if (isDialogOpen && !powerContent.contains(event.target)) {
        closeDialog();
    }
}

function power() {
    document.getElementById('power').style.display = 'flex';
    isDialogOpen = true;
    window_name.innerText="Rofi";

    // Add a small delay before adding the event listener
    setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
    }, 100);
}

function closeDialog() {
    isDialogOpen = false;
    window_name.innerText="Desktop";
    document.getElementById('power').style.display = 'none';
    document.removeEventListener('click', handleClickOutside);
}

function shutdown() {
    window.location.href = "shutdown.html"; //Moves to shutdown.html as windows.close() didn't worked.
}

function restart() {
    window.location.reload(); // Reloads the current page
}

function suspend() {
    document.getElementById('overlay').classList.add('visible');
}

function hideOverlay() {
    document.getElementById('overlay').classList.remove('visible');
}

function updateUptime() {
    const now = Date.now();
    const uptime = now - startTime;

    const hours = Math.floor(uptime / (1000 * 60 * 60));
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((uptime % (1000 * 60)) / 1000);

    uptimeElement.textContent = `Uptime: ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

setInterval(updateUptime, 1000);