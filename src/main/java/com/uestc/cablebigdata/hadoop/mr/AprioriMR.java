package com.uestc.cablebigdata.hadoop.mr;

import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.NullWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;


/**
 * Created by dsz on 17/3/16.
 */
public class AprioriMR {
    public static final int MIN_SUPPORT = 2;

    private static Logger log= LoggerFactory.getLogger(AprioriMR.class);

    private static final String JOB_NAME = "Apriori";

    public static class AprioriMapper extends Mapper<LongWritable,Text,Text,LongWritable>{
        @Override
        protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
            String[] terms=value.toString().split(",");
            for (String term:terms){
                context.write(new Text(term),new LongWritable(1));
            }

        }
    }

    public static class AprioriReducer extends Reducer<Text, LongWritable, Text, LongWritable>{
        @Override
        protected void reduce(Text key, Iterable<LongWritable> values, Context context) throws IOException, InterruptedException {
            Long sum=0l;
            for (LongWritable value:values){
                sum +=value.get();
            }
            if(sum>=MIN_SUPPORT){
                context.write(key,new LongWritable(sum));
            }

        }
    }

    public static  class AprioriKMapper extends  Mapper<LongWritable, Text, Text, NullWritable>{

    }
}
