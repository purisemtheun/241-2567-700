const BASE_URL = 'http://localhost:8000';

window.onload = async () => {
    await loadData();
    console.log('User page loaded');
};

const loadData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users`);
        console.log("📌 Data from API:", response.data);

        const userDOM = document.getElementById('users');
        if (!userDOM) {
            console.error("❌ Element #users ไม่พบใน HTML");
            return;
        }
        
        // 
        let htmlData = '';
        response.data.forEach(user => {
            const firstName = user.firstName || user.firstname || '';
            const lastName = user.lastName || user.lastname || '';
            const gender = user.gender || '-';
            const age = user.age || '-';
            const description = user.description || '-';
            const interest = user.interest || '-';

            htmlData += `
            <div class="p-4 bg-green-50 border border-green-200 ">
                <p class="font-semibold text-gray-800 text-lg">#${user.id} 👤 ${firstName} ${lastName}</p>
                <p class="text-sm text-gray-600">เพศ: ${gender} | อายุ: ${age}</p>
                <p class="text-sm text-gray-600">ความสนใจ: ${interest}</p>
                <p class="text-sm text-gray-600 mb-2">คำอธิบาย: ${description}</p>
                <div class="space-x-2">
                    <a href="index.html?id=${user.id}">
                        <button class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">แก้ไข</button>
                    </a>
                    <button class="delete px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" data-id="${user.id}">ลบ</button>
                </div>
            </div>
            `;
        });

        userDOM.innerHTML = htmlData;

        // ปุ่มลบ
        const deleteDOMS = document.getElementsByClassName('delete');
        for (let i = 0; i < deleteDOMS.length; i++) {
            deleteDOMS[i].addEventListener('click', async (event) => {
                const id = event.target.dataset.id;
                if (confirm('คุณแน่ใจว่าต้องการลบผู้ใช้นี้?')) {
                    try {
                        await axios.delete(`${BASE_URL}/users/${id}`);
                        await loadData(); // โหลดใหม่
                    } catch (error) {
                        console.error('❌ Error deleting user:', error);
                    }
                }
            });
        }
    } catch (error) {
        console.error('❌ Error fetching users:', error);
    }
};
