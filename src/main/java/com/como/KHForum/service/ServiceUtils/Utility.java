package com.como.KHForum.service.ServiceUtils;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Service
public class Utility {
//----------------------------------------------------------------------------------------------------
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public class Object{
        private Integer ago;
        private String ago_status;
    }
//-----------------------------------------------Date + Time -> minute convert -> Ago Time------------------------------------------------
    String ago_status;
    Integer ago;
    public Object DateTimeConverter(LocalDateTime dt_stmp){
        LocalDateTime now_stmp = LocalDateTime.now();
        Long minute = ChronoUnit.MINUTES.between(dt_stmp, now_stmp);

        if(minute > 0 && minute < 1){
            if(minute >= 60){
                if(minute >= 60*24){
                  if(minute >= 60*24*30){
                      if(minute >= 60*24*30*12){
                          ago = minute.intValue()/(60*24*30*12);
                          ago_status = "y";
                      }else{
                          ago = minute.intValue()/(60*24*30);
                          ago_status = "m";
                      }
                  }else{
                      ago = minute.intValue()/(60*24);
                      ago_status = "d";
                  }
                }else{
                  ago = minute.intValue()/60;
                  ago_status = "h";
                }  
              }else {
                  ago = minute.intValue();
                  ago_status = "min";
              }
        }else{
            ago = null;
            ago_status = "recently";
        }

        Object object = new Object(ago, ago_status);
        return object;
    }
}
