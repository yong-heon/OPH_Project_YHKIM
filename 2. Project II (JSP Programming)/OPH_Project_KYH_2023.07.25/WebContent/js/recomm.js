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

/* radio button 모두 선택 시 검색하기 활성화 이벤트 */
const searchBtn = document.querySelector('.searchBtn');

const residenceTypeRadios = [...document.querySelectorAll('input[name="residenceType"]')];
const rentTypeRadios = [...document.querySelectorAll('input[name="rentType"]')];
const residenceSizeRadios = [...document.querySelectorAll('input[name="residenceSize"]')];

// 라디오 버튼 상태 변경 시 이벤트 핸들러
function handleRadioChange() {
    // 선택된 라디오 버튼이 있는지 확인
    const isResidenceTypeSelected = residenceTypeRadios.some((radio) => radio.checked);
    const isRentTypeSelected = rentTypeRadios.some((radio) => radio.checked);
    const isResidenceSizeSelected = residenceSizeRadios.some((radio) => radio.checked);

    // 선택된 라디오 버튼이 모두 있는 경우 searchBtn에 "active" 클래스 추가
    if (isResidenceTypeSelected && isRentTypeSelected && isResidenceSizeSelected) {
        searchBtn.removeAttribute('disabled'); // disabled 속성 제거
        searchBtn.classList.add('active');
    } else {
        searchBtn.setAttribute('disabled', 'true'); // disabled 속성 추가
        searchBtn.classList.remove('active');
    }
}

// 라디오 버튼 이벤트 핸들러 등록
residenceTypeRadios.forEach((radio) => {
    radio.addEventListener('change', handleRadioChange);
});

rentTypeRadios.forEach((radio) => {
    radio.addEventListener('change', handleRadioChange);
});

residenceSizeRadios.forEach((radio) => {
    radio.addEventListener('change', handleRadioChange);
});