// function showSpanContent(radio) {
//     const spanContent = radio.nextElementSibling.innerHTML;
//     const resultElement = document.querySelector(".result_sgg");
//     resultElement.innerHTML = spanContent;
// };

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

// 분석하기 버튼 요소 선택
const analysisButton = document.getElementById("analysis_btn");

// 결과를 보여줄 div 요소 선택
const resultDivs = document.getElementsByClassName("result__area__tab-menu");

analysisButton.addEventListener("click", function () {
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
document.addEventListener("DOMContentLoaded", function(event) {
  const canvas = document.getElementById("chartTest");
  const ctx = canvas.getContext("2d");
  const labels = ['도봉구', '은평구', '강북구', '노원구', '종로구', '성북구', '중랑구', '서대문구', '동대문구', '강서구', '마포구', '중구', '성동구', '광진구', '강동구', '양천구', '용산구', '구로구', '영등포구', '동작구', '강남구', '송파구', '관악구', '서초구', '금천구'];


  const data = {
    '인구밀집도': {
        label: '인구밀집도',
        data: [3624,  9189,  4211, 8350, 3070, 6947, 5365, 7332, 9014, 4084, 12241, 3475, 4915, 8415, 8783, 5930, 5598, 6668, 8973, 9571, 11189, 14918, 10059, 7276, 5108],
        backgroundColor: Array(25).fill("rgba(0, 123, 255, 0.5)"),
        borderColor: Array(25).fill("rgba(0, 123, 255, 1)"),
        borderWidth: 1
    },
    '아파트': {
      label: '아파트-매매',
      data: [39017.55,   51162.74,   42944.59,   44551.43,   65386.96,   55250.04,   43625.51,   57254.45,   53379.62,   62236.76,   77835.10,   85304.72,   83000.16,   64469.05,   70986.81,   73748.05,   114131.80,   49794.86,   72919.03,   79043.19,   156368.43,   88716.43,   63058.84,   140365.70,   40454.55],
      backgroundColor: Array(25).fill("rgba(0, 123, 255, 0.5)"),
      borderColor: Array(25).fill("rgba(0, 123, 255, 1)"),
      borderWidth: 1
    },
  };

  data['인구밀집도'].backgroundColor[11] = "rgba(255, 4, 0, 0.5)";
  data['인구밀집도'].borderColor[11] = "rgba(255, 4, 0, 1)";
  data['아파트'].backgroundColor[11] = "rgba(255, 4, 0, 0.5)";
  data['아파트'].borderColor[11] = "rgba(255, 4, 0, 1)";

const options = {
    responsive: true,
    maintainAspectRatio: false
};

let selectedChartLabel = "";
let chartTest;

const chartOption = document.querySelectorAll(
    ".input-radio_1, .input-radio_2, .input-radio_3, .input-radio_4, .input-radio_5, .input-radio_6"
);

chartOption.forEach(function (option) {
    option.addEventListener("change", function () {
        if (this.checked) {
            const classList = this.classList;
            selectedChartLabel = getChartLabelByClass(classList);

            if (chartTest) {
                chartTest.destroy();
            }
            if (data.hasOwnProperty(selectedChartLabel)) {
                const selectedData = data[selectedChartLabel];
                chartTest = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: labels,
                        datasets: [selectedData]
                    },
                    option: options
                });

                const radioButtons = document.querySelectorAll(
                    "input[type='radio'][name='mapreport-sgg']"
                );

                //그래프 클릭시 색 변경
                // canvas.onclick = function(e) {
                //     var clickedPoints = chartTest.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
                //     if (clickedPoints.length > 0) {
                //         var clickedElement = clickedPoints[0];
                //         var clickedDatasetIndex = clickedElement.datasetIndex;
                //         var clickedIndex = clickedElement.index;
                        
                //         var clcikedDatasets = chartTest.data.datasets[clickedDatasetIndex];
                //         var clickedBackgroundColor = clcikedDatasets.backgroundColor[clickedIndex];
                //         if (clickedBackgroundColor === "rgba(255, 4, 0, 0.5)") {    
                //             clcikedDatasets.backgroundColor[clickedIndex] = "rgba(0, 123, 255, 0.5)";
                //             clcikedDatasets.borderColor[clickedIndex] = "rgba(0, 123, 255, 1)";
                //         } else {
                //             clcikedDatasets.backgroundColor = Array(25).fill("rgba(0, 123, 255, 0.5)");
                //             clcikedDatasets.borderColor = Array(25).fill("rgba(0, 123, 255, 1)");
                //             clcikedDatasets.backgroundColor[clickedIndex] = "rgba(255, 4, 0, 0.5)";
                //             clcikedDatasets.borderColor[clickedIndex] = "rgba(255, 4, 0, 1)";
                //             radioButtons[clickedIndex].checked = true;
                //         }
                        
                //         chartTest.update();
                //     }
                // };
                
                //지도상의 라디오버튼에 대한 그래프 색 변경                
                radioButtons.forEach(function (radio) {
                  radio.addEventListener("change", function () {
                      const spanElement = this.nextElementSibling.querySelector("span");
  
                      if (spanElement) {
                          const index = labels.indexOf(spanElement.textContent);
                          if (index !== -1) {
                              const selectedDataset = chartTest.data.datasets.find(dataset => dataset.label === selectedChartLabel);
                              if (selectedDataset) {
                                  const backgroundColor = selectedDataset.backgroundColor[index];
  
                                  if (backgroundColor === "rgba(255, 4, 0, 0.5)") {
                                      selectedDataset.backgroundColor[index] = "rgba(0, 123, 255, 0.5)";
                                      selectedDataset.borderColor[index] = "rgba(0, 123, 255, 1)";
                                  } else {
                                      for (let i = 0; i < selectedDataset.backgroundColor.length; i++) {
                                          selectedDataset.backgroundColor[i] = "rgba(0, 123, 255, 0.5)";
                                          selectedDataset.borderColor[i] = "rgba(0, 123, 255, 1)";
                                      }
                                      selectedDataset.backgroundColor[index] = "rgba(255, 4, 0, 0.5)";
                                      selectedDataset.borderColor[index] = "rgba(255, 4, 0, 1)";
                                  }
                                  chartTest.update();
                              }
                          }
                      }
                  });
              });

            }
        }
    });
});


function getChartLabelByClass(classList) {
    if (classList.contains("input-radio_1")) {
        return "인구밀집도";
    } else if (classList.contains("input-radio_2")) {
        return "아파트";
    } else if (classList.contains("input-radio_3")) {
        return "오피스텔";
    } else if (classList.contains("input-radio_4")) {
        return "연립 다세대";
    } else if (classList.contains("input-radio_5")) {
        return "편의시설";
    } else if (classList.contains("input-radio_6")) {
        return "대중교통";
    } else {
        return "";
    }
}
});

window.onload = function () {
  var population = [
    {rank: 1, gu: "송파구", population: "14,918명"},
    {rank: 2, gu: "마포구", population: "12,241명"},
    {rank: 3, gu: "강남구", population: "11,189명"},
    {rank: 4, gu: "관악구", population: "10,059명"},
    {rank: 5, gu: "동작구", population: "9,571명"},
    {rank: 6, gu: "은평구", population: "9,189명"},
    {rank: 7, gu: "동대문구", population: "9,014명"},
    {rank: 8, gu: "영등포구", population: "8,973명"},
    {rank: 9, gu: "강동구", population: "8,783명"},
    {rank: 10, gu: "광진구", population: "8,415명"},
    {rank: 11, gu: "노원구", population: "8,350명"},
    {rank: 12, gu: "서대문구", population: "7,332명"},
    {rank: 13, gu: "서초구", population: "7,276명"},
    {rank: 14, gu: "성북구", population: "6,947명"},
    {rank: 15, gu: "구로구", population: "6,668명"},
    {rank: 16, gu: "양천구", population: "5,930명"},
    {rank: 17, gu: "용산구", population: "5,598명"},
    {rank: 18, gu: "중랑구", population: "5,365명"},
    {rank: 19, gu: "금천구", population: "5,108명"},
    {rank: 20, gu: "성동구", population: "4,915명"},
    {rank: 21, gu: "강북구", population: "4,211명"},
    {rank: 22, gu: "강서구", population: "4,084명"},
    {rank: 23, gu: "도봉구", population: "3,624명"},
    {rank: 24, gu: "중구", population: "3,475명"},
    {rank: 25, gu: "종로구", population: "3,070명"},
  ];

  var tableBodyPopulation = document.querySelector(".table__population--tbody");

  for (var i = 0; i < population.length; i ++) {
    var row = document.createElement('tr');

    var rankCell = document.createElement('th');
    rankCell.textContent = population[i].rank;
    rankCell.scope = 'row';

    var guCell = document.createElement('td');
    guCell.textContent = population[i].gu;

    var populationCell = document.createElement('td');
    populationCell.textContent = population[i].population;

    row.appendChild(rankCell);
    row.appendChild(guCell);
    row.appendChild(populationCell);
    tableBodyPopulation.appendChild(row);
  }

  var apt = [
    {rank: 1, gu: "강남구", aptPrice: "156368 (만 원)"},
    {rank: 2, gu: "서초구", aptPrice: "140365 (만 원)"},
    {rank: 3, gu: "용산구", aptPrice: "114132 (만 원)"},
    {rank: 4, gu: "송파구", aptPrice: "88716 (만 원)"},
    {rank: 5, gu: "중구", aptPrice: "85305 (만 원)"},
    {rank: 6, gu: "성동구", aptPrice: "83000 (만 원)"},
    {rank: 7, gu: "동작구", aptPrice: "79043 (만 원)"},
    {rank: 8, gu: "마포구", aptPrice: "77835 (만 원)"},
    {rank: 9, gu: "양천구", aptPrice: "73748 (만 원)"},
    {rank: 10, gu: "영등포구", aptPrice: "72919 (만 원)"},
    {rank: 11, gu: "강동구", aptPrice: "70987 (만 원)"},
    {rank: 12, gu: "종로구", aptPrice: "65387 (만 원)"},
    {rank: 13, gu: "광진구", aptPrice: "64469 (만 원)"},
    {rank: 14, gu: "관악구", aptPrice: "63059 (만 원)"},
    {rank: 15, gu: "강서구", aptPrice: "62237 (만 원)"},
    {rank: 16, gu: "서대문구", aptPrice: "57254 (만 원)"},
    {rank: 17, gu: "성북구", aptPrice: "55250 (만 원)"},
    {rank: 18, gu: "동대문구", aptPrice: "53380 (만 원)"},
    {rank: 19, gu: "은평구", aptPrice: "51163 (만 원)"},
    {rank: 20, gu: "구로구", aptPrice: "49795 (만 원)"},
    {rank: 21, gu: "노원구", aptPrice: "44551 (만 원)"},
    {rank: 22, gu: "중랑구", aptPrice: "43626 (만 원)"},
    {rank: 23, gu: "강북구", aptPrice: "42945 (만 원)"},
    {rank: 24, gu: "금천구", aptPrice: "40455 (만 원)"},
    {rank: 25, gu: "도봉구", aptPrice: "39018 (만 원)"},
  ]

  var tableBody_apt = document.querySelector(".table__apt--tbody");

  for (var i = 0; i < apt.length; i ++) {
    var row = document.createElement('tr');

    var rankCell = document.createElement('th');
    rankCell.textContent = apt[i].rank;
    rankCell.scope = 'row';

    var guCell = document.createElement('td');
    guCell.textContent = apt[i].gu;

    var aptPriceCell = document.createElement('td');
    aptPriceCell.textContent = apt[i].aptPrice;

    row.appendChild(rankCell);
    row.appendChild(guCell);
    row.appendChild(aptPriceCell);
    tableBody_apt.appendChild(row);
}

var mention = [
  {rank: 1, gu: "강남구", aptPrice: "78980 (만 원)"},
  {rank: 2, gu: "용산구", aptPrice: "62047 (만 원)"},
  {rank: 3, gu: "서초구", aptPrice: "53621 (만 원)"},
  {rank: 4, gu: "성동구", aptPrice: "45408 (만 원)"},
  {rank: 5, gu: "동작구", aptPrice: "38989 (만 원)"},
  {rank: 6, gu: "종로구", aptPrice: "37183 (만 원)"},
  {rank: 7, gu: "중구", aptPrice: "33850 (만 원)"},
  {rank: 8, gu: "광진구", aptPrice: "33239 (만 원)"},
  {rank: 9, gu: "마포구", aptPrice: "33162 (만 원)"},
  {rank: 10, gu: "송파구", aptPrice: "32725 (만 원)"},
  {rank: 11, gu: "강동구", aptPrice: "32469 (만 원)"},
  {rank: 12, gu: "은평구", aptPrice: "31235 (만 원)"},
  {rank: 13, gu: "서대문구", aptPrice: "30644 (만 원)"},
  {rank: 14, gu: "동대문구", aptPrice: "28961 (만 원)"},
  {rank: 15, gu: "영등포구", aptPrice: "28868 (만 원)"},
  {rank: 16, gu: "구로구", aptPrice: "28811 (만 원)"},
  {rank: 17, gu: "성북구", aptPrice: "28073 (만 원)"},
  {rank: 18, gu: "관악구", aptPrice: "26473 (만 원)"},
  {rank: 19, gu: "중랑구", aptPrice: "25301 (만 원)"},
  {rank: 20, gu: "금천구", aptPrice: "23399 (만 원)"},
  {rank: 21, gu: "노원구", aptPrice: "22701 (만 원)"},
  {rank: 22, gu: "강서구", aptPrice: "22677 (만 원)"},
  {rank: 23, gu: "양천구", aptPrice: "20221 (만 원)"},
  {rank: 24, gu: "강북구", aptPrice: "19813 (만 원)"},
  {rank: 25, gu: "도봉구", aptPrice: "18962 (만 원)"},
]

var tableBody_men = document.querySelector(".table__men--tbody");

for (var i = 0; i < mention.length; i ++) {
  var row = document.createElement('tr');

  var rankCell = document.createElement('th');
  rankCell.textContent = mention[i].rank;
  rankCell.scope = 'row';

  var guCell = document.createElement('td');
  guCell.textContent = mention[i].gu;

  var menPriceCell = document.createElement('td');
  menPriceCell.textContent = mention[i].aptPrice;

  row.appendChild(rankCell);
  row.appendChild(guCell);
  row.appendChild(menPriceCell);
  tableBody_men.appendChild(row);
}
// 라디오 버튼 요소를 가져옵니다.
var radioButtons = document.querySelectorAll("input[type='radio'][name='map-report-tab']");

// 각 라디오 버튼에 대해 변경 이벤트에 대한 이벤트 리스너를 추가합니다.
radioButtons.forEach(function (radioButton) {
  radioButton.addEventListener("change", function () {
    // 선택된 값을 가져옵니다.
    var selectedValue = this.nextElementSibling.querySelector("span").textContent;

    // 일치하는 텍스트를 가진 th 요소를 찾아 해당하는 테이블을 찾습니다.
    var selectedTable = findTableByHeaderText(selectedValue);

    // 모든 테이블을 숨깁니다.
    var tables = document.querySelectorAll(".custom-table");
    tables.forEach(function (table) {
      table.classList.remove("active");
    });

    // 선택된 테이블을 표시합니다.
    if (selectedTable) {
      selectedTable.classList.add("active");
    }
  });
});

// 일치하는 텍스트를 가진 th 요소를 찾아 해당하는 테이블을 반환하는 함수입니다.
function findTableByHeaderText(text) {
  var tables = document.querySelectorAll(".custom-table");
  for (var i = 0; i < tables.length; i++) {
    var thList = tables[i].querySelectorAll("th");
    for (var j = 0; j < thList.length; j++) {
      var th = thList[j];
      if (th && th.textContent.trim() === text) {
        return tables[i];
      }
    }
  }
  return null;
}

};
