function account(rawAccount) {
    if (!rawAccount) {
        return undefined;
    }
    try {
        return {
            ...rawAccount,
            raw: () => rawAccount,
            buying_power: number(rawAccount.buying_power),
            regt_buying_power: number(rawAccount.regt_buying_power),
            daytrading_buying_power: number(rawAccount.daytrading_buying_power),
            cash: number(rawAccount.cash),
            created_at: new Date(rawAccount.created_at),
            portfolio_value: number(rawAccount.portfolio_value),
            multiplier: number(rawAccount.multiplier),
            equity: number(rawAccount.equity),
            last_equity: number(rawAccount.last_equity),
            long_market_value: number(rawAccount.long_market_value),
            short_market_value: number(rawAccount.short_market_value),
            initial_margin: number(rawAccount.initial_margin),
            maintenance_margin: number(rawAccount.maintenance_margin),
            last_maintenance_margin: number(rawAccount.last_maintenance_margin),
            sma: number(rawAccount.sma),
            status: rawAccount.status,
        };
    }
    catch (err) {
        throw new Error(`Account parsing failed. ${err.message}`);
    }
}
function clock(rawClock) {
    if (!rawClock) {
        return undefined;
    }
    try {
        return {
            raw: () => rawClock,
            timestamp: new Date(rawClock.timestamp),
            is_open: rawClock.is_open,
            next_open: new Date(rawClock.next_open),
            next_close: new Date(rawClock.next_close),
        };
    }
    catch (err) {
        throw new Error(`Order parsing failed. ${err.message}`);
    }
}
function latestTrade(raw) {
    if (!raw) {
        return undefined;
    }
    try {
        return {
            ...raw,
            raw: () => raw,
            trade: {
                ...raw.trade,
                t: new Date(raw.trade.t),
            },
        };
    }
    catch (err) {
        throw new Error(`Latest trade parsing failed. ${err.message}`);
    }
}
function order(rawOrder) {
    if (!rawOrder) {
        return undefined;
    }
    try {
        return {
            ...rawOrder,
            raw: () => rawOrder,
            created_at: new Date(rawOrder.created_at),
            updated_at: new Date(rawOrder.updated_at),
            submitted_at: new Date(rawOrder.submitted_at),
            filled_at: new Date(rawOrder.filled_at),
            expired_at: new Date(rawOrder.expired_at),
            canceled_at: new Date(rawOrder.canceled_at),
            failed_at: new Date(rawOrder.failed_at),
            replaced_at: new Date(rawOrder.replaced_at),
            qty: number(rawOrder.qty),
            filled_qty: number(rawOrder.filled_qty),
            type: rawOrder.type,
            side: rawOrder.side,
            time_in_force: rawOrder.time_in_force,
            limit_price: number(rawOrder.limit_price),
            stop_price: number(rawOrder.stop_price),
            filled_avg_price: number(rawOrder.filled_avg_price),
            status: rawOrder.status,
            legs: orders(rawOrder.legs),
            trail_price: number(rawOrder.trail_price),
            trail_percent: number(rawOrder.trail_percent),
            hwm: number(rawOrder.hwm),
            order_class: rawOrder.order_class,
        };
    }
    catch (err) {
        throw new Error(`Order parsing failed. ${err.message}`);
    }
}
function orders(rawOrders) {
    return rawOrders ? rawOrders.map((value) => order(value)) : undefined;
}
function canceled_order(input) {
    if (!input) {
        return undefined;
    }
    let order = input.body;
    // we don't want this field anymore
    delete input.body;
    if (!order)
        return;
    try {
        return {
            ...input,
            order: {
                ...order,
                raw: () => order,
                created_at: new Date(order?.created_at),
                updated_at: new Date(order.updated_at),
                submitted_at: new Date(order.submitted_at),
                filled_at: new Date(order.filled_at),
                expired_at: new Date(order.expired_at),
                canceled_at: new Date(order.canceled_at),
                failed_at: new Date(order.failed_at),
                replaced_at: new Date(order.replaced_at),
                qty: number(order.qty),
                filled_qty: number(order.filled_qty),
                type: order.type,
                side: order.side,
                time_in_force: order.time_in_force,
                limit_price: number(order.limit_price),
                stop_price: number(order.stop_price),
                filled_avg_price: number(order.filled_avg_price),
                status: order.status,
                legs: orders(order.legs),
                trail_price: number(order.trail_price),
                trail_percent: number(order.trail_percent),
                hwm: number(order.hwm),
                order_class: order.order_class,
            },
        };
    }
    catch (err) {
        throw new Error(`Order parsing failed. ${err.message}`);
    }
}
function canceled_orders(rawOrderCancelations) {
    return rawOrderCancelations
        ? rawOrderCancelations.map((value) => canceled_order(value))
        : undefined;
}
function position(rawPosition) {
    if (!rawPosition) {
        return undefined;
    }
    try {
        return {
            ...rawPosition,
            raw: () => rawPosition,
            avg_entry_price: number(rawPosition.avg_entry_price),
            qty: number(rawPosition.qty),
            side: rawPosition.side,
            market_value: number(rawPosition.market_value),
            cost_basis: number(rawPosition.cost_basis),
            unrealized_pl: number(rawPosition.unrealized_pl),
            unrealized_plpc: number(rawPosition.unrealized_plpc),
            unrealized_intraday_pl: number(rawPosition.unrealized_intraday_pl),
            unrealized_intraday_plpc: number(rawPosition.unrealized_intraday_plpc),
            current_price: number(rawPosition.current_price),
            lastday_price: number(rawPosition.lastday_price),
            change_today: number(rawPosition.change_today),
        };
    }
    catch (err) {
        throw new Error(`Position parsing failed. ${err.message}`);
    }
}
function positions(rawPositions) {
    return rawPositions ? rawPositions.map((pos) => position(pos)) : undefined;
}
function tradeActivity(rawTradeActivity) {
    if (!rawTradeActivity) {
        return undefined;
    }
    try {
        return {
            ...rawTradeActivity,
            raw: () => rawTradeActivity,
            cum_qty: number(rawTradeActivity.cum_qty),
            leaves_qty: number(rawTradeActivity.leaves_qty),
            price: number(rawTradeActivity.price),
            qty: number(rawTradeActivity.qty),
            side: rawTradeActivity.side,
            type: rawTradeActivity.type,
        };
    }
    catch (err) {
        throw new Error(`TradeActivity parsing failed. ${err.message}`);
    }
}
function nonTradeActivity(rawNonTradeActivity) {
    if (!rawNonTradeActivity) {
        return undefined;
    }
    try {
        return {
            ...rawNonTradeActivity,
            raw: () => rawNonTradeActivity,
            net_amount: number(rawNonTradeActivity.net_amount),
            qty: number(rawNonTradeActivity.qty),
            per_share_amount: number(rawNonTradeActivity.per_share_amount),
        };
    }
    catch (err) {
        throw new Error(`NonTradeActivity parsing failed. ${err.message}`);
    }
}
function activities(rawActivities) {
    if (!rawActivities) {
        return undefined;
    }
    try {
        return rawActivities.map((rawActivity) => rawActivity.activity_type === 'FILL'
            ? tradeActivity(rawActivity)
            : nonTradeActivity(rawActivity));
    }
    catch (err) {
        throw new Error(`Activity parsing failed. ${err.message}`);
    }
}
function pageOfTrades(page) {
    if (!page) {
        return undefined;
    }
    try {
        return {
            raw: () => page,
            trades: (page.trades == null ? [] : page.trades).map((trade) => ({
                raw: () => trade,
                ...trade,
                t: new Date(trade.t),
            })),
            symbol: page.symbol,
            next_page_token: page.next_page_token,
        };
    }
    catch (err) {
        throw new Error(`PageOfTrades parsing failed "${err.message}"`);
    }
}
function pageOfQuotes(page) {
    if (!page) {
        return undefined;
    }
    try {
        return {
            raw: () => page,
            quotes: (page.quotes == null ? [] : page.quotes).map((quote) => ({
                raw: () => quote,
                ...quote,
                t: new Date(quote.t),
            })),
            symbol: page.symbol,
            next_page_token: page.next_page_token,
        };
    }
    catch (err) {
        throw new Error(`PageOfTrades parsing failed "${err.message}"`);
    }
}
function pageOfBars(page) {
    if (!page) {
        return undefined;
    }
    try {
        return {
            raw: () => page,
            bars: (page.bars == null ? [] : page.bars).map((bar) => ({
                raw: () => bar,
                ...bar,
                t: new Date(bar.t),
            })),
            symbol: page.symbol,
            next_page_token: page.next_page_token,
        };
    }
    catch (err) {
        throw new Error(`PageOfTrades parsing failed "${err.message}"`);
    }
}
function snapshot(raw) {
    if (!raw) {
        return undefined;
    }
    try {
        return {
            ...raw,
            raw: () => raw,
            latestTrade: raw.latestTrade
                ? {
                    ...raw.latestTrade,
                    t: new Date(raw.latestTrade.t),
                }
                : null,
            latestQuote: raw.latestQuote
                ? {
                    ...raw.latestQuote,
                    t: new Date(raw.latestQuote.t),
                }
                : null,
            minuteBar: raw.minuteBar
                ? {
                    ...raw.minuteBar,
                    t: new Date(raw.minuteBar.t),
                }
                : null,
            dailyBar: raw.dailyBar
                ? {
                    ...raw.dailyBar,
                    t: new Date(raw.dailyBar.t),
                }
                : null,
            prevDailyBar: raw.prevDailyBar
                ? {
                    ...raw.prevDailyBar,
                    t: new Date(raw.prevDailyBar.t),
                }
                : null,
        };
    }
    catch (err) {
        throw new Error(`Snapshot parsing failed "${err.message}"`);
    }
}
function snapshots(raw) {
    let parsed = {};
    for (let [key, value] of Object.entries(raw)) {
        parsed[key] = snapshot(value);
    }
    return parsed;
}
function number(numStr) {
    if (typeof numStr === 'undefined' || numStr == null) {
        return numStr;
    }
    const value = parseFloat(numStr);
    if (Number.isNaN(value)) {
        return null;
    }
    return value;
}
function trade_update(rawTradeUpdate) {
    if (!rawTradeUpdate)
        return undefined;
    return {
        raw: () => rawTradeUpdate,
        event: rawTradeUpdate.event,
        execution_id: rawTradeUpdate.execution_id,
        order: order(rawTradeUpdate.order),
        /* Only include the non-obligatory fields if they exist */
        ...(rawTradeUpdate.event_id && {
            event_id: number(rawTradeUpdate.event_id),
        }),
        ...(rawTradeUpdate.at && { at: new Date(rawTradeUpdate.at) }),
        ...(rawTradeUpdate.timestamp && {
            timestamp: new Date(rawTradeUpdate.timestamp),
        }),
        ...(rawTradeUpdate.position_qty && {
            position_qty: number(rawTradeUpdate.position_qty),
        }),
        ...(rawTradeUpdate.price && { price: number(rawTradeUpdate.price) }),
        ...(rawTradeUpdate.qty && { qty: number(rawTradeUpdate.qty) }),
    };
}
export default {
    account,
    activities,
    clock,
    nonTradeActivity,
    order,
    orders,
    canceled_orders,
    position,
    positions,
    tradeActivity,
    pageOfTrades,
    pageOfQuotes,
    pageOfBars,
    snapshot,
    snapshots,
    trade_update,
    latestTrade,
};
