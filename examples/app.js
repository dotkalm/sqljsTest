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
            const letsSee = []
            const namesArray = []
            contents[0].values.forEach(e =>{ 
                console.log(e)
                namesArray.push(e[9])
                const newObj = getColor(e[3])
                return letsSee.push(newObj)
            })
            letsSee.forEach((e,i) => {
                const newObj = yDictionary(e) 
                const rowsDiv = document.createElement("div")
                rowsDiv.setAttribute('class', `${namesArray[i]}`)
                Object.keys(newObj).forEach((ee,ii) => {
                    orderedDictionary(newObj[ee], namesArray[i])
                })

            })
            newDiv.setAttribute('id', 'okay')

	  // contents is now [{columns:['col1','col2',...], values:[[first row], [second row], ...]}]
	};
	xhr.send();

  });
