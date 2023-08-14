package com.OPH.myapp.Analysis.repository;

import java.util.List;

public interface IOPHAnalysisRepository {
	
    List<Double> getAvg(String district, String aItem);
    List<Double> getPercentile(String district, String aItem);
    List<String> getGrades(String district, String aItem);
}
