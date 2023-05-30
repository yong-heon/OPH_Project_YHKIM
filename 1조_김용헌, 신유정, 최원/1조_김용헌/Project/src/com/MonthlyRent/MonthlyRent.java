package com.MonthlyRent;

import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.io.BufferedReader;
import java.io.IOException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class MonthlyRent {

	public static void main(String[] args)throws IOException  {
		
		try {
			StringBuilder urlBuilder = new StringBuilder("http://openapi.seoul.go.kr:8088/7848477652796f6e3831566a425548/json/tbLnOpendataRentV/1/593/"); /*URL*/
				urlBuilder.append("/" +  URLEncoder.encode("7848477652796f6e3831566a425548","UTF-8") ); /*인증키 (sample사용시에는 호출시 제한됩니다.)*/
				urlBuilder.append("/" +  URLEncoder.encode("json","UTF-8") ); /*요청파일타입 (xml,xmlf,xls,json) */
				urlBuilder.append("/" + URLEncoder.encode("tbLnOpendataRentV","UTF-8")); /*서비스명 (대소문자 구분 필수입니다.)*/
				urlBuilder.append("/" + URLEncoder.encode("1","UTF-8")); /*요청시작위치 (sample인증키 사용시 5이내 숫자)*/
				urlBuilder.append("/" + URLEncoder.encode("1000","UTF-8")); /*요청종료위치(sample인증키 사용시 5이상 숫자 선택 안 됨)*/
				// 상위 5개는 필수적으로 순서바꾸지 않고 호출해야 합니다.
				
				// 서비스별 추가 요청 인자이며 자세한 내용은 각 서비스별 '요청인자'부분에 자세히 나와 있습니다.	
				
				URL url = new URL(urlBuilder.toString());
				HttpURLConnection conn = (HttpURLConnection) url.openConnection();
				conn.setRequestMethod("GET");
				conn.setRequestProperty("Content-type", "application/json");
				System.out.println("Response code: " + conn.getResponseCode()); /* 연결 자체에 대한 확인이 필요하므로 추가합니다.*/
				BufferedReader rd;

				// 서비스코드가 정상이면 200~300사이의 숫자가 나옵니다.
				if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
						rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
				} else {
						rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
				}
				StringBuilder sb = new StringBuilder();
				String line;
				while ((line = rd.readLine()) != null) {
						sb.append(line);
				}
				rd.close();
				conn.disconnect();
				System.out.println(sb.toString());
				
				 JSONParser jsonParser = new JSONParser();
				 JSONObject jsonObject = (JSONObject) jsonParser.parse(sb.toString());
				 JSONObject tbLnOpendataRentV = (JSONObject) jsonObject.get("tbLnOpendataRentV");
				 JSONArray rowArray = (JSONArray) tbLnOpendataRentV.get("row");
				//JSONArray monthlyRentArray = (JSONArray) jsonObject.get("row");

				// JSON 배열을 순회하며 MonthlyRentDto 객체 생성 후 리스트에 추가
				 for (int i = 0; i < rowArray.size(); i++) {
		                JSONObject object = (JSONObject) rowArray.get(i);
		                String accYear = (String) object.get("ACC_YEAR");
		                String sggCd = (String) object.get("SGG_CD");
		                String sggNm = (String) object.get("SGG_NM");
		                String bjdongCd = (String) object.get("BJDONG_CD");
		                String bjdongNm = (String) object.get("BJDONG_NM");
		                String rentGbn = (String) object.get("RENT_GBN");
		                String rentArea = String.valueOf(object.get("RENT_AREA"));
		                String rentGtn = (String) object.get("RENT_GTN");
		                String rentFee = (String) object.get("RENT_FEE");
		                String houseGbnNm = (String) object.get("HOUSE_GBN_NM");
		                MonthlyRentDto monthlyRentDto = new MonthlyRentDto(accYear, sggCd, sggNm, bjdongCd, bjdongNm, rentGbn, rentArea, rentGtn, rentFee, houseGbnNm);
		                
		                // monthlyRentDto 객체를 데이터베이스에 저장하는 예시 코드
		                saveMonthlyRentDtoToDatabase(monthlyRentDto);
				}
			}  catch(Exception e) {
				e.printStackTrace();
			}
		}
    private static void saveMonthlyRentDtoToDatabase(MonthlyRentDto monthlyRentDto) {
        Connection connection = null;
        PreparedStatement statement = null;
        
        try {
            // 데이터베이스 연결
            connection = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe", "project", "1234");

            // INSERT 쿼리 작성
            String query = "INSERT INTO MONTHLYRENT (acc_year, sgg_cd, sgg_nm, bjdong_cd, bjdong_nm, rent_gbn, rent_area, rent_gtn, rent_fee, house_gbn_nm) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            // PreparedStatement 객체 생성
            statement = connection.prepareStatement(query);
            
            // 매개변수 설정
            statement.setString(1, monthlyRentDto.getAccYear());
            statement.setString(2, monthlyRentDto.getSggCd());
            statement.setString(3, monthlyRentDto.getSggNm());
            statement.setString(4, monthlyRentDto.getBjdongCd());
            statement.setString(5, monthlyRentDto.getBjdongNm());
            statement.setString(6, monthlyRentDto.getRentGbn());
            statement.setString(7, monthlyRentDto.getRentArea());
            statement.setString(8, monthlyRentDto.getRentGtn());
            statement.setString(9, monthlyRentDto.getRentFee());
            statement.setString(10, monthlyRentDto.getHouseGbnNm());

            // 쿼리 실행
            int rowsAffected = statement.executeUpdate();
            
            if (rowsAffected > 0) {
                System.out.println("MonthlyRentDto가 데이터베이스에 저장되었습니다.");
            } else {
                System.out.println("MonthlyRentDto 저장 실패");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // 자원 해제
            try {
                if (statement != null) {
                    statement.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
