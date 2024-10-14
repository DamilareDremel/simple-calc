// controllers/calculateController.js

exports.add = (req, res) => {
    const { num1, num2 } = req.body;
    const sum = num1 + num2;
    res.json({ result: sum });
  };
  
  exports.subtract = (req, res) => {
    const { num1, num2 } = req.body;
    const difference = num1 - num2;
    res.json({ result: difference });
  };
  
  exports.multiply = (req, res) => {
    const { num1, num2 } = req.body;
    const product = num1 * num2;
    res.json({ result: product });
  };
  
  exports.divide = (req, res) => {
    const { num1, num2 } = req.body;
    if (num2 === 0) {
      return res.status(400).json({ error: "Division by zero is not allowed." });
    }
    const quotient = num1 / num2;
    res.json({ result: quotient });
  };
  