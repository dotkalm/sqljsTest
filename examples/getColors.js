const getColor = (props, description) => {
    const bodyMain = document.querySelector('.big')
    const colorsRaw = props.split(/\n/)
    colorsRaw.pop()
    const wholeContainer = document.createElement("div")
    wholeContainer.setAttribute('class', `${description}`)
    const squareContainer = document.createElement("div")
    squareContainer.setAttribute('class', `${description}Columns`)
    squareContainer.style.display="grid"
    squareContainer.style.height = "auto"
    bodyMain.appendChild(wholeContainer)
    wholeContainer.appendChild(squareContainer)
        //console.log(colorsRaw)
    const xDictionary = []
    const theColors = colorsRaw.map((e,i,array) => {
            const coordinates = e.match(/\d+, \d+/)
           // console.log(coordinates)
            let x = null;
            let y = null;
            let r = null;
            let g = null;
            let b = null;
            const rgbColors = e.replace(/.+\t/,'').replace(/\(|\)/g,'')
            if(rgbColors !== ''){
                const rgb = rgbColors.split(', ') 
                r = +rgb[0];
                g = +rgb[1];
                b = +rgb[2];
            }
            if(coordinates !== null){
                const xY = coordinates[0].split(', ')
                x = +xY[0] +1
                y = +xY[1] +1
                const elementExists = document.querySelector(`.${description}column${x}`);
                if (elementExists == null){
//                    console.log(props)
                    const newDivWithGradient = document.createElement("div")
                    newDivWithGradient.setAttribute('class', `${description}column${x}`)
                    newDivWithGradient.innerText = '' 
                    newDivWithGradient.style.gridColumn = x
                    squareContainer.appendChild(newDivWithGradient)
                    const innerY = {}
                    innerY[`column${x}`] = []
                    innerY[`column${x}`].push({
                        column: x,
                        row: y,
                        r: r,
                        g: g,
                        b: b
                    })
                    xDictionary.push(innerY)
                    
                } else if (elementExists !== null){
                    if (xDictionary[xDictionary.length -1] !== undefined){
                    const workingArray = xDictionary[xDictionary.length -1][`column${x}`]
                    workingArray.push({
                        column: x,
                        row: y,
                        r: r,
                        g: g,
                        b: b
                    }) 
                   const stringForGradient = workingArray.map(e => {
                        return `rgb(${e.r},${e.g},${e.b})`
                   }) 
                   elementExists.style.width = ".2rem"
                   elementExists.style.height = "50rem"
                   elementExists.style.backgroundImage = 
                        `linear-gradient(${stringForGradient.join(', ')})` 
                    }
                } else {
                    console.log(`column${x}`)
                }
            }
              })
            const clearFix = document.createElement("div")
    //        clearFix.setAttribute('class', 'clearfix::after')
      //      bodyMain.appendChild(clearFix)
    return xDictionary
}
const yDictionary = (yDictionary) => {
    const newObj = {}
    const newOrientation = yDictionary.map((e,i) => {
        e[`column${i+1}`].forEach((e,i) => {
            if(newObj[`row ${e.row}`] == undefined){
              newObj[`row ${e.row}`] = [{
                  row: e.row,
                  column: e.column,
                  r: e.r,
                  g: e.g,
                  b: e.b
              }]  

            } else {
                newObj[`row ${e.row}`].push({
                    row: e.row,
                    column: e.column,
                    r: e.r,
                    g: e.g,
                    b: e.b
                })
            }
        })
    }) 
    return newObj
}

const orderedDictionary = (row, id) => {
    //console.log(row)
    const findDiv = document.querySelector(`.rowsFor${id}`)
    const cycleThruEachRow = (row) => {
        const gradientStringArray = []
        row.forEach((e,i) => {
            gradientStringArray.push(`rgb(${e.r},${e.g},${e.b})`) 
        })
        return `linear-gradient(to right, ${gradientStringArray.join(', ')})` 
    }
    if(findDiv == null){
        const divRow = document.createElement("div")
        divRow.setAttribute('class', `row${row[0].row}`)
        const makeDiv = document.createElement("div")
        makeDiv.setAttribute('class', `rowsFor${id}`)
        makeDiv.style.display="grid"
        const bodyMain = document.querySelector(`.${id}`)
       // console.log(row) 
        makeDiv.style.height = "50rem"
        makeDiv.style.transform = "translateY(-50rem)"
        divRow.style.backgroundImage = cycleThruEachRow(row) 
        divRow.style.height = ".2rem"
        makeDiv.appendChild(divRow)
        bodyMain.style.height = "50rem"
        bodyMain.appendChild(makeDiv)
       // console.log(cycleThruEachRow(row))

    }else{
        //console.log(row)
        const divRow = document.createElement("div")
        divRow.setAttribute('class', `row${row[0].row}`)
        divRow.style.backgroundImage = cycleThruEachRow(row) 
        divRow.style.height = ".2rem"
        divRow.style.gridRow = row[0]

        findDiv.appendChild(divRow)
        //
    }
} 
