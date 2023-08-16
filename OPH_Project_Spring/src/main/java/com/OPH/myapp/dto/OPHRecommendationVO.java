package com.OPH.myapp.dto;

public class OPHRecommendationVO {
		
    private String residenceType;  
    private String rentType;       
    private int securityDeposit;   
    private int monthlyRent;       
    private String priority1;     
    private String priority2;      
    private String priority3;      

    public OPHRecommendationVO() {}

    public OPHRecommendationVO(String residenceType, String rentType, int securityDeposit, 
                             int monthlyRent, String priority1, String priority2, String priority3) {
        this.residenceType = residenceType;
        this.rentType = rentType;
        this.securityDeposit = securityDeposit;
        this.monthlyRent = monthlyRent;
        this.priority1 = priority1;
        this.priority2 = priority2;
        this.priority3 = priority3;
    }

	public String getResidenceType() {
		return residenceType;
	}

	public void setResidenceType(String residenceType) {
		this.residenceType = residenceType;
	}

	public String getRentType() {
		return rentType;
	}

	public void setRentType(String rentType) {
		this.rentType = rentType;
	}

	public int getSecurityDeposit() {
		return securityDeposit;
	}

	public void setSecurityDeposit(int securityDeposit) {
		this.securityDeposit = securityDeposit;
	}

	public int getMonthlyRent() {
		return monthlyRent;
	}

	public void setMonthlyRent(int monthlyRent) {
		this.monthlyRent = monthlyRent;
	}

	public String getPriority1() {
		return priority1;
	}

	public void setPriority1(String priority1) {
		this.priority1 = priority1;
	}

	public String getPriority2() {
		return priority2;
	}

	public void setPriority2(String priority2) {
		this.priority2 = priority2;
	}

	public String getPriority3() {
		return priority3;
	}

	public void setPriority3(String priority3) {
		this.priority3 = priority3;
	}
}
