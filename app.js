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

// Function to handle calculation button click
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

// Function to perform rounding based on the operation
async function roundResult(operation) {
  const result = document.getElementById('result').textContent.split(':')[1].trim();

  if (!result) {
    document.getElementById('result').textContent = "Please perform a calculation first.";
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${operation}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ result: parseFloat(result) })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    const data = await response.json();
    document.getElementById('result').textContent = `Rounded Result: ${data.rounded}`;
  } catch (error) {
    document.getElementById('result').textContent = `Error occurred while rounding: ${error.message}`;
  }
}

// Adding event listeners to calculation buttons for each operation
document.getElementById('add').onclick = () => handleCalculation('add');
document.getElementById('subtract').onclick = () => handleCalculation('subtract');
document.getElementById('multiply').onclick = () => handleCalculation('multiply');
document.getElementById('divide').onclick = () => handleCalculation('divide');

// Adding event listeners to rounding buttons
document.getElementById('round-to-tens').onclick = () => roundResult('round-to-tens');
document.getElementById('round-to-hundreds').onclick = () => roundResult('round-to-hundreds');
document.getElementById('round-to-thousands').onclick = () => roundResult('round-to-thousands');
document.getElementById('round-to-tenths').onclick = () => roundResult('round-to-tenths');
document.getElementById('round-to-hundredths').onclick = () => roundResult('round-to-hundredths');
document.getElementById('round-to-thousandths').onclick = () => roundResult('round-to-thousandths');
