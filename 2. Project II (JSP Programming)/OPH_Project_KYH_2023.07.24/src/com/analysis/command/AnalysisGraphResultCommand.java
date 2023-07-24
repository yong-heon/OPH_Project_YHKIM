package com.analysis.command;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.analysis.model.*;

public class AnalysisGraphResultCommand implements ACommand {
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		String district = request.getParameter("mapreport-sgg");
		String aItem = request.getParameter("AItem");
		
		ADao dao = new ADao();

//		ArrayList<ArrayList<Double>> avgValues = new ArrayList<ArrayList<Double>>();
//		ArrayList<ArrayList<String>> percentiles = new ArrayList<ArrayList<String>>();
//		ArrayList<ArrayList<String>> grades = new ArrayList<ArrayList<String>>();
//
//		avgValues.add(dao.getAvg(district, aItem));
//		percentiles.add(dao.getPercentile(district, aItem));
//		grades.add(dao.getGrades(district, aItem));
		
        ArrayList<Double> avgValues = dao.getAvg(district, aItem);
        ArrayList<String> percentiles = dao.getPercentile(district, aItem);
        ArrayList<String> grades = dao.getGrades(district, aItem);

		request.setAttribute("avgValues", avgValues);
		request.setAttribute("percentiles", percentiles);
		request.setAttribute("grades", grades);
	}
}
