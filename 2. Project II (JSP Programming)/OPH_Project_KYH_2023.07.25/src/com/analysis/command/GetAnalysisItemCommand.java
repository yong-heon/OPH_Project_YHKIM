package com.analysis.command;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.analysis.model.ADao;
import com.analysis.model.ADto;

public class GetAnalysisItemCommand implements ACommand{
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		String aItem = request.getParameter("aItem");
		
		request.setAttribute("aItem", aItem);
	}

}
