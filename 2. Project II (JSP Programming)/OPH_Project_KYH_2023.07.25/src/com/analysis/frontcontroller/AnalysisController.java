package com.analysis.frontcontroller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.analysis.command.*;

/**
 * Servlet implementation class AnalysisController
 */
@WebServlet("*.do")
public class AnalysisController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AnalysisController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("doGet");
		actionDo(request, response);	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("doPost");
		actionDo(request, response);
	}
	
	private void actionDo(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException  {
		System.out.println("actionDo");
		request.setCharacterEncoding("UTF-8");
		String viewPage = "analysis.jsp";
		
		ACommand command = null;
		
		String uri = request.getRequestURI();
		String conPath = request.getContextPath();
		String com = uri.substring(conPath.length());
		
		if(com.equals("/getAnalysisItem.do")){
			command = new GetAnalysisItemCommand();
			command.execute(request, response);
		} else if(com.equals("/getDistrict.do")){
			command = new GetDistrictCommand();
			command.execute(request, response);
		} else if(com.equals("/analysisTableResult.do")){
			command = new AnalysisTableResultCommand();
			command.execute(request, response);
		} else if(com.equals("/analysisGraphResult.do")){
			command = new AnalysisGraphResultCommand();
			command.execute(request, response);
			return;
		}
		
//		request.getRequestDispatcher(viewPage).forward(request, response);
		RequestDispatcher dispatcher = request.getRequestDispatcher(viewPage);
		dispatcher.forward(request,  response);
	}

}
