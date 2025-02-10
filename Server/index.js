const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

// ใช้ body-parser middleware
app.use(bodyParser.json());

let users = [];
let counter = 1;

// 📌 GET /users → ใช้สำหรับดึงข้อมูลผู้ใช้ทั้งหมด
app.get('/users', (req, res) => {
    res.json(users);
});

// 📌 POST /user → ใช้สำหรับสร้างผู้ใช้ใหม่
app.post('/user', (req, res) => {
    let user = req.body;
    user.id = counter;
    counter += 1;
    users.push(user);
    res.json({
        message: 'Create new user successfully',
        user: user
    });
});

// 📌 PUT /user/:id → ใช้สำหรับอัปเดตข้อมูลผู้ใช้
app.put('/user/:id', (req, res) => {
    let id = parseInt(req.params.id); // แปลง id เป็นตัวเลข
    let updateUser = req.body;

    // ค้นหา index ของ user
    let selectedIndex = users.findIndex(user => user.id === id);

    // ถ้าไม่พบ user ให้ส่ง 404
    if (selectedIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    // แก้ไขข้อมูล user
    if (updateUser.firstname) {
        users[selectedIndex].firstname = updateUser.firstname;
    }
    if (updateUser.lastname) {
        users[selectedIndex].lastname = updateUser.lastname;
    }

    res.json({
        message: 'Update user successfully',
        data: {
            user: users[selectedIndex],
            indexUpdated: selectedIndex
        }
    });
});

// 📌 DELETE /user/:id → ใช้สำหรับลบผู้ใช้
app.delete('/user/:id', (req, res) => {
    let id = parseInt(req.params.id); // แปลง id เป็นตัวเลข
    let selectedIndex = users.findIndex(user => user.id === id);

    // ถ้าไม่พบ user ให้ส่ง 404
    if (selectedIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    // ลบ user จาก array
    users.splice(selectedIndex, 1); // ใช้ splice ลบออกจาก array

    res.json({
        message: 'Delete user successfully',
        indexDeleted: selectedIndex
    });
});

// 📌 เรียกใช้ server
app.listen(port, () => {
    console.log(`Http Server is running on port ${port}`);
});
