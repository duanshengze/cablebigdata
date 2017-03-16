package com.uestc.cablebigdata.hadoop.mr;


import com.uestc.cablebigdata.utils.StringUtils;
import com.uestc.cablebigdata.utils.XmlUtil;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.hbase.HBaseConfiguration;
import org.apache.hadoop.hbase.client.Put;

import org.apache.hadoop.hbase.mapreduce.TableMapReduceUtil;
import org.apache.hadoop.hbase.util.Bytes;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.util.Tool;
import org.apache.hadoop.util.ToolRunner;

import java.io.IOException;
import java.util.Map;


/**
 * Created by dsz on 17/3/15.
 */
public class XmlToHbaseMR {
    //自定义数据解析map类
    public static class XmlMap extends Mapper<Object, Text, NullWritable, Put> {

        @Override
        protected void map(Object key, Text value, Context context) throws IOException, InterruptedException {
            //将xml文件里面的解析为键值对并1.过滤掉重复的数据 2.去除不合理的数据
            Map<String, String> clientInfo = XmlUtil.parseXmlAndCrUseless(value.toString());
            //将数据存入HBase
            handleData(clientInfo, context);

        }

        private void handleData(Map<String, String> clientInfo, Context context) throws IOException, InterruptedException {
            String volumeNo = clientInfo.get("VOLUME_NO");
            //保证行key的唯一性
            String rowkey = generateRowKey(volumeNo);
            Put put = new Put(Bytes.toBytes(rowkey));
            //写入数据库
            for (Map.Entry<String, String> entry : clientInfo.entrySet()) {
                if (StringUtils.isNotBank(entry.getKey()) && StringUtils.isNotBank(entry.getValue())) {
                    if (isPyOrPr(entry.getKey())) {
                        put.add(Bytes.toBytes("proporty"), Bytes.toBytes(entry.getKey()), Bytes.toBytes(entry.getValue()));
                    } else {
                        put.add(Bytes.toBytes("parameter"), Bytes.toBytes(entry.getKey()), Bytes.toBytes(entry.getValue()));
                    }


                }
            }
            context.write(NullWritable.get(), put);
        }

        private boolean isPyOrPr(String key) {
            return false;
        }

        private String generateRowKey(String volumeNo) {
            return null;

        }
    }

    public static class XmlToHBaseRunner implements Tool {
        private Configuration conf = null;
        //[xml路径,表名称]
        public int run(String[] strings) throws Exception {
            Configuration conf = getConf();
            Job job = Job.getInstance(conf, "xmlToHBase");
            job.setJarByClass(XmlToHBaseRunner.class);
            job.setMapperClass(XmlMap.class);
            job.setMapOutputKeyClass(NullWritable.class);
            job.setMapOutputValueClass(Put.class);

            TableMapReduceUtil.initTableReducerJob(strings[1], null, job);
            job.setNumReduceTasks(0);
            setJobInputPaths(job,strings[0]);

            return job.waitForCompletion(true) ? 0 : -1;
        }

        public void setConf(Configuration configuration) {
            this.conf = HBaseConfiguration.create(conf);


        }

        public Configuration getConf() {
            return this.conf;
        }

        private void setJobInputPaths(Job job,String pathStr) {
            Configuration conf = job.getConfiguration();
            FileSystem fs = null;
            try {
                fs = FileSystem.get(conf);
                Path inputPath = new Path(pathStr);
                if (fs.exists(inputPath)) {
                    FileInputFormat.addInputPath(job, inputPath);
                } else {
                    throw new RuntimeException("文件不存在:" + inputPath);
                }
            } catch (IOException e) {
                throw new RuntimeException("设置job的mapreduce输入路径出现异常", e);
            } finally {
                if (fs != null) {
                    try {
                        fs.close();
                    } catch (IOException e) {
                      e.printStackTrace();
                    }
                }
            }
        }

    }

    /**
     *
     * @param args [xml路径,表名称]
     * @throws Exception
     */

    public static void startXmlToHbase(String [] args)  {
        try {
            ToolRunner.run(new Configuration(),new XmlToHBaseRunner(),args);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
