package com.test.controller;

import com.test.entity.RegisterEntity;
import com.test.entity.UserEntity;
import jdk.nashorn.internal.runtime.GlobalConstants;
import org.hibernate.*;
import org.hibernate.cfg.Configuration;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.omg.Messaging.SYNC_WITH_TRANSPORT;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.test.service.impl.RegexUtil;

import javax.net.ssl.SSLEngine;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
public class UrlController {
    private Configuration cfg = new Configuration().configure();
    //创建会话工厂
    private SessionFactory fac = cfg.buildSessionFactory();
    //创建会话
    private Session son = fac.openSession();
    //开启事务
    Transaction transaction = son.beginTransaction();
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ModelAndView login() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("login");
        return modelAndView;
    }


    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public ModelAndView register() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("register");
        return modelAndView;
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    @ResponseBody
    @ModelAttribute
    public ModelAndView register(String username, String password,String repassword,String email) throws Exception {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("register");
//        Map<String, Object> map = new HashMap<String, Object>();
//        map.put("user", username);
//        map.put("pass", password);
//        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
//        list.add(map);
//        String wocao = (String) list.get(0).get("user");
        if (RegexUtil.isRightfulString(username)) {
            // 获得Criteria对象
            Criteria cri = son.createCriteria(RegisterEntity.class);
            // 需要查询的列
            cri.setProjection(Projections.property("username"));
            // 添加条件
            cri.add(Restrictions.eq("username",username));
            // 获得Emp集合
            List<String> list = cri.list();
            // 输出Emp集合
            if (list.size()>0){
            //账号存在
                modelAndView.addObject("cunzai",list);
            } else if (!password.equals(repassword)) {
                modelAndView.addObject("norepect", "密码不一致");
            }else {
                try {
                    RegisterEntity registerEntity = new RegisterEntity();
                    registerEntity.setUsername(username);
                    registerEntity.setPassword(password);
                    registerEntity.setEmail(email);
                    son.save(registerEntity);

                    transaction.commit();
                } catch (Exception e) {
                    e.printStackTrace();
                }finally {
                    son.close();
                    fac.close();
                }
            }
        }
        return modelAndView;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    @ModelAttribute
    public ModelAndView login(String username, String password, HttpServletRequest request, HttpServletResponse response, ModelMap modelMap) throws Exception,ServletException {
            // 获得Criteria对象
            Criteria cri = son.createCriteria(RegisterEntity.class);
            // 添加条件
        cri.add(Restrictions.eq("username",username));
        cri.add(Restrictions.eq("password", password));
            // 获得Emp集合
             List<RegisterEntity> list= cri.list();
        if (list.size() < 1) {
            System.out.println("没有数据");
            modelMap.addAttribute("usernol", "用户名或密码不正确");
            return new ModelAndView("login");
        }else{
            HttpSession session = request.getSession();
            session.setAttribute("user",username);
            session.setMaxInactiveInterval(10*60);
            modelMap.addAttribute("user", session.getAttribute("user"));
            System.out.println("有数据"+session.getAttribute("user"));
            return new ModelAndView("redirect:index.jsp");
        }
    }


}
