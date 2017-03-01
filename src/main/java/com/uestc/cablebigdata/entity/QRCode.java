package com.uestc.cablebigdata.entity;

public class QRCode {
	
	private String auto_id;
	private String volume_No;
	private String contrast_ID;
	private String sUB_Volumn_No;
	private String generator_date;
	
	
	
	public QRCode() {
		super();
	}
	public QRCode(String auto_id, String volume_No, String contrast_ID,
			String sUB_Volumn_No, String generator_date) {
		super();
		this.auto_id = auto_id;
		this.volume_No = volume_No;
		this.contrast_ID = contrast_ID;
		this.sUB_Volumn_No = sUB_Volumn_No;
		this.generator_date = generator_date;
	}
	public String getAuto_id() {
		return auto_id;
	}
	public void setAuto_id(String auto_id) {
		this.auto_id = auto_id;
	}
	public String getVolume_No() {
		return volume_No;
	}
	public void setVolume_No(String volume_No) {
		this.volume_No = volume_No;
	}
	public String getContrast_ID() {
		return contrast_ID;
	}
	public void setContrast_ID(String contrast_ID) {
		this.contrast_ID = contrast_ID;
	}
	public String getsUB_Volumn_No() {
		return sUB_Volumn_No;
	}
	public void setsUB_Volumn_No(String sUB_Volumn_No) {
		this.sUB_Volumn_No = sUB_Volumn_No;
	}
	public String getGenerator_date() {
		return generator_date;
	}
	public void setGenerator_date(String generator_date) {
		this.generator_date = generator_date;
	}
	
	
	
}
