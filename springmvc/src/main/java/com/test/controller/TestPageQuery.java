package com.test.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import org.hibernate.*;

import java.util.List;

import com.test.entity.RegisterEntity;
import org.hibernate.cfg.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by admin on 2017/7/6.
 */
@Controller
public class TestPageQuery {
    @RequestMapping(value = "/page",method = RequestMethod.GET)
    public ModelAndView pageajax() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("pageajax");
        return modelAndView;
    }

    @RequestMapping(value = "/page", method = RequestMethod.POST)
    @ResponseBody
    public List page(int num, ModelMap modelMap) {

        Session session = new Configuration().configure().buildSessionFactory().openSession();
        Criteria cri = session.createCriteria(RegisterEntity.class);
        Transaction transaction = session.beginTransaction();
        int pageSize = 10;
        int pageNo = num;
        cri.setFirstResult((pageNo - 1) * pageSize);
        cri.setMaxResults(pageSize);
        List<RegisterEntity> list = cri.list();
        transaction.commit();
        if (list != null) {
            session.close();
            return list;
        } else {
            modelMap.addAttribute("pageisnol", "没有数据");
            session.close();
            return list;
        }

    }
}

