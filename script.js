const internetSpeed = document.getElementById("internet-speed");
const cpuUtilization = document.getElementById("cpu-utilization");
const memoryUsage = document.getElementById("memory-usage");
const currentTime = document.getElementById("current-time");

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
    document.getElementById("terminal").style.display = "block";
    document.getElementById('texter').focus();
    
}

// Function to close the terminal
function closeTerminal() {
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
