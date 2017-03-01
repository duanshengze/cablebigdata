package com.uestc.cablebigdata.entity;

import java.util.ArrayList;
import java.util.List;

/**
 * 实时载入数据封装类
 * @author yWX317230
 *
 */
public class FirstInstantData {
	
	private String paramName;
	private List<String> xdata;
	private List<String> instantdata;
	private List<String> cpkdata;
	private String lowervalue;
	private String uppervalue;
	
	public void newList(){
		xdata = new ArrayList<String>();
		instantdata = new ArrayList<String>();
		cpkdata = new ArrayList<String>();
	}
	
	public String getParamName() {
		return paramName;
	}
	public void setParamName(String paramName) {
		this.paramName = paramName;
	}
	public List<String> getXdata() {
		return xdata;
	}
	public void setXdata(List<String> xdata) {
		this.xdata = xdata;
	}
	public List<String> getInstantdata() {
		return instantdata;
	}
	public void setInstantdata(List<String> instantdata) {
		this.instantdata = instantdata;
	}
	public List<String> getCpkdata() {
		return cpkdata;
	}
	public void setCpkdata(List<String> cpkdata) {
		this.cpkdata = cpkdata;
	}
	public String getUppervalue() {
		return uppervalue;
	}
	public void setUppervalue(String uppervalue) {
		this.uppervalue = uppervalue;
	}
	public String getLowervalue() {
		return lowervalue;
	}
	public void setLowervalue(String lowervalue) {
		this.lowervalue = lowervalue;
	}
	
	@Override
	public String toString() {
		String str = "instantdata:" + instantdata.toString() + ",cpkdata:" + cpkdata + ",xdata:" + xdata.toString() 
		+ ",lowervalue:" + lowervalue + ",uppervalue:" + uppervalue;
		return str;
	}

}
