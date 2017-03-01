package com.uestc.cablebigdata.entity;



public class Contract {

		private String contractId;//参考物Id

		private String contractName;//参考物名----常用

		private String contractNo;
		private String contractDate;

		private String companyName;

		private String isWorking;//该供应商是否正在生产
		
		private String retainField1;
		private String retainField2;
		private String retainField3;
		
		public Contract(){}
		
		public Contract(String contrast_ID, String contrast_Name,
				String contrast_No, String company_ID) {
			super();
			this.contractId = contrast_ID;
			this.contractName = contrast_Name;
			this.contractNo = contrast_No;
			this.companyName = company_ID;
		}
		
		
		
		
		

		public String getContractId() {
			return contractId;
		}

		public void setContractId(String contractId) {
			this.contractId = contractId;
		}

		public String getContractName() {
			return contractName;
		}

		public void setContractName(String contractName) {
			this.contractName = contractName;
		}

		public String getContractNo() {
			return contractNo;
		}

		public void setContractNo(String contractNo) {
			this.contractNo = contractNo;
		}

		public String getContractDate() {
			return contractDate;
		}

		public void setContractDate(String contractDate) {
			this.contractDate = contractDate;
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

		public String toString(){
			return contractId+"#"+contractName+"#"+contractNo+"#"+companyName;
		}
		
}
