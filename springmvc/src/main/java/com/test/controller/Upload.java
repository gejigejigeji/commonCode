package com.test.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;

@Controller
public class Upload {
    @RequestMapping(value = "/file")
    //value=file,表示name必须有file，required表示是否必须有value=file的值
    public String upload(@RequestParam(value = "file",required = false) MultipartFile file, ModelMap model) {

        System.out.println("开始");
        String path = "E:\\file\\img\\";
        String fileName = file.getOriginalFilename();
        System.out.println(path);
        System.out.println(fileName);
        System.out.println(path+fileName);
        File targetFile = new File(path, fileName);
        if(!targetFile.exists()){
            targetFile.mkdirs();
        }

        //保存
        try {
            file.transferTo(targetFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
        model.addAttribute("fileUrl", path+fileName);
        return "pageajax";
    }
}
