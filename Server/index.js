const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors');
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

let conn = null;

const validateData = (userData) => {
    let errors = [];
    if (!userData.firstName) errors.push('กรุณากรอกชื่อ');
    if (!userData.lastName) errors.push('กรุณากรอกนามสกุล');
    if (!userData.age) errors.push('กรุณากรอกอายุ');
    if (!userData.gender) errors.push('กรุณาเลือกเพศ');
    if (!userData.interests || (Array.isArray(userData.interests) && userData.interests.length === 0)) {
        errors.push('กรุณาเลือกความสนใจ');
    }
    if (!userData.description) errors.push('กรุณากรอกคำอธิบาย');
    return errors;
};

const initMySQL = async () => {
    try {
        conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'webdb',
            port: 8820
        });
        await conn.ping(); // ✅ ตรวจสอบการเชื่อมต่อ MySQL (กัน Error Connection Lost)
        console.log('✅ MySQL connected successfully');
    } catch (error) {
        console.error('❌ Error connecting to MySQL:', error.message);
        process.exit(1);
    }
};

// 📌 เพิ่มผู้ใช้ใหม่
app.post('/users', async (req, res) => {
    try {
        let user = req.body;
        const errors = validateData(user);
        if (errors.length > 0) {
            return res.status(400).json({
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            });
        }

        // ✅ ถ้า `interests` เป็น Array ให้แปลงเป็น String (กัน Error ใน MySQL)
        if (Array.isArray(user.interests)) {
            user.interests = user.interests.join(', ');
        }

        const [results] = await conn.query('INSERT INTO users SET ?', user);

        res.json({
            message: '✅ Create user successfully',
            data: results
        });
    } catch (error) {
        console.error('❌ Error message:', error.message);
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message
        });
    }
});

// 📌 ดึงข้อมูลผู้ใช้ทั้งหมด
app.get('/users', async (req, res) => {
    try {
        const [results] = await conn.query('SELECT * FROM users');
        res.json(results);
    } catch (error) {
        console.error('❌ Error fetching users:', error.message);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// 📌 ดึงข้อมูลผู้ใช้ตาม ID
app.get('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const [results] = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({
            message: 'Something went wrong',
            errorMessage: error.message
        });
    }
});

// 📌 อัปเดตข้อมูลผู้ใช้
app.put('/users/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    let updateUser = req.body;
    try {
        // ✅ ถ้า `interests` เป็น Array ให้แปลงเป็น String ก่อนอัปเดต
        if (Array.isArray(updateUser.interests)) {
            updateUser.interests = updateUser.interests.join(', ');
        }

        const [results] = await conn.query(
            'UPDATE users SET ? WHERE id = ?',
            [updateUser, id]
        );

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: '✅ Update user successfully',
            data: updateUser
        });
    } catch (error) {
        console.error('❌ Error updating user:', error.message);
        res.status(500).json({
            message: 'Something went wrong',
            errorMessage: error.message
        });
    }
});

// 📌 ลบผู้ใช้
app.delete('/users/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        const [results] = await conn.query(
            'DELETE FROM users WHERE id = ?', [id]
        );

        res.json({
            message: '✅ Delete user successfully',
            data: results
        });
    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({
            message: 'Something went wrong',
            errorMessage: error.message
        });
    }
});

// 📌 เรียกใช้เซิร์ฟเวอร์
app.listen(port, async () => {
    await initMySQL();
    console.log(`✅ Http Server is running on port ${port}`);
});
