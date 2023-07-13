package dev.shop.shop.controller;

import dev.shop.shop.item.entity.Item;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(value = "/thymeleaf")
public class ThymeleafExController {
    @GetMapping(value = "/ex01")
    public String thymeleafExample01(Model model){
        model.addAttribute("data","타입리프 예제 입니다.");
        return "thymeleafEx/thymeleafEx01";
    }

    @GetMapping(value = "/items")
    public String items(Model model){
        List<Item> items = new ArrayList<>();
        for(int i=0;i<10;i++){
            items.add(Item.builder()
                            .price(10000 + (i * 100))
                            .itemName("test")
                            .stockNumber(50 + i)
                            .itemDetail("test")
                            .regTime(LocalDateTime.now())
                            .updateTime(LocalDateTime.now())
                    .build());
        }

        model.addAttribute("items",items);
        return "thymeleafEx/items";
    }

    @GetMapping(value = "layouts")
    public String layouts(){
        return "thymeleafEx/layoutEx";
    }
}
