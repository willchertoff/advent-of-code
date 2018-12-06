const fs = require('fs')

let file = fs.readFileSync('5.txt').toString()

let data = fs.readFileSync('5.txt').toString().split('')

const pair = (f, s) => typeof f === 'string' && typeof s === 'string' && (f !== s && f.toLowerCase() === s.toLowerCase())




const p1 = (data) => {
  
  let still = true
  let tst = data
  loopG:
    while (still) {
      for (let i = 0; i < tst.length; i++) {
        if (pair(tst[i], tst[i + 1])) {
          tst.splice(i, 2)
          continue loopG
        }
      }
  
      still = false
  
    }
    return tst
}

const p2 = () => {
  let shortestLength = file.length

  const caps = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
  const replaceAll = (str, find, replace) => str.replace(new RegExp(find, 'g'), replace);

  caps.map(c => {
    let tmpData = file

    tmpData = replaceAll(tmpData, c, "")
    tmpData = replaceAll(tmpData, c.toLowerCase(), "")

    const tst = p1(tmpData.split(''))

    if (tst.length < shortestLength) {
      shortestLength = tst.length
    }
  })

  return shortestLength
}

// console.log(p1('dabAcCaCBAcCcaDA'.split('')))
console.log(p2())


