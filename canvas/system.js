class Grid{
  constructor(args){
    this.canvasWidth = args.w*1.5
    this.canvasHeight = args.h*1.5
    this.columnNum = args.cNum
    this.rowNum = args.rNum
  }

  // --- 畫線
  drawGrid(){
    let width = this.canvasWidth
    let height = this.canvasHeight
    let column = width/this.columnNum
    let row = height/this.rowNum
    push()
      for(var i=0; i<=width; i+=column){
        line(i, -height/2, i, height)
      }
      for(var o=0; o<=height; o+=row){
        line(-width/2, o, width, o)
      }
    pop()
  }
  drawSpiral(){
    push()
      angleMode(DEGREES)
      translate(this.canvasWidth/2, this.canvasHeight/2)
      noFill()
      beginShape()
      for(var i=0; i< this.canvasWidth; i++){
        let angle = i*1.618*1.618*1.618;
        let radius = i;
        vertex(radius*cos(angle), radius*sin(angle))
      }
      endShape()
    pop()
  }
  drawStar(){
    let width = this.canvasWidth;
    let height = this.canvasHeight;
    push()
      line(0, 0, width, height)
      line(width, 0, 0, height)
      line(width/2, 0, width/2, height)
      line(0, height/2, width, height/2)
    pop()
  }

  // --- 取得位置

  getRandomPos(random){
    if(random === 'grid'){
      return this.getGridPos()
    }else if(random === 'spiral'){
      return this.getSpiralPos()
    }else if(random === 'star'){
      return this.getStarPos()
    }
  }

  getGridPos(){
    const gridPos = []
    let column = this.canvasWidth/this.columnNum
    let row = this.canvasWidth/this.rowNum
    for(var i=0; i<=this.canvasWidth; i+=column){
      for(var o=0; o<=this.canvasHeight; o+=row){
        gridPos.push({
          x: i,
          y: o
        })
      }
    }
    // console.log(gridPos);
    return gridPos
  }
  getSpiralPos(){
    const spiralPos = []
    let column = this.canvasWidth/this.columnNum
    for(var i=0; i<=this.canvasWidth/1.5; i+=column/10){
      let angle = i*1.618*1.618*1.618;
      let radius = i;
      spiralPos.push({
        x: radius*cos(angle* Math.PI / 180) + this.canvasWidth/2,
        y: radius*sin(angle* Math.PI / 180) + this.canvasHeight/2
      })
      // vertex(radius*cos(angle), radius*sin(angle))
    }
    // console.log(spiralPos);
    return spiralPos
  }
  getStarPos(){
    const starPos = []
    let width = this.canvasWidth;
    let height = this.canvasHeight;
    let column = this.canvasWidth/this.columnNum;
    let row = this.canvasWidth/this.rowNum;
    for(var i=0; i<=width; i+=column/2){
      starPos.push({
        x: i, 
        y: height/2
      })
      starPos.push({
        x: i,
        y: i*sin(PI/2)
      })
      starPos.push({
        x: i,
        y: height - i*sin(PI/2)
      })
    }
    for(var o=0; o<=height; o+=row/2){
      starPos.push({
        x: width/2, 
        y: o
      })
    }
    return starPos
  }
}