// 福利彩票随机数
for(let i =0; i<5;i++){
  randomFn()
}


function randomFn() {
  let redList = []
  const blue = getRandomNum(1, 16).toString()
  while (redList.length < 6) {
    const red = getRandomNum(1, 33).toString()
    if (!redList.includes(red)) redList.push(red)
  }
  console.log(redList.sort((x,y)=>{return x-y}).join(',') + '|' + blue)
  return redList.join(',') + '|' + blue
}

function getRandomNum(start, end) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * start + 1, 10)
      break
    case 2:
      return parseInt(Math.random() * (end - start + 1) + start, 10)
      break
    default:
      return 0
      break
  }
}
