package com.uestc.cablebigdata.hadoop.mr;

import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.conf.Configuration;
import javax.xml.stream.*;
import java.io.ByteArrayInputStream;
import java.io.IOException;


/**
 * Created by dsz on 17/3/15.
 */
public class XmlToHbaseMR {

    public static class Map extends Mapper<LongWritable,Text,Text,Text>{
        @Override
        protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
            String document=value.toString();
            try {
                XMLStreamReader reader= XMLInputFactory.newFactory().createXMLStreamReader(
                        new ByteArrayInputStream(document.getBytes())
                );
                String propertyName="";
                String propertyValue="";
                String currentElement="";
                while (reader.hasNext()){
                    int code=reader.next();
                    switch (code){

                    }
                }

            } catch (XMLStreamException e) {
                e.printStackTrace();
            }


        }
    }
    public static void runJob(String input,String outPut){

        Configuration configuration

    }

}
