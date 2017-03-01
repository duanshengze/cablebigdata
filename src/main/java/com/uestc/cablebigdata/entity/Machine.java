package com.uestc.cablebigdata.entity;


public class Machine {
	private String autoId;
	private String machineRFID;
	private String machineName;//-----------------------machineName
	private String machineCode;
	private String processName;//-------------------------processName
	private String companyName;//-------------------------companyName
	private String isWorking;//该供应商是否正在生产
	private String retainField1;
	private String retainField2;
	private String retainField3;
	public Machine() {
		super();
	}
	public Machine(String auto_Id, String machine_NO, String process_ID) {
		super();
		this.autoId = auto_Id;
		this.machineName = machine_NO;
		this.processName = process_ID;
	}
	
	
	
	public String getAutoId() {
		return autoId;
	}
	public void setAutoId(String autoId) {
		this.autoId = autoId;
	}
	public String getMachineRFID() {
		return machineRFID;
	}
	public void setMachineRFID(String machineRFID) {
		this.machineRFID = machineRFID;
	}
	public String getMachineName() {
		return machineName;
	}
	public void setMachineName(String machineName) {
		this.machineName = machineName;
	}
	public String getMachineCode() {
		return machineCode;
	}
	public void setMachineCode(String machineCode) {
		this.machineCode = machineCode;
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
	public String getIsWorking() {
		return isWorking;
	}
	public void setIsWorking(String isWorking) {
		this.isWorking = isWorking;
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
	@Override
	public String toString() {
		String result = "machine_No:" + machineName + " process_ID:" + processName + 
		" company_ID:" + companyName;
		return result;
	}
	
	
}
