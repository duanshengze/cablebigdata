package com.uestc.cablebigdata.hadoop.mr;

import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

import java.io.IOException;

/**
 * Created by Administrator on 2017/3/4.
 */
public class AprioriMapper extends Mapper<LongWritable, Text, Text, LongWritable> {
    @Override
    protected void map(LongWritable key, Text value, Mapper<LongWritable, Text, Text, LongWritable>.Context context)
            throws IOException, InterruptedException {
        String line =value.toString();

        String[]words=line.split(" ");

        for(String w:words){

            context.write(new Text(w),new LongWritable(1));
        }
    }
}
