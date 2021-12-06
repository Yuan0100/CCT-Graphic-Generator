const bgColor = "#000000"
const strokeColor = "#ffffff"

//控制介面
const controls = {
  gridType: 'none',

  showGraph1: true,
  shape1: 'random',

  showGraph2: true,
  shape2: 'random',
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
const f1 = gui.addFolder('graph1')
const f2 = gui.addFolder('graph2')
f1.add(controls, 'showGraph1')
f1.add(controls, 'shape1', ['random', 'arc', 'ellipse', 'circle', 'line', 'triangle', 'quad', 'rect', 'square'])
f2.add(controls, 'showGraph2')
f2.add(controls, 'shape2', ['random', 'arc', 'ellipse', 'circle', 'line', 'triangle', 'quad', 'rect', 'square'])
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

let cnv

function setup() {
  cnv = createCanvas(grid.canvasWidth, grid.canvasHeight);
  // gridPos = grid.getRandomPos(random(randomSystemArr))
  randomShape1 = random(randomShapeArr)
  randomShape2 = random(randomShapeArr)

  let datas = []

  for(var i=0; i<2; i++){
    shape = new Shape({
      shape: int(random(randomShapeArr.length)),
      count: int(random(3,6)),
      system: random(randomSystemArr),
      // size: 10*random(1, 1.2),
      size: 0.8*grid.canvasWidth/grid.columnNum*3,
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

  noLoop()
}

// function windowResized(){
//   resizeCanvas(windowWidth, windowHeight);
// }

function draw(){
  // --- GUI
  push()

    if(controls.shape1 != 'random'){
      shape1.forEach(d => {
        d.shape = controls.shape1
      })
    }else{
      shape1.forEach(d => {
        d.shape = randomShape1
      })
    }
    if(controls.shape2 != 'random'){
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

  if(!controls.showGraph1){
    graphics = shape2
    graphics.sort((a,b) => {
      return b.size - a.size
    })
  }
  if(!controls.showGraph2){
    graphics = shape1
    graphics.sort((a,b) => {
      return b.size - a.size
    })
  }
  if(controls.showGraph1 || controls.showGraph2){
    // --- 開始畫
    angleMode(RADIANS)
    stroke(strokeColor)
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

  push()
    stroke('rgba(0, 255, 255, 0.7)')
    if(controls.gridType === 'grid'){
      // background(bgColor)
      grid.drawGrid()
    }else if(controls.gridType === 'spiral'){
      // background(bgColor)
      grid.drawSpiral()
    }else if(controls.gridType === 'star'){
      // background(bgColor)
      grid.drawStar()
    }else if(controls.gridType === 'none'){
      // background(bgColor)
    }
  pop()
  
  if(0 <= mouseX && mouseX <= grid.canvasWidth
    && 0 <= mouseY && mouseY <= grid.canvasHeight){
    cursor(CROSS)
  }
}

function mouseClicked(){
  if(0 <= mouseX && mouseX <= grid.canvasWidth
  && 0 <= mouseY && mouseY <= grid.canvasHeight){
    // console.log("inside the canvas >>>", mouseX, mouseY);

    background(bgColor)
    
    randomShape1 = random(randomShapeArr)
    randomShape2 = random(randomShapeArr)

    let datas = []

    for(var i=0; i<2; i++){
      shape = new Shape({
        shape: int(random(randomShapeArr.length)),
        count: int(random(3,6)),
        system: random(randomSystemArr),
        // size: 10*random(1, 1.2),
        size: 0.8*grid.canvasWidth/grid.columnNum*3,
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

    redraw()
  }
  
}