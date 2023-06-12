package com.MonthlyRent;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

public class MonthlyRentDto {
	private String accYear;
	private String sggCd;
	private String sggNm;
	private String bjdongCd;
	private String bjdongNm;
	private String rentGbn;
	private String rentArea;
	private String rentGtn;
	private String rentFee;
	private String houseGbnNm;
	
	public MonthlyRentDto() {
		super();
	}
	public MonthlyRentDto(String accYear, String sggCd, String sggNm, String bjdongCd, String bjdongNm, 
			String rentGbn, String rentArea, String rentGtn, String rentFee, String houseGbnNm) {
		super();
		this.accYear = accYear;
		this.sggCd = sggCd;
		this.sggNm = sggNm;
		this.bjdongCd = bjdongCd;
		this.bjdongNm = bjdongNm;
		this.rentGbn = rentGbn;
		this.rentArea = rentArea;
		this.rentGtn = rentGtn;
		this.rentFee = rentFee;
		this.houseGbnNm = houseGbnNm;
	}
	public String getAccYear() {
		return accYear;
	}
	public void setAccYear(String accYear) {
		this.accYear = accYear;
	}
	public String getSggCd() {
		return sggCd;
	}
	public void setSggCd(String sggCd) {
		this.sggCd = sggCd;
	}
	public String getSggNm() {
		return sggNm;
	}
	public void setSggNm(String sggNm) {
		this.sggNm = sggNm;
	}
	public String getBjdongCd() {
		return bjdongCd;
	}
	public void setBjdongCd(String bjdongCd) {
		this.bjdongCd = bjdongCd;
	}
	public String getBjdongNm() {
		return bjdongNm;
	}
	public void setBjdongNm(String bjdongNm) {
		this.bjdongNm = bjdongNm;
	}
	public String getRentGbn() {
		return rentGbn;
	}
	public void setRentGbn(String rentGbn) {
		this.rentGbn = rentGbn;
	}
	public String getRentArea() {
		return rentArea;
	}
	public void setRentArea(String rentArea) {
		this.rentArea = rentArea;
	}
	public String getRentGtn() {
		return rentGtn;
	}
	public void setRentGtn(String rentGtn) {
		this.rentGtn = rentGtn;
	}
	public String getRentFee() {
		return rentFee;
	}
	public void setRentFee(String rentFee) {
		this.rentFee = rentFee;
	}
	public String getHouseGbnNm() {
		return houseGbnNm;
	}
	public void setHouseGbnNm(String houseGbnNm) {
		this.houseGbnNm = houseGbnNm;
	}
}
