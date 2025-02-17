const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();

const port = 8000;

// ใช้ body-parser middleware
app.use(bodyParser.json());

let users = [];
let conn = null;

// ฟังก์ชันสำหรับเชื่อมต่อ MySQL
const initMySQL = async () => {
    try {
        conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'webdb',
            port: 8820
        });
        console.log('MySQL connected successfully');
    } catch (error) {
        console.error('Error connecting to MySQL:', error.message); // แสดงข้อผิดพลาดจาก MySQL
        process.exit(1); // หยุดการทำงานของแอปหากไม่สามารถเชื่อมต่อได้
    }
};

// ทดสอบการเชื่อมต่อกับฐานข้อมูล
app.get('/testdbnew', async (req, res) => {
    try {
        const [results] = await conn.query('SELECT * FROM users');
        res.json(results);
    } catch (error) {
        console.log('Error fetching users:', error.message); // แสดงข้อความข้อผิดพลาดที่เกิดจาก query
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// 📌 GET /users → ใช้สำหรับดึงข้อมูลผู้ใช้ทั้งหมด
app.get('/users', async (req, res) => {
    try {
        const [results] = await conn.query('SELECT * FROM users');
        res.json(results);
    } catch (error) {
        console.log('Error fetching users:', error.message); // แสดงข้อความข้อผิดพลาดที่เกิดจาก query
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// 📌 POST /user → ใช้สำหรับสร้างผู้ใช้ใหม่
app.post('/users', async (req, res) => {
    try {
        let user = req.body;
        const [results] = await conn.query('INSERT INTO users SET ?', [users]);
        console.log('Inserted user:', results);
        res.json({
            message: 'Create user successfully',
            data: results // จะต้องดูว่า query insert คืนค่าผลลัพธ์อย่างไร
        });
    } catch (error) {
        console.log('Error creating user:', error.message); // แสดงข้อความข้อผิดพลาดที่เกิดจาก query
        res.status(500).json({ error: 'Error creating user' });
    }
});

// 📌 PUT /user/:id → ใช้สำหรับอัปเดตข้อมูลผู้ใช้
app.put('/users/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id); // แปลง id เป็นตัวเลข
        let updateUser = req.body;

        // ค้นหา user ตาม id
        const [results] = await conn.query('UPDATE users SET ? WHERE id = ?', [updateUser, id]);

        res.json({
            message: 'Update user successfully',
            data: {
                user: updateUser,
                updatedRows: results.affectedRows
            }
        });
    } catch (error) {
        console.log('Error updating user:', error.message); // แสดงข้อความข้อผิดพลาดที่เกิดจาก query
        res.status(500).json({ error: 'Error updating user' });
    }
});

// 📌 DELETE /user/:id → ใช้สำหรับลบผู้ใช้
app.delete('/users/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id); // แปลง id เป็นตัวเลข

        const [results] = await conn.query('DELETE FROM users WHERE id = ?', [id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'Delete user successfully',
            deletedRows: results.affectedRows
        });
    } catch (error) {
        console.log('Error deleting user:', error.message); // แสดงข้อความข้อผิดพลาดที่เกิดจาก query
        res.status(500).json({ error: 'Error deleting user' });
    }
});

// เรียกใช้ server
app.listen(port, async () => {
    await initMySQL(); // รันฟังก์ชัน initMySQL ก่อน
    console.log('Http Server is running on port ' + port); // แก้ไขการพิมพ์ให้ถูกต้อง
});


