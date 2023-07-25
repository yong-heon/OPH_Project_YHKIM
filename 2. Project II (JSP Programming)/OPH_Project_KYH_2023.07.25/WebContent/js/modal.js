/* 자세히 보기 버튼 클릭 이벤트 */
const modal = document.querySelector('.modal');

function showDetails() {
  modal.classList.add('active');
}

/* modal__dialog 비활성화 이벤트 */
modal.addEventListener('click', (event) => {
  // modal(검은색 배경)을 클릭하지 않았을 경우
  if (event.target.closest('.modal__dialog')) {
    return;
  }
  // modal(검은색 배경)을 클릭했을 경우
  else {
    modal.classList.remove('active');
  }
});

// x 버튼 클릭했을 경우
const modalCloaseBtn = document.querySelector('.modal__header__close');

modalCloaseBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

/* modal__body 내용 : DB와 연동하기 위한 javascript  */
window.onload = function () {
  var posts = [
    { number: 1, gu: "OO구", dong: "OO동", type: "연립다세대", feet: "32.84", rent: "월세", deposit: "1076", rental: "13", building: "그린빌라 1차" },
    { number: 2, gu: "OO구", dong: "OO동", type: "연립다세대", feet: "42.52", rent: "월세", deposit: "1442", rental: "30", building: "초록아파트" },
    { number: 3, gu: "OO구", dong: "OO동", type: "연립다세대", feet: "48.96", rent: "월세", deposit: "1550", rental: "0", building: "마포빌리지" },
  ];

  var tableBody = document.querySelector('.modal__table__tbody');

  for (var i = 0; i < posts.length; i++) {
    var row = document.createElement('tr');

    var idCell = document.createElement('th');
    idCell.textContent = posts[i].number;
    idCell.scope = 'row';

    var guCell = document.createElement('td');
    guCell.textContent = posts[i].gu;

    var dongCell = document.createElement('td');
    dongCell.textContent = posts[i].dong;

    var typeCell = document.createElement('td');
    typeCell.textContent = posts[i].type;

    var feetCell = document.createElement('td');
    feetCell.textContent = posts[i].feet;

    var rentCell = document.createElement('td');
    rentCell.textContent = posts[i].rent;

    var depositCell = document.createElement('td');
    depositCell.textContent = posts[i].deposit;

    var rentalCell = document.createElement('td');
    rentalCell.textContent = posts[i].rental;

    var buildingCell = document.createElement('td');
    buildingCell.textContent = posts[i].building;

    row.appendChild(idCell);
    row.appendChild(guCell);
    row.appendChild(dongCell);
    row.appendChild(typeCell);
    row.appendChild(feetCell);
    row.appendChild(rentCell);
    row.appendChild(depositCell);
    row.appendChild(rentalCell);
    row.appendChild(buildingCell);

    tableBody.appendChild(row);
  }
};
