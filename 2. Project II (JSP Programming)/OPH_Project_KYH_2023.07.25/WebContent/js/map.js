/* Map 불러오기 */
var mapContainer = document.getElementById("map");
var mapOption = {
  center: new kakao.maps.LatLng(37.566826, 126.9786567), // 서울 중심 좌표
  level: 3, // 지도의 확대 레벨
};

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성

var marker = new kakao.maps.CustomOverlay({
  content: '<div class="marker"></div>',
});
marker.setMap(map);

var randomMarkers = [];

function clearMarkers() {
  marker.setMap(null);
  for (var i = 0; i < randomMarkers.length; i++) {
    randomMarkers[i].setMap(null);
  }
  randomMarkers = [];
}

/* 지도 클릭 시 마커를 생성하는 기능 */
kakao.maps.event.addListener(map, "click", function (mouseEvent) {
  var latlng = mouseEvent.latLng;
  clearMarkers();
  marker = new kakao.maps.CustomOverlay({
    content: '<div class="marker"></div>',
    position: latlng,
  });
  marker.setMap(map);
  console.log("클릭한 위치의 [위도] " + latlng.getLat() + " [경도] " + latlng.getLng());
});

/* 탭-검색하기 버튼을 클릭하면 랜덤 마커 3개를 생성하는 기능 */
searchBtn.addEventListener("click", function () {
  event.preventDefault(); // 폼의 제출 이벤트 기본 동작 중단

  var markerPosition = marker.getPosition();

  for (var i = 0; i < 3; i++) {
    var randomLat = Math.random() * 0.02 - 0.01 + markerPosition.getLat();
    var randomLng = Math.random() * 0.02 - 0.01 + markerPosition.getLng();

    // 좌표로 주소 정보를 가져오고, 마커를 생성할 때 행정동과 자치구 정보를 함께 표시
    getAddressFromCoords(randomLat, randomLng, i + 1);
  }
});

// 좌표로 주소 정보 요청
function getAddressFromCoords(lat, lng, rank) {
  var geocoder = new kakao.maps.services.Geocoder();

  geocoder.coord2Address(lng, lat, function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      var address = result[0].address;
      var gu = address.region_2depth_name;
      var dong = address.region_3depth_name;

      var randomMarker = new kakao.maps.CustomOverlay({
        content:
          '<div class="marker-recomm">' +
          '<div class="marker-recomm__info">' +
          `<span class="marker-recomm__info--rank">${rank}순위</span>` +
          `<div class="marker-recomm__info--area">서울시｜<span class="marker__recomm__info-area-gu">${gu}</span></div>` +
          `<span class="marker-recomm__info--area-dong">${dong}</span>` +
          '<button class="marker-recomm__info--btn" onclick="showDetails()">자세히 보기</button>' +
          "</div>" +
          "</div>",
        position: new kakao.maps.LatLng(lat, lng),
      });

      randomMarker.setMap(map);
      randomMarkers.push(randomMarker);
    }
  });
}

/* 주소 검색 기능 */
var ps = new kakao.maps.services.Places();

function searchPlaces() {
  var keyword = document.getElementById("keyword").value;
  ps.keywordSearch(keyword, placesSearchCB);
}

function placesSearchCB(data, status) {
  if (status === kakao.maps.services.Status.OK) {
    var bounds = new kakao.maps.LatLngBounds();

    for (var i = 0; i < data.length; i++) {
      bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    }

    map.setBounds(bounds);
  }
}

/* 지도 중심 좌표 정보를 검색창에 나타내는 기능 */
// 주소-좌표 변환 객체 생성
var geocoder = new kakao.maps.services.Geocoder();

// 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록
kakao.maps.event.addListener(map, 'idle', function() {
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);
});

function searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보 요청
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
}

// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수
function displayCenterInfo(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        var keywordInput = document.getElementById('keyword');
        var address = '';

        for (var i = 0; i < result.length; i++) {
            if (result[i].region_type === 'H' && result[i].region_2depth_name !== '특별시' && result[i].region_2depth_name !== '광역시' && result[i].region_3depth_name !== '경기도') {
                address += result[i].region_2depth_name + ' ' + result[i].region_3depth_name + ' ';
            }
        }

        keywordInput.value = address.trim(); // 키워드 입력 필드의 값을 변경
    }
}

// 검색창 클릭 시 키워드 초기화 함수
function clearKeyword() {
  document.getElementById('keyword').value = '';
}
