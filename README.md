# BMSCE Rocketry Ground Station Dashboard

A high-performance, offline-capable Ground Station dashboard built for the **BMSCE Rocketry** club. This application connects directly to live hardware via the browser's Web Serial API to receive, visualize, and log flight telemetry in real-time.

## Features
- **Live Web Serial Connectivity**: Connect natively to receiver modules (like ESP32/LoRa) directly through the browser at configurable baud rates.
- **Real-Time Data Visualization**: High-performance graphs powered by Recharts plotting Pressure, Temperature (T1/T2), Distance, and a full-trajectory Height vs. Time overview.
- **Automated CSV Logging**: A custom Vite backend plugin automatically timestamps and continuously appends all incoming raw serial data to \public/flight_log.csv\ without user intervention.
- **3D Rocket Orientation**: Live 3D model visualization responding to incoming Pitch, Yaw, and Roll data using React Three Fiber.
- **Offline 2D Mapping**: Fully local GPS mapping plotted on a Leaflet map utilizing locally cached map tiles, ensuring reliability in remote launch environments without internet.
- **Dynamic Distance Calculation**: Uses the Haversine formula to compute accurate 2D surface distance relative to a customizable Ground Station coordinate.

---

## Prerequisites
- **Node.js** (v16.0 or higher recommended)
- A modern browser that supports the **Web Serial API** (Google Chrome or Microsoft Edge).

---

## Installation & Setup

1. **Install Dependencies**  
   Open your terminal in the root of the project (\msce-rocketry-app\) and run:
   \\\ash
   npm install
   \\\

2. **Setup Map Tiles (Offline Mapping)**  
   For the GPS map to work without an internet connection, you need to download the offline tile cache.
   - **Download Link**: [Map Tiles (Google Drive)](https://drive.google.com/file/d/1fl1dtvSjqZJmKBLjTjwtNxQKtdUCdCX2/view?usp=sharing)
   - Once downloaded, extract the contents into the \public/map_tiles\ directory in this project. The final path should look like: \public/map_tiles/{z}/{x}/{y}.png\.

3. **Configure Ground Station Coordinates**  
   Create a \.env\ file in the root of the project. Add your launchpad/ground station GPS coordinates:
   \\\env
   VITE_GROUND_STATION_LAT=12.9410
   VITE_GROUND_STATION_LON=77.5655
   \\\
   *These coordinates are used as the absolute reference point to calculate the live horizontal surface distance to the rocket.*

---

## Running the Dashboard

Start the local development server to enable the UI and the background CSV logger:

\\\ash
npm run dev
\\\

Navigate to \http://localhost:5173\ in Chrome or Edge.

---

## Usage Guide

1. Select the correct **Baud Rate** from the dropdown loop (default is \115200 bps\).
2. Click **START**.
3. A browser security prompt will appear. Select the COM port corresponding to your radio receiver module. 
4. Data will now flow into the dashboard.
5. **CSV Logs**: As soon as valid lines are received, they are appended with your computer's exact current date and time into \public/flight_log.csv\. 

### Expected Serial Data Format

The dashboard parses incoming comma-separated strings. It differentiates packet types by the leading ID number:

- **Packet Type 1 (IMU/Altimeter)**:  
  \1,vx,vy,vz,ax,ay,az,roll,pitch,yaw,alt,pressure\
- **Packet Type 2 (GPS/Temperature/Battery)**:  
  \2,lat,lon,vbat,current,t1,t2\

---

## Built With
- **React + Vite** (Frontend Framework & Tooling)
- **Recharts** (Data Visualization)
- **Three.js & @react-three/fiber** (3D Rendering)
- **Leaflet & react-leaflet** (2D Map Routing)

