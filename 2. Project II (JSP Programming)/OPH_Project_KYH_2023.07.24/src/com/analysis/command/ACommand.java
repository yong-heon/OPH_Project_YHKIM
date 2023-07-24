package com.analysis.command;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface ACommand {
	void execute(HttpServletRequest request, HttpServletResponse response);
}
