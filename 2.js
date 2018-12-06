const fs = require('fs')

const counter = fs
  .readFileSync('2.txt')
  .toString()
  .split('\n')
  .reduce(
    (acc, x) => {
      let seen = {}
      let seenTwo = 0
      let seenThree = 0

      x.split('').map(c => {
        seen[c] = seen[c] ? seen[c] + 1 : 1
      })

      Object.keys(seen).map(k => {
        if (seen[k] == 2) seenTwo = 1
        if (seen[k] == 3) seenThree = 1
      })

      acc.twos = acc.twos + seenTwo
      acc.threes = acc.threes + seenThree
      return acc
    },
    { twos: 0, threes: 0 }
  )

console.log(counter.twos * counter.threes)
