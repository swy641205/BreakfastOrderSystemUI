// utils/orderUtils.ts
export const enrichOrderItemsWithMenuNames = (orders, menus) => {
    const menuDict = {};
    for (const menu of menus) {
        menuDict[menu.id] = menu.name;
    }

    return orders.map(order => {
        const enrichedOrderItems = JSON.parse(order.order_items).map(item => {
            return {
                ...item,
                name: menuDict[item.id] || 'Unknown'
            };
        });

        return {
            ...order,
            order_items: enrichedOrderItems
        };
    });
};
