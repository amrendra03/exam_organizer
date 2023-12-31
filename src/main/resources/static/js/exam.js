function alertCopy() {
    alert('Copy Successfully.');
};

function openPopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "block";

}
function closePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}

function openView(){
    var popup = document.getElementById("ExamPopup");
    popup.style.display = "block";
}

function closeView(){
    var popup = document.getElementById("ExamPopup");
    popup.style.display = "none";

    const questionListContainer = document.getElementById("QuestionList");
    questionListContainer.innerHTML =`<p class="water-1">Exam View</p>`;
}

var page = 0;
var isLoading = false;
var loadMore = true;

function fetchExams() {
    console.log(page+" "+isLoading+" "+loadMore);
    if (!isLoading && loadMore) {
        isLoading = true;
        fetch("/admin/exam-list?page=" + page)
            .then((response) => response.json())
            .then((data) => {
            isLoading = false;
            if (data.length === 0) {
                loadMore = false;
            } else {
                const examList = document.getElementById("examList");

                data.forEach((exam) => {
//                    console.log(exam)
                    const ob={id:exam.examId,
                    name:exam.examName}
                    const tbody = document.getElementById("examList");
                    const tr = document.createElement("tr");
                    tr.setAttribute("th:each", "exam: ${exams}");
                    tr.setAttribute(
                        "th:style",
                        "width: 100%;"
                    );
                    tr.innerHTML = `
                              <td class="table-cell" style="width: 28px; height: 100px;">
                                <div class="exam_check_box"></div>
                              </td>

                              <td class="table-cell" style="text-align: center; width: 25%; height: 100%;">
                                <p th:text="${exam.examName}" style="margin: 0">${exam.examName}</p>
                                <div style="display:flex;justify-content:center">
                                  <p style="margin:0px">Id:</p>
                                  <p style="margin: 0">${exam.examId}</p>
                                </div>
                              </td>

                              <td class="table-cell" style="text-align: center; width: 20%; height: 100%;">
                                <p  style="margin: 0">${exam.examDate}</p>
                                <div style="display:flex;justify-content:center">
                                  <p style="margin: 0;">${exam.startTime}</p>
                                  <span>|--|</span>
                                  <div style="display:flex;">
                                    <p style="margin: 0;">Du:</p>
                                    <p  style="margin: 0">${exam.duration}</p>
                                  </div>
                                </div>
                              </td>

                              <td class="table-cell" style="text-align: center; width: 10%; height: 100%;">
                                <p style="margin: 0">${exam.totalMarks}</p>
                              </td>

                              <td class="table-cell" style=" width: 10%; height: 100%;">

                                 <div style=" width:100%; height:100%; display:flex; align-items: center; justify-content: space-around; ">
                                    <div class="exam_status ${exam.status}"></div>
                                 </div>

                              </td>

                              <td class="table-cell" style="text-align: center; width: 35%; height: 100%;">
                                <!-- option---------- -->
                                <div style="width:100%;height:100%; display: flex; align-items: center;justify-content: space-around;">

                                <!-- view -->
                                 <div onclick="viewExam([${exam.examId}, '${exam.examName}',
                                  '${exam.startTime}', '${exam.examDate}',
                                   '${exam.status}', ${exam.totalMarks}, ${exam.duration}])" style="cursor: pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                        fill="none">
                                        <path d="M4.16667 9.99992C4.16667 9.99992 6.2875 5.83325 10 5.83325C13.7117 5.83325 15.8333 9.99992 15.8333 9.99992C15.8333 9.99992 13.7117 14.1666 10 14.1666C6.2875 14.1666 4.16667 9.99992 4.16667 9.99992Z"
                                           stroke="black"
                                           stroke-width="1.67"
                                           stroke-linecap="round"
                                           stroke-linejoin="round"
                                        />
                                        <path
                                             d="M17.5 14.1667V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V14.1667M17.5 5.83333V4.16667C17.5 3.72464 17.3244 3.30072 17.0118 2.98816C16.6993 2.67559 16.2754 2.5 15.8333 2.5H4.16667C3.72464 2.5 3.30072 2.67559 2.98816 2.98816C2.67559 3.30072 2.5 3.72464 2.5 4.16667V5.83333M10 10.8333C10.221 10.8333 10.433 10.7455 10.5893 10.5893C10.7455 10.433 10.8333 10.221 10.8333 10C10.8333 9.77899 10.7455 9.56702 10.5893 9.41074C10.433 9.25446 10.221 9.16667 10 9.16667C9.77899 9.16667 9.56702 9.25446 9.41074 9.41074C9.25446 9.56702 9.16667 9.77899 9.16667 10C9.16667 10.221 9.25446 10.433 9.41074 10.5893C9.56702 10.7455 9.77899 10.8333 10 10.8333Z"
                                             stroke="black"
                                             stroke-width="1.67"
                                             stroke-linecap="round"
                                             stroke-linejoin="round"
                                         />
                                    </svg>
                                 <p style="margin: 2px; font-size: 12px">View</p>
                                </div>
                                <!-- download -->
                                     <div  onclick="downloadExam(${exam.examId})" style="cursor: pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                        fill="none">
                                        <path d="M0.625 12.375C0.79076 12.375 0.949732 12.4408 1.06694 12.5581C1.18415 12.6753 1.25 12.8342 1.25 13V16.125C1.25 16.4565 1.3817 16.7745 1.61612 17.0089C1.85054 17.2433 2.16848 17.375 2.5 17.375H17.5C17.8315 17.375 18.1495 17.2433 18.3839 17.0089C18.6183 16.7745 18.75 16.4565 18.75 16.125V13C18.75 12.8342 18.8158 12.6753 18.9331 12.5581C19.0503 12.4408 19.2092 12.375 19.375 12.375C19.5408 12.375 19.6997 12.4408 19.8169 12.5581C19.9342 12.6753 20 12.8342 20 13V16.125C20 16.788 19.7366 17.4239 19.2678 17.8928C18.7989 18.3616 18.163 18.625 17.5 18.625H2.5C1.83696 18.625 1.20107 18.3616 0.732233 17.8928C0.263392 17.4239 0 16.788 0 16.125V13C0 12.8342 0.065848 12.6753 0.183058 12.5581C0.300269 12.4408 0.45924 12.375 0.625 12.375Z"
                                           fill="black"
                                        />
                                        <path d="M9.5575 14.8175C9.61555 14.8757 9.68452 14.9219 9.76045 14.9534C9.83639 14.9849 9.91779 15.0011 10 15.0011C10.0822 15.0011 10.1636 14.9849 10.2395 14.9534C10.3155 14.9219 10.3844 14.8757 10.4425 14.8175L14.1925 11.0675C14.3099 10.9501 14.3758 10.791 14.3758 10.625C14.3758 10.459 14.3099 10.2999 14.1925 10.1825C14.0751 10.0651 13.916 9.99921 13.75 9.99921C13.584 9.99921 13.4249 10.0651 13.3075 10.1825L10.625 12.8663V1.875C10.625 1.70924 10.5591 1.55027 10.4419 1.43306C10.3247 1.31585 10.1658 1.25 10 1.25C9.83424 1.25 9.67526 1.31585 9.55805 1.43306C9.44084 1.55027 9.375 1.70924 9.375 1.875V12.8663L6.6925 10.1825C6.57514 10.0651 6.41597 9.99921 6.25 9.99921C6.08403 9.99921 5.92485 10.0651 5.8075 10.1825C5.69014 10.2999 5.62421 10.459 5.62421 10.625C5.62421 10.791 5.69014 10.9501 5.8075 11.0675L9.5575 14.8175Z"
                                           fill="#0D0D0D"
                                         />
                                        </svg>
                                        <p style="margin: 2px; font-size: 12px">Download</p>
                                    </div>
                                <!-- Cancel -->

                                    <div onclick="cancelExam(${exam.examId})" style="cursor: pointer" on>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                            fill="none">
                                            <path d="M10 1.875C5.52 1.875 1.875 5.52 1.875 10C1.875 14.48 5.52 18.125 10 18.125C14.48 18.125 18.125 14.48 18.125 10C18.125 5.52 14.48 1.875 10 1.875ZM10 3.125C13.8044 3.125 16.875 6.19563 16.875 10C16.875 13.8044 13.8044 16.875 10 16.875C6.19563 16.875 3.125 13.8044 3.125 10C3.125 6.19563 6.19563 3.125 10 3.125ZM7.6375 6.7375L6.7375 7.6375L9.1025 10L6.73875 12.3625L7.63875 13.2625L10 10.8981L12.3625 13.2606L13.2625 12.3625L10.8981 10L13.2606 7.6375L12.3625 6.7375L10 9.1025L7.6375 6.73875V6.7375Z"
                                            fill="black"/>
                                        </svg>
                                        <p style="margin: 2px; font-size: 12px">Cancel</p>
                                    </div>
                                <!-- Delete -->
                                   <div onclick="deleteExam(${exam.examId})" style="cursor: pointer">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                      fill="none"
                                    >
                                     <path
                                             d="M3.125 5.00003H1.875C1.70924 5.00003 1.55027 4.93418 1.43306 4.81697C1.31585 4.69976 1.25 4.54079 1.25 4.37503C1.25 4.20927 1.31585 4.0503 1.43306 3.93309C1.55027 3.81588 1.70924 3.75003 1.875 3.75003H6.875V1.87378C6.875 1.70802 6.94085 1.54905 7.05806 1.43184C7.17527 1.31463 7.33424 1.24878 7.5 1.24878H12.5C12.6658 1.24878 12.8247 1.31463 12.9419 1.43184C13.0592 1.54905 13.125 1.70802 13.125 1.87378V3.75003H18.125C18.2908 3.75003 18.4497 3.81588 18.5669 3.93309C18.6842 4.0503 18.75 4.20927 18.75 4.37503C18.75 4.54079 18.6842 4.69976 18.5669 4.81697C18.4497 4.93418 18.2908 5.00003 18.125 5.00003H16.875V18.125C16.875 18.2908 16.8092 18.4498 16.6919 18.567C16.5747 18.6842 16.4158 18.75 16.25 18.75H3.75C3.58424 18.75 3.42527 18.6842 3.30806 18.567C3.19085 18.4498 3.125 18.2908 3.125 18.125V5.00003ZM11.875 3.75003V2.50003H8.125V3.75003H11.875ZM4.375 17.5H15.625V5.00003H4.375V17.5ZM8.125 15C7.95924 15 7.80027 14.9342 7.68306 14.817C7.56585 14.6998 7.5 14.5408 7.5 14.375V8.12503C7.5 7.95927 7.56585 7.8003 7.68306 7.68309C7.80027 7.56588 7.95924 7.50003 8.125 7.50003C8.29076 7.50003 8.44973 7.56588 8.56694 7.68309C8.68415 7.8003 8.75 7.95927 8.75 8.12503V14.375C8.75 14.5408 8.68415 14.6998 8.56694 14.817C8.44973 14.9342 8.29076 15 8.125 15ZM11.875 15C11.7092 15 11.5503 14.9342 11.4331 14.817C11.3158 14.6998 11.25 14.5408 11.25 14.375V8.12503C11.25 7.95927 11.3158 7.8003 11.4331 7.68309C11.5503 7.56588 11.7092 7.50003 11.875 7.50003C12.0408 7.50003 12.1997 7.56588 12.3169 7.68309C12.4342 7.8003 12.5 7.95927 12.5 8.12503V14.375C12.5 14.5408 12.4342 14.6998 12.3169 14.817C12.1997 14.9342 12.0408 15 11.875 15Z"
                                             fill="black"
                                     />
                                     </svg>
                                     <p style="margin: 2px; font-size: 12px">Delete</p>
                                   </div>
                                <!-- Generate Link -->
                                <div  onclick="generateLinkExam(${exam.examId})" style="cursor: pointer">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                      fill="none">
                                     <path
                                             d="M7.9425 6.875H5C4.00544 6.875 3.05161 7.27009 2.34835 7.97335C1.64509 8.67661 1.25 9.63044 1.25 10.625C1.25 11.6196 1.64509 12.5734 2.34835 13.2767C3.05161 13.9799 4.00544 14.375 5 14.375H8.75C9.35009 14.3753 9.9415 14.2316 10.4745 13.956C11.0076 13.6803 11.4667 13.2807 11.8133 12.7909C12.1599 12.301 12.3838 11.7351 12.4663 11.1407C12.5489 10.5463 12.4875 9.94077 12.2875 9.375H11.25C11.1425 9.375 11.0375 9.3875 10.9375 9.41375C11.1483 9.79438 11.2561 10.2234 11.2503 10.6585C11.2445 11.0936 11.1252 11.5196 10.9042 11.8945C10.6833 12.2693 10.3683 12.58 9.99053 12.7958C9.61271 13.0116 9.18511 13.1251 8.75 13.125H5C4.33696 13.125 3.70107 12.8616 3.23223 12.3928C2.76339 11.9239 2.5 11.288 2.5 10.625C2.5 9.96196 2.76339 9.32607 3.23223 8.85723C3.70107 8.38839 4.33696 8.125 5 8.125H6.91875C7.19125 7.655 7.53625 7.2325 7.9425 6.875Z"
                                             fill="black"
                                     />
                                     <path
                                             d="M11.25 6.875C10.6499 6.87469 10.0585 7.01839 9.52548 7.29405C8.99244 7.5697 8.53335 7.96925 8.18675 8.45913C7.84016 8.94902 7.6162 9.51493 7.53367 10.1093C7.45115 10.7037 7.51248 11.3092 7.71251 11.875H9.08501C8.8656 11.495 8.75008 11.0639 8.75008 10.625C8.75007 10.1862 8.86558 9.75507 9.085 9.37503C9.30441 8.99498 9.62 8.67939 10 8.45996C10.3801 8.24054 10.8112 8.12501 11.25 8.125H15C15.6631 8.125 16.2989 8.38839 16.7678 8.85723C17.2366 9.32607 17.5 9.96196 17.5 10.625C17.5 11.288 17.2366 11.9239 16.7678 12.3928C16.2989 12.8616 15.6631 13.125 15 13.125H13.0813C12.8093 13.5943 12.4632 14.0164 12.0563 14.375H15C15.4925 14.375 15.9801 14.278 16.4351 14.0895C16.89 13.9011 17.3034 13.6249 17.6517 13.2767C17.9999 12.9284 18.2761 12.515 18.4646 12.0601C18.653 11.6051 18.75 11.1175 18.75 10.625C18.75 10.1325 18.653 9.64491 18.4646 9.18994C18.2761 8.73497 17.9999 8.32157 17.6517 7.97335C17.3034 7.62513 16.89 7.34891 16.4351 7.16045C15.9801 6.972 15.4925 6.875 15 6.875H11.25Z"
                                             fill="black"
                                     />
                                    </svg>
                                    <p style="margin: 2px; font-size: 12px">Generate Link</p>
                                </div>

                               </div>
                              </td>
                            `;
                    tbody.appendChild(tr);

                });

                page++;
            }
        })
            .catch((error) => {
            isLoading = false;
            console.error("Error fetching data:", error);
        });
    }
}
document.getElementById("examList")
    .addEventListener("scroll", function () {
    if (this.scrollTop + this.clientHeight >= this.scrollHeight) {
        fetchExams();
    }
});
fetchExams();

function deleteExam(id) {
    var csrfToken_ = window.csrfToken;
    var csrfHeader_ = window.csrfHeader;

    fetch(`/admin/exam/${id}`, {
        method: "DELETE",
        headers: {
            // Add the CSRF token to the headers
            [csrfHeader_]: csrfToken_,
        },
    }).then(response => {
        if (!response.ok) {
            throw new Error(`Failed to delete exam: ${response.status}`);
        }
        return response.json();
    }).then(data => {
        console.log('Exam deleted successfully:', data);

        console.log("---ok d 1--")
        console.log(`${page} + ${isLoading} + ${loadMore}}`)
        page = 0;
        isLoading = false;
        loadMore = true;
        document.getElementById("examList").innerText = '';
        fetchExams();
        console.log("---ok d 2--")
    }).catch(error => {
        console.error('Error deleting exam:', error.message);
    });
}

function cancelExam(id) {
    console.log(`Cancel Exam Id: ${id}`);
    var csrfToken_ = window.csrfToken;
    var csrfHeader_ = window.csrfHeader;

    fetch(`/admin/exam/update/${id}`, {
        method: "POST",
        headers: {
            // Add the CSRF token to the headers
            [csrfHeader_]: csrfToken_,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"status":"CANCELLED"}),
    }).then(response => {
        if (!response.ok) {
            throw new Error(`Failed to change exam: ${response.status}`);
        }

        page = 0;
        isLoading = false;
        loadMore = true;
        document.getElementById("examList").innerText = '';
        fetchExams();
    }).then(data => {
        console.log('Exam update successfully:', data);
        //      window.location.href = '/admin/exam';
    }).catch(error => {
        console.error('Error update exam:', error.message);
    });

}

function viewExam(ob) {
    openView();
    document.getElementById("ex1").innerHTML=ob[1];
    document.getElementById("ex2").innerHTML=ob[3];
    document.getElementById("ex3").innerHTML=ob[2];
    document.getElementById("ex4").innerHTML=ob[5]+" Marks";
    document.getElementById("ex5").innerHTML=ob[6]+" min";
    Qlist(ob[0]);
}

function downloadExam(id) {
    console.log(`Download Id: ${id}`);
}
function generateLinkExam(id) {
    console.log(`GenerateLink Exam Id: ${id}`);
}

function createExam(){
    console.log("from create exam..")
    var csrfToken_ = window.csrfToken;
    var csrfHeader_ = window.csrfHeader;
    const examData={
        examName:document.getElementById("examName").value,
        examDate:document.getElementById('examDate').value,
        startTime:document.getElementById('startTime').value,
        duration:document.getElementById('duration').value,
        totalMarks:document.getElementById('totalMarks').value,
    };
    fetch('/admin/exam', {
        method: 'POST',
        headers: {
            [csrfHeader_]: csrfToken_,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(examData)
    }).then(response =>response.json())
        .then(data => {
        console.log(data);
        closePopup(0);
        console.log(page+" "+isLoading+" "+loadMore);
        page = 0;
        isLoading = false;
        loadMore = true;
        document.getElementById("examList").innerText = '';
        fetchExams();
    }).catch(error => {
        console.error('Error submitting exam data:', error);
    });

}


