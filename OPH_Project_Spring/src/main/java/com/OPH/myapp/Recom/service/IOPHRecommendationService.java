package com.OPH.myapp.Recom.service;

import java.io.IOException;

import org.json.JSONArray;
import org.json.JSONObject;

import com.OPH.myapp.dto.OPHRecommendationVO;
import com.fasterxml.jackson.databind.JsonNode;

public interface IOPHRecommendationService {
	
	void insertUserPreference(OPHRecommendationVO rvo);
	JsonNode recommendationEngine(OPHRecommendationVO rvo) throws IOException, InterruptedException;

}
