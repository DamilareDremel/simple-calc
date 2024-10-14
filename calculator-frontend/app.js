async function calculate(operation) {
    const num1 = document.getElementById("num1").value;
    const num2 = document.getElementById("num2").value;

    try {
        const response = await fetch(`https://calculator-api-1bto.onrender.com/api/calculate/${operation}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ num1: Number(num1), num2: Number(num2) })
        });
        
        const data = await response.json();

        if (response.ok) {
            document.getElementById("result").innerText = `Result: ${data.result}`;
        } else {
            document.getElementById("result").innerText = `Error: ${data.message}`;
        }
    } catch (error) {
        document.getElementById("result").innerText = `Error occurred while calculating: ${error.message}`;
    }
}
