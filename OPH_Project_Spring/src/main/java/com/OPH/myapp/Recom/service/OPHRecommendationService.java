package com.OPH.myapp.Recom.service;

import java.io.IOException;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPH.myapp.Recom.repository.IOPHRecommendationRepository;
import com.OPH.myapp.dto.OPHRecommendationVO;
import com.fasterxml.jackson.databind.JsonNode;

@Service
public class OPHRecommendationService implements IOPHRecommendationService {
	
	@Autowired
	private IOPHRecommendationRepository ophRecommendationRepository;

	@Override
	public void insertUserPreference(OPHRecommendationVO rvo) {
		// TODO Auto-generated method stub
		ophRecommendationRepository.insertUserPreference(rvo);
	}
	
	@Override
	public JsonNode recommendationEngine(OPHRecommendationVO rvo) throws IOException, InterruptedException {
		
		return ophRecommendationRepository.recommendationEngine(rvo);
		

	}

}
