// 분석하기 버튼 요소 선택
const analysisButton = document.getElementById("analysis_btn");

// 결과를 보여줄 div 요소 선택
const resultDiv = document.querySelector(".result");

// 탭 아이템 요소 선택
const tabs = document.querySelectorAll(".tab-link");

analysisButton.addEventListener("click", function () {
  resultDiv.classList.add("active");

  // 모든 탭의 내용을 숨기고, 모든 탭의 active 클래스 제거
  const allTabContents = document.querySelectorAll(".tab-content");
  const allTabs = document.querySelectorAll(".tab-link");
  allTabContents.forEach(function (content) {
    content.style.display = "none";
    content.querySelector('.custom-table').classList.remove("active"); // 모든
																		// 표에서
																		// active
																		// 클래스
																		// 제거
  });
  allTabs.forEach(function(tab) {
    tab.classList.remove("active");
    tab.parentElement.classList.remove("active");
    tab.parentElement.parentElement.classList.remove("active");
  });

  // 첫 번째 탭 아이템 가져오기
  const firstTab = document.querySelector(".tab-link:first-child");
  // active 클래스 추가
  firstTab.classList.add("active");
  firstTab.parentElement.classList.add("active"); 
  firstTab.parentElement.parentElement.classList.add("active"); 

  // 첫 번째 탭 아이템의 href 값 가져오기
  const tabId = firstTab.getAttribute("href").substring(1);
  const tabContent = document.getElementById(tabId);
  // 첫 번째 탭 아이템의 내용을 보여주기
  tabContent.style.display = "block";
  tabContent.querySelector('.custom-table').classList.add("active"); // 첫 번째
																		// 탭의 표에
																		// active
																		// 클래스
																		// 추가
});

// 각 탭 아이템에 클릭 이벤트 리스너 추가
tabs.forEach(function (tab) {
  tab.addEventListener("click", function (event) {
    event.preventDefault(); // 기본 동작 방지

    // 현재 활성화된 탭과 div 찾기
    const activeTab = document.querySelector(".tab-link.active");
    const activeTabItem = activeTab.parentElement; 
    const activeTabMenu = activeTabItem.parentElement; 
    const activeTabContent = document.querySelector(".tab-content:not([style='display: none;'])");

    // 현재 활성화된 탭과 div 비활성화 처리
    activeTab.classList.remove("active");
    activeTabItem.classList.remove("active"); 
    activeTabMenu.classList.remove("active"); 
    activeTabContent.style.display = "none";
    activeTabContent.querySelector('.custom-table').classList.remove("active"); // 현재
																				// 활성화된
																				// 표에서
																				// active
																				// 클래스
																				// 제거

    // 클릭된 탭의 href 값 가져오기
    const tabId = this.getAttribute("href").substring(1);
    const tabContent = document.getElementById(tabId);

    // 클릭된 탭과 해당하는 div 활성화 처리
    this.classList.add("active");
    this.parentElement.classList.add("active"); 
    this.parentElement.parentElement.classList.add("active"); 
    tabContent.style.display = "block";
    tabContent.querySelector('.custom-table').classList.add("active"); // 클릭된
																		// 탭의 표에
																		// active
																		// 클래스
																		// 추가
  });
});

// analysis__container--mapreport-item의 라디오 버튼 요소 선택
const mapReportRadioButtons = document.querySelectorAll(
  ".analysis__container--mapreport-item input[type='radio']"
);

$(document).ready(function() {
    $("#graphResultForm").submit(function(event){
        event.preventDefault();

        // 라디오 버튼 선택 확인
        var isAItemSelected = $("input[name='aItem']:checked").length > 0;
        var isMapReportSelected = $("input[name='mapreport-sgg']:checked").length > 0;

        // 둘 다 선택되지 않은 경우
        if (!isAItemSelected && !isMapReportSelected) {
            alert("분석 항목과 분석 지역을 모두 선택해주세요.");
            window.location.reload()
            return; // submit 이벤트 중단
        }

        // 분석 항목만 선택되지 않은 경우
        if (!isAItemSelected) {
            alert("분석 항목을 선택해주세요.");
            window.location.reload()
            return; // submit 이벤트 중단
        }

        // 분석 지역만 선택되지 않은 경우
        if (!isMapReportSelected) {
            alert("분석 지역을 선택해주세요.");
            window.location.reload()
            return; // submit 이벤트 중단
        }

        // 위의 조건을 모두 통과한 경우 서버로 데이터 요청 진행
        getDataFromServer();
    });
});




// submit 클릭 전에 미리 넘기는 거 방지
$(document).ready(function() {
    $("#graphResultForm").submit(function(event){
        event.preventDefault();
        getDataFromServer();
        
        // 결과 div로 스크롤 이동 (예를 들어, 결과 div의 id가 resultDiv일 경우)
        $('#result').get(0).scrollIntoView({ behavior: 'smooth' });
    });
});

// 숨겨진 input 필드에 선택된 지역과 분석항목 값을 저장
function updateHiddenInputValues() {
    const radioButtonsDistrict = document.querySelectorAll("input[type='radio'][name='mapreport-sgg']");
    const radioButtonsAItem = document.querySelectorAll("input[type='radio'][name='aItem']"); // name
																								// 속성을
																								// 확인하시고
																								// 맞게
																								// 수정해주세요

    let selectedDistrict = null;
    let selectedAItem = null;

    for (let i = 0; i < radioButtonsDistrict.length; i++) {
        if (radioButtonsDistrict[i].checked) {
            selectedDistrict = radioButtonsDistrict[i].value;
            break;
        }
    }

    for (let i = 0; i < radioButtonsAItem.length; i++) {
        if (radioButtonsAItem[i].checked) {
            selectedAItem = radioButtonsAItem[i].value;
            break;
        }
    }

    document.getElementById('hiddenDistrict').value = selectedDistrict || '';
    document.getElementById('hiddenAItem').value = selectedAItem || '';
}



// 그래프 그릴 때 필요한 데이터 받아오는 함수
function getDataFromServer() {
    return new Promise((resolve, reject) => {
        
        const district = $("#hiddenDistrict").val();
        const aItem = $("#hiddenAItem").val();

        const apiUrl = `./ajax/${district}/${aItem}`;

        console.log("Sending to server:", district, aItem);

        $.ajax({
            url: apiUrl,
            type: 'POST',
            contentType: 'application/json; charset=utf-8', // JSON 형식의 데이터를 보낼 때 필요
            dataType: 'json',
            success: function(data) {
                resolve(data);
                console.log(data);
            },
            error: function(xhr, status, error) {
                reject(error);
            }
        });    
    });
}

// 라디오 버튼에서 선택된 분석항목 값 가져오기
function getSelectedRadioValue(name) {
    const radioButtons = document.querySelectorAll(`input[name=${name}]:checked`);
    if (radioButtons.length > 0) {
        return radioButtons[0].value;
    }
    return null; // 선택된 라디오 버튼이 없을 때 null 반환
}

// 받아온 데이터의 district를 해당 div에 표시하는 함수를 추가
function updateDistrictName(district) {
    const districtElement = document.querySelector('.district-name');
    const selectedRadioValue = getSelectedRadioValue('aItem'); // 라디오 버튼의 이름을
																// 올바르게 적어주세요

    if (selectedRadioValue) {
        districtElement.textContent = district + " " + selectedRadioValue + " 분석 결과";
    } else {
        districtElement.textContent = district + " 분석 결과";
    }
}


// 그래프를 그리는 함수를 따로 정의합니다.
let avgChart;
function drawAvgGraph(data) {

	console.log(data);
	const ctx = document.getElementById('avgChart').getContext('2d');
	
    if (avgChart) { // 기존 차트가 있을 시 이를 지움
        avgChart.destroy();
    }
    avgChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ['매매평균', '전세평균', '월세보증금평균'],
			datasets: [{
				label: '평균값',
				data: data.avgValues.map(value => Math.round(value)), // 데이터
																		// 반올림
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',

				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',

				],
		        borderWidth: 1,
		        barPercentage: 0.7,
		        categoryPercentage: 0.7
		        }]
		},
		options: {
			animation: {
				duration: 1500 // 애니메이션 지속 시간
			}, 
			plugins: {
				beforeRender: function(chart) {
					chart.data.datasets[0].data = new Array(originalData.length).fill(0);
				},
				beforeDatasetUpdate: function(chart, args) {
					if(args.mode === 'reset') {
						args.dataset.data = originalData;
					}
				}
			},
			scales: {
				y: {
					beginAtZero: true,
                    ticks: {
                        callback: function(value) { // Y 축에 '만 원' 추가
                            return value + '만 원';
                        }
                    }
				}
			},
			title: {
                display: true,
                text: data.district + ' 부동산 가격 평균'
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) { // 툴팁에 '만 원' 추가
                            var label = context.dataset.label || '';

                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y + ' 만 원';
                            }
                            return label;
                        }
                    }
                }
            }
		}
	});
}


let percentileChart;
function drawPercentileGraph(data) {

    console.log(data);
    const ctx = document.getElementById('percentileChart').getContext('2d');
    
    if (percentileChart) { // 기존 차트가 있을 시 이를 지움
    	percentileChart.destroy();
    }
    percentileChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['매매백분위', '전세백분위', '월세보증금백분위', '월세백분위'],
            datasets: [{
                label: '부동산 백분위',
                data: data.percentiles,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { 
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value, index, values) { // Y 축에 '%'
																	// 추가
                            return value + '%';
                        }
                    }
                }
            },
			animation: {
				duration: 1500 // 애니메이션 지속 시간
			}, 

            plugins: {
				beforeRender: function(chart) {
					chart.data.datasets[0].data = new Array(originalData.length).fill(0);
				},
				beforeDatasetUpdate: function(chart, args) {
					if(args.mode === 'reset') {
						args.dataset.data = originalData;
					}
				},
                tooltip: {
                    callbacks: {
                        label: function(context) { // 툴팁에 '%' 추가
                            var label = context.dataset.label || '';

                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y + '%';
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

// 등급 그래프 그리는 함수
let gradeCharts = [];

function drawGradeDoughnutCharts(data) {
    const grades = ['매매백분위', '전세백분위', '월세보증금백분위', '월세백분위'];
    const colors = [
        'rgba(155, 89, 182, 0.8)', // 안정된 보라색
        'rgba(52, 152, 219, 0.8)', // 안정된 파랑색
        'rgba(230, 126, 34, 0.8)', // 안정된 주황색
        'rgba(46, 204, 113, 0.8)'  // 안정된 녹색
    ];

    gradeCharts.forEach(chart => chart.destroy());
    gradeCharts = [];

    grades.forEach((grade, index) => {
        const canvas = document.getElementById(`${grade}Chart`);
        const ctx = canvas.getContext('2d');
        
        const gradeValue = data.grades[index]; // 'A', 'B', 'C', 'D', 'E' 중 하나

        // 등급에 따른 도넛 차트 데이터 설정
        const maxSections = 5;
        let gradeSections;
        switch (gradeValue) {
            case 'A':
                gradeSections = 5;
                break;
            case 'B':
                gradeSections = 4;
                break;
            case 'C':
                gradeSections = 3;
                break;
            case 'D':
                gradeSections = 2;
                break;
            case 'E':
                gradeSections = 1;
                break;
        }

        const dataArr = Array(maxSections).fill(1);
        for (let i = 0; i < gradeSections; i++) {
            dataArr[i] = 1;
        }

        let newChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Array(maxSections).fill(gradeValue).concat('Others'),
                datasets: [{
                    data: dataArr,
                    backgroundColor: [...Array(gradeSections).fill(colors[index]), ...Array(maxSections - gradeSections).fill('#FFFFFF')],
                    borderColor: [...Array(maxSections).fill('rgba(0,0,0,0.1)'), ...Array(maxSections - gradeSections).fill('rgba(0,0,0,0.1)')],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                cutout: '60%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                hover: {
                	mode: null
                },
                animation: {
                    onComplete: function () {
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.font = "600 100% Arial";
                        
                        // 등급 색상을 글자 색상으로 설정
                        ctx.fillStyle = colors[index];

                        var x = canvas.width / 2,
                            y1 = canvas.height / 2 - 20,  // 위쪽 텍스트의 Y 좌표
                            y2 = canvas.height / 2 + 20;  // 아래쪽 텍스트의 Y 좌표

                        ctx.fillText(grades[index], x, y1);   // 첫 번째 텍스트
                        ctx.fillText(gradeValue + ' 등급', x, y2);      // 두 번째
																		// 텍스트
                    }
                }
            }
        });
        
        gradeCharts.push(newChart);
    });
}





// 숫자를 억, 천 만원 단위로 포맷하는 함수
function formatPrice(value) {
    const billion = Math.floor(value / 10000); // 만원 단위를 억으로 변환
    const tenThousand = value % 10000; // 억을 제외한 나머지 값 (천 만원 이하)

    let result = "";
    if (billion > 0) {
        result += `${billion}억 `;
    }
    if (tenThousand > 0) {
        result += `${tenThousand}만원`;
    }
    return result.trim(); // 앞 또는 뒤의 공백 제거
}

// 기존 테이블 내용을 지우는 함수
function clearTable(table) {
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
}

// 테이블 그리는 함수
function drawTable(data) {
    let avgPriceTable = document.getElementById("avgPriceTable");
    
    // 기존 테이블 내용을 지웁니다.
    clearTable(avgPriceTable);


    // 테이블 헤더 생성
    let headerRow = document.createElement("tr");
    let headers = ["자치구 이름", "매매평균가", "전세평균가", "월세보증금 평균", "월세평균가"];
    headers.forEach(header => {
        let th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });
    avgPriceTable.appendChild(headerRow);

    // 데이터 행 생성
    let dataRow = document.createElement("tr");
    let rowData = [data.district];

    data.avgValues.forEach(d => {
        // 숫자 데이터인 경우만 포맷을 적용합니다. (자치구 이름은 제외)
        if (typeof d === "number") {
            rowData.push(formatPrice(Math.floor(d)));
        } else {
            rowData.push(d);
        }
    });

    rowData.forEach(d => {
        let td = document.createElement("td");
        td.textContent = d;
        dataRow.appendChild(td);
    });
    avgPriceTable.appendChild(dataRow);
}

// 백분위 테이블을 그리는 함수
function drawPercentileTable(data) {
    let percentileTable = document.getElementById("percentileTable");
    
    // 기존 테이블 내용을 지웁니다.
    clearTable(percentileTable);

    // 테이블 헤더 생성
    let headerRow = document.createElement("tr");
    let headers = ["자치구 이름", "매매백분위", "전세백분위", "월세보증금백분위", "월세백분위"];
    headers.forEach(header => {
        let th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });
    percentileTable.appendChild(headerRow);

    // 데이터 행 생성
    let dataRow = document.createElement("tr");
    let rowData = [data.district];

    data.percentiles.forEach(d => {
        // 숫자 데이터인 경우만 포맷을 적용합니다. (자치구 이름은 제외)
        if (typeof d === "number") {
            rowData.push(d.toFixed(1) + '%'); // 백분위이므로 소수점 2자리까지 표시하고 '%' 추가
        } else {
            rowData.push(d);
        }
    });

    rowData.forEach(d => {
        let td = document.createElement("td");
        td.textContent = d;
        dataRow.appendChild(td);
    });
    percentileTable.appendChild(dataRow);
}



// submit 이벤트 핸들러
$("#graphResultForm").submit(function(event){
    event.preventDefault();
    
    updateHiddenInputValues();    // 숨겨진 input 필드에 선택된 값을 설정

    getDataFromServer().then((data) => {
        updateDistrictName(data.district);
        drawAvgGraph(data);
        drawPercentileGraph(data);
        drawTable(data);  // 평균 값 테이블 그리는 함수 호출
        drawPercentileTable(data);
        drawGradeDoughnutCharts(data);
    });
});


// 선택한 자치구 span에 띄우기
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