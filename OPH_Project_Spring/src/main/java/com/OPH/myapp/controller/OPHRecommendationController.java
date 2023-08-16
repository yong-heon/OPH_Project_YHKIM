package com.OPH.myapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.OPH.myapp.Recom.service.IOPHRecommendationService;
import com.OPH.myapp.dto.OPHRecommendationVO;

@Controller
public class OPHRecommendationController {
	
	@Autowired
	private IOPHRecommendationService ophRecommendationService;
	@RequestMapping(value="/oph/insertuserpref", method = {RequestMethod.POST})
	public String insertUserPref(OPHRecommendationVO rvo) {
		
		// 해당 컨트롤러 메서드가 호출되었는지 확인
		System.out.println("insertUserPref method in OPHRecommendationController is called");
		
		// 사용자로부터 받아온 데이터 확인
		System.out.println("Received data: " + rvo);
		
		ophRecommendationService.insertUserPreference(rvo);
		return "redirect:/oph/recom";
	}

}
