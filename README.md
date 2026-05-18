# xGenius
### Machine Learning Powered Football Shot Intelligence Platform

An interactive full-stack football analytics application that predicts the probability of a football shot becoming a goal (Expected Goals / xG) using machine learning trained exclusively on elite international tournament data.

---

# Overview

xGenius allows users to simulate football shots directly on an interactive pitch and instantly receive an Expected Goals (xG) prediction powered by machine learning.

The platform combines:
- Sports Analytics
- Machine Learning
- Interactive UI/UX
- Real Event Data
- Full-Stack Development

Users can:
- Click anywhere on the football pitch
- Simulate realistic shot scenarios
- Modify shot conditions and context
- Receive real-time xG predictions
- Understand how different factors affect scoring probability

---

# Dataset

The machine learning model is trained exclusively on shots from elite international football tournaments.

## Competitions Used

| Competition | Season |
|---|---|
| African Cup of Nations | 2023 |
| Copa America | 2024 |
| FIFA World Cup | 2018 |
| FIFA World Cup | 2022 |
| UEFA Euro | 2020 |
| UEFA Euro | 2024 |

## Data Source
- StatsBomb Open Data

---

# Core Features

## Interactive Football Pitch
- Click-based shot selection
- Live shot marker visualization
- Accurate football pitch structure
- Clearly labeled:
  - Goal Area
  - Penalty Area
  - Goal
- Real-time coordinate conversion

---

## Real-Time Feature Engineering

Automatically calculates:
- Shot distance
- Shot angle
- Centrality
- Pitch coordinates
- Goal distance

No manual coordinate input required.

---

# Shot Context Simulation

## Body Parts
- Right Foot
- Left Foot
- Other

### "Other" Includes
- Headers
- Chest
- Knee
- Shoulder
- Unusual finishes

---

## Shot Techniques
- Normal Shot
- Volley
- Half Volley
- Lob
- Overhead Kick
- Diving Header

### Technique Explanations

#### Lob
A lifted shot intended to go over the goalkeeper.

#### Overhead Kick
An acrobatic bicycle/scissor kick attempt.

#### Half Volley
Shot taken immediately after the ball bounces.

#### Volley
Shot struck before the ball touches the ground.

#### Diving Header
Header taken while diving forward toward the ball.

---

## Play Patterns
- Regular Play
- Counter Attack
- Free Kick
- Goal Kick
- Keeper Distribution
- Throw In
- Kick Off
- Other

### "Other" Play Patterns Include
- Rebounds
- Loose ball situations
- Broken defensive structures
- Rare possession sequences

---

# Advanced UX Logic

## Header Mode
When "Header" is enabled:
- Body Part automatically becomes:
  - Other
- Technique automatically becomes:
  - Diving Header
- Conflicting options become locked
- Prevents unrealistic football combinations

Example:
- Right Foot + Diving Header → Not allowed

---

## Penalty Logic
When "Penalty" is enabled:
- Automatically returns:
  - xG = 0.76
- Disables unrelated contextual options
- Restricts body parts to:
  - Right Foot
  - Left Foot

This mimics realistic football penalty situations.

---

# What is Expected Goals (xG)?

Expected Goals (xG) is a football analytics metric that estimates the probability of a shot becoming a goal.

Examples:
- 0.10 xG → 10% chance of scoring
- 0.50 xG → 50% chance of scoring
- 0.76 xG → High-quality chance (like a penalty)

The prediction depends on:
- Shot location
- Shot angle
- Distance from goal
- Body part used
- Shot technique
- Pressure from defenders
- Game context

---

# Machine Learning Pipeline

## 1. Data Collection
Collected event-level football shot data from StatsBomb Open Data.

---

## 2. Data Cleaning
Performed:
- Null value handling
- Column filtering
- Tournament filtering
- Feature standardization

---

## 3. Feature Engineering

Engineered features include:
- shot_distance
- shot_angle
- distance_from_center
- x coordinate
- y coordinate
- goal labels

---

## 4. Model Training

Tested multiple machine learning models:
- Logistic Regression
- Random Forest
- XGBoost

---

## 5. Model Evaluation

Evaluation metrics used:
- Accuracy
- Precision
- Recall
- F1 Score
- ROC-AUC

---

# Final Model Performance

| Metric | Score |
|---|---|
| Accuracy | ~89% |
| ROC-AUC | ~0.81 |

---

# Tech Stack

## Frontend
- React
- Tailwind CSS
- Axios

---

## Backend
- FastAPI
- Uvicorn
- Pydantic

---

## Machine Learning
- Pandas
- NumPy
- Scikit-learn
- XGBoost
- Joblib

---

# Project Structure

```bash
xgenius/
│
├── backend/
│   ├── app/
│   ├── model/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── notebooks/
├── data/
├── README.md
└── .gitignore
```

---

# Installation

## 1. Clone Repository

```bash
git clone <your-repository-url>
cd xgenius
```

---

# Backend Setup

## 2. Create Virtual Environment

```bash
cd backend

python -m venv venv
```

---

## 3. Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Mac/Linux

```bash
source venv/bin/activate
```

---

## 4. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

---

## 5. Start FastAPI Server

```bash
uvicorn main:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

---

# Frontend Setup

## 6. Install Frontend Dependencies

```bash
cd frontend

npm install
```

---

## 7. Start React Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# API Endpoint

## POST `/predict`

Predicts Expected Goals probability.

---

## Example Request

```json
{
  "x": 110,
  "y": 40,
  "end_x": 120,
  "end_y": 40,
  "shot_distance": 10.2,
  "shot_angle": 0.92,
  "distance_from_center": 2.1,
  "body_part_name": "Right Foot",
  "technique_name": "Normal",
  "play_pattern_name": "Regular Play",
  "under_pressure": true,
  "shot_first_time": false,
  "shot_one_on_one": false,
  "shot_open_goal": false,
  "shot_deflected": false
}
```

---

## Example Response

```json
{
  "predicted_xg": 0.42
}
```

---

# Key UX Features

- Real-time shot calculations
- Interactive football pitch
- Dynamic football logic validation
- Smart contextual restrictions
- Live xG prediction feedback
- Loading states
- Responsive UI design
- Football-realistic interaction rules

---

# Why This Project Matters

This project demonstrates practical understanding of:
- Machine Learning Engineering
- Sports Analytics
- Feature Engineering
- Model Evaluation
- Frontend Development
- Backend API Development
- Real-Time Data Processing
- Interactive UI/UX Systems

---

# Future Improvements

Potential future upgrades:
- Shot trajectory visualization
- Goalkeeper positioning logic
- Player-specific finishing models
- Team analytics dashboards
- Shot heatmaps
- Match-state context
- Tournament filtering
- Advanced visual analytics
- Model explainability visualizations

---

# Why No Database?

This project currently does not require a database because:
- No authentication system
- No persistent user accounts
- No saved prediction history
- Predictions are generated in real time

The application currently functions as:
- An ML inference platform
- A football analytics tool
- A prediction API system

A database can be added later for:
- User authentication
- Prediction history
- Saved analyses
- Analytics dashboards
- Model monitoring

---

# Learning Outcomes

This project demonstrates:
- Full-Stack Development
- Machine Learning Pipelines
- Feature Engineering
- FastAPI Backend Development
- React Frontend Engineering
- Sports Data Analytics
- API Integration
- Interactive UX Design
- Real-Time Prediction Systems

---

# Author

Built by Nand Joshi

Interests:
- Football Analytics
- Machine Learning
- Data Science
- Full-Stack Engineering

---

# License

This project is intended for:
- Educational purposes
- Portfolio projects
- Learning machine learning systems
- Sports analytics experimentation
