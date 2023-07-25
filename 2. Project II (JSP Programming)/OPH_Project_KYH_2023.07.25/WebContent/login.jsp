<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>일인가구</title>
</head>
<body>

    <!-- Font -->
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
    <!-- Favicon -->
    <link rel="icon" href="images/favicon.ico" />
    <!-- CSS -->
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body>
    <!-- navbar -->
    <nav class="navbar">
      <div class="navbar__container">
        <div class="navbar__logo">
          <a href="index.html">
            <img src="images/nav/navbar_logo.png" alt="logo" />
          </a>
        </div>

        <ul class="navbar__menu">
          <li class="navbar__menu-item"><a href="#">서비스 소개</a></li>
          <li class="navbar__menu-item"><a href="analysis.html">주거지역 분석</a></li>
          <li class="navbar__menu-item"><a href="recommendation.html">주거지역 추천</a></li>
          <li class="navbar__menu-item"><a href="notice.html">알림마당</a></li>
        </ul>

        <ul class="navbar__user">
          <li class="navbar__user-item active"><a href="login.html">로그인</a></li>
          <li class="navbar__user-divider">｜</li>
          <li class="navbar__user-item"><a href="join.html">회원가입</a></li>
        </ul>

        <!-- Icon -->
        <a href="#none" class="navbar__icon navbar__icon--menu"><img src="images/nav/icon_menu.png" alt="menu-icon" /></a>
        <a href="#none" class="navbar__icon navbar__icon--close"><img src="images/nav/icon_close.png" alt="close-icon" /></a>
      </div>
    </nav>

    <main>
      <div class="login">
        <div class="login__container">
          <div class="login__title">
            <h1 class="login__title-heading">로그인</h1>
            <h2 class="login__title-subheading">일인가구 서비스 이용을 위해 로그인해주세요.</h2>
          </div>
          <div class="login__form">
            <label class="login__form-field login__form-field--id" for="email">
              <p class="login__form-label">아이디</p>
              <input type="text" name="email" class="login__form-input" placeholder="이메일 주소 입력" />
            </label>
            <label class="login__form-field login__form-field--pwd" for="password">
              <p class="login__form-label">비밀번호</p>
              <input type="password" name="password" class="login__form-input" placeholder="비밀번호 입력" />
            </label>
          </div>
          <div class="login__link">
            <a href="join.html" class="login__link-item">회원가입</a>
            <p class="login__link-divider">｜</p>
            <a href="#" class="login__link-item">비밀번호 찾기</a>
          </div>
          <div class="login__btn">
            <button>로그인</button>
          </div>
        </div>
      </div>
    </main>

    <!-- footer -->
    <footer class="footer">
      <div class="footer__container">
        <div class="footer__logo">
          <img src="images/footer/footer_logo.png" alt="footer_logo" />
        </div>
        <address class="footer__address">
          일인가구 <br />
          번호 : 000-000-000 ｜ 이메일 : abc.abc.com <br />
          주소 : 서울특별시 마포구 신촌로 104, 5F
        </address>
        <ul class="footer__menu">
          <li class="footer__menu-item"><a href="#">이용약관</a></li>
          <li class="footer__menu-item"><a href="#">개인정보취급방침</a></li>
        </ul>
        <ul class="footer__sns">
          <li class="footer__sns-item">
            <a href="#"><img src="images/footer/icon_instargram.png" alt="icon_facebook" /></a>
          </li>
          <li class="footer__sns-item">
            <a href="#"><img src="images/footer/icon_facebook.png" alt="icon_facebook" /></a>
          </li>
          <li class="footer__sns-item">
            <a href="#"><img src="images/footer/icon_youtube.png" alt="icon_facebook" /></a>
          </li>
        </ul>
        <span class="footer__copywriter">COPYRIGHT ⓒ One Team. ALL RIGHTS RESERVED.</span>
      </div>
    </footer>

    <!-- JavaScript -->
    <script src="js/navbar.js" defer></script>
    <script src="js/main.js" defer></script>
</body>
</html>