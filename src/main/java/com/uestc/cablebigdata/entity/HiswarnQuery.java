package com.uestc.cablebigdata.entity;

/**
 * The class for package the query information.
 * @author yWX317230
 *
 */
public class HiswarnQuery {
	private String companyName;
	private String contractName;
	private String volumeNo;
	private String meterTag;
	private String startTime;
	private String endTime;
	private String fuzzyPhrase;
	private String pageSize;
	private String pageNo;
	
	
	
	public HiswarnQuery() {
		
	}
	public HiswarnQuery(String companyName, String contractName,
			String volumeNo, String meterTag, String startTime, String endTime,
			String fuzzyPhrase, String pageSize, String pageNo) {
		super();
		this.companyName = companyName;
		this.contractName = contractName;
		this.volumeNo = volumeNo;
		this.meterTag = meterTag;
		this.startTime = startTime;
		this.endTime = endTime;
		this.fuzzyPhrase = fuzzyPhrase;
		this.pageSize = pageSize;
		this.pageNo = pageNo;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getContractName() {
		return contractName;
	}
	public void setContractName(String contractName) {
		this.contractName = contractName;
	}
	public String getVolumeNo() {
		return volumeNo;
	}
	public void setVolumeNo(String volumeNo) {
		this.volumeNo = volumeNo;
	}
	public String getMeterTag() {
		return meterTag;
	}
	public void setMeterTag(String meterTag) {
		this.meterTag = meterTag;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public String getFuzzyPhrase() {
		return fuzzyPhrase;
	}
	public void setFuzzyPhrase(String fuzzyPhrase) {
		this.fuzzyPhrase = fuzzyPhrase;
	}
	public String getPageSize() {
		return pageSize;
	}
	public void setPageSize(String pageSize) {
		this.pageSize = pageSize;
	}
	public String getPageNo() {
		return pageNo;
	}
	public void setPageNo(String pageNo) {
		this.pageNo = pageNo;
	}

}
