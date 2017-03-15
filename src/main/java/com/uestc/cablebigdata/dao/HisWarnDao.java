package com.uestc.cablebigdata.dao;




import com.uestc.cablebigdata.model.view.HisWarnInfo;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

public interface HisWarnDao {

	
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
	
	/**
	 * @param company
	 * @return
	 */
//	public List<HisWarnInfo> getAllByCompany(String company);
	
	/**
	 * @param contrast
	 * @return
	 */

	
	/**
	 * @param volume
	 * @return
	 */
//	public List<HisWarnInfo> getAllByVolume(String volume, String paramDate, String paramDateEnd);
	
	/**
	 * @param paramDateEnd 
	 * @param paramDate 
	 * @return
	 */
	public Map<String,Object> getAllWarnCount(String paramDate, String paramDateEnd);
	
	public Map<String, Object> getVolumeWarnCountByVolume(String volume, String paramDate, String paramDateEnd);
	
	/*public Map<String, Object> getContrastWarnCountByCompanyName(String company);*/
	
//	public Map<String, Object> getVolumeWarnCountByContrast(String contrast);
	
	
//	public Map<String, Object> getVolumeWarnCountByMeterDate(String meter,String date);
	
//	public Map<String, Object> getProcessesByContrast(String contrast, String paramDate, String paramDateEnd);
	
//	public Map<String, Object> getAllByVolumeAndMeter(String volume,String meter);

	public int queryTotalCount(HisWarnInfo hisWarnInfo, String paramDate, String paramDateEnd, String sSearch);

	public List<HisWarnInfo> queryHisInfoPage(HisWarnInfo hisWarnInfo,
                                              String paramDate, String paramDateEnd, int pageNumber, int pageCount, String sSearch);

	public Map<String, Object> getContrastWarnCountByCompany(String company, String paramDate, String paramDateEnd);

	public Map<String,Object> getMeterByVolumeAndMeter(String volume,
                                                       String meter, String paramDate, String paramDateEnd);

	/**
	 * 根据hiswarninfo获取所有异常的信息
	 * @param hisInfo
	 * @param paramDate
	 * @param paramDateEnd
	 * @return
	 * @throws UnsupportedEncodingException
	 * @throws NumberFormatException 
	 */
	public List<HisWarnInfo> queryHisWarnInfoList(HisWarnInfo hisInfo,
                                                  String paramDate, String paramDateEnd) throws NumberFormatException, UnsupportedEncodingException;

	/**
	 * 根据hiswarninfo获取所有信息
	 * @param hisInfo
	 * @param paramDate
	 * @param paramDateEnd
	 * @return
	 */
	public List<HisWarnInfo> queryHisAllInfoList(HisWarnInfo hisInfo,
                                                 String paramDate, String paramDateEnd);

	public Map<String, Object> getProcessesWarnCountByContrast(String contrast, String paramDate, String paramDateEnd);
	

}
