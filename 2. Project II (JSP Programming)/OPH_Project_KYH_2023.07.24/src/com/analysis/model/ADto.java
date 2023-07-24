package com.analysis.model;

public class ADto {
	
	String districtName;
	String analysisItem;
	double salePriceAvg;
	double jeonsePriceAvg;
	double monthlyDepositAvg;
	double monthlyAvg;
	double salePricePercentile;
	double jeonsePricePercentile;
	double monthlyDepositPercentile;
	double monthlyPercentile;
	String salePriceGrade;
	String jeonsePriceGrade;
	String monthlyDepositGrade;
	String monthlyGrade;
	
	public ADto() {}
	
	public ADto(String districtName, String analysisItem, double salePriceAvg, double jeonsePriceAvg, double monthlyDepositAvg, double monthlyAvg, double salePricePercentile, 	double jeonsePricePercentile, double monthlyDepositPercentile, 	double monthlyPercentile, String salePriceGrade, String jeonsePriceGrade, String monthlyDepositGrade, String monthlyGrade) {
		this.districtName=districtName;
		this.analysisItem=analysisItem;
		this.salePriceAvg=salePriceAvg;
		this.jeonsePriceAvg=jeonsePriceAvg;
		this.monthlyDepositAvg=monthlyDepositAvg;
		this.monthlyAvg=monthlyAvg;
		this.salePricePercentile=salePricePercentile;
		this.jeonsePricePercentile=jeonsePricePercentile;
		this.monthlyDepositPercentile=monthlyDepositPercentile;
		this.monthlyPercentile=monthlyPercentile;
		this.salePriceGrade=salePriceGrade;
		this.jeonsePriceGrade=jeonsePriceGrade;
		this.monthlyDepositGrade=monthlyDepositGrade;
		this.monthlyGrade=monthlyGrade;
	}

	public String getDistrictName() {
		return districtName;
	}

	public void setDistrictName(String districtName) {
		this.districtName = districtName;
	}

	public String getAnalysisItem() {
		return analysisItem;
	}

	public void setAnalysisItem(String analysisItem) {
		this.analysisItem = analysisItem;
	}

	public double getSalePriceAvg() {
		return salePriceAvg;
	}

	public void setSalePriceAvg(double salePriceAvg) {
		this.salePriceAvg = salePriceAvg;
	}

	public double getJeonsePriceAvg() {
		return jeonsePriceAvg;
	}

	public void setJeonsePriceAvg(double jeonsePriceAvg) {
		this.jeonsePriceAvg = jeonsePriceAvg;
	}

	public double getMonthlyDepositAvg() {
		return monthlyDepositAvg;
	}

	public void setMonthlyDepositAvg(double monthlyDepositAvg) {
		this.monthlyDepositAvg = monthlyDepositAvg;
	}

	public double getMonthlyAvg() {
		return monthlyAvg;
	}

	public void setMonthlyAvg(double monthlyAvg) {
		this.monthlyAvg = monthlyAvg;
	}

	public double getSalePricePercentile() {
		return salePricePercentile;
	}

	public void setSalePricePercentile(double salePricePercentile) {
		this.salePricePercentile = salePricePercentile;
	}

	public double getJeonsePricePercentile() {
		return jeonsePricePercentile;
	}

	public void setJeonsePricePercentile(double jeonsePricePercentile) {
		this.jeonsePricePercentile = jeonsePricePercentile;
	}

	public double getMonthlyDepositPercentile() {
		return monthlyDepositPercentile;
	}

	public void setMonthlyDepositPercentile(double monthlyDepositPercentile) {
		this.monthlyDepositPercentile = monthlyDepositPercentile;
	}

	public double getMonthlyPercentile() {
		return monthlyPercentile;
	}

	public void setMonthlyPercentile(double monthlyPercentile) {
		this.monthlyPercentile = monthlyPercentile;
	}

	public String getSalePriceGrade() {
		return salePriceGrade;
	}

	public void setSalePriceGrade(String salePriceGrade) {
		this.salePriceGrade = salePriceGrade;
	}

	public String getJeonsePriceGrade() {
		return jeonsePriceGrade;
	}

	public void setJeonsePriceGrade(String jeonsePriceGrade) {
		this.jeonsePriceGrade = jeonsePriceGrade;
	}

	public String getMonthlyDepositGrade() {
		return monthlyDepositGrade;
	}

	public void setMonthlyDepositGrade(String monthlyDepositGrade) {
		this.monthlyDepositGrade = monthlyDepositGrade;
	}

	public String getMonthlyGrade() {
		return monthlyGrade;
	}

	public void setMonthlyGrade(String monthlyGrade) {
		this.monthlyGrade = monthlyGrade;
	}
	
	
}
