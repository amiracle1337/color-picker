
document.querySelector(".color-btn").addEventListener("click", getColors)

function getColors() {
    const colorPicker = document.querySelector(".color-picker").value
    colorPickerValue = colorPicker.replace("#", "")
    const colorScheme = document.querySelector(".color-scheme").value

    fetch(`https://www.thecolorapi.com/scheme?hex=${colorPickerValue}&format=json&mode=${colorScheme}&count=6`)
        .then(resp => resp.json())
        .then(data => {
            let colors = data.colors.map(color => {
              return `<h1 class="hex-code">${color.hex.value}</h1>`
            }).join("")
        
            document.querySelector(".color-code").innerHTML = colors
            copyClipboard()
            generateColorBlock(data.colors)
          })
}

function generateColorBlock(colors) { 
    const colorCodes = colors.map(color => color.hex.value)
    const colorBox = document.querySelector(".color-box")
    colorBox.innerHTML = ""

    colorCodes.map(colorCode => {
        colorBox.innerHTML += 
        `<div class="color-strips" style="background-color: ${colorCode}"></div>`
    })
    }

    function copyClipboard() {
      const hexCodeValues = document.querySelectorAll(".hex-code")
    
      hexCodeValues.forEach( element => {
        element.addEventListener("click", () => {
          const text = element.textContent
    
          navigator.clipboard.writeText(text)
            .then(() => {
              alert("Color copied to clipboard")
            })
            .catch((error) => {
              alert("Unable to copy text to clipboard")
            })
        })
      })
    }
    