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

/* 사용자 보증금 및 월세 입력 시 단위 계산 */
document.getElementById("securityDeposit").addEventListener("input", function() {
    this.value = formatDepositToEokMan(this.value);
});

document.getElementById("monthlyRent").addEventListener("input", function() {
    this.value = formatRentToMan(this.value);
});
function formatDepositToEokMan(value) {
    let onlyNumbers = value.replace(/[^0-9]/g, ''); 

    if (value.length > 0 && onlyNumbers.length === 0) {
        alert("금액을 숫자로 입력해 주세요.");
        return value; 
    }

    let amount = parseInt(onlyNumbers, 10) || 0; 

    let eok = Math.floor(amount / 10000);
    let man = amount % 10000; 

    if (amount < 10000) return `${man}만 원`;
    return `${eok}억 ${man}만 원`;
}

function formatRentToMan(value) {
    let onlyNumbers = value.replace(/[^0-9]/g, ''); 

    if (value.length > 0 && onlyNumbers.length === 0) {
        alert("금액을 숫자로 입력해 주세요.");
        return value; 
    }

    let amount = parseInt(onlyNumbers, 10) || 0;

    if (amount === 0) return '';

    return `${amount}만 원`;
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