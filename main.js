var noduleTypePicker = document.querySelector('#noduleTypePicker')
var riskFactorsCheck = document.querySelector('#riskFactorsCheck')
var multipleNodulesCheck = document.querySelector('#multipleNodulesCheck')
var longAxisInput = document.querySelector('#longAxisInput')
var shortAxisInput = document.querySelector('#shortAxisInput')
var resultButton = document.querySelector('#resultButton')

function copyReport() {
    var noduleType = noduleTypePicker.value
    var atRisk = riskFactorsCheck.checked
    var multipleNodules = multipleNodulesCheck.checked
    var longAxis = longAxisInput.value
    var shortAxis = shortAxisInput.value

    var noduleSizeDescription
    
    if (longAxis && shortAxis) {
        noduleSizeDescription = `${longAxis} x ${shortAxis}`
    } else if (longAxis) {
        noduleSizeDescription = `${longAxis}`
    } else if (shortAxis) {
        noduleSizeDescription = `${shortAxis}`
    }

    if (!noduleSizeDescription) {
        return
    }

    var noduleTypeDescription

    switch (noduleType) {
        case "solid": 
        noduleTypeDescription = "solido"
        break

        case "GGO":
        noduleTypeDescription = "ground-glass"
        break

        case "partSolid": 
        noduleTypeDescription = "parzialmente solido"
        break
    }

    if (!noduleTypeDescription) {
        return
    }

    var noduleDescription = `${noduleTypeDescription} di ${noduleSizeDescription} mm`

    var noduleFindings

    if (multipleNodules) {
        noduleFindings = `Multipli noduli, il maggiore ${noduleDescription}`
    } else {
        noduleFindings = `Nodulo ${noduleDescription}`
    }

    if (!noduleFindings) {
        return
    }

    if (atRisk) {
        noduleFindings = noduleFindings.concat(` con fattori di rischio`)
    }

    var recommendation = resultButton.innerHTML

    var report = `REPERTI\n${noduleFindings}.\n\nRACCOMANDAZIONE (Fleischner 2017)\n${recommendation}.`

    navigator.clipboard.writeText(report);
}

function computeResult() {
    var noduleType = noduleTypePicker.value
    var atRisk = riskFactorsCheck.checked
    var multipleNodules = multipleNodulesCheck.checked
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
    
    if (multipleNodules) {
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
            } else if (meanDiameter >= 6) {
                if (atRisk) {
                    resultButton.innerHTML = "TC a 3-6 mesi, poi a 18-24 mesi"
                    $('#resultButton').attr('class', 'btn btn-warning')
                } else {
                    resultButton.innerHTML = "TC a 3-6 mesi, poi da rivalutare a 18-24 mesi"
                    $('#resultButton').attr('class', 'btn btn-warning')
                }
            }
            
            break
            
            case "GGO": 
            case "partSolid": 

            if (meanDiameter < 6) {
                resultButton.innerHTML = "TC a 3-6 mesi; se stabile, considerare TC a 2 e 4 anni"
                $('#resultButton').attr('class', 'btn btn-info')
                
                if (atRisk) {
                    // In certain suspicious nodules <6 mm, consider follow-up at 2 and 4 years. If solid component(s) or growth develops, consider resection. (Recommendations 3A and 4A).
                }
            } else if (meanDiameter >= 6) {
                resultButton.innerHTML = "TC a 3-6 mesi; gestione successiva in base al nodulo più sospetto"
                $('#resultButton').attr('class', 'btn btn-warning')
            }
            
            break
            
        }
    } else {
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
            } else if (meanDiameter >= 8) {
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
            } else if (meanDiameter >= 6) {
                resultButton.innerHTML = "TC a 6-12 mesi per confermare la persistenza, poi TC ogni 2 anni per 5 anni"
                $('#resultButton').attr('class', 'btn btn-warning')
            }
            
            break
            
            case "partSolid": 
            
            if (meanDiameter < 6) {
                resultButton.innerHTML = "Nessun controllo necessario"
                $('#resultButton').attr('class', 'btn btn-success')
            } else if (meanDiameter >= 6) {
                // In practice, part-solid nodules cannot be defined as such until >=6 mm, and nodules <6 mm do not usually require follow-up. Persistent part-solid nodules with solid components >=6 mm should be considered highly suspicious (recommendations 4A-4C)
                resultButton.innerHTML = "TC a 3-6 mesi per confermare la persistenza; se invariato e con componente solida <6 mm, TC annuale per 5 anni"
                $('#resultButton').attr('class', 'btn btn-warning')
            }
            
            break
            
            default: break
        }
    }
}

$('#noduleTypePicker').on('input', function() {
    computeResult()
})

$('#riskFactorsCheck').on('input', function() {
    computeResult()
})

$('#multipleNodulesCheck').on('input', function() {
    computeResult()
})

$('#longAxisInput').on('input', function() {
    computeResult()
})

$('#shortAxisInput').on('input', function() {
    computeResult()
})

$('#resultButton').on('click', function() {
    copyReport()
})