package com.OPH.myapp.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.OPH.myapp.Analaysis.service.IOPHAnalysisService;
import com.OPH.myapp.dto.FetchDataDTO;

@Controller
public class OPHAnalysisController {
	
	@Autowired
	private IOPHAnalysisService ophAnalysisService;
	
	// EmpService 참고해서 다시 해보기
	@PostMapping("/myapp/oph/fetchData")
	public Map<String, Object> fetchData(@RequestBody FetchDataDTO dto) {
	    return ophAnalysisService.fetchData(dto.getDistrict(), dto.getaItem());
	}
/*	public ModelAndView fetchData(@RequestParam String district, @RequestParam String aItem) {
        ModelAndView mav = new ModelAndView("oph/analysis"); // ".jsp"를 제외한 뷰 이름을 사용
        Map<String, Object> data = ophAnalysisService.fetchData(district, aItem);
        mav.addAllObjects(data);
        return mav;
	}*/
	
	@GetMapping("/oph/{pageName}")
	public String renderPage(@PathVariable String pageName) {
		return "oph/"+pageName;
	}

}
