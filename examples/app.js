 config = {
    locateFile: (filename, prefix) => {
      console.log(`prefix is : ${prefix}`);
      return `../dist/${filename}`;
    }
  }
  // The `initSqlJs` function is globally provided by all of the main dist files if loaded in the browser.
  // We must specify this locateFile function if we are loading a wasm file from anywhere other than the current html page's folder.
  initSqlJs(config).then(function (SQL) {
	    //Create the database
	  var xhr = new XMLHttpRequest();
	xhr.open('GET', '../trunksale11.sqlite', true);
	xhr.responseType = 'arraybuffer';
	let contents = []
	xhr.onload = function(e) {
            var uInt8Array = new Uint8Array(this.response);
            var db = new SQL.Database(uInt8Array);
            contents = db.exec("SELECT * FROM item");
            const bodyMain = document.querySelector('.big')
            const newDiv = document.createElement("div")
            contents[0].values.forEach(e => getColor(e[3]))
            newDiv.setAttribute('id', 'okay')

	  // contents is now [{columns:['col1','col2',...], values:[[first row], [second row], ...]}]
	};
	xhr.send();
        const getColor = (props) => {
            const bodyMain = document.querySelector('.big')
            const colorsRaw = props.split(/\n/)
            colorsRaw.pop()
            const squareContainer = document.createElement("div")
            squareContainer.setAttribute('class', 'sqContainer')
            squareContainer.style.display="grid"
            squareContainer.style.height = "auto"
            bodyMain.appendChild(squareContainer)
                //console.log(colorsRaw)
                const xDictionary = []
                const theColors = colorsRaw.map((e,i,array) => {
                    const coordinates = e.match(/\d+, \d+/)
                    //console.log(coordinates)
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
                        const elementExists = document.querySelector(`.column${x}`);
                        if (elementExists == null){
                            const newDivWithGradient = document.createElement("div")
                            newDivWithGradient.setAttribute('class', `column${x}`)
                            //newDivWithGradient.style.backgroundColor = `rgb(${r},${g},${b})`
                            newDivWithGradient.innerText = '' 
                           // newDivWithGradient.setAttribute('id', 'grad')
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
                           elementExists.style.width = "1.5rem"
                           elementExists.style.height = "50rem"
                           elementExists.style.backgroundImage = `linear-gradient(${stringForGradient.join(', ')})` 
                            }
                        } else {
                            console.log(`column${x}`)
                        }
                  //      console.log(xY)
                    }
                    //const lilPixels = document.createElement("div")
                    //lilPixels.setAttribute('class','lilPixels')
                    //lilPixels.innerText = ``
                    //lilPixels.style.backgroundColor = `rgb(${r},${g},${b})`
                    //lilPixels.style.gridArea=`${y}/${x}`
                    //lilPixels.style.height = "100%"
                    //lilPixels.style.width = "100%"
                    //squareContainer.appendChild(lilPixels)
                })
                    const clearFix = document.createElement("div")
                    clearFix.setAttribute('class', 'clearfix::after')
                    bodyMain.appendChild(clearFix)

        }
  });
