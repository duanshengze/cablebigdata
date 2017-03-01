package com.uestc.cablebigdata.entity;



public class Process {

	private String processId;

	private String productOrder;


	private String processName;
//	private String process_Name;//-----------------processName

	private String companyName;



	
	private String retainField1;
	private String retainField2;
	private String retainField3;
	
	
	
	public Process() {
		super();
	}

	public Process(String process_ID, String product_Order,
			String process_Name) {
		super();
		this.processId = process_ID;
		this.productOrder = product_Order;
		this.processName = process_Name;
	}

	public String getProcessId() {
		return processId;
	}

	public void setProcessId(String processId) {
		this.processId = processId;
	}

	public String getProductOrder() {
		return productOrder;
	}

	public void setProductOrder(String productOrder) {
		this.productOrder = productOrder;
	}

	public String getProcessName() {
		return processName;
	}

	public void setProcessName(String processName) {
		this.processName = processName;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getRetainField1() {
		return retainField1;
	}

	public void setRetainField1(String retainField1) {
		this.retainField1 = retainField1;
	}

	public String getRetainField2() {
		return retainField2;
	}

	public void setRetainField2(String retainField2) {
		this.retainField2 = retainField2;
	}

	public String getRetainField3() {
		return retainField3;
	}

	public void setRetainField3(String retainField3) {
		this.retainField3 = retainField3;
	}

	
	
	
	
}
