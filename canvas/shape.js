class Shape{
  constructor(args){
    this.baseSettings = {
      shape: args.shape,
      count: args.count,
      system: args.system,
      size: args.size,
      ratio: args.ratio
    }
    // this.shape = args.shape
    // this.count = args.count
    // this.system = args.system
    // this.size = args.size

    // this.posArr = []
    this.posVecArr = []
    this.posVecArr2 = []
    this.sizeArr = []
    this.sizeArr2 = []
    this.ratio = 1
  }

  getRandomData(){
    let count = this.baseSettings.count
    let shape = this.baseSettings.shape
    let system = this.baseSettings.system
    let size = this.baseSettings.size
    let ratio = this.baseSettings.ratio

    let result = []

    this.posVecArr = this.getPosVecArr(grid.getRandomPos(system))
    this.posVecArr2 = this.getPosVecArr(grid.getRandomPos(system))
    this.sizeArr = this.getSizeArr(size)
    this.sizeArr2 = this.getSizeArr(size)

    for(var i=0; i<count; i++){
      result.push({
        shape: randomShapeArr[shape],
        // pos: this.posArr[i],
        posVec: this.posVecArr[i],
        posVec2: this.posVecArr2[i],
        size: this.sizeArr[i],
        size2: this.sizeArr2[i],
        ratio: ratio*random(0.5,1.2)
      })
    }

    return result
  }

  getPosVecArr(gridPos){
    let count = this.baseSettings.count

    let posArr = []
    
    for(var i=0; i<count; i++){
      posArr.push(random(gridPos))
    }
    let result = []
    posArr.forEach(p => {
      result.push(createVector(p.x, p.y))
    })
    return result
  }
  getSizeArr(size){
    let count = this.baseSettings.count

    let result = []
    
    for(var i=0; i<count; i++){
      result.push(size/Math.pow(1.618, int(random(0, 5))))
      // result.push(size/Math.pow(1.618, int(random(0, 3))))
    }
    return result
  }

  // --- 畫形狀
  drawArc(shapeObj){
    let ratio = shapeObj.ratio
    let size = shapeObj.size*30
    let pos = shapeObj.posVec
    let angle = map(ratio, 0.5, 1.2, HALF_PI, PI)

    if(pos.x == 500){
      pos.x-grid.w/grid.cNum
    }
    if(pos.x == 0){
      pos.x+grid.w/grid.cNum
    }
    if(pos.y == 500){
      pos.y-grid.h/grid.rNum
    }
    if(pos.y == 0){
      pos.y+grid.h/grid.rNum
    }

    push()
      fill(bgColor)
      translate(pos.x, pos.y)
      rotate(angle)
      arc(0, 0, size, size, 0, angle)
    pop()
  }
  drawEllipse(shapeObj){
    let pos = shapeObj.posVec
    let ratio = shapeObj.ratio
    let size1 = shapeObj.size*30
    let size2 = shapeObj.size2*30
    let angle = map(ratio, 0.5, 1.2, 0, PI)
    push()
      fill(bgColor)
      translate(pos.x, pos.y)
      rotate(angle)
      ellipse(0, 0, size1, size2)
    pop()
  }
  drawCircle(shapeObj){
    let pos = shapeObj.posVec
    let size = shapeObj.size*30
    push()
      fill(bgColor)
      translate(pos.x, pos.y)
      circle(0, 0, size)
    pop()
  }
  drawLine(shapeObj){
    angleMode(RADIANS)
    let angle = map(shapeObj.size, 0, 15, 0, PI)
    let center = shapeObj.posVec
    let v = p5.Vector.add(shapeObj.posVec, shapeObj.posVec2).mult(5)
    let v2 = v.copy().rotate(PI)
    
    push()
      translate(center.x, center.y)
      rotate(angle)
      noFill()
      stroke(0)
      line(0, 0, v.x, v.y)
      line(0, 0, v2.x, v2.y)
    pop()

    
  }
  drawTriangle(shapeObj){
    let center = shapeObj.posVec
    let pos2 = shapeObj.posVec2
    let angle = TWO_PI/3
    let v = p5.Vector.sub(pos2, center).div(2)
    let point1 = p5.Vector.add(center, v)
    let point2 = p5.Vector.add(center, v.rotate(angle))
    let point3 = p5.Vector.add(center, v.rotate(angle))
    
    push()
      fill(bgColor)
      triangle(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y)
      // stroke('red')
      // strokeWeight(5)
      // line(center.x, center.y, point1.x, point1.y)
      // stroke('orange')
      // line(center.x, center.y, point2.x, point2.y)
      // stroke('yellow')
      // line(center.x, center.y, point3.x, point3.y)
      // strokeWeight(10)
      // stroke('blue')  
      // point(center.x, center.y)
    pop()
  }
  drawQuad(shapeObj){
    let angle = TWO_PI/4
    
    let ratio = shapeObj.ratio
    let center = shapeObj.posVec
    let v = p5.Vector.sub(shapeObj.posVec2, center).div(4)

    let point1 = p5.Vector.add(center, v.copy().mult(ratio))
    let point2 = p5.Vector.add(center, v.rotate(angle))
    let point3 = p5.Vector.add(center, v.rotate(angle).copy().mult(ratio))
    let point4 = p5.Vector.add(center, v.rotate(angle))
    
    // console.log(size);

    push()
      fill(bgColor)
      quad(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y, point4.x, point4.y)
      // strokeWeight(3)
      // stroke('red')
      // line(center.x, center.y, point1.x, point1.y)
      // stroke('orange')
      // line(center.x, center.y, point2.x, point2.y)
      // stroke('green')
      // line(center.x, center.y, point3.x, point3.y)
      // stroke('blue')
      // line(center.x, center.y, point4.x, point4.y)
      // strokeWeight(10)
      // stroke(0)
      // point(0,0)
    pop()
  }
  drawRect(shapeObj){
    let pos = shapeObj.posVec
    let size = shapeObj.size*30
    let size2 = shapeObj.size2*30
    push()
      translate(pos.x, pos.y)
      fill(bgColor)
      rect(0, 0, size, size2)
    pop()
  }
  drawSquare(shapeObj){
    let pos = shapeObj.posVec
    let size = shapeObj.size*30
    let angle = map(shapeObj.size, 0, 15, 0, HALF_PI)
    push()
      fill(bgColor)
      translate(pos.x, pos.y)
      rotate(angle)
      square(0, 0, size)
    pop()
  }
}