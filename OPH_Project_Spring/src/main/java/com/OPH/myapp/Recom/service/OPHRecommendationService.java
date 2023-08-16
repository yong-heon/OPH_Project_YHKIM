package com.OPH.myapp.Recom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.OPH.myapp.Recom.repository.IOPHRecommendationRepository;
import com.OPH.myapp.dto.OPHRecommendationVO;

@Service
public class OPHRecommendationService implements IOPHRecommendationService {
	
	@Autowired
	private IOPHRecommendationRepository ophRecommendationRepository;

	@Override
	public void insertUserPreference(OPHRecommendationVO rvo) {
		// TODO Auto-generated method stub
		ophRecommendationRepository.insertUserPreference(rvo);
	}

}
