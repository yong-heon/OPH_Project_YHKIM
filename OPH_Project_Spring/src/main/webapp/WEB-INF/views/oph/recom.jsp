<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>주거형태 추천 | 일인가구</title>
<!-- Font -->
<link
	href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
	rel="stylesheet" />
<!-- Favicon -->
<link rel="icon" href="<c:url value='/images/favicon.ico'/>">
<!-- CSS -->
<link rel="stylesheet" href="<c:url value='/css/style.css' />">
<!-- Kakao API Key -->
<script type="text/javascript"
	src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=748561d1582edbce8ffda338b0b2ee2b&libraries=services,clusterer,drawing"></script>


</head>
<body>
	<!-- navbar -->
	<nav class="navbar">
		<div class="navbar__container">
			<div class="navbar__logo">
				<a href="<c:url value='/'/>"> 
				<img src="<c:url value='/images/nav/navbar_logo.png'/>" alt="logo" />
				</a>
			</div>

			<ul class="navbar__menu">
				<li class="navbar__menu-item"><a href="#">서비스 소개</a></li>
				<li class="navbar__menu-item"><a href="<c:url value='/oph/analysis'/>">주거지역 분석</a></li>
				<li class="navbar__menu-item"><a href="<c:url value='/oph/recom'/>">주거지역 추천</a></li>
				<li class="navbar__menu-item"><a href="<c:url value='/oph/notice'/>">알림마당</a></li>
			</ul>

			<ul class="navbar__user">
				<li class="navbar__user-item"><a href="<c:url value='/oph/login'/>">로그인</a></li>
				<li class="navbar__user-divider">｜</li>
				<li class="navbar__user-item"><a href="<c:url value='/oph/join'/>">회원가입</a></li>
			</ul>
			<!-- Icon -->
			<a href="#none" class="navbar__icon navbar__icon--menu"> 
			<img src="<c:url value='/images/nav/icon_menu.png'/>" alt="menu-icon" />
			</a> <a href="#none" class="navbar__icon navbar__icon--close"> 
			<img src="<c:url value='/images/nav/icon_close.png'/>" alt="close-icon" />
			</a>
		</div>
	</nav>

	<!-- main -->
	<main>
	<div class="informationbar">
		<a class="informationbar__sidebar" href="#">메뉴</a>
		<div class="informationbar__manual">
			<a class="informationbar__manual__usage" href="#">이용법</a>
			<p class="informationbar__manual__text">목적지 선택 후 좌측 화살표 버튼 또는 메뉴를
				클릭해 정보를 확인하실 수 있습니다.</p>
		</div>
	</div>
	<!-- map -->
	<div class="map">
		<div class="map__wrap">
			<div class="map__content" id="map">
				<!-- manual -->
				<div class="manual active">
					<div class="manual__content">
						<div class="manual__img"></div>
						<div class="manual__close">
							<a href="#">닫기</a>
						</div>
					</div>
				</div>
				<!-- address search -->
				<div class="address">
					<div class="address__searchInput">
						<div class="address__searchInput__wrap">
							<form onsubmit="searchPlaces(); return false;">
								<input id="keyword" class="address__searchInput__searchBar"
									type="text" value="" size="15" placeholder="주소를 검색하세요"
									onclick="clearKeyword()" />
								<button class="address__searchInput__searchBtn" type="submit">
									<img src="<c:url value='/images/recomm/icon_search.png'/>" alt="icon_search" />
								</button>
							</form>
						</div>
					</div>
				</div>
				<!-- modal -->
				<div class="modal">
					<div class="modal__dialog">
						<div class="modal__content">
							<div class="modal__header">
								<h2 class="modal__header__title">자세히 보기</h2>
								<button class="modal__header__close" type="button">&times;</button>
							</div>
							<div class="modal__body">
								<!-- modal__table -->
								<table id="modal__table">
									<thead class="modal__table__thead">
										<tr>
											<th scope="col">순번</th>
											<th scope="col">자치구명</th>
											<th scope="col">법정동명</th>
											<th scope="col">주거형태</th>
											<th scope="col">임대면적</th>
											<th scope="col">전월세 구분</th>
											<th scope="col">보증금(만원)</th>
											<th scope="col">임대료(만원)</th>
											<th scope="col">건물명</th>
										</tr>
									</thead>
									<tbody class="modal__table__tbody"></tbody>
								</table>
							</div>
						</div>
						<div class="modal__dialog__scoll"></div>
					</div>
				</div>
			</div>
			<!-- sidebar -->
			<div class="sidebar">
				<div class="sidebar__toggle">
					<img class="sidebar__toggle__icon open" src="<c:url value='/images/recomm/icon_sidebar_open.png'/>" alt="sidebar-open" />
					<img class="sidebar__toggle__icon close" src="<c:url value='/images/recomm/icon_sidebar_close.png'/>" alt="sidebar-close" />
				</div>
				<div class="sidebar__content">
					<form action="/OPH_Project_ver0.4/processRecommendation.do"
						method="post">
						<div id="clickLatlng"></div>
						<div class="sidebar__content__title">선호정보 입력</div>
						<div class="sidebar__content__tab">
							<ul class="sidebar__content__tab-menu">
								<li class="sidebar__content__tab-menu-item"><a
									href="#tab01">주거형태</a></li>
								<li class="sidebar__content__tab-menu-item"><a
									href="#tab02">주거비용</a></li>
								<li class="sidebar__content__tab-menu-item"><a
									href="#tab03">우선순위 선택</a></li>
								<!-- <li class="sidebar__content__tab-menu-item"><a href="#tab04">대중교통</a></li> -->
							</ul>
							<div class="sidebar__content__tab-content">
								<!-- sidebar__content__tab-content tab01 -->
								<div id="tab01" class="tab01">
									<div class="tab01__content">
										<div class="tab01__type type01">
											<div class="tab01__type-title type01__title">주거형태</div>
											<div class="tab01__content type01__content">
												<label for="residenceType1"> <input
													id="residenceType1" type="radio" name="residenceType"
													value="다세대주택" /> 다세대주택
												</label> <label for="residenceType2"> <input
													id="residenceType2" type="radio" name="residenceType"
													value="오피스텔" /> 오피스텔
												</label> <label for="residenceType3"> <input
													id="residenceType3" type="radio" name="residenceType"
													value="아파트" /> 아파트
												</label>
											</div>
										</div>
										<div class="tab01__type type02">
											<div class="tab01__type-title type02__title">거래정보</div>
											<div class="tab01__content type02__content">
												<label for="rentType1"> <input id="rentType1"
													type="radio" name="rentType" value="월세" /> 월세
												</label> <label for="rentType2"> <input id="rentType2"
													type="radio" name="rentType" value="전세" /> 전세
												</label> <label for="rentType4"> <input id="rentType4"
													type="radio" name="rentType" value="매매" /> 매매
												</label>
											</div>
										</div>
									</div>
								</div>

								<!-- sidebar__content__tab-content tab02 -->
								<div id="tab02" class="tab02">
									<div class="tab02__content">
										<div class="tab02__type type03">
											<div class="tab02__type-title type03__title">주거비용</div>
											<div class="tab02__content type03__content">
												<label for="securityDeposit"> 보증금 : <input
													id="securityDeposit" type="text" name="securityDeposit"
													placeholder="보증금 입력 (만 원)" />
												</label> <label for="monthlyRent"> 월세 : <input
													id="monthlyRent" type="text" name="monthlyRent"
													placeholder="월세 입력 (만 원)" />
												</label>
											</div>
										</div>
									</div>
								</div>

								<!-- sidebar__content__tab-content tab03 -->
								<div id="tab03" class="tab03">
									<div class="tab03__content">
										<div class="tab03__type type04">
											<div class="tab03__type-title type04__title">주거환경 우선순위</div>
											<div class="tab03__content type04__content">
												<label for="priority1"> 1순위: <select id="priority1"
													name="priority1">
														<option value="" selected>선택해주세요</option>
														<option value="인구">인구밀집도</option>
														<option value="응급실수">응급실</option>
														<option value="대형마트수">대형마트</option>
														<option value="주요공원수">공원</option>
														<option value="지하철역수">지하철</option>
												</select>
												</label> <label for="priority2"> 2순위: <select id="priority2"
													name="priority2">
														<option value="" selected>선택해주세요</option>
														<option value="인구">인구밀집도</option>
														<option value="응급실수">응급실</option>
														<option value="대형마트수">대형마트</option>
														<option value="주요공원수">공원</option>
														<option value="지하철역수">지하철</option>
												</select>
												</label> <label for="priority3"> 3순위: <select id="priority3"
													name="priority3">
														<option value="" selected>선택해주세요</option>
														<option value="인구">인구밀집도</option>
														<option value="응급실수">응급실</option>
														<option value="대형마트수">대형마트</option>
														<option value="주요공원수">공원</option>
														<option value="지하철역수">지하철</option>
												</select>
												</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- sidebar__content__tab-content searchBtn -->
						<div class="sidebar__content__button">
							<input type="submit" class="searchBtn" value="제출">
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	</main>
	<!-- JavaScript -->
	<script src="<c:url value='/js/navbar.js'/>" defer></script>
	<script src="<c:url value='/js/recomm.js'/>" defer></script>
	<script src="<c:url value='/js/map.js'/>" defer></script>
	<script src="<c:url value='/js/modal.js'/>" defer></script>

	<!-- 지도검색 js -->
	<%--     <% if (request.getAttribute("alertMessage") != null) { %>
    	<script>
        	alert('<%= request.getAttribute("alertMessage") %>');
    	</script>
	<% } %> --%>
</body>
</html>