const API_BASE_URL = "https://calculator-api-1bto.onrender.com/api/calculate";  // Backend API URL

// Function to perform basic operations (add, subtract, multiply, divide)
async function calculate(operation, num1, num2) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = "Calculating..."; 

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 sec timeout

        const response = await fetch(`${API_BASE_URL}/${operation}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ num1, num2 }),
            signal: controller.signal
        });

        clearTimeout(timeoutId); // Clear timeout if request succeeds

        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();
        resultElement.textContent = `Result: ${data.result}`;
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
        console.error(error);
    }
}

        const data = await response.json();
        console.log("Received data:", data); // Debugging line

        // Check if result exists in the response
        if (data && typeof data.result !== "undefined") {
            resultElement.textContent = Result: ${data.result};
        } else {
            console.error("Unexpected response format:", data);
            resultElement.textContent = "Error: Unexpected response format";
        }
    } catch (error) {
        console.error("Error occurred while calculating:", error);
        resultElement.textContent = Error: ${error.message};
    }
}

// Function to perform rounding based on place value
async function calculateRounding(route) {
    const resultElement = document.getElementById('result');
    const resultText = resultElement.textContent;

    // Extract the numerical result from the displayed text
    const result = parseFloat(resultText.replace("Result: ", ""));

    if (isNaN(result)) {
        resultElement.textContent = "Please calculate a result first.";
        return;
    }

    resultElement.textContent = "Rounding..."; // Show loading message for rounding

    try {
        const response = await fetch(${API_BASE_URL}/${route}, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ result }) // Send the result to backend
        });

        const data = await response.json();
        console.log("Rounding response data:", data); // Debugging line

        if (response.ok && data && typeof data.result !== "undefined") {
            resultElement.textContent = Rounded Result: ${data.result};
        } else {
            alert('Error occurred while rounding the result.');
        }
    } catch (error) {
        console.error('Error occurred while rounding the result:', error);
        alert('Error occurred while rounding the result.');
    }
}

// Function to handle basic calculation button click
function handleCalculation(operation) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    
    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('result').textContent = "Please enter valid numbers.";
        return;
    }

    calculate(operation, num1, num2); // Directly call calculate function without .then
}

// Adding event listeners to buttons for each operation
document.getElementById('add').onclick = () => handleCalculation('add');
document.getElementById('subtract').onclick = () => handleCalculation('subtract');
document.getElementById('multiply').onclick = () => handleCalculation('multiply');
document.getElementById('divide').onclick = () => handleCalculation('divide');

// Corrected event listeners for rounding buttons
document.getElementById('nearest-10s').onclick = () => calculateRounding('nearest-10s');
document.getElementById('nearest-100s').onclick = () => calculateRounding('nearest-100s');
document.getElementById('nearest-1000s').onclick = () => calculateRounding('nearest-1000s');
document.getElementById('nearest-10th').onclick = () => calculateRounding('nearest-10th');
document.getElementById('nearest-100th').onclick = () => calculateRounding('nearest-100th');
document.getElementById('nearest-1000th').onclick = () => calculateRounding('nearest-1000th');
