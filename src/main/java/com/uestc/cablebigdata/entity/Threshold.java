package com.uestc.cablebigdata.entity;



public class Threshold {

	private String parameter;

	private String lower_value;

	private String warn_value;

	private String upper_value;
	
	public Threshold() {
		// TODO Auto-generated constructor stub
	}

	

	public String getParameter() {
		return parameter;
	}



	public void setParameter(String parameter) {
		this.parameter = parameter;
	}



	public String getLower_value() {
		return lower_value;
	}

	public void setLower_value(String lower_value) {
		this.lower_value = lower_value;
	}

	public String getWarn_value() {
		return warn_value;
	}

	public void setWarn_value(String warn_value) {
		this.warn_value = warn_value;
	}

	public String getUpper_value() {
		return upper_value;
	}

	public void setUpper_value(String upper_value) {
		this.upper_value = upper_value;
	}
	
	

}
