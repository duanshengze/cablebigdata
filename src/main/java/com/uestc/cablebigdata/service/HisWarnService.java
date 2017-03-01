package com.uestc.cablebigdata.service;



import com.uestc.cablebigdata.entity.HisWarnInfo;

import java.util.List;
import java.util.Map;

public interface HisWarnService {
	
	/**
	 * @return
	 */
	public List<HisWarnInfo> getAllCompanys();
	
	/**
	 * @param Company_ID
	 * @return
	 */
	public List<HisWarnInfo> getContrastsByCompany(String Company_ID);
	
	/**
	 * @param volume
	 * @return
	 */
	public List<HisWarnInfo> getCompanyContrastByVolume(String volume);
	
	/**
	 * @param meter
	 * @param date
	 * @return
	 */
	public List<HisWarnInfo> getAllByMeterAndDate(String meter, String date);
	

	

	
//	/**
//	 * @param volume
//	 * @return
//	 */
//	public List<HisWarnInfo> getAllByVolume(String volume,String paramDate, String paramDateEnd);

	public Map<String,Object> getAllWarnCount(String paramDate, String paramDateEnd);
	
	public Map<String, Object> getVolumeWarnCountByVolume(String volume, String paramDate, String paramDateEnd);
	
	public Map<String, Object> getContrastWarnCountByCompany(String company, String paramDate, String paramDateEnd);
	
//	public Map<String, Object> getVolumeWarnCountByContrast(String contrast);
	
	
	public Map<String, Object> getVolumeWarnCountByMeterDate(String meter, String date);
	
	public Map<String, Object> getProcessesByContrast(String contrast, String paramDate, String paramDateEnd);
	
	public Map<String, Object> getMeterWarnCountByVolumeAndMeter(String volume, String meter, String paramDate, String paramDateEnd);
//	
//	public boolean isWarn(HisWarnInfo hisWarnInfo);//是否预警
//	
//	public boolean isAlarm(HisWarnInfo hisWarnInfo);//是否报警

}
