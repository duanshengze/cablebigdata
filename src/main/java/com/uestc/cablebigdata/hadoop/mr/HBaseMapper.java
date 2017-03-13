package com.uestc.cablebigdata.hadoop.mr;

import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;

import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;

/**
 * Created by Administrator on 2017/3/12.
 */
public class HBaseMapper extends Mapper<LongWritable,Text,Text,Text> {
    @Override
    protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
        String document=value.toString();
        try {
            XMLStreamReader reader= XMLInputFactory.newInstance().createXMLStreamReader(new ByteArrayInputStream(
                    document.getBytes()
            ));
        } catch (XMLStreamException e) {
            e.printStackTrace();
        }
    }
}
