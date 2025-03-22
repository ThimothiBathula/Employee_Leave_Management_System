const express = require("express");
const db = require("./Db");
require("dotenv").config();
const cors=require('cors')
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(cors())
app.post("/leave", async (req, res) => {
    const { employee_id, start_date, end_date, reason } = req.body;

    try {
        const [employee] = await db.query("SELECT id FROM Employees WHERE id = ?", [employee_id]);

        if (employee.length === 0) {
            return res.status(400).json({ error: "Employee does not exist" });
        }
        const [rows] = await db.query(
            "INSERT INTO LeaveRequests (employee_id, start_date, end_date, reason, status) VALUES (?, ?, ?, ?, ?)",
            [employee_id, start_date, end_date, reason, "pending"]
        );

        res.status(201).json({ message: "Leave request submitted", id: rows.insertId });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.get("/leave", async (req, res) => {
    try {
        const [leaves] = await db.query("SELECT * FROM LeaveRequests");
        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.put("/leave/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }
    try {
        const [result] = await db.query(
            "UPDATE LeaveRequests SET status = ? WHERE id = ?",
            [status, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Leave request not found" });
        }
        res.json({ message: "Leave request updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/leave/employee/:employee_id", async (req, res) => {
    const { employee_id } = req.params;
    try {
        const [leaves] = await db.query(
            "SELECT * FROM LeaveRequests WHERE employee_id = ?",
            [employee_id]
        );
        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
