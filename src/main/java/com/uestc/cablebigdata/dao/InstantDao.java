package com.uestc.cablebigdata.dao;


import com.uestc.cablebigdata.dto.HisWarnInfo;
import com.uestc.cablebigdata.entity.InsWarnInfo;
import com.uestc.cablebigdata.entity.Machine;
import com.uestc.cablebigdata.entity.Threshold;

import java.util.List;
import java.util.Map;



public interface InstantDao {
	/**
	 * 从该数据获取最后一条数据，数据按时间戳增序排列
	 * 获取当前机器最后20条数据，若数据不足20条则返回实际数据
	 * @param machine
	 * @param quantitiy
	 * @return
	 */
	public List<HisWarnInfo> getLastSeriesData(String machine, int quantitiy);
	
	/**
	 * 根据机台查找工序
	 * @param machine
	 * @return
	 */
	public Process getProcessByMachine(String machine);
	
	
	
	/**
	 * 根据订单号获取公司名称,基于以上两个方法
	 * @param contrast
	 * @return
	 */
//	public String getCompanyNameByContrast(String contrast);
	/**
	 * @return
	 */
	public Machine getMachineNameByID(String machineId);
	
	
	
	/**
	 * 记录供应商、订单、机台是否正在工作
	 * 该方法基于getMachineCount
	 */
	public void recordWorkStatus();
	/**
	 * 计算所有机台的数据条目
	 * @return
	 */
	public Map<String, Integer> getMachineCount(); 
//	public String getCompanyStatus(String company);
	public boolean updateCompanyStatus(String company, String status);
//	public String getContrastStatus(String contrast);
//	public boolean updateContrastStatus(String contrast, String status);
	public String getMachineStatus(String machine);
	public boolean updateMachineStatus(String machine, String status);


	/**
	 * 统计正在生产的供应商
	 * @return
	 */
	public List<String> getWorkingCompanys();


	/**
	 * 统计该供应商正在生产的订单
	 * @param company
	 * @return
	 */
	public List<String> getWorkingContracts(String company);


	/**
	 * 从工序表中读取所有的工序名字
	 * @return
	 */
	public List<String> getAllProcesses();


	/**
	 * 读取指定订单的所有正在工作的机台
	 * 1.根据订单号在t_process_data查找相关机台  List<String>
	 * 2.将获取的机台和t_machine对比，筛选出正在工作的机台
	 * @param contrast
	 * @return
	 */
	/*public List<Machine> getWorkingMachines(String contrast);*/
	/**
	 * 取所有参数的上边界
	 * @return
	 */
	public List<Double> getUpperValues();
	/**
	 * 取所有参数的下边界
	 * @return
	 */
	public List<Double> getLowerValues();
	/**
	 * 获取所有的机台状态<机台号，状态>   状态默认为0（不工作），1（工作）
	 * @return
	 */
	public Map<String, String> getAllMachines();
	/**
	 * 根据订单获取所有机台对象，查询t_process_data
	 * @param contrast
	 * @return
	 */
	public List<Machine> getMachinesByContrast(String contrast);
	/**
	 * 查询t_process_data根据盘号，查询所有机台对象，对象内只保存机台号
	 * @param volume
	 * @return
	 */
	public List<Machine> getMachinesByVolume(String volume);
	/**
	 * 根据机台号，获取该机台正在生产的盘号
	 * 获取该机台时间戳中最后一条数据，进行返回
	 * @param machine
	 * @return
	 */
	public String getWorkingVolumeByMachine(String machine);


	public String getCompanyIdByName(String company_name);


//	public String getCompanyByID(String companyID);


	public List<List<Machine>> getMachinesAndStatus(String company);


//	public String getLastVolumeNoByMachineNo(String machineNo);


	/**
	 * 通过查询机台号得到最新的米标
	 * @param machineNo
	 * @return
	 */
	public String getLastMeterTagByMachineNo(String machineNo);
	/**
	 * 通过查询机台号得到最新的火花值
	 * @param machineNo
	 * @return
	 */
	public String getLastSparkValueByMachineNo(String machineNo);
	
	public Map<String, Threshold> getThresholds();
	
	public String getCompanyIsChanged(String company);
	
	public List<InsWarnInfo> getAllSeriesData(String machine);

}
