const BASE_URL = 'http://localhost:8000';
let mode = 'CREATE'; // Default mode
let selectedId = '';

window.onload = async () => {
    console.log('User page loaded');

    // ✅ ดึง ID จาก URL เพื่อตรวจสอบว่าเป็นโหมดแก้ไขหรือไม่
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) {
        mode = 'EDIT';
        selectedId = id;

        // 1 เราจะดึงข้อมูลของ User ที่ต้องการแก้ไข
        await loadUserData(id);  // เรียกใช้ฟังก์ชันนี้เพื่อโหลดข้อมูล
    }
};

// ✅ ฟังก์ชันโหลดข้อมูลของ User ที่ต้องการแก้ไข
async function loadUserData(id) {
    try {
        const response = await axios.get(`${BASE_URL}/users/${id}`);
        const user = response.data;

        document.querySelector('input[name="firstname"]').value = user.firstName || "";
        document.querySelector('input[name="lastname"]').value = user.lastName || "";
        document.querySelector('input[name="age"]').value = user.age || "";
        document.querySelector(`input[name="gender"][value="${user.gender}"]`).checked = true;

        const interests = user.interests ? user.interests.split(', ') : [];
        document.querySelectorAll('input[name="interest"]').forEach(input => {
            input.checked = interests.includes(input.value);
        });

        document.querySelector('textarea[name="description"]').value = user.description || "";
    } catch (error) {
        console.error('❌ Error fetching user data:', error);
    }
}

// ✅ ฟังก์ชันตรวจสอบข้อมูล
const validateData = (userData) => {
    let errors = [];
    
    if (!userData.firstName) {
        errors.push('กรุณากรอกชื่อ');
    }
    
    if (!userData.lastName) {
        errors.push('กรุณากรอกนามสกุล');
    }
    
    if (!userData.age) {
        errors.push('กรุณากรอกอายุ');
    }
    
    if (!userData.gender) {
        errors.push('กรุณาเลือกเพศ');
    }
    
    if (userData.interests.length === 0) {
        errors.push('กรุณาเลือกความสนใจ');
    }
    
    if (!userData.description) {
        errors.push('กรุณากรอกคำอธิบาย');
    }
    
    return errors;
}

// ✅ ฟังก์ชันส่งข้อมูล
async function submitData() {
    let firstnameDOM = document.querySelector('input[name="firstname"]');
    let lastnameDOM = document.querySelector('input[name="lastname"]');
    let ageDOM = document.querySelector('input[name="age"]');
    let genderDOM = document.querySelector('input[name="gender"]:checked');
    let interestDOMs = document.querySelectorAll('input[name="interest"]:checked');
    let descriptionDOM = document.querySelector('textarea[name="description"]');
    let messageDOM = document.querySelector('.message');

    let interests = Array.from(interestDOMs).map(input => input.value);

    let userData = {
        firstName: firstnameDOM?.value?.trim() || "",
        lastName: lastnameDOM?.value?.trim() || "",
        age: ageDOM?.value || "",
        gender: genderDOM?.value || "",
        interests: interests,
        description: descriptionDOM?.value?.trim() || ""
    };

    console.log("📌 Data being sent:", userData);

    // ตรวจสอบข้อมูลที่กรอกด้วย validateData
    const errors = validateData(userData);

    if (errors.length > 0) {
        // ถ้ามีข้อผิดพลาด จะส่งข้อความกลับไปแสดง
        messageDOM.innerText = errors.join('\n');
        messageDOM.className = 'message message-danger';
        return; // หยุดการทำงานของฟังก์ชัน
    }

    
    try {
        let response;
        let message = 'บันทึกข้อมูลเรียบร้อยแล้ว';

        if (mode === 'CREATE') {
            response = await axios.post(`${BASE_URL}/users`, userData);
        } else {
            response = await axios.put(`${BASE_URL}/users/${selectedId}`, userData);
            message = 'แก้ไขข้อมูลเรียบร้อยแล้ว';  // เปลี่ยนข้อความเมื่อแก้ไขข้อมูล
        }

        console.log('✅ Response:', response.data);
        messageDOM.innerText = message;
        messageDOM.className = 'message message-success';

    } catch (error) {
        console.error('❌ Error:', error);
        
        // ตรวจสอบว่า error.response และ error.response.data มีค่าอยู่หรือไม่
        const errorMessage = error.response?.data?.message || 'บันทึกข้อมูลไม่สำเร็จ';
        messageDOM.innerText = errorMessage;
        messageDOM.className = 'message message-danger';
    }
}
//HOMEWORKปรับ CSSไฟล์ให้สวยงามขึ้น
//Project 3/4 เมษา พร้อมการบ้าน