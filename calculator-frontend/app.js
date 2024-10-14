const apiUrl = 'https://calculator-api-1bto.onrender.com/api/calculate';

const cors = require('cors');
app.use(cors());

function calculate(operation) {
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;

    if (!num1 || !num2) {
        alert('Please enter both numbers');
        return;
    }

    fetch(`${apiUrl}/${operation}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            num1: parseFloat(num1),
            num2: parseFloat(num2)
        })
    })
    .then(response => response.json())
    .then(data => {
        // Display the result in the result div
        document.getElementById('result').textContent = `Result: ${data.result || data.error}`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').textContent = 'Error occurred while calculating';
    });
}
