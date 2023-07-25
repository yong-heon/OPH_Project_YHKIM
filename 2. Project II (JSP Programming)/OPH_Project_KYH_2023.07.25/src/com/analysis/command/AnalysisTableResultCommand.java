package com.analysis.command;

import java.sql.Array;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.analysis.model.*;

public class AnalysisTableResultCommand implements ACommand {
	
	public void execute (HttpServletRequest request, HttpServletResponse response) {
		String district = (String) request.getAttribute("district");
        String aItem = (String) request.getAttribute("aItem");
		ADao dao = new ADao();
		
		dao.getAnalysisTableResult(district, aItem);

	}

}
