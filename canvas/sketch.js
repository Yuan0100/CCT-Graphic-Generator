const bgColor = "#f8f9fb"

//控制介面
const controls = {
  gridType: 'none',
  shape1: 'arc',
  shape2: 'original',
  // columnNum: 5,
  // rowNum: 5,
  // grid: false,
  // spiral: false,
  // star: false
  // graphicStroke: true,
  // darkTheme: false,
  // color: false
}
const gui = new dat.GUI()
gui.add(controls, 'gridType', ['none', 'grid', 'spiral', 'star'])
gui.add(controls, 'shape1', ['original', 'arc', 'ellipse', 'circle', 'line', 'triangle', 'quad', 'rect', 'square'])
gui.add(controls, 'shape2', ['original', 'arc', 'ellipse', 'circle', 'line', 'triangle', 'quad', 'rect', 'square'])
// gui.add(controls, 'columnNum').step(1).max(12).min(3)
// gui.add(controls, 'rowNum').step(1).max(12).min(3)

//---

const grid = new Grid({
  w: 300,
  h: 300,
  cNum: 10,
  rNum: 10
});

let gridPos
let randomSystemArr = ['grid', 'spiral', 'star']

let randomShapeArr = ['arc', 'ellipse', 'circle', 'line', 'triangle', 'quad', 'rect', 'square']

let shapeData1, shapeData2
let shape1 = []
let shape2 = []
let graphics =[]

let shape
let randomShape1
let randomShape2

function setup() {
  createCanvas(grid.canvasWidth*1.5, grid.canvasHeight*1.5);
  // gridPos = grid.getRandomPos(random(randomSystemArr))
  randomShape1 = random(randomShapeArr)
  randomShape2 = random(randomShapeArr)

  let datas = []

  for(var i=0; i<2; i++){
    shape = new Shape({
      shape: int(random(randomShapeArr.length)),
      count: int(random(3,6)),
      system: random(randomSystemArr),
      size: 10*random(1, 1.2),
      ratio: 1.618
    })
    randomDatas = shape.getRandomData()
    
    datas.push(randomDatas)
  }

  shape1 = datas[0]
  shape2 = datas[1]

  graphics = datas[0].concat(datas[1])
  graphics.sort((a,b) => {
    return b.size - a.size
  })

  console.log('shape1 >>> ', shape1);
  console.log('shape2 >>> ', shape2);
  console.log(graphics);

}

// function windowResized(){
//   resizeCanvas(windowWidth, windowHeight);
// }

function draw(){
  // --- GUI
  push()
    if(controls.gridType === 'grid'){
      background(bgColor)
      grid.drawGrid()
    }else if(controls.gridType === 'spiral'){
      background(bgColor)
      grid.drawSpiral()
    }else if(controls.gridType === 'star'){
      background(bgColor)
      grid.drawStar()
    }else if(controls.gridType === 'none'){
      background(bgColor)
    }

    if(controls.shape1 != 'original'){
      shape1.forEach(d => {
        d.shape = controls.shape1
      })
    }else{
      shape1.forEach(d => {
        d.shape = randomShape1
      })
    }
    if(controls.shape2 != 'original'){
      shape2.forEach(d => {
        d.shape = controls.shape2
      })
    }else{
      shape2.forEach(d => {
        d.shape = randomShape2
      })
    }
    
    graphics = shape1.concat(shape2)
    graphics.sort((a,b) => {
      return b.size - a.size
    })

  pop()

  // --- 開始畫
  push()
    graphics.forEach(d => {
      if(d.shape === 'arc'){
        shape.drawArc(d)
      }
      if(d.shape === 'ellipse'){
        shape.drawEllipse(d)
      }
      if(d.shape === 'circle'){
        shape.drawCircle(d)
      }
      if(d.shape === 'line'){
        shape.drawLine(d)
      }
      if(d.shape === 'triangle'){
        shape.drawTriangle(d)
      }
      if(d.shape === 'quad'){
        shape.drawQuad(d)
      }
      if(d.shape === 'rect'){
        shape.drawRect(d)
      }
      if(d.shape === 'square'){
        shape.drawSquare(d)
      }

    })
  pop()

}