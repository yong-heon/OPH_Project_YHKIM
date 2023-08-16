package com.OPH.myapp.Recom.repository;

import com.OPH.myapp.dto.OPHRecommendationVO;

public interface IOPHRecommendationRepository {
	
	void insertUserPreference(OPHRecommendationVO rvo);

}
