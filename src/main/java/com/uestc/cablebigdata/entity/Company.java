package com.uestc.cablebigdata.entity;




public class Company {

	private String companyId;

	private String companyName;
	
	private String companyInfo;
	
	private String companyAdress;
	
	private String companyContact;
	
	private String companyTel;

	private String isWorking;//该供应商是否正在生产

	private String isChanged;//该供应商当前的工作状态，比如没有机器发生停止或启动，则工作状态为0，否则为1
	
	private String retainField1;
	private String retainField2;
	private String retainField3;
	

	
	public Company() {
		super();
	}

	
	public Company(String company_ID) {
		super();
		this.companyId = company_ID;
	}

	public Company(String company_ID, String company_NANME,
			String company_INFO, String company_adress, String company_TEL) {
		super();
		this.companyId = company_ID;
		this.companyName = company_NANME;
		this.companyInfo = company_INFO;
		this.companyAdress = company_adress;
		this.companyTel = company_TEL;
	}

	
	


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((companyId == null) ? 0 : companyId.hashCode());
		return result;
	}


	
	
	public String getCompanyId() {
		return companyId;
	}


	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}


	public String getCompanyName() {
		return companyName;
	}


	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}


	public String getCompanyInfo() {
		return companyInfo;
	}


	public void setCompanyInfo(String companyInfo) {
		this.companyInfo = companyInfo;
	}


	public String getCompanyAdress() {
		return companyAdress;
	}


	public void setCompanyAdress(String companyAdress) {
		this.companyAdress = companyAdress;
	}


	public String getCompanyContact() {
		return companyContact;
	}


	public void setCompanyContact(String companyContact) {
		this.companyContact = companyContact;
	}


	public String getCompanyTel() {
		return companyTel;
	}


	public void setCompanyTel(String companyTel) {
		this.companyTel = companyTel;
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
	
	




	public String getIsChanged() {
		return isChanged;
	}


	public void setIsChanged(String isChanged) {
		this.isChanged = isChanged;
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Company other = (Company) obj;
		if (companyId == null) {
			if (other.companyId != null)
				return false;
		} else if (!companyId.equals(other.companyId))
			return false;
		return true;
	}
	
	public String toString(){
		return companyId+"#"+companyName+"#"+companyInfo+"#"+companyAdress+"#"+companyTel;
	}
	

}
