# WebSocket_Live_Quiz_Game

start task data: 23/03/2026

branches:
main
develop -- development branch

Testing in https://websocketking.com/
bash
npm run dev
WebSocket server started on ws://localhost:8080

Get your server in  https://websocketking.com/ click conection

Your will see in bash


Test cases

Not registered
{
  "type": "create_game",
  "data": {
    "questions": [
      {
        "text": "2+2?",
        "options": ["1", "2", "3", "4"],
        "correctIndex": 3,
        "timeLimitSec": 10
      }
    ]
  },
  "id": 3
}


registration
{
  "type": "reg",
  "data": {
    "name": "Mary",
    "password": "1234"
  },
  "id": 0
}

create game

{
  "type": "create_game",
  "data": {
    "questions": [
      {
        "text": "2+2?",
        "options": ["1", "2", "3", "4"],
        "correctIndex": 3,
        "timeLimitSec": 10
      }
    ]
  },
  "id": 1
}

Invalide format
{
  "type": "create_game",
  "data": {
    "questions": [
      {
        "text": "Bad",
        "options": ["1", "2"],
        "correctIndex": 0,
        "timeLimitSec": 10
      }
    ]
  },
  "id": 2
}