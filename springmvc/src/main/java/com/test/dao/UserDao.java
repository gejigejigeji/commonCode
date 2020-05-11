package com.test.dao;

import org.hibernate.*;
import org.hibernate.cfg.Configuration;
import com.test.entity.UserEntity;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class UserDao {
    //实例化配置对象 加载映射文件 加载hibernate.cfg.xml
    private Configuration cfg = new Configuration().configure();
    //创建会话工厂
    private SessionFactory fac = cfg.buildSessionFactory();
    //创建会话
    private Session son = fac.openSession();
    //开启事务
    Transaction transaction = son.beginTransaction();
    UserEntity userEntity = new UserEntity();


    //增加
//    public void testSave() {
//            son.beginTransaction();
//            userEntity.setUid(5);
//            userEntity.setUsername("wwuwuwuwuwu");
//            son.save(userEntity);
//            transaction.commit();
//    }

    //查询
    public void testGetAllDate() {
        try {
            Transaction transaction = son.beginTransaction();
            //编写HQL语句(面向类和属性的查询
            String hql =" from UserEntity";//这里是Customer不是表名 是类名 查询Customer
            Query query = son.createQuery(hql);
            List<UserEntity> userEntities = query.list();
            for (UserEntity cao : userEntities) {
                System.out.println(cao.getUid()+cao.getUsername());
            }
        transaction.commit();
        }finally {
            son.close();
            fac.close();
        }
    }

    //删除
//    public void testDelete() {
//        userEntity.setUid(5);
//        son.delete(userEntity);
//        transaction.commit();
//    }

//    public static void main(String[] agrs) {
//        UserDao userDao = new UserDao();
//            userDao.testSave();
//            userDao.testGetAllDate();
//            userDao.testDelete();
//    }


















//    public List<UserEntity> query() {
//        Session session = null;
//        List<UserEntity> list = null;
//        try {
//            String hql = "from UserEntity order by uid desc ";
//            Query query = son.createQuery(hql);
//            list = query.list();
//        } catch (HibernateException e) {
//            e.printStackTrace();
//            return null;
//        } finally {
//            if (session != null) {
//                session.close();
//            }
//        }
//        return list;
//    }
    }
