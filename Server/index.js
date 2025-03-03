const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors');
const port = 8000;

// ใช้ body-parser middleware
app.use(bodyParser.json());
app.use(cors());
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
        let user = req.body; // รับข้อมูลจาก body ของ request
        const [results] = await conn.query('INSERT INTO users SET ?', user); // ใช้ user แทน users
        console.log('results', results);

        res.json({
            message: 'Create user successfully',
            data: results[0] // ผลลัพธ์ที่คืนจาก query
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message});
    }
});

// 📌 PUT /user/:id → ใช้สำหรับอัปเดตข้อมูลผู้ใช้
app.put('/users/:id', async (req, res) => {
    let id = parseInt(req.params.id); // แปลง id เป็นตัวเลข
    let updateUser = req.body; // รับข้อมูลที่ต้องการอัปเดตจาก body ของ request
    try {
        // คำสั่ง SQL สำหรับอัปเดตข้อมูลผู้ใช้
        const [results] = await conn.query(
            'UPDATE users SET ? WHERE id = ?',
            [updateUser, id]
        );

        // ตรวจสอบว่าแถวที่ได้รับการอัปเดตมีหรือไม่
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // ส่งผลลัพธ์หลังจากการอัปเดต
        res.json({
            message: 'Update user successfully',
            data: updateUser
        });
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({
            message: 'Something went wrong',
            errorMessage: error.message
        });
    }
});


// 📌 DELETE /user/:id → ใช้สำหรับลบผู้ใช้
app.delete('/users/:id', async (req, res) => {
    try {
        let id = req.params.id; // รับค่า id จาก URL parameter
        const [results] = await conn.query(
            'DELETE from users WHERE id = ?', parseInt(id) // ใช้คำสั่ง SQL ที่ถูกต้อง
        );

    
        res.json({
            message: 'Delete user successfully',
            data: results[0]
        });
    } catch (error) {
        console.error('error:', error.message);
        res.status(500).json({
            message: 'Something went wrong',
            errorMessage: error.message
        });
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        let id = req.params.id; // รับค่า id จาก URL parameter
        const [results] = await conn.query('SELECT * FROM users WHERE id = ?', [id]); // ใช้คำสั่ง SQL ที่ถูกต้อง
        if (results.length === 0) { 
            return res.status(404).json({ message: 'User not found' }); // ถ้าไม่พบข้อมูล
        }
        res.json(results[0]); // ส่งผลลัพธ์แถวแรก
    } catch (error) {
        console.error('Error:', error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Something went wrong',
            errorMessage: error.message
        });
    }
});


// เรียกใช้ server
app.listen(port, async () => {
    await initMySQL(); // รันฟังก์ชัน initMySQL ก่อน
    console.log('Http Server is running o n port ' + port); // แก้ไขการพิมพ์ให้ถูกต้อง
});


