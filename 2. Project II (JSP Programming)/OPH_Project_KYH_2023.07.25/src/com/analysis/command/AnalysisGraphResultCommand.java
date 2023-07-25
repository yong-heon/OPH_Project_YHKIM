package com.analysis.command;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;

import com.analysis.model.*;

public class AnalysisGraphResultCommand implements ACommand {
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		String district = request.getParameter("mapreport-sgg");
		String aItem = request.getParameter("AItem");
		
		if (district == null || aItem == null) { // null 값인 경우 db조회를 시도하지 않도록 함
			// appropriate error handling
			return;
		}
		
		ADao dao = new ADao();

//		ArrayList<ArrayList<Double>> avgValues = new ArrayList<ArrayList<Double>>();
//		ArrayList<ArrayList<String>> percentiles = new ArrayList<ArrayList<String>>();
//		ArrayList<ArrayList<String>> grades = new ArrayList<ArrayList<String>>();
//
//		avgValues.add(dao.getAvg(district, aItem));
//		percentiles.add(dao.getPercentile(district, aItem));
//		grades.add(dao.getGrades(district, aItem));
		
        ArrayList<Double> avgValues = dao.getAvg(district, aItem);
        ArrayList<Double> percentiles = dao.getPercentile(district, aItem);
        ArrayList<String> grades = dao.getGrades(district, aItem);
        

        Map<String, Object> result = new HashMap<>();
        result.put("district", district);
        result.put("avgValues", avgValues);
        result.put("percentiles", percentiles);
        result.put("grades", grades);

        String jsonResult = new Gson().toJson(result);

        try {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(jsonResult);
        } catch (IOException e) {
            e.printStackTrace();
        }
        
	}
}
