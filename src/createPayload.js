const createPayload = (player, hash, questionId, vID) => {
  return {
    "roomHash": hash,
    "playerId": player,
    "response": {
      "attempt": 0,
      "questionId": questionId,
      "questionType": "BLANK",
      "response": {
        "version": "2.0",
        "text": "xxx999xxx",
        "media": null
      },
      "responseType": "original",
      "timeTaken": 0,
      "isEvaluated": false,
      "state": "attempted",
      "provisional": {
        "scores": {
          "correct": 960,
          "incorrect": -960
        },
        "scoreBreakups": {
          "correct": {
            "base": 600,
            "timer": 360,
            "streak": 0,
            "total": 960,
            "powerups":[]
          },
          "incorrect": {
            "base": 1000,
            "timer": 1000,
            "streak": 20,
            "total": 2000,
            "powerups": []
          }
        },
        "teamAdjustments": {
          "correct": 0,
          "incorrect": 0
        }
      }
    },
    "questionId": questionId,
    "powerupEffects": {
      "destroy": []
    },
    "gameType": "live",
    "quizVersionId": vID
  }
}


module.exports = createPayload