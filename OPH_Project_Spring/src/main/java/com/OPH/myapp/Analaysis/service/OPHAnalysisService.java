package com.OPH.myapp.Analaysis.service;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPH.myapp.Analysis.repository.IOPHAnalysisRepository;

@Service
public class OPHAnalysisService implements IOPHAnalysisService {

	@Autowired
	private IOPHAnalysisRepository ophAnalysisRepository;

	@Override
	public List<Double> getAvg(String district, String aItem) {
		return ophAnalysisRepository.getAvg(district, aItem);
	}

	@Override
	public List<Double> getPercentile(String district, String aItem) {
		return ophAnalysisRepository.getPercentile(district, aItem);
	}

	@Override
	public List<String> getGrades(String district, String aItem) {
		return ophAnalysisRepository.getGrades(district, aItem);
	}
	
    @Override
    public Map<String, Object> fetchData(String district, String aItem) {
        Map<String, Object> analysisData = new HashMap<>();
        analysisData.put("district", district);
        analysisData.put("avgValues", getAvg(district, aItem));
        analysisData.put("percentiles", getPercentile(district, aItem));
        analysisData.put("grades", getGrades(district, aItem));
        return analysisData;
    }
    @Override
    public List<Double> fetchOverallAverages(String aItem) {
        return ophAnalysisRepository.fetchOverallAverages(aItem);
    }
    @Override    
    public List<Double> fetchOverallPercentiles(String aItem) {
    	return ophAnalysisRepository.fetchOverallPercentiles(aItem); //이제 자바스크립트로 백분위 시각화 부분 수정해야됨
    }


}
