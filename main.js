var noduleTypePicker = document.querySelector('#noduleTypePicker')
var riskFactorsCheck = document.querySelector('#riskFactorsCheck')
var longAxisInput = document.querySelector('#longAxisInput')
var shortAxisInput = document.querySelector('#shortAxisInput')
var resultButton = document.querySelector('#resultButton')

function computeResult() {
    var noduleType = noduleTypePicker.value
    var atRisk = riskFactorsCheck.checked
    var longAxis = longAxisInput.value
    var shortAxis = shortAxisInput.value

    var meanDiameter

    if (longAxis && shortAxis) {
        meanDiameter = longAxis / 2 + shortAxis / 2
    } else if (longAxis) {
        meanDiameter = longAxis
    } else if (shortAxis) {
        meanDiameter = shortAxis
    }

    if (!meanDiameter) {
        resultButton.innerHTML = "In attesa dei dati"
        $('#resultButton').attr('class', 'btn btn-secondary')
        return
    }

    switch (noduleType) {
        case "solid": 

        if (meanDiameter < 6) {
            if (atRisk) {
                // Nodules <6 mm do not require routine follow-up in low-risk patients (recommendation 1A).
                resultButton.innerHTML = "Valutare TC a 12 mesi"
                $('#resultButton').attr('class', 'btn btn-info')
            } else {
                // Certain patients at high risk with suspicious nodule morphology, upper lobe location, or both may warrant 12-month follow-up (recommendation 1A).
                resultButton.innerHTML = "Nessun controllo necessario"
                $('#resultButton').attr('class', 'btn btn-success')
            }
        } else if (meanDiameter < 8) {
            if (atRisk) {
                resultButton.innerHTML = "TC a 6-12 mesi, poi a 18-24 mesi"
                $('#resultButton').attr('class', 'btn btn-warning')
            } else {
                resultButton.innerHTML = "TC a 6-12 mesi, poi da rivalutare a 18-24 mesi"
                $('#resultButton').attr('class', 'btn btn-warning')
            }
        } else {
            resultButton.innerHTML = "TC a 3 mesi, PET-TC o biopsia"
            $('#resultButton').attr('class', 'btn btn-danger')
        }
        
        break

        case "GGO": 
        
        if (meanDiameter < 6) {
            resultButton.innerHTML = "Nessun controllo necessario"
            $('#resultButton').attr('class', 'btn btn-success')

            if (atRisk) {
                // In certain suspicious nodules <6 mm, consider follow-up at 2 and 4 years. If solid component(s) or growth develops, consider resection. (Recommendations 3A and 4A).
            }
        } else {
            resultButton.innerHTML = "TC a 6-12 mesi per confermare la persistenza, poi TC ogni 2 anni per 5 anni"
            $('#resultButton').attr('class', 'btn btn-warning')
        }

        break

        case "partSolid": 
        
        if (meanDiameter < 6) {
            resultButton.innerHTML = "Nessun controllo necessario"
            $('#resultButton').attr('class', 'btn btn-success')
        } else {
            // In practice, part-solid nodules cannot be defined as such until >=6 mm, and nodules <6 mm do not usually require follow-up. Persistent part-solid nodules with solid components >=6 mm should be considered highly suspicious (recommendations 4A-4C)
            resultButton.innerHTML = "TC a 3-6 mesi per confermare la persistenza; se invariato e con componente solida <6 mm, TC annuale per 5 anni"
            $('#resultButton').attr('class', 'btn btn-warning')
        }
        
        break

        default: break
    }
}

$('#noduleTypePicker').on('input', function() {
    computeResult()
})

$('#riskFactorsCheck').on('input', function() {
    computeResult()
})

$('#longAxisInput').on('input', function() {
    computeResult()
})

$('#shortAxisInput').on('input', function() {
    computeResult()
})