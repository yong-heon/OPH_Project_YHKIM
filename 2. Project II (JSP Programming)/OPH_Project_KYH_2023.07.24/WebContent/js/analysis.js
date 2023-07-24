

// 분석하기 버튼 요소 선택
const analysisButton = document.getElementById("analysis_btn");

// 결과를 보여줄 div 요소 선택
const resultDiv = document.querySelector(".result");
const resultDivs = document.getElementsByClassName("result__area__tab-menu");

analysisButton.addEventListener("click", function () {
  resultDiv.classList.add("active");
  // 각 resultDiv에 대해 반복 작업 수행
  for (let i = 0; i < resultDivs.length; i++) {
    const resultDiv = resultDivs[i];
    // 클래스에 "active" 추가
    resultDiv.classList.add("active");
  }

  // 첫 번째 메뉴 아이템 가져오기
  const firstMenuItem = document.querySelector(".result__area__tab-menu-item:first-child");
  // active 클래스 추가
  firstMenuItem.classList.add("active");

  // 첫 번째 메뉴 아이템의 href 값 가져오기
  const tabId = firstMenuItem.querySelector("a").getAttribute("href").substring(1);
  const tabContent = document.getElementById(tabId);
  // active 클래스 추가
  tabContent.classList.add("active");
});

// 메뉴 아이템 요소 선택
const menuItem = document.querySelectorAll(".result__area__tab-menu-item");

// 각 메뉴 아이템에 클릭 이벤트 리스너 추가
menuItem.forEach(function (menuItem) {
  menuItem.addEventListener("click", function (event) {
    event.preventDefault(); // 기본 동작 방지

    // 현재 활성화된 메뉴 아이템과 div 찾기
    const activeMenuItem = document.querySelector(".result__area__tab-menu-item.active");
    const activeTabContent = document.querySelector(".result__area__tab-content > .active");

    // 현재 활성화된 메뉴 아이템과 div 비활성화 처리
    activeMenuItem.classList.remove("active");
    activeTabContent.classList.remove("active");

    // 클릭된 메뉴 아이템의 href 값 가져오기
    const href = menuItem.querySelector("a").getAttribute("href");
    const tabId = href.substring(1);
    const tabContent = document.getElementById(tabId);

    // 클릭된 메뉴 아이템과 해당하는 div 활성화 처리
    menuItem.classList.add("active");
    tabContent.classList.add("active");

    // 다른 메뉴 아이템의 active 클래스 제거
    const otherMenuItems = document.querySelectorAll(".result__area__tab-menu-item:not(.active)");
    otherMenuItems.forEach(function (item) {
      item.classList.remove("active");
    });

    // 다른 tab content의 active 클래스 제거
    const otherTabContents = document.querySelectorAll(".result__area__tab-content > div:not(.active)");
    otherTabContents.forEach(function (content) {
      content.classList.remove("active");
    });
  });
});

// analysis__container--mapreport-item의 라디오 버튼 요소 선택
const mapReportRadioButtons = document.querySelectorAll(
  ".analysis__container--mapreport-item input[type='radio']"
);

// 각 라디오 버튼에 클릭 이벤트 리스너 추가
mapReportRadioButtons.forEach(function (radioButton) {
  radioButton.addEventListener("click", function () {
    // result__area__tab-menu의 active 클래스 제거
    const activeMenus = document.querySelectorAll(".result__area__tab-menu.active");
    activeMenus.forEach(function (menu) {
      menu.classList.remove("active");
    });

    const activeGraphs = document.querySelectorAll(".graph.active");
    activeGraphs.forEach(function (graph) {
      graph.classList.remove("active");
    });

    const activeTables = document.querySelectorAll(".table.active");
    activeTables.forEach(function (table) {
      table.classList.remove("active");
    });
  });
});


/******************* 그래프 구역*******************/
document.addEventListener('DOMContentLoaded', (event) => {
    var form = $('form'); // form 변수를 정의하였습니다.

    jQuery.ajax({
        type: form.attr('method'),
        url: form.attr('action'),
        data: form.serialize(),
        success: function(data) {
            createAvgChart(data.avgValues);
            createPercentileChart(data.percentiles);
            createGradeChart(data.grades);
        }
    });
});

function createAvgChart(avgValues) {
    var ctx = document.getElementById('avgChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sale Price', 'Jeonse Price', 'Monthly Deposit', 'Monthly'],
            datasets: [{
                label: 'Average',
                data: avgValues,
                backgroundColor: 'rgba(75, 192, 192, 0.2)'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createPercentileChart(percentiles) {
    // Convert percentage strings to numbers
    percentiles = percentiles.map(percentile => {
        return parseFloat(percentile.replace('%', ''));
    });

    var ctx = document.getElementById('percentileChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sale Price', 'Jeonse Price', 'Monthly Deposit', 'Monthly'],
            datasets: [{
                label: 'Percentile',
                data: percentiles,
                backgroundColor: 'rgba(153, 102, 255, 0.2)'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createGradeChart(grades) {
    var gradeMapping = { 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1 };
    var mappedGrades = grades.map(grade => gradeMapping[grade]);
    
    var ctx = document.getElementById('gradeChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sale Price', 'Jeonse Price', 'Monthly Deposit', 'Monthly'],
            datasets: [{
                label: 'Grade',
                data: mappedGrades,
                backgroundColor: 'rgba(255, 99, 132, 0.2)'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


//선택한 자치구 span에 띄우기
function showSpanContent() {
const radioButtons = document.querySelectorAll("input[type='radio'][name='mapreport-sgg']");
const resultElement = document.querySelector(".result_sgg");

for (let i = 0; i < radioButtons.length; i++) {
 if (radioButtons[i].checked) {
   const nextSibling = radioButtons[i].nextElementSibling;
   const spanContent = nextSibling && nextSibling.querySelector("span")?.textContent;
   if (resultElement) {
     resultElement.textContent = spanContent || "";
   }
   break;
 }
}
}