package com.OPH.myapp.Recom.repository;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.OPH.myapp.dto.OPHRecommendationVO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Repository
public class OPHRecommendationRepository implements IOPHRecommendationRepository {

	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Override
	public void insertUserPreference(OPHRecommendationVO rvo) {
		// TODO Auto-generated method stub
		String query = "INSERT INTO USER_PREF (residence_Type, rent_Type, "
				+ "security_Deposit, monthly_Rent, "
				+ "priority1, priority2, priority3) VALUES (?, ?, ?, ?, ?, ?, ?)";
		jdbcTemplate.update(query, rvo.getResidenceType(),
			rvo.getRentType(), 
			rvo.getSecurityDeposit(), 
			rvo.getMonthlyRent(), 
			rvo.getPriority1(), 
			rvo.getPriority2(), 
			rvo.getPriority3());

	}
	
	@Override
	public JsonNode recommendationEngine(OPHRecommendationVO rvo) throws IOException, InterruptedException{
		
		List<String> cmd = new ArrayList<String>();
		
		System.out.println(" : : START : : Use ProcessBuilder ");
		
		cmd.add("python");
		cmd.add("C:\\python_Workspace\\python\\OPH_Project_REC_v0.3.py"); // python script 절대 경로로 설정
        cmd.add(rvo.getResidenceType());
        cmd.add(rvo.getRentType());
        cmd.add(String.valueOf(rvo.getSecurityDeposit()));
        cmd.add(String.valueOf(rvo.getMonthlyRent()));
        cmd.add(rvo.getPriority1());
        cmd.add(rvo.getPriority2());
        cmd.add(rvo.getPriority3());
        
		ProcessBuilder pb = new ProcessBuilder(cmd);
		pb.redirectErrorStream(true);
		StringBuilder output = new StringBuilder();
		
		try {
			Process process = pb.start();
			BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream(), "UTF-8"));
			String line;
			
			while ((line = reader.readLine()) != null) {
				output.append(line);
				System.out.println(output);
			}
			
			process.waitFor();
		} catch (Exception e) {
			e.printStackTrace();
		}

		ObjectMapper objectMapper = new ObjectMapper();
		try {
		    JsonNode jsonNode = objectMapper.readTree(output.toString());
		    
		    if (jsonNode.isArray()) {
		        System.out.println("Python script output: " + jsonNode.toString());
		        // 필요에 따라 JsonNode를 다른 객체로 변환하거나 사용하세요
		        return jsonNode; // 파싱된 JsonNode 반환

		    } else {
		        System.out.println("Expected an array but received: " + jsonNode.toString());
		        return null;
		    }
		} catch (Exception e) {
		    System.out.println("Error parsing JSON: " + output.toString());
		    e.printStackTrace();
		    return null; // 오류가 발생한 경우 null 반환. 실제 사용 경우에 따라 다른 처리를 할 수 있습니다.

		}
		

	}

}
