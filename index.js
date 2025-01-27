function submitData() {
    let firstnameDOM = document.querySelector('input[name="firstname"]');
    let lastnameDOM = document.querySelector('input[name="lastname"]');
    let ageDOM = document.querySelector('input[name="age"]');
    let genderDOM = document.querySelector('input[name="gender"]:checked');
    let interestDOMs = document.querySelectorAll('input[name="interest"]:checked');
    let descriptionDOM = document.querySelector('textarea[name="description"]');

    let interest = '';
    for (let i = 0; i < interestDOMs.length; i++) {
        interest += interestDOMs[i].value + ',';
        if(i < interestDOMs.length -1) {
            interest += ','
        }
    }

    // ดึงค่าจากฟอร์ม
    let userData = {
        firstName: firstnameDOM.value,
        lastName: lastnameDOM.value,
        age: ageDOM.value,
        gender:  genderDOM.value ,
        interest: interest,
        description: descriptionDOM.value
    };

    console.log('submitData', userData);
}
