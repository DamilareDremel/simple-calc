const API_BASE_URL = "https://calculator-api-1bto.onrender.com/api/calculate";  // Backend API URL

// Function to perform the calculation based on the operation
async function calculate(operation, num1, num2) {
    try {
        const response = await fetch(`${API_BASE_URL}/${operation}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ num1, num2 })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch');
        }

        const result = await response.json();
        return result.result; // Assuming the result is returned as { result: <value> }
    } catch (error) {
        console.error("Error occurred while calculating:", error);
        throw error;
    }
}

// Function to handle button click and perform the corresponding calculation
function handleCalculation(operation) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    
    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('result').textContent = "Please enter valid numbers.";
        return;
    }

    calculate(operation, num1, num2)
        .then(result => {
            document.getElementById('result').textContent = `Result: ${result}`;
        })
        .catch(error => {
            document.getElementById('result').textContent = `Error occurred while calculating: ${error.message}`;
        });
}

// Adding event listeners to buttons for each operation
document.getElementById('add').onclick = () => handleCalculation('add');
document.getElementById('subtract').onclick = () => handleCalculation('subtract');
document.getElementById('multiply').onclick = () => handleCalculation('multiply');
document.getElementById('divide').onclick = () => handleCalculation('divide');
document.getElementById('roundToTens').onclick = () => calculateRounding('nearest-10s');
document.getElementById('roundToHundreds').onclick = () => calculateRounding('nearest-100s');
document.getElementById('roundToThousands').onclick = () => calculateRounding('nearest-1000s');
document.getElementById('roundToTenths').onclick = () => calculateRounding('nearest-10th');
document.getElementById('roundToHundredths').onclick = () => calculateRounding('nearest-100th');
document.getElementById('roundToThousandths').onclick = () => calculateRounding('nearest-1000th');
