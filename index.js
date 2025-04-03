const baseurl = 'http://localhost:8000';
let mode = 'CREATE'; // Default mode
let selectedID = '';

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        mode = 'EDIT';
        selectedID = id;

        try {
            const response = await axios.get(`${baseurl}/users/${id}`);
            const user = response.data;

            // เข้าถึง DOM แล้วแยกเก็บไว้
            let firstNameDOM = document.querySelector('input[name=firstname]');
            let lastNameDOM = document.querySelector('input[name=lastname]');
            let ageDOM = document.querySelector('input[name=age]');
            let descriptionDOM = document.querySelector('textarea[name=description]');
            let genderDOMs = document.querySelectorAll('input[name=gender]');
            let interestDOMs = document.querySelectorAll('input[name=interest]');

            // ใส่ค่าให้ input
            firstNameDOM.value = user.firstname;
            lastNameDOM.value = user.lastname;
            ageDOM.value = user.age;
            descriptionDOM.value = user.description;

           
            genderDOMs.forEach(radio => {
                if (radio.value === user.gender) {
                    radio.checked = true;
                }
            });

            // checkbox
            interestDOMs.forEach(checkbox => {
                if (user.interest.includes(checkbox.value)) {
                    checkbox.checked = true;
                }
            });

        } catch (error) {
            console.error('error:', error);
        }
    }
};

const validateData = (userData) => {
    let errors = [];

    if (!userData.firstname) errors.push('กรุณากรอกชื่อ');
    if (!userData.lastname) errors.push('กรุณากรอกนามสกุล');
    if (!userData.age) errors.push('กรุณากรอกอายุ');
    if (!userData.gender) errors.push('กรุณาเลือกเพศ');
    if (!userData.interest || userData.interest.length === 0) errors.push('กรุณาเลือกความสนใจ');
    if (!userData.description) errors.push('กรุณากรอกข้อมูล');

    return errors;
};

const submitData = async () => {
    // ✅ แยก DOM ไว้ก่อน
    let firstNameDOM = document.querySelector('input[name=firstname]');
    let lastNameDOM = document.querySelector('input[name=lastname]');
    let ageDOM = document.querySelector('input[name=age]');
    let genderChecked = document.querySelector('input[name=gender]:checked');
    let interestDOMs = document.querySelectorAll('input[name=interest]:checked');
    let descriptionDOM = document.querySelector('textarea[name=description]');
    let messageDOM = document.getElementById('message');

    // ✅ ดึงค่าจาก DOM
    let userData = {
        firstname: firstNameDOM.value.trim(),
        lastname: lastNameDOM.value.trim(),
        age: parseInt(ageDOM.value),
        gender: genderChecked ? genderChecked.value : '',
        interest: Array.from(interestDOMs).map(el => el.value),
        description: descriptionDOM.value.trim(),
    };

    const errors = validateData(userData);
    if (errors.length > 0) {
        let html = '<ul>';
        errors.forEach(err => html += `<li>${err}</li>`);
        html += '</ul>';
        messageDOM.innerHTML = html;
        messageDOM.className = 'message danger';
        return;
    }

    try {
        let message = 'บันทึกข้อมูลเรียบร้อยแล้ว';

        if (mode === 'CREATE') {
            const response = await axios.post(`${baseurl}/users`, userData);
            console.log('response', response.data);
        } else {
            const response = await axios.put(`${baseurl}/users/${selectedID}`, userData);
            console.log('response', response.data);
            message = 'แก้ไขข้อมูลเรียบร้อยแล้ว';
            window.location.href = "user.html";
        }

        messageDOM.innerText = message;
        messageDOM.className = 'message success';
    } catch (error) {
        console.log('error message', error.message);
        if (error.response) {
            error.message = error.response.data.message || 'เกิดข้อผิดพลาด';
            error.errors = error.response.data.errors || [];
        }

        let html = `<div>${error.message}</div><ul>`;
        for (let i = 0; i < (error.errors || []).length; i++) {
            html += `<li>${error.errors[i]}</li>`;
        }
        html += '</ul>';
        messageDOM.innerHTML = html;
        messageDOM.className = 'message danger';
    }
};
