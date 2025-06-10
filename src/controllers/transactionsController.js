import { sql } from "../config/db.js";
export async function getTransactionsByUserId(req, res) {
  const { userID } = req.params;
  try {
    const transactions = await sql`
    SELECT * FROM transactions WHERE user_id = ${userID} ORDER BY created_at DESC;
    `;
    res.status(200).json(transactions);
  } catch (error) {
    console.log("Error in getting all transactions ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createTransaction(req, res) {
  // title, amount, category, user_id
  try {
    const { user_id, title, category, amount } = req.body;
    if (!title || !category || !user_id || amount === undefined) {
      return res.status(404).json({ message: "All fields must be filled!" });
    }

    const transaction =
      await sql`INSERT INTO transactions(user_id,title,category,amount)
    VALUES (${user_id},${title},${category},${amount})
    RETURNING *`;

    console.log(transaction);
    res.status(201).json(transaction[0]);
  } catch (error) {
    console.log("Error in storing the transaction, ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteTransaction(req, res) {
  try {
    const { id } = req.params;

    // To handle the case of invalid transaction ID
    //if (isNaN(parseInt(id))) {
    // Better way
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }
    const result = await sql`
    DELETE FROM transactions WHERE id = ${id} RETURNING *
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    } else {
      res.status(200).json({ message: "Transaction deleted succcessfully" });
    }
  } catch (error) {
    console.log("Error in deleting the transaction, ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getSummaryByUserId(req, res) {
  try {
    const { userId } = req.params;
    const balanceResult = await sql`
    SELECT COALESCE(SUM(amount),0) AS balance FROM transactions WHERE user_id = ${userId} 
    `;

    // For income the value will be positive and expense will be negative

    const incomeResult = await sql`
    SELECT COALESCE(SUM(amount),0) AS income FROM transactions WHERE user_id = ${userId} AND amount > 0
    `;

    const expensesResult = await sql`
    SELECT COALESCE(SUM(amount),0) AS expenses FROM transactions WHERE user_id = ${userId} AND amount < 0
    `;

    res.status(200).json({
      balance: balanceResult[0].balance, // .balance is the name given as alias in the SQL Query
      income: incomeResult[0].income,
      expenses: expensesResult[0].expenses,
    });
  } catch (error) {
    console.log("Error in getting the summary, ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
