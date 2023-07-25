<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page
	import="java.util.List , com.analysis.model.*, com.analysis.command.*, com.analysis.frontcontroller.*"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>주거형태 분석 | 일인가구</title>
<!-- Font -->
<link
	href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
	rel="stylesheet" />
<!-- Favicon -->
<link rel="icon" href="images/favicon.ico" />
<!-- CSS -->
<link rel="stylesheet" href="css/style.css" />
<script src="https://code.jquery.com/jquery-3.4.1.js" defer></script>
	<script src="https://cdn.jsdelivr.net/npm/chart.js" defer></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" defer></script> 
</head>
<body>
	<%
		List<ADto> analysisTableResults = (List<ADto>) request.getAttribute("analysisTableResults");
		List<ADto> analysisGraphResults = (List<ADto>) request.getAttribute("analysisGraphResults");
	%>
	<!-- navbar -->
	<nav class="navbar">
		<div class="navbar__container">
			<div class="navbar__logo">
				<a href="index.jsp"> <img src="images/nav/navbar_logo.png"
					alt="logo" />
				</a>
			</div>

			<ul class="navbar__menu">
				<li class="navbar__menu-item"><a href="#">서비스 소개</a></li>
				<li class="navbar__menu-item active"><a href="analysis.jsp">주거지역
						분석</a></li>
				<li class="navbar__menu-item"><a href="recom.jsp">주거지역
						추천</a></li>
				<li class="navbar__menu-item"><a href="notice.jsp">알림마당</a></li>
			</ul>

			<ul class="navbar__user">
				<li class="navbar__user-item"><a href="login.jsp">로그인</a></li>
				<li class="navbar__user-divider">｜</li>
				<li class="navbar__user-item"><a href="join.jsp">회원가입</a></li>
			</ul>

			<!-- Icon -->
			<a href="#none" class="navbar__icon navbar__icon--menu"><img
				src="images/nav/icon_menu.png" alt="menu-icon" /></a> <a href="#none"
				class="navbar__icon navbar__icon--close"><img
				src="images/nav/icon_close.png" alt="close-icon" /></a>
		</div>
	</nav>

	<!-- main -->
	<main>
		<!-- main -->
		<section class="analysis">
			<!-- 메인페이지 시작 -->
			<div class="analysis__container">
				<form action="analysisGraphResult.do" method="post">
					<div class="analysis__container-header">
						<h4>주거지역 분석</h4>
						<p>
							<span>정보활용안내</span> <br /> 일인가구에서 제공하는 자료는 '서울 열린데이터 광장, SGIS
							통계지리정보서비스'에서 분석한 자료로써 1인가구에 필요한 정보를 주기 위한 목적임을 밝히며, 실제 데이터 값과 오차가
							있을 수 있음을 알려드립니다.
						</p>
					</div>

					<!-- 항목 -->
					<div class="analysis__container--mapreport">
						<div class="analysis__container--mapreport-item">
							<ul>
								<li class="item_1"><input type="radio" name="AItem"
									value="인구밀집도" id="map-report-tab_1" class="input-radio_1" /> <label
									for="map-report-tab_1" class="item-radio_1"> <span
										class="tab_1">인구밀집도</span>
								</label></li>
								<li><input type="radio" name="AItem" value="APARTMENTS"
									id="map-report-tab_2" class="input-radio_2" /> <label
									for="map-report-tab_2" class="item-radio_2"> <span
										class="tab_2">아파트</span>
								</label></li>
								<li><input type="radio" name="AItem" value="STUDIO"
									id="map-report-tab_3" class="input-radio_3" /> <label
									for="map-report-tab_3" class="item-radio_3"> <span
										class="tab_3">오피스텔</span>
								</label></li>
								<li><input type="radio" name="AItem" value="MULTIUNITHOUSE"
									id="map-report-tab_4" class="input-radio_4" /> <label
									for="map-report-tab_4" class="item-radio_4"> <span
										class="tab_4">연립다세대</span>
								</label></li>
								<li><input type="radio" name="AItem" value="편의시설"
									id="map-report-tab_5" class="input-radio_5" /> <label
									for="map-report-tab_5" class="item-radio_5"> <span
										class="tab_5">편의시설</span>
								</label></li>
								<li><input type="radio" name="AItem" value="대중교통"
									id="map-report-tab_6" class="input-radio_6" /> <label
									for="map-report-tab_6" class="item-radio_6"> <span
										class="tab_6">대중교통</span>
								</label></li>
							</ul>
						</div>

						<!-- 지도부분 -->
						<div class="top">
							<p class="mega">
								서울특별시 > <span class="result_sgg">중구</span>
							</p>
							<!-- 지도 시작 -->
							<div class="mid">
								<div class="step-1">
									<div class="mid_2">
										<div class="analysis__container--mapreport-map">
											<div data-item="sgg" class="map">
												<ul>
													<li><input type="radio" name="mapreport-sgg"
														value="도봉구" id="map-seoul_1" onchange="showSpanContent()" />
														<label for="map-seoul_1"> <span>도봉구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="은평구" id="map-seoul_2" onchange="showSpanContent()" />
														<label for="map-seoul_2"> <span>은평구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="강북구" id="map-seoul_3" onchange="showSpanContent()" />
														<label for="map-seoul_3"> <span>강북구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="노원구" id="map-seoul_4" onchange="showSpanContent()" />
														<label for="map-seoul_4"> <span>노원구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="종로구" id="map-seoul_5" onchange="showSpanContent()" />
														<label for="map-seoul_5"> <span>종로구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="성북구" id="map-seoul_6" onchange="showSpanContent()" />
														<label for="map-seoul_6"> <span>성북구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="중랑구" id="map-seoul_7" onchange="showSpanContent()" />
														<label for="map-seoul_7"> <span>중랑구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="서대문구" id="map-seoul_8" onchange="showSpanContent()" />
														<label for="map-seoul_8"> <span>서대문구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="동대문구" id="map-seoul_9" onchange="showSpanContent()" />
														<label for="map-seoul_9"> <span>동대문구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="강서구" id="map-seoul_10" onchange="showSpanContent()" />
														<label for="map-seoul_10"> <span>강서구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="마포구" id="map-seoul_11" onchange="showSpanContent()" />
														<label for="map-seoul_11"> <span>마포구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="중구" id="map-seoul_12" checked="checked"
														onchange="showSpanContent()" /> <label for="map-seoul_12">
															<span>중구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="성동구" id="map-seoul_13" onchange="showSpanContent()" />
														<label for="map-seoul_13"> <span>성동구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="광진구" id="map-seoul_14" onchange="showSpanContent()" />
														<label for="map-seoul_14"> <span>광진구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="강동구" id="map-seoul_15" onchange="showSpanContent()" />
														<label for="map-seoul_15"> <span>강동구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="양천구" id="map-seoul_16" onchange="showSpanContent()" />
														<label for="map-seoul_16"> <span>양천구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="용산구" id="map-seoul_17" onchange="showSpanContent()" />
														<label for="map-seoul_17"> <span>용산구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="구로구" id="map-seoul_18" onchange="showSpanContent()" />
														<label for="map-seoul_18"> <span>구로구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="영등포구" id="map-seoul_19"
														onchange="showSpanContent()" /> <label for="map-seoul_19">
															<span>영등포구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="동작구" id="map-seoul_20" onchange="showSpanContent()" />
														<label for="map-seoul_20"> <span>동작구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="강남구" id="map-seoul_21" onchange="showSpanContent()" />
														<label for="map-seoul_21"> <span>강남구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="송파구" id="map-seoul_22" onchange="showSpanContent()" />
														<label for="map-seoul_22"> <span>송파구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="관악구" id="map-seoul_23" onchange="showSpanContent()" />
														<label for="map-seoul_23"> <span>관악구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="서초구" id="map-seoul_24" onchange="showSpanContent()" />
														<label for="map-seoul_24"> <span>서초구</span>
													</label></li>
													<li><input type="radio" name="mapreport-sgg"
														value="금천구" id="map-seoul_25" onchange="showSpanContent()" />
														<label for="map-seoul_25"> <span>금천구</span>
													</label></li>
												</ul>

												<img src="images/analysis/analysis_map.svg" alt="seou map"
													class="seoul_map_img" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="bottom">
							<button type="submit" id="analysis_btn">분석하기</button>
						</div>
					</div>
				</form>
			</div>

			<!-- 결과 나타내는 페이지 -->
			<div class="result">
				<div class="result__area">
					<div class="result__area__tab">
						<ul class="result__area__tab-menu">
							<li class="result__area__tab-menu-item"><a href="#graph">그래프</a></li>
							<li class="result__area__tab-menu-item"><a href="#table">표</a></li>
						</ul>
					</div>
					<div class="result__area__tab-content">
						<!-- result__area__tab-content GRAPH -->
						<div id="graph" class="graph">
	<!-- 						<canvas id="avgChart"></canvas>
							<canvas id="percentileChart"></canvas>
							<canvas id="gradeChart"></canvas> -->
							<canvas id="myChart"></canvas>
						</div>

						<div id="table" class="table">
							<div class="table_item">
								<table id="table__population" class="custom-table">
									<thead class="table__population--thead">
										<tr>
											<th scope="col">순위</th>
											<th scope="col">자치구명</th>
											<th scope="col">인구밀집도</th>
										</tr>
									</thead>
									<tbody class="table__population--tbody"></tbody>
								</table>
							</div>

							<div class="table_item">
								<table id="table__apt" class="custom-table">
									<thead class="table__apt--thead">
										<tr>
											<th scope="col">순위</th>
											<th scope="col">자치구명</th>
											<th scope="col">아파트</th>
										</tr>
									</thead>
									<tbody class="table__apt--tbody"></tbody>
								</table>
							</div>

							<div class="table_item">
								<table id="table__men" class="custom-table">
									<thead class="table__men--thead">
										<tr>
											<th scope="col">순위</th>
											<th scope="col">자치구명</th>
											<th scope="col">연립다세대</th>
										</tr>
									</thead>
									<tbody class="table__men--tbody"></tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>

	<!-- footer -->
	<footer class="footer">
		<div class="footer__container">
			<div class="footer__logo">
				<img src="images/footer/footer_logo.png" alt="footer_logo" />
			</div>
			<address class="footer__address">
				일인가구 <br /> 번호 : 000-000-000 ｜ 이메일 : abc.abc.com <br /> 주소 : 서울특별시
				마포구 신촌로 104, 5F
			</address>
			<ul class="footer__menu">
				<li class="footer__menu-item"><a href="#">이용약관</a></li>
				<li class="footer__menu-item"><a href="#">개인정보취급방침</a></li>
			</ul>
			<ul class="footer__sns">
				<li class="footer__sns-item"><a href="#"><img
						src="images/footer/icon_instargram.png" alt="icon_facebook" /></a></li>
				<li class="footer__sns-item"><a href="#"><img
						src="images/footer/icon_facebook.png" alt="icon_facebook" /></a></li>
				<li class="footer__sns-item"><a href="#"><img
						src="images/footer/icon_youtube.png" alt="icon_facebook" /></a></li>
			</ul>
			<span class="footer__copywriter">COPYRIGHT ⓒ One Team. ALL
				RIGHTS RESERVED.</span>
		</div>
	</footer>

	<!-- JavaScript -->
	<script src="js/navbar.js" defer></script>
	<script src="js/analysis.js" defer></script>
	
	
</body>
</html>