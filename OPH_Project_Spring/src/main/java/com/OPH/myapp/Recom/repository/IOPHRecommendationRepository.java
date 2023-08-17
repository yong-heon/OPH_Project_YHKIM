package com.OPH.myapp.Recom.repository;

import java.io.IOException;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.OPH.myapp.dto.OPHRecommendationVO;
import com.fasterxml.jackson.databind.JsonNode;

public interface IOPHRecommendationRepository {
	
	void insertUserPreference(OPHRecommendationVO rvo);
	JsonNode recommendationEngine(OPHRecommendationVO rvo) throws IOException, InterruptedException;
}
