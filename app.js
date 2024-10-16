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

// Function to handle rounding operations
async function calculateRounding(roundType) {
  const resultElement = document.getElementById('result');
  const currentResult = parseFloat(resultElement.textContent.replace('Result: ', ''));

  if (isNaN(currentResult)) {
    resultElement.textContent = "No result to round.";
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${roundType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ result: currentResult })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch rounding');
    }

    const roundedResult = await response.json();
    resultElement.textContent = `Rounded Result: ${roundedResult.result}`;
  } catch (error) {
    resultElement.textContent = `Error occurred while rounding: ${error.message}`;
  }
}

// Binding event listeners to buttons
document.getElementById('add').onclick = () => handleCalculation('add');
document.getElementById('subtract').onclick = () => handleCalculation('subtract');
document.getElementById('multiply').onclick = () => handleCalculation('multiply');
document.getElementById('divide').onclick = () => handleCalculation('divide');

// Event listeners for rounding buttons
document.getElementById('roundToTens').onclick = () => calculateRounding('roundToTens');
document.getElementById('roundToHundreds').onclick = () => calculateRounding('roundToHundreds');
document.getElementById('roundToThousands').onclick = () => calculateRounding('roundToThousands');
document.getElementById('roundToTenths').onclick = () => calculateRounding('roundToTenths');
document.getElementById('roundToHundredths').onclick = () => calculateRounding('roundToHundredths');
document.getElementById('roundToThousandths').onclick = () => calculateRounding('roundToThousandths');
