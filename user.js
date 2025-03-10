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

        // โหลด user ทั้งหมดเข้า HTML
        let htmlData = '<div>';
        for (let i = 0; i < response.data.length; i++) {
            let user = response.data[i];

            
            let firstName = user.firstName || user.firstname 
            let lastName = user.lastName || user.lastname

            htmlData += `<div>
                ${user.id} ${firstName} ${lastName}
                <a href='index.html?id=${user.id}'><button>Edit</button></a>
                <button class='delete' data-id='${user.id}'>Delete</button>
            </div>`;
        }
        htmlData += '</div>';

        userDOM.innerHTML = htmlData;

        // ✅ ลบ user
        const deleteDOMS = document.getElementsByClassName('delete');
        for (let i = 0; i < deleteDOMS.length; i++) {
            deleteDOMS[i].addEventListener('click', async (event) => {
                const id = event.target.dataset.id;
                try {
                    await axios.delete(`${BASE_URL}/users/${id}`);
                    await loadData(); // โหลดข้อมูลใหม่หลังจากลบ
                } catch (error) {
                    console.error('❌ Error deleting user:', error);
                }
            });
        }
    } catch (error) {
        console.error('❌ Error fetching users:', error);
    }
};
