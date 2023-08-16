package com.OPH.myapp.Recom.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.OPH.myapp.dto.OPHRecommendationVO;

@Repository
public class OPHRecommendationRepository implements IOPHRecommendationRepository {

	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Override
	public void insertUserPreference(OPHRecommendationVO rvo) {
		// TODO Auto-generated method stub
		String query = "INSERT INTO USER_PREF (residence_Type, rent_Type, "
				+ "security_Deposit, monthly_Rent, "
				+ "priority1, priority2, priority3) VALUES (?, ?, ?, ?, ?, ?, ?)";
		jdbcTemplate.update(query, rvo.getResidenceType(),
			rvo.getRentType(), 
			rvo.getSecurityDeposit(), 
			rvo.getMonthlyRent(), 
			rvo.getPriority1(), 
			rvo.getPriority2(), 
			rvo.getPriority3());

	}

}
