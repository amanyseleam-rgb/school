
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('شكراً لرسالتك! سيتم التواصل معك قريباً من قبل إدارة مدرسة بهاء الدين.');
    this.reset();
});
function searchFunction() {
    let val = document.getElementById('floatSearch').value;
    if(val) alert("بحث عن: " + val);
}


function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
        modal.style.opacity = "0";
        setTimeout(() => {
            modal.style.opacity = "1";
            modal.style.transition = "opacity 0.3s ease";
        }, 10);
    }
}

function openModal(id) {
    document.getElementById(id).style.display = "block";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}



window.onclick = function(event) {
    if (event.target.className === 'modal-overlay') {
        event.target.style.display = "none";
    }
}
function toggleLanguage() {
    const btn = document.getElementById('langBtn');
    const body = document.body;
    
    const title = document.getElementById('title');
    const desc = document.getElementById('desc');

    if (btn.innerText === 'EN') {
      
        btn.innerText = 'عربي';
        body.dir = 'ltr';
        
        title.innerText = title.getAttribute('data-en');
        desc.innerText = desc.getAttribute('data-en');
        
        console.log("Switched to English");
    } else {
        btn.innerText = 'EN';
        body.dir = 'rtl';
        
        title.innerText = title.getAttribute('data-ar');
        desc.innerText = desc.getAttribute('data-ar');
        
        console.log("تم التغيير للعربية");
    }
}
function changeBg(color) {
   
    document.body.style.backgroundColor = color;
    
    if (color === '#341f97' || color === '#333') {
        document.body.style.color = '#fff';
    } else {
        document.body.style.color = '#333';
    }
}


function playCurrentVideo(container) {
    const video = container.querySelector('video');
    
    if (video.paused) {
        document.querySelectorAll('video').forEach(v => v.pause());
        document.querySelectorAll('.video-item').forEach(item => item.classList.remove('playing'));

        video.play();
        video.controls = true;
        container.classList.add('playing');
    } else {
        video.pause();
        container.classList.remove('playing');
    }
}


function saveTeacher() {
    const name = document.getElementById('tName').value;
    const subject = document.getElementById('tSubject').value;
    const schedule = document.getElementById('tSchedule').value;
    const file = document.getElementById('tFile').value;

    if (!name || !subject) {
        alert("من فضلك أدخلي اسم المعلم والمادة");
        return;
    }

    const teacher = { name, subject, schedule, file };
    let teachers = JSON.parse(localStorage.getItem('school_teachers')) || [];
    teachers.push(teacher);
    localStorage.setItem('school_teachers', JSON.stringify(teachers));

   
    document.getElementById('tName').value = '';
    document.getElementById('tSubject').value = '';
    document.getElementById('tSchedule').value = '';
    document.getElementById('tFile').value = '';

    renderTeachers();
}


function renderTeachers() {
    const grid = document.getElementById('teachersGrid');
    const teachers = JSON.parse(localStorage.getItem('school_teachers')) || [];

    grid.innerHTML = teachers.map((t, index) => `
        <div class="teacher-card">
            <div class="teacher-info">
                <h4>${t.name}</h4>
                <p>مادة: ${t.subject}</p>
            </div>
            <div class="teacher-actions">
                ${t.schedule ? `<a href="${t.schedule}" target="_blank" class="btn-link">عرض الجدول</a>` : ''}
                ${t.file ? `<a href="${t.file}" target="_blank" class="btn-link" style="background:#17a2b8">تحميل الملف</a>` : ''}
                <button onclick="removeTeacher(${index})" class="btn-del">حذف</button>
            </div>
        </div>
    `).join('');
}

function removeTeacher(index) {
    let teachers = JSON.parse(localStorage.getItem('school_teachers'));
    teachers.splice(index, 1);
    localStorage.setItem('school_teachers', JSON.stringify(teachers));
    renderTeachers();
}


document.addEventListener('DOMContentLoaded', renderTeachers);

function addMember() {
    const name = document.getElementById('memberName').value;
    const role = document.getElementById('memberRole').value;

    if (name === '' || role === '') {
        alert("يرجى إدخال البيانات كاملة");
        return;
    }

    const table = document.getElementById('teamTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${name}</td>
        <td>${role}</td>
        <td><button class="delete-btn" onclick="deleteRow(this)">حذف</button></td>
    `;

    document.getElementById('memberName').value = '';
    document.getElementById('memberRole').value = '';
}

function deleteRow(btn) {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

