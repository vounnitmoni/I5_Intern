package com.como.KHForum.generic;


public class ClassHolderGeneric<T> {
    public static <T> ClassHolderGeneric<T> hold(T body){
        if(body instanceof Class){
            body.getClass();
        }
        return null;
    }
}
