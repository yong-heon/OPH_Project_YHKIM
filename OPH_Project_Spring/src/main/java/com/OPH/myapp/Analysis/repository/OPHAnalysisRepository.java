package com.OPH.myapp.Analysis.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class OPHAnalysisRepository implements IOPHAnalysisRepository {
	
	@Autowired
	JdbcTemplate jdbcTemplate;
	
    @Override
    public List<Double> getAvg(String district, String aItem) {
        String query = "SELECT salepriceavg, jeonsepriceavg, monthlydepositavg, monthlyavg FROM " + aItem + " WHERE district = ?";
        return jdbcTemplate.queryForObject(query, new Object[]{district}, new RowMapper<List<Double>>() {
            @Override
            public List<Double> mapRow(ResultSet rs, int rowNum) throws SQLException {
                List<Double> avgValues = new ArrayList<>();
                avgValues.add(rs.getDouble("salepriceavg"));
                avgValues.add(rs.getDouble("jeonsepriceavg"));
                avgValues.add(rs.getDouble("monthlydepositavg"));
                avgValues.add(rs.getDouble("monthlyavg"));
                return avgValues;
            }
        });
    }

    @Override
    public List<Double> getPercentile(String district, String aItem) {
        String query = "SELECT salepricepercentile, jeonsepricepercentile, monthlydepositpercentile, monthlypercentile FROM " + aItem + " WHERE district = ?";
        return jdbcTemplate.queryForObject(query, new Object[]{district}, new RowMapper<List<Double>>() {
            @Override
            public List<Double> mapRow(ResultSet rs, int rowNum) throws SQLException {
                List<Double> percentileValues = new ArrayList<>();
                percentileValues.add(rs.getDouble("salepricepercentile"));
                percentileValues.add(rs.getDouble("jeonsepricepercentile"));
                percentileValues.add(rs.getDouble("monthlydepositpercentile"));
                percentileValues.add(rs.getDouble("monthlypercentile"));
                return percentileValues;
            }
        });
    }

    @Override
    public List<String> getGrades(String district, String aItem) {
        String query = "SELECT SALEPRICEGRADE, JEONSEPRICEGRADE, MONTHLYDEPOSITGRADE, MONTHLYGRADE FROM " + aItem + " WHERE district = ?";
        return jdbcTemplate.queryForObject(query, new Object[]{district}, new RowMapper<List<String>>() {
            @Override
            public List<String> mapRow(ResultSet rs, int rowNum) throws SQLException {
                List<String> gradeValues = new ArrayList<>();
                gradeValues.add(rs.getString("SALEPRICEGRADE"));
                gradeValues.add(rs.getString("JEONSEPRICEGRADE"));
                gradeValues.add(rs.getString("MONTHLYDEPOSITGRADE"));
                gradeValues.add(rs.getString("MONTHLYGRADE"));
                return gradeValues;
            }
        });
    }
}
