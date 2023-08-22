package com.OPH.myapp.controller;

import java.io.IOException;

import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.OPH.myapp.Recom.service.IOPHRecommendationService;
import com.OPH.myapp.dto.OPHRecommendationVO;
import com.fasterxml.jackson.databind.JsonNode;

@Controller
public class OPHRecommendationController {
	
	@Autowired
	private IOPHRecommendationService ophRecommendationService;
	
	
	@RequestMapping(value="/oph/insertuserpref", method = {RequestMethod.POST})
	public ModelAndView insertUserPref(OPHRecommendationVO rvo, HttpSession session) {
		
		// 해당 컨트롤러 메서드가 호출되었는지 확인
		System.out.println("insertUserPref method in OPHRecommendationController is called");
		
		// 사용자로부터 받아온 데이터 확인
		System.out.println("Received data: " + rvo);
		
	    // 사용자 선호정보 데이터베이스에 입력
		ophRecommendationService.insertUserPreference(rvo);
		
	    // 상태 정보를 세션에 저장
	    session.setAttribute("userPreference", rvo);

	    ModelAndView mav = new ModelAndView("/oph/recom");  // 뷰 이름은 실제 뷰 이름에 따라 변경해야 합니다.
	    
	    // 세션에서 데이터 가져오기 (사실 여기서는 위에서 저장한 세션을 다시 가져오는 것이므로 생략해도 됩니다.)
	    OPHRecommendationVO sessionRvo = (OPHRecommendationVO) session.getAttribute("userPreference");
	    if (sessionRvo != null) {
	        mav.addObject("userPreference", sessionRvo);
	    }

	    return mav;
	}
	
	@PostMapping("/oph/getRcommendation")
	public @ResponseBody JsonNode getRecommendation(@RequestBody OPHRecommendationVO rvo) throws IOException, InterruptedException {
		
		// 해당 컨트롤러 메서드가 호출되었는지 확인
		System.out.println("getRecommendation method in OPHRecommendationController is called");
	    JsonNode recommendationResult = ophRecommendationService.recommendationEngine(rvo);
	    System.out.println("Received data: " + rvo);

	    return recommendationResult;
	}

}
