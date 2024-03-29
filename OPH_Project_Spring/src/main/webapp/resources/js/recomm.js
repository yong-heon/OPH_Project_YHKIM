/* 이용법 버튼 클릭 이벤트 */
const infoManualBtn = document.querySelector('.informationbar__manual__usage');
const manual = document.querySelector('.manual');
const manualCloseBtn = document.querySelector('.manual__close');

const openManual = () => {
    manual.classList.toggle('active');
}

const closeManual = () => {
    manual.classList.remove('active');
}

infoManualBtn.addEventListener('click', openManual);
manualCloseBtn.addEventListener('click', closeManual);

/* map sidebar 버튼 클릭 이벤트 */
const infoSidebar = document.querySelector('.informationbar__sidebar');
const sidebar = document.querySelector('.sidebar');
const sidebarBtn = document.querySelector('.sidebar__toggle');

const toggleSidebar = () => {
    infoSidebar.classList.toggle('active');
    sidebar.classList.toggle('active');
};

infoSidebar.addEventListener('click', toggleSidebar);
sidebarBtn.addEventListener('click', toggleSidebar);

/* tab menu 클릭 이벤트 */
// 초기에 첫 번째 탭을 활성화
document.getElementById('tab01').classList.add('active');
document.querySelector('.sidebar__content__tab-menu-item:first-child').classList.add('active');

// 탭 메뉴 클릭 시 해당 탭 활성화
const tabMenuItems = document.querySelectorAll('.sidebar__content__tab-menu-item');
tabMenuItems.forEach((item) => {
    item.addEventListener('click', (event) => {
        event.preventDefault();

        // 모든 탭 메뉴 아이템 비활성화
        tabMenuItems.forEach((menuItem) => {
            menuItem.classList.remove('active');
        });

        // 클릭한 탭 메뉴 아이템 활성화
        item.classList.add('active');

        // 모든 탭 컨텐츠 숨김
        const tabContents = document.querySelectorAll('.sidebar__content__tab-content > div');
        tabContents.forEach((content) => {
            content.classList.remove('active');
        });

        // 클릭한 탭에 해당하는 컨텐츠 보여주기
        const tabId = item.querySelector('a').getAttribute('href').substring(1);
        const tabContent = document.getElementById(tabId);
        tabContent.classList.add('active');
    });
});

/* 주거형태가 전세 또는 매매일 때 월세 입력 칸 비활성화 및 값을 0으로 설정 */
document.addEventListener('DOMContentLoaded', function() {
    // 모든 거래정보 라디오 버튼을 가져온다.
    let rentTypes = document.querySelectorAll('[name="rentType"]');
    
    let monthlyRentInput = document.getElementById('monthlyRent');
    
    rentTypes.forEach(function(rentType) {
        rentType.addEventListener('change', function() {
            // 선택된 거래정보가 전세 또는 매매이면 monthlyRent 입력란을 비활성화하고 값을 0으로 설정한다.
            if (this.value === '전세' || this.value === '매매') {
                monthlyRentInput.value = 0;
                monthlyRentInput.readOnly = true;  // 읽기 전용으로 설정
            } else {
                monthlyRentInput.readOnly = false;
            }
        });
    });
});

/* 사용자 보증금 및 월세 입력 시 단위 계산 */
document.getElementById("securityDeposit").addEventListener("input", function() {
    let formattedValue = formatToEokMan(this.value);
    document.getElementById("securityDepositFormatted").textContent = formattedValue;
});

document.getElementById("monthlyRent").addEventListener("input", function() {
    let formattedValue = formatToEokMan(this.value);
    document.getElementById("monthlyRentFormatted").textContent = formattedValue;
});

function formatToEokMan(value) {
    let onlyNumbers = value.replace(/[^0-9]/g, ''); 

    let amount = parseInt(onlyNumbers, 10) || 0; 

    let eok = Math.floor(amount / 10000);
    let man = amount % 10000; 

    if (amount < 10000) return `${man}만 원`;
    return `${eok}억 ${man}만 원`;
}

//모든 <select> 요소를 가져온다.
let selects = document.querySelectorAll('.tab03__content select');

selects.forEach((selectElement) => {
    selectElement.addEventListener('change', function() {
        resetDisabledOptions();
        updateDisabledOptions();
    });
});

function resetDisabledOptions() {
    // 모든 <option>들의 disabled 상태를 초기화한다.
    selects.forEach((select) => {
        let options = select.options;
        for (let i = 0; i < options.length; i++) {
            options[i].disabled = false;
        }
    });
}

function updateDisabledOptions() {
    // 현재 선택된 값을 모두 저장한다.
    let selectedValues = [];
    selects.forEach((select) => {
        if (select.value) {
            selectedValues.push(select.value);
        }
    });

    // 다른 <select>의 <option>들 중에서 이미 선택된 값을 비활성화한다.
    selects.forEach((select) => {
        let options = select.options;
        for (let i = 0; i < options.length; i++) {
            if (selectedValues.includes(options[i].value) && options[i].value !== select.value) {
                options[i].disabled = true;
            }
        }
    });
}
/* 사용자 정보 모두 선택 시 검색하기 활성화 이벤트 */
document.addEventListener("DOMContentLoaded", function() {
    const residenceTypeInputs = document.querySelectorAll('input[name="residenceType"]');
    const rentTypeInputs = document.querySelectorAll('input[name="rentType"]');
    const securityDepositInput = document.getElementById("securityDeposit");
    const monthlyRentInput = document.getElementById("monthlyRent");
    const priorityInputs = [document.getElementById("priority1"), document.getElementById("priority2"), document.getElementById("priority3")];

    const searchBtn = document.querySelector(".searchBtn");

    function updateSearchButtonState() {
        const isResidenceTypeChecked = [...residenceTypeInputs].some(input => input.checked);
        const isRentTypeChecked = [...rentTypeInputs].some(input => input.checked);
        const hasDepositValue = securityDepositInput.value.trim() !== '';
        const hasMonthlyRentValue = monthlyRentInput.value.trim() !== '';
        const hasAllPrioritiesSelected = priorityInputs.every(select => select.value);

        if (isResidenceTypeChecked && isRentTypeChecked && hasDepositValue && hasMonthlyRentValue && hasAllPrioritiesSelected) {
            searchBtn.classList.add('active');
            searchBtn.removeAttribute('disabled');
        } else {
            searchBtn.classList.remove('active');
            searchBtn.setAttribute('disabled', '');
        }
    }

    // 이벤트 리스너 추가
    [...residenceTypeInputs, ...rentTypeInputs].forEach(input => {
        input.addEventListener('change', updateSearchButtonState);
    });

    securityDepositInput.addEventListener('input', updateSearchButtonState);
    monthlyRentInput.addEventListener('input', updateSearchButtonState);
    priorityInputs.forEach(select => {
        select.addEventListener('change', updateSearchButtonState);
    });

    // 초기 상태 설정
    updateSearchButtonState();
});

/* ajax를 통해 비동기로 python결과 데이터 받아오기 */
$("#fetchData").click(function(e){
    e.preventDefault(); // 기본 form submit 행동을 방지합니다.
    
    var formData = $("form").serializeArray(); // 폼 데이터를 배열로 가져옵니다.
    var jsonData = {}; 
    
    $("#loadingIndicator").css("display", "block"); // 로딩 인디케이터 표시

    // 폼 데이터를 JSON 형식으로 변환합니다.
    $.each(formData, function(){
        jsonData[this.name] = this.value;
    });
    
    $.ajax({
        type: "POST",
        url: "./getRcommendation",
        data: JSON.stringify(jsonData), // JSON 형식으로 데이터를 서버에 전송합니다.
        contentType: "application/json", // 요청의 content type을 설정합니다.
        dataType: "json", // 응답을 JSON 형식으로 받습니다.
        success: function(response) {
            console.log(response);
            
            $("#loadingIndicator").hide(); // 로딩 인디케이터 숨기기


        },
        error: function(error) {
            console.error("Error:", error);
            // 에러 발생 시 처리하는 코드를 이 부분에 작성합니다.
            // 로딩 인디케이터 숨기기
            $("#loadingIndicator").hide(); // 로딩 인디케이터 숨기기
        }
    });
});