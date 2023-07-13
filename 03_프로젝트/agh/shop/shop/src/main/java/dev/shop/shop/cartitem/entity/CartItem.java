package dev.shop.shop.cartitem.entity;

import dev.shop.shop.cart.entity.Cart;
import dev.shop.shop.item.entity.Item;
import lombok.NoArgsConstructor;
import org.codehaus.groovy.transform.trait.Traits;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "cart_item")
public class CartItem {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "cart_item_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    private int count;
}
