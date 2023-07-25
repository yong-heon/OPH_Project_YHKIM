package com.analysis.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class GetDistrictCommand implements ACommand {
	
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		
		String district = request.getParameter("maproport-sgg");
		request.setAttribute("maproport-sgg", district);

	}
}
