package dev.shop.shop.item.entity;

import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import dev.shop.shop.item.repository.ItemRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDateTime;
import java.util.List;


@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.yaml")
class ItemTest {
    @Autowired
    ItemRepository itemRepository;

    @PersistenceContext
    EntityManager em;

    @Test
    @DisplayName("상품 저장 테스트")
    public void createItem(){
        Item item = Item.builder()
                .itemName("test")
                .itemDetail("test")
                .itemSellStatus(ItemSellStatus.SELL)
                .stockNumber(50)
                .price(10000)
                .regTime(LocalDateTime.now())
                .updateTime(LocalDateTime.now())
                .build();
        itemRepository.save(item);
    }

    public void createItemList(){
        for(int i=1;i<=100;i++){
            Item item = Item.builder()
                    .itemName("test")
                    .itemDetail("테스트 상품 상세 설명" + i)
                    .itemSellStatus(ItemSellStatus.SELL)
                    .stockNumber(50)
                    .price(10000 + i)
                    .regTime(LocalDateTime.now())
                    .updateTime(LocalDateTime.now())
                    .build();
            Item savedItem = itemRepository.save(item);
        }
    }

    @Test
    @DisplayName("query dls test")
    public void querydslTest(){
        this.createItemList();
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);
        QItem qItem = QItem.item;

        JPAQuery<Item> query = queryFactory.selectFrom(qItem)
                .where(qItem.itemSellStatus.eq(ItemSellStatus.SELL))
                .where(qItem.itemDetail.like("%" + "테스트 상품 상세 설명" + "%"))
                .orderBy(qItem.price.desc());
        List<Item> itemList = query.fetch();

        for(Item item : itemList) System.out.println(item.toString());
    }
}