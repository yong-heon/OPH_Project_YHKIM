package com.analysis.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

public class ADao {
	
	DataSource dataSource;
	Connection  testConnection;
	String url = "jdbc:oracle:thin:@localhost:1521:xe";
    String id = "scott";
    String pw = "tiger";
    
	public ADao() {
		
		try {
			Context context = new InitialContext();
			dataSource = (DataSource) context.lookup("java:comp/env/jdbc/Oracle11g");
			testConnection = DriverManager.getConnection(url, id, pw);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public ArrayList<ADto> getAnalysisTableResult(String district, String aItem) {
		ArrayList<ADto> dtos = new ArrayList<ADto>();
		//Connection conn = null;
        Connection conn = testConnection;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {
			conn = dataSource.getConnection();
			String query = "select * from aItem = ? where district = ? ";
			pstmt = conn.prepareStatement(query);
			pstmt.setString(1,  aItem);
			pstmt.setString(2,  district);
			rs = pstmt.executeQuery();
			
			
			while(rs.next()) {
				String districtName =rs.getString("district");
				String analysisItem  =rs.getString("analysisItem");
				double salePriceAvg = rs.getDouble("salePriceAvg");
				double jeonsePriceAvg = rs.getDouble("jeonsePriceAvg");
				double monthlyDepositAvg = rs.getDouble("monthlyDepositAvg");
				double monthlyAvg = rs.getDouble("monthlyAvg");
				double salePricePercentile = rs.getDouble("salePricePercentile");
				double jeonsePricePercentile = rs.getDouble("jeonsePricePercentile");
				double monthlyDepositPercentile = rs.getDouble("monthlyDepositPercentile");
				double monthlyPercentile = rs.getDouble("monthlyPercentile");
				String salePriceGrade =rs.getString("salePriceGrade");
				String jeonsePriceGrade =rs.getString("jeonsePriceGrade");
				String monthlyDepositGrade =rs.getString("monthlyDepositGrade");
				String monthlyGrade =rs.getString("monthlyGrade");
				
				ADto dto = new ADto(districtName, analysisItem, salePriceAvg, jeonsePriceAvg, monthlyDepositAvg, monthlyAvg, salePricePercentile, jeonsePricePercentile, monthlyDepositPercentile, 	monthlyPercentile, salePriceGrade, jeonsePriceGrade, monthlyDepositGrade,  monthlyGrade);
				
				dtos.add(dto);
			}
		}  catch(Exception e) {
			e.printStackTrace();
		} finally {
			try{
				if(rs != null) rs.close();
				if(pstmt != null) pstmt.close();
				if(conn != null) conn.close();
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
		return dtos;
	}
	
	public ArrayList<Double> getAvg(String district, String aItem) {
        ArrayList<Double> avgValues = new ArrayList<Double>();
		//Connection conn = null;
        Connection conn = testConnection;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		// district = "동대문구";
		
		try { 
			//conn = dataSource.getConnection();
			String query = "SELECT district, salepriceavg, jeonsepriceavg, monthlydepositavg, monthlyavg FROM " + aItem +" WHERE district = ?";
			 
			pstmt = conn.prepareStatement(query);
			pstmt.setString(1,  district);
			rs = pstmt.executeQuery();		
			System.out.println(aItem+district);
			System.out.println(query);
			
			while(rs.next()) {
//             avgValues.add(rs.getDouble(1));
			    avgValues.add(rs.getDouble(2));
			    avgValues.add(rs.getDouble(3));
			    avgValues.add(rs.getDouble(4));
			    avgValues.add(rs.getDouble(5));
			}
			System.out.println("avg data load success");
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("avg data loading error");

		} finally {
			try {
				if(rs != null) rs.close();
				if(pstmt != null) pstmt.close();
				if(conn != null) conn.close();
			} catch (Exception e2) {
				e2.printStackTrace();
				System.out.println("avg data loading error");

			}
		}
		return avgValues;
	}
	
	public ArrayList<Double> getPercentile(String district, String aItem) {
        ArrayList<Double> percentileValues = new ArrayList<Double>();
//		Connection conn = null;
        Connection conn = testConnection;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		
		try { 
			conn = dataSource.getConnection();
			String query = "select district, salepricepercentile, jeonsepricepercentile, monthlydepositpercentile, monthlypercentile  FROM " +aItem+ " WHERE district = ?";
			pstmt = conn.prepareStatement(query);
			pstmt.setString(1,  district);
			rs = pstmt.executeQuery();		
			
			while(rs.next()) {
				percentileValues.add(rs.getDouble(2));
				percentileValues.add(rs.getDouble(3));
				percentileValues.add(rs.getDouble(4));
				percentileValues.add(rs.getDouble(5));

			}
			System.out.println("percentile data load success");

		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("percentile data loading error");

		} finally {
			try {
				if(rs != null) rs.close();
				if(pstmt != null) pstmt.close();
				if(conn != null) conn.close();
			} catch (Exception e2) {
				e2.printStackTrace();
				System.out.println("percentile data loading error");

			}
		}
		return percentileValues;
	}
	
	public ArrayList<String> getGrades(String district, String aItem) {
        ArrayList<String> gradeValues = new ArrayList<String>();
//		Connection conn = null;
        Connection conn = testConnection;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		
		try { 
			conn = dataSource.getConnection();
			String query = "select district, SALEPRICEGRADE, JEONSEPRICEGRADE, MONTHLYDEPOSITGRADE, MONTHLYGRADE FROM " + aItem + " WHERE district = ?";
			pstmt = conn.prepareStatement(query);
			pstmt.setString(1,  district);
			rs = pstmt.executeQuery();		
			
			while(rs.next()) {
				gradeValues.add(rs.getString(2));
				gradeValues.add(rs.getString(3));
				gradeValues.add(rs.getString(4));
				gradeValues.add(rs.getString(5));
			}
			System.out.println("grade data load success");

		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("grade data loading error");
		} finally {
			try {
				if(rs != null) rs.close();
				if(pstmt != null) pstmt.close();
				if(conn != null) conn.close();
			} catch (Exception e2) {
				e2.printStackTrace();
				System.out.println("grade data loading error");

			}
		}
		return gradeValues;
	}
}
