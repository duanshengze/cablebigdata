package com.uestc.cablebigdata.hadoop.mr;



import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;

import org.apache.hadoop.mapreduce.Reducer;

import java.io.IOException;


/**
 * Created by Administrator on 2017/3/4.
 */
public class AprioriReducer extends Reducer<Text, LongWritable, Text, LongWritable> {
    public void reduce(Text k2, Iterable<LongWritable> v2s,
                       Reducer<Text, LongWritable, Text, LongWritable>.Context context ) throws IOException, InterruptedException {
        //��������
        Text k3=k2;
        //����һ��������
        long counter=0;
        //ѭ��v2s
        for(LongWritable i:v2s){
            counter+=i.get();
        }
        //���
        context.write(k3, new LongWritable(counter));
    }



}
