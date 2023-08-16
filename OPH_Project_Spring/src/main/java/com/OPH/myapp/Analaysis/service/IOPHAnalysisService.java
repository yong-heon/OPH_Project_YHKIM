package com.OPH.myapp.Analaysis.service;

import java.util.List;
import java.util.Map;

public interface IOPHAnalysisService {
	
    List<Double> getAvg(String district, String aItem);
    List<Double> getPercentile(String district, String aItem);
    List<String> getGrades(String district, String aItem);
    Map<String, Object> fetchData(String district, String aItem);

}
