package com.OPH.myapp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.OPH.myapp.Analaysis.service.IOPHAnalysisService;
import com.OPH.myapp.dto.OPHAnalysisVO;

@Controller
public class OPHAnalysisController {
	
	@Autowired
	private IOPHAnalysisService ophAnalysisService;
	
	@PostMapping("/oph/ajax/{district}/{aItem}")
	public @ResponseBody Map<String, Object> getAnalysisDataByPathVariable(@PathVariable String district, @PathVariable String aItem) {
		System.out.println("district : " + district + " / aItem : " + aItem); // 지역과 분석항목 console로 확인
	    return ophAnalysisService.fetchData(district, aItem);
	}
	
	@GetMapping("/oph/averages/{aItem}")
    public @ResponseBody List<Double> getOverallAverages(@PathVariable String aItem) {
        return ophAnalysisService.fetchOverallAverages(aItem);
    }

	@GetMapping("/oph/percentiles/{aItem}")
	public @ResponseBody List<Double> getPercentiles(@PathVariable String aItem) {
	    return ophAnalysisService.fetchOverallPercentiles(aItem);
	}
	
	@GetMapping("/oph/{pageName}")
	public String renderPage(@PathVariable String pageName) {
		return "oph/"+pageName;
	}

}
