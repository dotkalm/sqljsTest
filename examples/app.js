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
	xhr.open('GET', '../trunksale9.sqlite', true);
	xhr.responseType = 'arraybuffer';
	  console.log(xhr)
	let contents = []
	xhr.onload = function(e) {
	  var uInt8Array = new Uint8Array(this.response);
	  var db = new SQL.Database(uInt8Array);
	  contents = db.exec("SELECT * FROM item");
            console.log(contents[0].values)
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
            console.log(colorsRaw)
                const theColors = colorsRaw.map((e,i,array) => {
                    const coordinates = e.match(/\d+, \d+/)
                    let x = null;
                    let y = null;
                    if(coordinates !== null){
                        const xY = coordinates[0].split(', ')
                        x = +xY[0] +1
                        y = +xY[1] +1
                        console.log(xY, "hmm")
                    }
                    let r = null;
                    let g = null;
                    let b = null;
                    console.log(coordinates) 
                    const rgbColors = e.replace(/.+\t/,'').replace(/\(|\)/g,'')
                    if(rgbColors !== ''){
                        const rgb = rgbColors.split(', ') 
                        r = +rgb[0];
                        g = +rgb[1];
                        b = +rgb[2];
                    }
                    const rgb = `${r}, ${g}, ${b}` 
                    console.log(x, y, r, g, b)
                    const lilPixels = document.createElement("div")
                    lilPixels.innerText = `column ${x}, row ${y}`
                    lilPixels.style.backgroundColor = `rgb(${r},${g},${b})`
                    bodyMain.appendChild(lilPixels)
                })

        }
   
  });
